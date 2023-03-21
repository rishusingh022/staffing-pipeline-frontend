/* eslint-disable no-unused-vars */
import * as React from 'react';
import './CaseStudiesPage.css';
import { Header } from '../../components';
import CardContainer from './../../components/CardContainer';
import makeRequest from '../../utils/makeRequest';
import { GET_CASE_STUDIES_DATA_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import CaseStudyCard from './../../components/CaseStudyCard';
import ToolBox from './ToolBox';
import PageLoader from '../../components/Spinner';
import { timeFilterUtil } from '../../utils/common/timeFilter';
import {
  extractCollaboratorsFromCaseStudies,
  extractEngagementNameFromCaseStudies,
} from '../../utils/common/case-studies';
import { RoleContext } from '../../context/RoleContext';

export default function CaseStudiesPage() {
  const { userInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  let [caseStudies, setCaseStudies] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [collaboratorOptions, setCollaboratorOptions] = React.useState([]);
  const [studyOptions, setStudyOptions] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');
  const [timeFrameSelected, setTimeFrameSelected] = React.useState('');
  const [collaboratorSelected, setCollaboratorSelected] = React.useState('');
  const [studySelected, setStudySelected] = React.useState('');
  const [collaboratorIdNameMap, setCollaboratorIdNameMap] = React.useState({});
  const [studyIdNameMap, setStudyIdNameMap] = React.useState({});

  const handleSearch = searchValue => {
    setSearchValue(() => searchValue);
  };

  const handleCollaboratorChange = option => {
    if (option === 'All') option = '';
    setCollaboratorSelected(option);
  };

  const handleStudyChange = option => {
    if (option === 'All') option = '';
    setStudySelected(option);
  };

  const handleTimeFrameChange = option => {
    setTimeFrameSelected(option);
  };

  React.useEffect(() => {
    makeRequest(GET_CASE_STUDIES_DATA_URL, {}, navigate)
      .then(response => {
        setCaseStudies(response);
        const { collaboratorMap, uniqueCollaborators } = extractCollaboratorsFromCaseStudies(response);
        const { engagementMap, uniqueEngegementNames } = extractEngagementNameFromCaseStudies(response);
        setCollaboratorOptions(uniqueCollaborators);
        setStudyOptions(uniqueEngegementNames);
        setCollaboratorIdNameMap(collaboratorMap);
        setStudyIdNameMap(engagementMap);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);
  if (error) {
    return (
      <div>
        <Header hasNav={true} />
        <h1>Case Studies Page</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  if (isLoading) {
    return <PageLoader />;
  }
  if (caseStudies) {
    const { startDate, endDate } = timeFilterUtil(timeFrameSelected);
    if (timeFrameSelected && collaboratorSelected && studySelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        let caseStudyDate = new Date(caseStudy.createdAt);
        return (
          caseStudy.engagementId === studyIdNameMap[studySelected] &&
          caseStudy.collaboratorsIds.includes(collaboratorIdNameMap[collaboratorSelected]) &&
          caseStudyDate >= startDate &&
          caseStudyDate <= endDate
        );
      });
    } else if (timeFrameSelected && collaboratorSelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        let caseStudyDate = new Date(caseStudy.createdAt);
        return (
          caseStudy.collaboratorsIds.includes(collaboratorIdNameMap[collaboratorSelected]) &&
          caseStudyDate >= startDate &&
          caseStudyDate <= endDate
        );
      });
    } else if (timeFrameSelected && studySelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        let caseStudyDate = new Date(caseStudy.createdAt);
        return (
          caseStudy.engagementId === studyIdNameMap[studySelected] &&
          caseStudyDate >= startDate &&
          caseStudyDate <= endDate
        );
      });
    } else if (collaboratorSelected && studySelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        return (
          caseStudy.engagementId === studyIdNameMap[studySelected] &&
          caseStudy.collaboratorsIds.includes(collaboratorIdNameMap[collaboratorSelected])
        );
      });
    } else if (timeFrameSelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        let caseStudyDate = new Date(caseStudy.createdAt);
        return caseStudyDate >= startDate && caseStudyDate <= endDate;
      });
    } else if (collaboratorSelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        return caseStudy.collaboratorsIds.includes(collaboratorIdNameMap[collaboratorSelected]);
      });
    } else if (studySelected) {
      caseStudies = caseStudies.filter(caseStudy => {
        return caseStudy.engagementId === studyIdNameMap[studySelected];
      });
    }
    if (searchValue) {
      caseStudies = caseStudies.filter(caseStudy => {
        return caseStudy.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    const caseStudiesCards = caseStudies.map(caseStudy => {
      return (
        <CaseStudyCard
          imageUrl={caseStudy.image}
          altText={caseStudy.name}
          key={caseStudy.caseStudyId}
          name={caseStudy.name}
          identityNumber={caseStudy.engagementId}
          handleButtonClick={() => {}}
          author="John Doe"
        />
      );
    });
    return (
      <div className="case-studies-page">
        <div className="header-in-case-studies">
          <Header hasNav={true} />
        </div>
        <ToolBox
          handleSearchChange={handleSearch}
          handleCollaboratorChange={handleCollaboratorChange}
          handleStudyChange={handleStudyChange}
          handleTimeFrameChange={handleTimeFrameChange}
          collaboratorOptions={collaboratorOptions}
          studyOptions={studyOptions}
        />
        <div className="container-in-case-studies">
          <CardContainer>{caseStudiesCards}</CardContainer>
        </div>
      </div>
    );
  } else {
    return (
      <div className="case-studies-page">
        <div className="header-in-case-studies">
          <Header hasNav={true} />
        </div>
        <div className="container-in-case-studies">
          <PageLoader />
        </div>
      </div>
    );
  }
}
