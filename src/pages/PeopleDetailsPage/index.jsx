import './PeopleDetailsPage.css';
import { Header } from '../../components';
// import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserImage from '../../assets/images/user-default.png';
import Button from '../../components/Button';
import EngagementHorizontalCard from '../../components/EngagementHorizontalCard';
import EngagementCard from '../../components/EngagementCard';
import EngagementImage from '../../assets/images/engagement-default.png';
import { GET_USER_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';

const PeopleDetailsPage = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate).then(response => {
      setUserDetails(response);
      console.log('response', userDetails);
    });
  }, [userId, navigate]);

  return (
    <div>
      <Header hasNav={true} />
      <div className="user-details-page">
        <div className="user-personal-card grid grid-cols-3">
          <div className="user-image-container">
            <img src={UserImage} className="user-image"></img>
            <Button buttonText="Update Profile" handleClick={() => {}} />
          </div>
          <div className="user-details">
            <p className="user-fmno">FMNO: 123456</p>
            <p className="user-name">ABC</p>
            <div className="user-contact-details">
              <p>Software Engineering Intern | Bengaluru - Brigade Center</p>
              <p>Email: abc@mckinsey.com</p>
              <p>Phone: +91 9876543211</p>
            </div>
          </div>
          <div className="user-current-engagement">
            <p className="current-engagement-title">Current Engagement</p>
            <div>
              <EngagementHorizontalCard
                engagementId={'123456'}
                engagementTitle={'Project'}
                engagementImage={EngagementImage}
              />
            </div>
          </div>
        </div>
        <div className="user-professional-container">
          <div className="user-professional-nav">
            <p
              className={`professional-nav-item ${activeTab === 'skills' && 'professional-nav-item-active'}`}
              onClick={() => setActiveTab('skills')}>
              Professional Information
            </p>
            <p
              className={`professional-nav-item ${activeTab === 'past_engagements' && 'professional-nav-item-active'}`}
              onClick={() => setActiveTab('past_engagements')}>
              Past Studies
            </p>
          </div>
          <div className="user-all-details-container">
            <div className="user-professional-info">
              {activeTab === 'skills' ? (
                <div className="user-professional-skills">
                  <p className="user-professional-info-title">Skills</p>
                  <table className="user-skills-table">
                    <thead>
                      <tr>
                        <th>Areas</th>
                        <th>Categories</th>
                        <th>Skills</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SW & Cloud Engg</td>
                        <td>Architecture</td>
                        <td>APIs Asynchronous Messaging, Monitoring.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3">
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                    <EngagementCard
                      name="Project"
                      imageUrl={EngagementImage}
                      identityNumber="123456"
                      startDate="12/2/2023"
                      status="completed"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PeopleDetailsPage;
