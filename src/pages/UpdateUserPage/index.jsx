import React from 'react';
import './UpdateUserPage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import DropDown from '../../components/Dropdown';
import { GoPlus } from 'react-icons/go';
import DefaultUser from '../../assets/images/user-default.png';
import EngagementCard from '../../components/EngagementCard';
import EngagementImage from '../../assets/images/engagement-default.png';

const UpdateUserPage = () => {
  const [activeTab, setActiveTab] = React.useState('skills');
  return (
    <div>
      <Header hasNav={true} />

      <div className="user-content">
        <div className="user-details">
          <div className="user-img">
            <Image hasOverlay={true} imageUrl={DefaultUser} altText="default-user" />
            <button className="update-profile-button">Update profile</button>
          </div>

          <div className="user-details-personal">
            <input className="user-input" type="text" placeholder="FMNO" />
            <input className="user-input" type="text" placeholder="Name" />
            <input className="user-input" type="text" placeholder="E-mail" />
            <div className="user-details-personal-dropdown">
              <DropDown dropdownName="Position" dropdownData={['Senior Engineer', 'Junior Engineer', 'Intern']} />
              <DropDown dropdownName="Office" dropdownData={['Bengaluru', 'Gurgaon']} />
            </div>
            <input className="user-input" type="text" placeholder="Phone" />
          </div>
        </div>

        <div className="user-engagements">
          <h1 className="text-3xl font-semibold">Current Engagements</h1>
          <div className="add-engagements">
            <GoPlus style={{ color: 'gray', fontSize: '50px', cursor: 'pointer' }} />
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
  );
};

export default UpdateUserPage;
