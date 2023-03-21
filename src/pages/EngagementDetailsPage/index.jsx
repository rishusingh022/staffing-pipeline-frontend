import * as React from 'react';
import './EngagementDetailsPage.css';
import Header from '../../components/Header';
import EngagementDetails from '../../components/EngagementDetails';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_ENGAGEMENT_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import PageLoader from '../../components/Spinner';
import { RoleContext } from '../../context/RoleContext';

const EngagementDetailsPage = () => {
  const { userInfo } = React.useContext(RoleContext);
  const { projectId } = useParams();
  const [engagementDetails, setEngagementDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.role !== 'pd') navigate('/users');
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
