import React from 'react';
import './UpdateUserPage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import DropDown from '../../components/Dropdown';
import { GoPlus } from 'react-icons/go';
import DefaultUser from '../../assets/images/user-default.png';
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
// eslint-disable-next-line no-unused-vars
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

  React.useEffect(() => {
    makeRequest(GET_USER_DATA_BY_ID_URL(userId), {}, navigate).then(response => {
      setUserDetails(response);
    });
  }, []);

  // React.useEffect(() => {
  //   console.log('checking.....');
  //   makeRequest(GET_USER_SKILL_ROUTE(userId), {}, navigate).then(response => {
  //     setSetSkill(response);
  //   });
  // });

  const handleAddNewSkill = async item => {
    setSetSkill([...setSkill, item]);
    console.log(item);
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
      )
        .then(response => {
          console.log('we got the response', response);
        })
        .catch(error => {
          console.log('Error while adding user', error);
        }));
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
                    {setSkill.map((skill, index) => {
                      return (
                        <tr key={index}>
                          <td>{skill.area}</td>
                          <td>{skill.category}</td>
                          <td>{skill.name}</td>
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
