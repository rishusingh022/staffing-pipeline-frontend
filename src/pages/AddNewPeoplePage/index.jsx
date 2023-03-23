/* eslint-disable no-unused-vars */
import React from 'react';
import './AddNewPeoplePage.css';
import Header from '../../components/Header';
import Image from '../../components/Image';
import userImage from '../../assets/images/user-default.png';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Notification from '../../components/Notification';
import makeRequest from '../../utils/makeRequest';
const { useNavigate } = require('react-router-dom');
import { CREATE_USER_DATA_URL, ADD_USER_SKILL_ROUTE, UPLOAD_USER_IMAGE_ROUTE } from '../../constants/apiEndpoints';
import { role } from '../../mocks/DropDownOptions';
import SearchAndAdd from '../../components/SearchAndAdd';
import { RoleContext } from '../../context/RoleContext';

function AddNewPeoplePage() {
  const { userInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('skills');
  const [fmno, setFmno] = React.useState('');
  const [name, setName] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [office, setOffice] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [handleNotification, setHandleNotification] = React.useState(false);
  const [showSkillModal, setShowSkillModal] = React.useState(false);
  const [setSkill, setSetSkill] = React.useState([]);
  const [userId, setUserId] = React.useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState('');
  const [imageNotification, setImageNotification] = React.useState(false);

  if (userInfo?.role !== 'pd') navigate('/users');

  const handleImageChange = async e => {
    await handleUserImageUpload(e.target.files[0]);
  };

  const handleUploadUserData = async imageUrl => {
    makeRequest(
      CREATE_USER_DATA_URL,
      {
        data: {
          name: name,
          email: email,
          fmno: fmno,
          caseStudyIds: [],
          skills: [],
          role: position,
          guild: null,
          image: imageUrl,
        },
      },
      navigate
    )
      .then(response => {
        setHandleNotification(true);
        setUserId(response.userId);
      })
      .catch(error => {
        console.log('Error while adding user', error);
      });
  };
  const handleUserImageUpload = async image => {
    const formData = new FormData();
    formData.append('file', image);
    makeRequest(UPLOAD_USER_IMAGE_ROUTE, {
      data: formData,
    })
      .then(response => {
        setUploadedImageUrl(response.imageUrl);
      })
      .catch(error => {
        console.log('Error while uploading image', error);
      });
  };

  const handleAddNewUser = async () => {
    if (name !== '' && email !== '' && fmno !== '' && position !== '' && uploadedImageUrl !== '') {
      await handleUploadUserData(uploadedImageUrl);
    } else {
      // alert('Please fill all the fields');
      setImageNotification(true);
    }
  };

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
      )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log('Error while adding user', error);
        }));
  };
  setTimeout(() => {
    setImageNotification(false);
  }, 2000);
  setTimeout(() => {
    if (handleNotification) {
      setHandleNotification(false);
    }
  }, 2000);
  return (
    <div>
      <Header hasNav />
      {handleNotification && (
        <Notification
          message="User successfully added"
          handleClose={() => {
            setHandleNotification(false);
          }}
          success
        />
      )}
      {imageNotification && (
        <Notification
          message="Please fill all the fields"
          handleClose={() => {
            setImageNotification(false);
          }}
        />
      )}
      <div className="add-new-people-container">
        <div className="add-new-people-upper-body">
          <div className="add-new-people-upper-body-left">
            <div className="add-new-people-upper-body-left-left">
              <Image
                imageUrl={uploadedImageUrl ? uploadedImageUrl : userImage}
                altText="user"
                hasOverlay
                handleImageSelect={handleImageChange}
              />
              <Button handleClick={handleAddNewUser} buttonText="Add New User" />
            </div>
            <div className="add-new-people-upper-body-left-right">
              <div className="new-people-fmno">
                <input
                  type="text"
                  placeholder="FMNO"
                  onChange={e => {
                    setFmno(e.target.value);
                  }}
                />
              </div>
              <div className="new-people-name">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="new-people-position-office">
                <Dropdown
                  dropdownName="Position"
                  dropdownData={role}
                  selectOption={position => {
                    setPosition(position.toLowerCase());
                  }}
                />
                {/* <Dropdown
                  dropdownName="Office"
                  dropdownData={['Bangalore', 'Gurgaon']}
                  selectOption={office => {
                    setOffice(office.toLowerCase());
                  }}
                /> */}
              </div>
              <div className="new-people-email">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {/* <div className="new-people-phone">
                <input
                  type="text"
                  placeholder="Phone"
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </div> */}
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
                  <Button buttonText="Add Skill" handleClick={() => setShowSkillModal(true)} />
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
}

export default AddNewPeoplePage;
