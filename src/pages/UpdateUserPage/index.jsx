// makeRequest(GET_USER_DATA_BY_ID_URL('a90c610c-1bd5-40c4-8b01-fdd7708f3730'), {}, navigate).then(response => {
import React from 'react';
import './UpdateUserPage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import DropDown from '../../components/Dropdown';
import { GoPlus } from 'react-icons/go';
import DefaultUser from '../../assets/images/user-default.png';
// import EngagementCard from '../../components/EngagementCard';
// import EngagementImage from '../../assets/images/engagement-default.png';
import SearchAndAdd from '../../components/SearchAndAdd';
import { useState } from 'react';
import Notification from '../../components/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_USER_DATA_BY_ID_URL, UPLOAD_USER_IMAGE_ROUTE } from '../../constants/apiEndpoints';
import { UPDATE_USER_DATA_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import { RoleContext } from '../../context/RoleContext';

const UpdateUserPage = () => {
  const { userInfo } = React.useContext(RoleContext);

  const { userId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const data = {};
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [handleNotification, setHandleNotification] = useState(false);
  const handleImageChange = e => {
    setUserImage(e.target.files[0]);
  };
  // const [newSkill, setNewSkill] = useState({});

  React.useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate).then(response => {
      setUserDetails(response);
    });
  }, []);
  if (userInfo?.role !== 'pd' && userInfo?.userId !== userId) navigate(`/users/${userId}`);
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', userImage);
    return await makeRequest(
      UPLOAD_USER_IMAGE_ROUTE,
      {
        data: formData,
      },
      navigate
    );
  };
  const updateUser = async () => {
    if (userImage !== '') {
      const response = await uploadImage();
      data.image = response.imageUrl;
      handlClick();
    } else {
      handlClick();
    }
  };
  const handlClick = () => {
    makeRequest(UPDATE_USER_DATA_URL(userId), { data: data }, navigate);
    setHandleNotification(true);
  };

  return (
    <div>
      <Header hasNav={true} />
      {handleNotification && (
        <Notification
          message="User Updated Successfully"
          handleClose={() => {
            setHandleNotification(false);
          }}
          success={true}
        />
      )}
      <div className="user-content">
        <div className="user-details">
          <div className="user-img">
            <Image
              hasOverlay={true}
              imageUrl={DefaultUser}
              altText="default-user"
              handleImageSelect={handleImageChange}
            />
            <button className="update-profile-button" onClick={updateUser}>
              Update profile
            </button>
            {userImage && <p>File selected : {userImage.name}</p>}
          </div>

          <div className="user-details-personal">
            <input
              className="user-input"
              name="fmno"
              type="text"
              placeholder="FMNO"
              defaultValue={userDetails?.userData?.fmno}
              onChange={e => (data.fmno = e.target.value)}
            />
            <input
              className="user-input"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={userDetails?.userData?.name}
              onChange={e => (data.name = e.target.value)}
            />
            <input
              className="user-input"
              name="email"
              type="text"
              placeholder="E-mail"
              defaultValue={userDetails?.userData?.email}
              onChange={e => (data.email = e.target.value)}
            />
            <div className="user-details-personal-dropdown">
              <DropDown
                dropdownName={userDetails?.userData?.role}
                dropdownData={['Senior Engineer', 'Junior Engineer', 'Intern']}
                selectOption={optionName => {
                  data.role = optionName.toLowerCase();
                }}
              />
              <DropDown dropdownName="Office" dropdownData={['Bengaluru', 'Gurgaon']} selectOption={() => {}} />
            </div>
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
          {/* <p
            className={`professional-nav-item ${activeTab === 'past_engagements' && 'professional-nav-item-active'}`}
            onClick={() => setActiveTab('past_engagements')}>
            Past Studies
          </p> */}
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

                <div className="add-skill-container">
                  <button
                    className="add-skill-button"
                    onClick={() => {
                      setShowSkillModal(true);
                    }}>
                    Add Skill
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3">
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
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
      {showSkillModal && (
        <SearchAndAdd
          setIsOpen={setShowSkillModal}
          entity="skills"
          navigate={navigate}
          // setItem={setNewSkill}
        />
      )}
    </div>
  );
};

export default UpdateUserPage;
