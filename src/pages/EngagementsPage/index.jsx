import * as React from 'react';
import './EngagementsPage.css';
import { Header } from '../../components';
import CardContainer from './../../components/CardContainer';
import makeRequest from '../../utils/makeRequest';
import { GET_ENGAGEMENT_DATA_URL } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import EngagementCard from './../../components/EngagementCard';
import formatDate from './../../utils/dateTime';
import ToolBox from './ToolBox';
const EngagementsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_URL, {}, navigate)
      .then(response => {
        setProjects(response);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div>
        <Header hasNav={true} />
        <h1>People Page</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  if (projects) {
    const projectCards = projects.map(project => {
      return (
        <EngagementCard
          imageUrl={project.image}
          altText={project.name}
          key={project.engagementId}
          name={project.name}
          startDate={formatDate(project.startDate)}
          status={project.status}
          identityNumber={project.engagementId}
          handleButtonClick={() => {}}
        />
      );
    });

    return (
      <div className="engagements-page">
        <Header hasNav={true} />
        <ToolBox />
        <div className="container-in-engagements">
          <CardContainer>{projectCards}</CardContainer>
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
