import * as React from 'react';
import './EngagementsPage.css';
import { Header } from '../../components';
import Count from '../../components/Count';
import CardContainer from './../../components/CardContainer';
import makeRequest from '../../utils/makeRequest';
import { GET_ENGAGEMENT_DATA_URL, GET_ALL_SECTORS } from '../../constants/apiEndpoints';
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
import { FeatureContext } from '../../context/FeatureContext';
import PaginationControl from '../../components/PaginationControl';
import allFeatures from '../../constants/allFeatures';

const EngagementsPage = () => {
  const { userInfo } = React.useContext(FeatureContext);
  const navigate = useNavigate();
  let [projects, setProjects] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [technologyOptions, setTechnologyOptions] = React.useState([]);
  const [guildOptions, setGuildOptions] = React.useState([]);
  const [technologySelected, setTechnologySelected] = React.useState('');
  const [guildSelected, setGuildSelected] = React.useState('');
  const [timeFrameSelected, setTimeFrameSelected] = React.useState('');
  const [sectorSelected, setSectorSelected] = React.useState({});
  const [subSectorSelected, setSubSectorSelected] = React.useState({});
  const [allSectors, setAllSectors] = React.useState([]);
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

  const handleSectorChange = option => {
    if (option === 'All') {
      setSectorSelected({});
      setSubSectorSelected({});
      return;
    }
    setSectorSelected(allSectors.find(sector => sector.name === option));
  };

  const handleSubSectorChange = option => {
    if (option === 'All') {
      setSubSectorSelected({});
      return;
    }
    setSubSectorSelected(sectorSelected.sub_sectors.find(subSector => subSector.name === option));
  };

  if (!userInfo?.featureAccess?.includes(allFeatures.read_engagement)) navigate('/users');

  const fetchEngagementData = () => {
    makeRequest(GET_ENGAGEMENT_DATA_URL, {
      params: {
        page: pageNumber,
      }
    }, () => {})
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
  const fetchAllSectors = () => {
    makeRequest(GET_ALL_SECTORS, {}, () => {})
      .then(response => {
        console.log(response);
        setAllSectors(response);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  };
  React.useEffect(() => {
    fetchEngagementData();
    fetchAllSectors();
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
    if (sectorSelected?.name) {
      projects = projects.filter(project => project?.sector?.name === sectorSelected?.name);
    }
    if (subSectorSelected?.name) {
      projects = projects.filter(project => project?.sub_sector?.name === subSectorSelected?.name);
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
          sectorOptions={allSectors}
          sectorSelected={sectorSelected}
          handleTechnologyChange={handleTechnologyChange}
          handleGuildChange={handleGuildChange}
          handleTimeFrameChange={handleTimeFrameChange}
          handleSearchChange={handleSearch}
          handleSectorChange={handleSectorChange}
          handleSubSectorChange={handleSubSectorChange}
        />
        <div className="container-in-engagements flex flex-col">
          <Count type="engagements" objectCount={objectCount} setObjectCount={setObjectCount} />
          {projectCards.length === 0 ? (
            <p className="w-full h-full text-center text-gray-400">No Engagements...</p>
          ) : (
            <CardContainer>{projectCards}</CardContainer>
          )}
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
