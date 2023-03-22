import React from 'react';
import './UpdateUserPage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import DropDown from '../../components/Dropdown';
import { GoPlus } from 'react-icons/go';
import SearchAndAdd from '../../components/SearchAndAdd';
import { useState } from 'react';
import Notification from '../../components/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_USER_DATA_BY_ID_URL,
  UPLOAD_USER_IMAGE_ROUTE,
  UPDATE_USER_DATA_URL,
  ADD_USER_SKILL_ROUTE,
} from '../../constants/apiEndpoints';
import { GET_USER_SKILL_ROUTE } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import { RoleContext } from '../../context/RoleContext';

const UpdateUserPage = () => {
  const { userInfo } = React.useContext(RoleContext);

  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const data = {};
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [setSkill, setSetSkill] = React.useState([]);
  const [userImage, setUserImage] = useState('');
  const [handleNotification, setHandleNotification] = useState(false);

  // state for placeholder
  const [currentFmno, setCurrentFmno] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmai] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  React.useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate).then(response => {
      setUserDetails(response);
      setCurrentFmno(response.userData.fmno);
      setCurrentName(response.userData.name);
      setCurrentEmai(response.userData.email);
      setCurrentRole(response.userData.role);
      setCurrentImage(response.userData.image);
      console.log(userDetails);
    });
  }, []);

  React.useEffect(() => {
    makeRequest(GET_USER_SKILL_ROUTE(userId), {}, navigate).then(response => {
      setSetSkill(response);
    });
  }, [userDetails]);

  const handleAddNewSkill = async item => {
    setSetSkill([...setSkill, item]);
    userId &&
      (await makeRequest(
        ADD_USER_SKILL_ROUTE(userId),
        {
          data: {
            area: `${item.area}`,
            category: `${item.category}`,
            skill: `${item.name}`,
          },
          params: {
            userId: userId,
          },
        },
        navigate
      ));
  };

  const handleImageChange = e => {
    setUserImage(e.target.files[0]);
  };

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
      setCurrentImage(response.imageUrl);
      handleClick(response.imageUrl);
    } else {
      handleClick();
    }
  };
  const handleClick = async Image => {
    makeRequest(
      UPDATE_USER_DATA_URL(userId),
      {
        data: {
          fmno: currentFmno,
          name: currentName,
          email: currentEmail,
          image: Image ? Image : currentImage,
        },
      },
      navigate
    ).then(response => {
      setHandleNotification(true);
      setTimeout(() => {
        navigate(`/users/${response.userId}`);
      }, 1000);
    });
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
              imageUrl={userDetails?.userData?.image}
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
              defaultValue={currentFmno}
              onChange={e => {
                data.fmno = e.target.value;
                setCurrentFmno(e.target.value);
              }}
            />
            <input
              className="user-input"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={currentName}
              onChange={e => {
                data.name = e.target.value;
                setCurrentName(e.target.value);
              }}
            />
            <input
              className="user-input"
              name="email"
              type="text"
              placeholder="E-mail"
              defaultValue={currentEmail}
              onChange={e => {
                data.email = e.target.value;
                setCurrentEmai(e.target.value);
              }}
            />
            <div className="user-details-personal-dropdown">
              <DropDown
                dropdownName={currentRole}
                dropdownData={['intern', 'junior engineer', 'engineer 1', 'engineer 2', 'unspecified', 'pd']}
                selectOption={optionName => {
                  data.role = optionName.toLowerCase();
                  setCurrentRole(optionName.toLowerCase());
                }}
              />
              <DropDown dropdownName="Bengaluru" dropdownData={['Bengaluru', 'Gurgaon']} selectOption={console.log} />
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
        </div>
        <div className="user-all-details-container">
          <div className="user-professional-info">
            {activeTab === 'skills' ? (
              <div className="user-professional-skills">
                <p className="user-professional-info-title">Skills</p>
                <table className="add-user-skills-table">
                  <thead>
                    <tr>
                      <th>Areas</th>
                      <th>Categories</th>
                      <th>Skills</th>
                    </tr>
                    {setSkill?.map((skill, index) => {
                      return (
                        <tr key={index}>
                          <td>{skill.area}</td>
                          <td>{skill.category}</td>
                          <td>{skill.skill}</td>
                        </tr>
                      );
                    })}
                  </thead>
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
              <></>
            )}
          </div>
        </div>
      </div>
      {showSkillModal && (
        <SearchAndAdd
          setIsOpen={setShowSkillModal}
          handleItem={handleAddNewSkill}
          navigate={navigate}
          entity="skills"
        />
      )}
    </div>
  );
};

export default UpdateUserPage;
