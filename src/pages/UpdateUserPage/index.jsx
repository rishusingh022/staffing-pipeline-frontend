/* eslint-disable no-unused-vars */
import React from 'react';
import './UpdateUserPage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import DropDown from '../../components/Dropdown';
import { GoPlus } from 'react-icons/go';
import { TiDelete } from 'react-icons/ti';
import SearchAndAdd from '../../components/SearchAndAdd';
import { useState } from 'react';
import Notification from '../../components/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GET_USER_DATA_BY_ID_URL,
  UPLOAD_USER_IMAGE_ROUTE,
  UPDATE_USER_DATA_URL,
  ADD_USER_SKILL_ROUTE,
  GET_USER_SKILL_ROUTE,
  UPDATE_SELF_USER_DATA_URL,
  DELETE_USER_SKILL,
} from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import { FeatureContext } from '../../context/FeatureContext';
import PageLoader from '../../components/Spinner';
import allFeatures from '../../constants/allFeatures';
import EngagementHorizontalCard from '../../components/EngagementHorizontalCard';

const capitalizeFirstLetterOpt = role => {
  if (role) {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
  return '';
};
const UpdateUserPage = () => {
  const { userInfo } = React.useContext(FeatureContext);
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [setSkill, setSetSkill] = React.useState([]);
  const [handleNotification, setHandleNotification] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [skillNotAdded, setSkillNotAdded] = useState(false);
  // const [uploadedUserImage, setUploadedUserImage] = useState('');

  if (!userInfo?.featureAccess?.includes(allFeatures.edit_user) && userInfo?.userId !== userId)
    navigate(`/users/${userId}`);

  // state for placeholder
  const [currentFmno, setCurrentFmno] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  React.useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate).then(response => {
      setUserDetails(response);
      setCurrentFmno(response.userData.fmno);
      setCurrentName(response.userData.name);
      setCurrentEmail(response.userData.email);
      setCurrentImage(response.userData.image);
    });
  }, []);

  React.useEffect(() => {
    makeRequest(GET_USER_SKILL_ROUTE(userId), {}, navigate).then(response => {
      setSetSkill(response);
    });
  }, [userDetails]);

  const handleAddNewSkill = async item => {
    for (let skill of setSkill) {
      if (skill.skill === item.name) {
        setSkillNotAdded(true);
        return;
      }
    }
    if (userId) {
      const newSkill = await makeRequest(
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
      );
      console.log(newSkill);
      setSetSkill([...setSkill, newSkill]);
    }
  };

  const handleImageChange = e => {
    uploadImage(e.target.files[0]);
  };

  const uploadImage = async image => {
    const formData = new FormData();
    formData.append('file', image);
    setUploadingImage(true);
    makeRequest(
      UPLOAD_USER_IMAGE_ROUTE,
      {
        data: formData,
      },
      navigate
    ).then(response => {
      setUploadingImage(false);
      setCurrentImage(response.imageUrl);
    });
  };

  const updateUser = async () => {
    handleClick();
  };
  const handleClick = () => {
    if (userInfo?.userId === userId) {
      makeRequest(UPDATE_SELF_USER_DATA_URL(userId), { data: { image: currentImage } }, navigate).then(() => {
        setHandleNotification(true);
        setTimeout(() => {
          navigate(`/users/${userId}`);
        }, 1000);
      });
      return;
    }
    const updatedUser = {
      fmno: currentFmno,
      name: currentName,
      email: currentEmail,
      image: currentImage,
    };
    makeRequest(UPDATE_USER_DATA_URL(userId), { data: updatedUser }, navigate).then(() => {
      setHandleNotification(true);
      setTimeout(() => {
        navigate(`/users/${userId}`);
      }, 1000);
    });
  };
  const handleDeleteSkill = async skill => {
    const skillId = skill.skillId;
    console.log('handleDeleteSkill called', skill);
    const filteredSkills = setSkill.filter(skill => {
      return skill.skillId !== skillId;
    });
    setSetSkill(filteredSkills);
    await makeRequest(DELETE_USER_SKILL(userId), { data: { skillId } }, () => {});
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
      {skillNotAdded && (
        <Notification
          message="Skill already exits"
          handleClose={() => {
            setSkillNotAdded(false);
          }}
          success={false}
        />
      )}
      <div className="user-content">
        <div className="user-details">
          <div className="user-img">
            {!uploadingImage ? (
              <Image
                hasOverlay={true}
                imageUrl={currentImage ? currentImage : userDetails?.userData?.image}
                altText="default-user"
                handleImageSelect={handleImageChange}
              />
            ) : (
              <div className="container">
                <div className="loader-container">
                  <PageLoader />
                </div>
              </div>
            )}
            <button className="update-profile-button" onClick={updateUser}>
              Update profile
            </button>
          </div>
          <div className="user-details-personal-details">
            <div>
              <p className="user-name">{userDetails?.userData?.name}</p>
            </div>
            <div className="user-contact-details">
              <p>{capitalizeFirstLetterOpt(userDetails?.userData?.role)} | Bengaluru - Brigade Center</p>
              <p>Email: {userDetails?.userData?.email}</p>
            </div>
          </div>
        </div>

        <div className="user-engagements">
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
                      <th className="right-aligned">{'    '}</th>
                    </tr>
                    {setSkill?.map((skill, index) => {
                      return (
                        <tr key={index}>
                          <td>{skill.area}</td>
                          <td>{skill.category}</td>
                          <td>{skill.skill}</td>
                          <td className="delete">
                            <TiDelete
                              style={{ fontSize: '30px', alignContent: 'flex-end' }}
                              onClick={() => {
                                handleDeleteSkill(skill);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </thead>
                </table>

                <div className="add-skill-container mb-3">
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
      {showSkillModal && <SearchAndAdd setIsOpen={setShowSkillModal} handleItem={handleAddNewSkill} entity="skills" />}
    </div>
  );
};

export default UpdateUserPage;
