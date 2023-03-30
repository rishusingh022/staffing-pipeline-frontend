import * as React from 'react';
import './EngagementsPage.css';
import { Header } from '../../components';
import Count from '../../components/Count';
import CardContainer from './../../components/CardContainer';
import makeRequest from '../../utils/makeRequest';
import { GET_ENGAGEMENT_DATA_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import EngagementCard from './../../components/EngagementCard';
import { formatDate } from './../../utils/dateTime';
import ToolBox from './ToolBox';
import {
  convertStartDate,
  extractSkillsFromEngagement,
  extractGuildFromEngagement,
} from '../../utils/common/engagement';
import { timeFilterUtil } from '../../utils/common/timeFilter';
import { RoleContext } from '../../context/RoleContext';
import PaginationControl from '../../components/PaginationControl';

const EngagementsPage = () => {
  const { userInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  let [projects, setProjects] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [technologyOptions, setTechnologyOptions] = React.useState([]);
  const [guildOptions, setGuildOptions] = React.useState([]);
  const [technologySelected, setTechnologySelected] = React.useState('');
  const [guildSelected, setGuildSelected] = React.useState('');
  const [timeFrameSelected, setTimeFrameSelected] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(1);
  const [objectCount, setObjectCount] = React.useState(0);

  const handleSearch = searchValue => {
    setSearchValue(() => searchValue);
  };

  const handleTechnologyChange = option => {
    if (option === 'All') option = '';
    setTechnologySelected(option);
  };

  const handleGuildChange = option => {
    if (option === 'All') option = '';
    setGuildSelected(option);
  };

  const handleTimeFrameChange = option => {
    setTimeFrameSelected(option);
  };

  if (userInfo?.role !== 'pd' && userInfo?.role !== 'leadership') navigate('/users');

  const fetchEngagementData = () => {
    makeRequest(GET_ENGAGEMENT_DATA_URL, {}, navigate)
      .then(response => {
        console.log(response);
        response = convertStartDate(response);
        setProjects(response);
        setTechnologyOptions(extractSkillsFromEngagement(response));
        setGuildOptions(extractGuildFromEngagement(response));
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  };
  React.useEffect(() => {
    fetchEngagementData();
  }, [pageNumber]);

  if (error) {
    return (
      <div>
        <Header hasNav={true} />
        <h1>Engagement Page</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  if (projects) {
    const { startDate, endDate } = timeFilterUtil(timeFrameSelected);
    if (timeFrameSelected && technologySelected && guildSelected) {
      projects = projects.filter(project => {
        let projectStartDate = new Date(project.startDate);
        return (
          projectStartDate >= startDate &&
          projectStartDate <= endDate &&
          project.skills.includes(technologySelected) &&
          project.guild === guildSelected
        );
      });
    } else if (timeFrameSelected && technologySelected) {
      projects = projects.filter(project => {
        let projectStartDate = new Date(project.startDate);
        return (
          projectStartDate >= startDate && projectStartDate <= endDate && project.skills.includes(technologySelected)
        );
      });
    } else if (timeFrameSelected && guildSelected) {
      projects = projects.filter(project => {
        let projectStartDate = new Date(project.startDate);
        return projectStartDate >= startDate && projectStartDate <= endDate && project.guild === guildSelected;
      });
    } else if (technologySelected && guildSelected) {
      projects = projects.filter(
        project => project.skills.includes(technologySelected) && project.guild === guildSelected
      );
    } else if (timeFrameSelected) {
      projects = projects.filter(project => {
        let projectStartDate = new Date(project.startDate);
        return projectStartDate >= startDate && projectStartDate <= endDate;
      });
    } else if (technologySelected) {
      projects = projects.filter(project => project.skills.includes(technologySelected));
    } else if (guildSelected) {
      projects = projects.filter(project => project.guild === guildSelected);
    }

    if (searchValue) {
      projects = projects.filter(project => {
        return project.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    // sort projects by alphabetical order
    projects.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const projectCards = projects.map(project => {
      return (
        <EngagementCard
          imageUrl={project.image}
          altText={project.name}
          key={project.engagementId}
          name={project.name}
          startDate={project.startDate ? formatDate(project.startDate) : null}
          status={project.status}
          identityNumber={project.engagementId}
          handleButtonClick={() => {
            navigate(`/projects/${project.engagementId}`);
          }}
        />
      );
    });
    React.useEffect(() => {}, []);
    return (
      <div className="engagements-page">
        <Header hasNav={true} />
        <ToolBox
          handleAddNewEngagement={() => navigate('/projects/add')}
          technologyOptions={technologyOptions}
          guildOptions={guildOptions}
          handleTechnologyChange={handleTechnologyChange}
          handleGuildChange={handleGuildChange}
          handleTimeFrameChange={handleTimeFrameChange}
          handleSearchChange={handleSearch}
        />
        <div className="container-in-engagements flex flex-col">
          <Count type="engagements" objectCount={objectCount} setObjectCount={setObjectCount} />
          <CardContainer>{projectCards}</CardContainer>
          <PaginationControl pageNumber={pageNumber} setPageNumber={setPageNumber} objectCount={objectCount} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="engagements-page">
        <Header hasNav={true} />
        <div className="container-in-engagements">
          <CardContainer>Loading....</CardContainer>
        </div>
      </div>
    );
  }
};

export default EngagementsPage;
