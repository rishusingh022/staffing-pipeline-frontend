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

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    makeRequest(GET_CASE_STUDIES_DATA_URL, {}, navigate)
      .then(response => {
        setCaseStudies(response);
      })
      .catch(error => {
        setError(error);
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
  if (caseStudies) {
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
        <ToolBox />
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
