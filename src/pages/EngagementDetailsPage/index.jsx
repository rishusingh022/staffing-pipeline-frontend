import * as React from 'react';
import './EngagementDetailsPage.css';
import Header from '../../components/Header';
import EngagementDetails from '../../components/EngagementDetails';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_ENGAGEMENT_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import PageLoader from '../../components/Spinner';
import { FeatureContext } from '../../context/FeatureContext';
import allFeatures from '../../constants/allFeatures';

const EngagementDetailsPage = () => {
  const { userInfo } = React.useContext(FeatureContext);
  const { projectId } = useParams();
  const [engagementDetails, setEngagementDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (!userInfo?.featureAccess?.includes(allFeatures.read_engagement)) navigate('/users');

  useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_BY_ID_URL(projectId), {}, navigate)
      .then(response => {
        setEngagementDetails(response);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }, [projectId, navigate]);
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="engagement-container relative">
      <Header hasNav={true} />
      <EngagementDetails engagementDetails={engagementDetails ? engagementDetails : null} />
    </div>
  );
};

export default EngagementDetailsPage;
