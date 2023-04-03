import './PeopleDetailsPage.css';
import { Header } from '../../components';
// import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import EngagementHorizontalCard from '../../components/EngagementHorizontalCard';
import EngagementCard from '../../components/EngagementCard';
import { GET_USER_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import PageLoader from '../../components/Spinner';
import { FeatureContext } from '../../context/FeatureContext';
import capitalizeFirstLetter from '../../utils/common/stringUtil';
import { formatDate } from '../../utils/dateTime';
import allFeatures from '../../constants/allFeatures';

const PeopleDetailsPage = () => {
  const { userInfo } = React.useContext(FeatureContext);
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [userData, setUserData] = useState({});
  const [userSkills, setUserSkills] = useState([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const [isLoading, setIsLoading] = useState(true);
  const handleUpdateUser = () => {
    navigate(`/users/${userId}/edit`);
  };
  useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate)
      .then(response => {
        setUserDetails(response);
        setUserData(response.userData);
        setUserSkills(response.userSkills);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  }, [userId, navigate]);
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div>
      <Header hasNav={true} />
      <div className="user-details-page">
        <div className="user-personal-card">
          <div className="user-image-container">
            <img src={userDetails?.userData?.image} className="user-image"></img>
            {(userInfo?.featureAccess.includes(allFeatures.edit_user) || userInfo?.userId === userId) && (
              <Button buttonText="Update Profile" handleClick={handleUpdateUser} />
            )}
          </div>
          <div className="user-details-main">
            <div>
              <p className="user-fmno">FMNO: {userDetails?.userData?.fmno}</p>
              <p className="user-name">{userDetails?.userData?.name}</p>
            </div>
            <div className="user-contact-details">
              <p>{capitalizeFirstLetter(userData.role)} | Bengaluru - Brigade Center</p>
              <p>Email: {userDetails?.userData?.email}</p>
            </div>
          </div>
          <div className="user-current-engagement">
            <p className="current-engagement-title">Current Engagement</p>
            <div className="max-h-40 overflow-auto pr-4 flex flex-col gap-4">
              {userDetails?.currentEngagements?.length === 0 ? (
                <p className="no-engagement-text">No current engagements</p>
              ) : (
                userDetails?.currentEngagements?.map((engagement, index) => {
                  return (
                    <EngagementHorizontalCard
                      key={index}
                      engagementId={engagement.engagementId}
                      engagementTitle={engagement.name}
                      engagementImage={engagement.image}
                      knowMore
                    />
                  );
                })
              )}
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
                      {userSkills.map((skill, index) => {
                        return (
                          <tr key={index}>
                            <td>{skill.area}</td>
                            <td>{skill.category}</td>
                            <td>{skill.skill}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  {userDetails?.pastEngagements?.length === 0 ? (
                    <p className="no-engagement-text pt-10">No past engagements</p>
                  ) : (
                    <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3">
                      {userDetails?.pastEngagements?.map((engagement, index) => {
                        return (
                          <EngagementCard
                            key={index}
                            name={engagement.name}
                            imageUrl={engagement.image}
                            identityNumber={engagement.engagementId}
                            startDate={formatDate(engagement.startDate)}
                            status={engagement.status}
                          />
                        );
                      })}
                    </div>
                  )}
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
