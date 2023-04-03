import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Image from '../../components/Image';
import EngagementDefault from '../../assets/images/engagement-default.png';
import './AddEngagement.css';
import Dropdown from '../../components/Dropdown';
import { statusOptions } from '../../mocks/DropDownOptions';
import { BiPlus } from 'react-icons/bi';
import Button from '../../components/Button';
import parseDate from '../../utils/common/parseDate';
import makeRequest from '../../utils/makeRequest';
import { CREATE_ENGAGEMENT_DATA_URL, UPLOAD_ENGAGEMENT_IMAGE_ROUTE } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import { FeatureContext } from '../../context/FeatureContext';
import SearchAndAdd from '../../components/SearchAndAdd';
import TechStack from '../../components/TechStack';
import PageLoader from '../../components/Spinner';
import allFeatures from '../../constants/allFeatures';

export default function AddEngagementPage() {
  const { userInfo } = React.useContext(FeatureContext);
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [chargeCode, setChargeCode] = useState();
  const [handleNotification, setHandleNotification] = useState();
  const [technologies, setTechnologies] = useState([]);
  const [showAddTechnologyModal, setShowAddTechnologyModal] = useState(false);
  const [uploadedEngagementImage, setUploadedEngagementImage] = useState('');
  const [imageNotification, setImageNotification] = useState(false);
  const [dateNotification, setDateNotification] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!userInfo?.featureAccess.includes(allFeatures.create_engagement)) {
      if (userInfo?.featureAccess.includes(allFeatures.read_engagement)) navigate('/projects');
    } else {
      navigate('/users');
    }
  }, [userInfo, navigate]);

  const handleImageChange = e => {
    setUploadingImage(true);
    handleEngagementImageUpload(e.target.files[0]);
  };

  const handleAddTechnology = item => {
    setTechnologies([...technologies, item.name]);
  };

  const handleEngagementImageUpload = async image => {
    const formData = new FormData();
    formData.append('file', image);
    setUploadingImage(true);
    await makeRequest(
      UPLOAD_ENGAGEMENT_IMAGE_ROUTE,
      {
        data: formData,
      },
      navigate
    ).then(response => {
      setUploadingImage(false);
      setUploadedEngagementImage(response.imageUrl);
    });
  };

  const handleUploadEngagementData = async () => {
    if (uploadedEngagementImage === '') {
      setImageNotification(true);
      return;
    }
    makeRequest(
      CREATE_ENGAGEMENT_DATA_URL,
      {
        data: {
          name: projectName,
          startDate: parseDate(startDate),
          endDate: parseDate(endDate),
          status: selectedStatus,
          chargeCode,
          caseStudyIds: [],
          skills: technologies,
          guild: 'swe',
          image: uploadedEngagementImage,
        },
      },
      navigate
    )
      .then(response => {
        setHandleNotification(true);
        setTimeout(() => {
          navigate(`/projects/${response.engagementId}`);
        }, 1000);
      })
      .catch(error => {
        console.log('Error while adding engagement', error);
      });
  };
  setTimeout(() => {
    if (imageNotification) setImageNotification(false);
  }, 2000);
  setTimeout(() => {
    if (handleNotification) {
      setHandleNotification(false);
    }
  }, 2000);
  const handleCreateClick = async () => {
    if (projectName && startDate && endDate && selectedStatus && chargeCode) {
      if (new Date(parseDate(startDate)).getTime() > new Date(parseDate(endDate)).getTime()) {
        setDateNotification(true);
        return;
      }
      handleUploadEngagementData();
    } else {
      setFieldError(true);
    }
  };
  return (
    <div className="bg-gray-200">
      <Header hasNav />
      {handleNotification && (
        <Notification
          message="Engagement successfully added"
          handleClose={() => {
            setHandleNotification(false);
          }}
          success
        />
      )}
      {fieldError && (
        <Notification
          message="Please fill all the fields"
          handleClose={() => {
            setFieldError(false);
          }}
          success={false}
        />
      )}
      {imageNotification && (
        <Notification
          message="Providing an image is mandatory"
          handleClose={() => {
            setImageNotification(false);
          }}
        />
      )}
      {dateNotification && (
        <Notification
          message="Start date cannot be after end date"
          handleClose={() => {
            setDateNotification(false);
          }}
        />
      )}
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex image-style upper-container justify-between">
            <div className="flex left-upper gap-4">
              <div className="add-engagement-image-container">
                {!uploadingImage ? (
                  <Image
                    imageUrl={uploadedEngagementImage ? uploadedEngagementImage : EngagementDefault}
                    altText="default"
                    hasOverlay
                    handleImageSelect={handleImageChange}
                  />
                ) : (
                  <div className="container">
                    <div className="loader-container">
                      <PageLoader />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 add-engagement-form-container">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="input-style"
                  onChange={e => {
                    setProjectName(e.target.value);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="input-style w-32"
                    onChange={e => {
                      setStartDate(e.target.value);
                    }}
                  />
                  <p>:</p>
                  <input
                    type="date"
                    className="input-style w-32"
                    onChange={e => {
                      setEndDate(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Charge Code"
                  className="input-style w-32"
                  onChange={e => {
                    setChargeCode(e.target.value);
                  }}
                />
                <Dropdown
                  dropdownName="Status"
                  dropdownData={statusOptions}
                  selectOption={option => {
                    setSelectedStatus(option.toLowerCase());
                  }}
                />
                <div className="flex justify-between w-32 text-gray-400 px-2 border-black border h-8 items-center">
                  <p>Tags</p>
                  <p>+</p>
                </div>
              </div>
            </div>
            <Button buttonText="Create" handleClick={handleCreateClick} />
          </div>
          <div className="mid-container grid grid-cols-2 gap-12">
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">Team Members</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="people-card-container-add">
                <div className="user-card-add">
                  <BiPlus size={24} />
                </div>
              </div>
            </div>
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">Technology</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="tech-card-container-add">
                {technologies?.map((data, index) => (
                  <TechStack key={index} techName={data} />
                ))}
                <div className="tech-card-add">
                  <p
                    className="px-4 font-semibold text-gray-400 cursor-pointer"
                    onClick={() => setShowAddTechnologyModal(true)}>
                    Add +
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 case-study-container-add-engagement">
            <p className="font-bold text-2xl">Case Studies & Knowledge Materials</p>
            <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
            {/* <Button buttonText="Upload" /> */}
          </div>
        </div>
      </div>
      {showAddTechnologyModal && (
        <SearchAndAdd entity="skills" setIsOpen={setShowAddTechnologyModal} handleItem={handleAddTechnology} />
      )}
    </div>
  );
}
