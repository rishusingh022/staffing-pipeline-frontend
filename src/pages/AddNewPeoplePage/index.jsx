import React from 'react';
import './AddNewPeoplePage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import userImage from '../../assets/images/user-default.png';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
function AddNewPeoplePage() {
  const [activeTab, setActiveTab] = React.useState('skills');
  return (
    <div>
      <Header hasNav />
      <div className="add-new-people-container">
        <div className="add-new-people-upper-body">
          <div className="add-new-people-upper-body-left">
            <div className="add-new-people-upper-body-left-left">
              <Image imageUrl={userImage} altText="user" />
              <Button buttonText="Add New User" />
            </div>
            <div className="add-new-people-upper-body-left-right">
              <div className="new-people-fmno">
                <input type="text" placeholder="FMNO" />
              </div>
              <div className="new-people-name">
                <input type="text" placeholder="Name" />
              </div>
              <div className="new-people-position-office">
                <Dropdown dropdownName="Position" dropdownData={['CEO', 'CTO', 'CFO']} />
                <Dropdown dropdownName="Office" dropdownData={['Bangalore', 'Chennai', 'Hyderabad']} />
              </div>
              <div className="new-people-email">
                <input type="text" placeholder="Email" />
              </div>
              <div className="new-people-phone">
                <input type="text" placeholder="Phone" />
              </div>
            </div>
          </div>
          <div className="add-new-people-upper-body-right">
            <div className="add-new-people-engaement">
              <h3>Add Engagement</h3>
              <div className="add-new-people-enagenemnt-card">
                <div>+</div>
              </div>
            </div>
          </div>
        </div>
        <div className="add-user-professional-container">
          <div className="add-user-professional-nav">
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
          <div className="add-user-all-details-container">
            <div className="add-user-professional-info">
              {activeTab === 'skills' ? (
                <div className="add-user-professional-skills">
                  <p className="add-user-professional-info-title">Skills</p>
                  <table className="add-user-skills-table">
                    <thead>
                      <tr>
                        <th>Areas</th>
                        <th>Categories</th>
                        <th>Skills</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="add-skill-button">
                    <Button buttonText="Add Skill" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3"></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewPeoplePage;
