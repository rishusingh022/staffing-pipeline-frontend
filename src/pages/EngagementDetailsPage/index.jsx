import * as React from 'react';
import './EngagementDetailsPage.css';
import Header from '../../components/Header';
import EngagementDetails from '../../components/EngagementDetails';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_ENGAGEMENT_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';

const EngagementDetailsPage = () => {
  const { projectId } = useParams();
  const [engagementDetails, setEngagementDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_BY_ID_URL(projectId), {}, navigate).then(response => {
      setEngagementDetails(response.projectData);
      console.log('response', response);
    });
  }, [projectId, navigate]);

  return (
    <div className="engagement-container">
      <Header hasNav={true} />
      <EngagementDetails engagementDetails={engagementDetails ? engagementDetails : null} />
    </div>
  );
};

export default EngagementDetailsPage;
