import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Image from '../../components/Image';
import './EditEngagementDetails.css';
import Dropdown from '../../components/Dropdown';
import HorizontalCaseStudyCards from '../../components/HorizontalCaseStudyCards';
import PeopleHorizontalCard from '../../components/PeopleHorizontalCard';
import TechStack from '../../components/TechStack';
import { BiPlus } from 'react-icons/bi';
import Button from '../../components/Button';
import PageLoader from '../../components/Spinner';
import { useParams } from 'react-router';
import {
  GET_ENGAGEMENT_DATA_BY_ID_URL,
  UPDATE_ENGAGEMENT_DATA_URL,
  UPLOAD_ENGAGEMENT_IMAGE_ROUTE,
} from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateTime';
import { statusOptions } from '../../mocks/DropDownOptions';
import parseDate from '../../utils/common/parseDate';
import Notification from '../../components/Notification';
import SearchAndAdd from '../../components/SearchAndAdd';
import { RoleContext } from '../../context/RoleContext';
import capitalizeFirstLetter from '../../utils/common/stringUtil';

export default function EditEngagementDetailsPage() {
  const { userInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [engagementDetails, setEngagementDetails] = useState({});
  const [handleNotification, setHandleNotification] = useState(false);
  const [showTechnologyModal, setShowTechnologyModal] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [uploadedEngagementImage, setUploadedEngagementImage] = useState('');

  // const [engagementImage, setEngagementImage] = useState('');
  // use state for current engagement details
  const [currentEngagementName, setCurrentEngagementName] = useState('');
  const [currentEngagementChargeCode, setCurrentEngagementChargeCode] = useState('');
  const [currentEngagementStartDate, setCurrentEngagementStartDate] = useState('');
  const [currentEngagementEndDate, setCurrentEngagementEndDate] = useState('');
  const [currentEngagementStatus, setCurrentEngagementStatus] = useState('');
  const [currentEngagementTechnologies, setCurrentEngagementTechnologies] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  if (userInfo?.role !== 'pd') navigate('/users');

  const handleImageChange = async e => {
    await uploadImage(e.target.files[0]);
  };
  const data = {};
  const uploadImage = async image => {
    const formData = new FormData();
    setUploadingImage(true);
    formData.append('file', image);
    await makeRequest(
      UPLOAD_ENGAGEMENT_IMAGE_ROUTE,
      {
        data: formData,
      },
      navigate
    ).then(response => {
      setUploadedEngagementImage(response.imageUrl);
      setUploadingImage(false);
    });
  };
  const updateEngagementData = async imageUrl => {
    makeRequest(
      UPDATE_ENGAGEMENT_DATA_URL(projectId),
      {
        data: {
          image: imageUrl,
          name: currentEngagementName,
          chargeCode: currentEngagementChargeCode,
          startDate: parseDate(currentEngagementStartDate),
          endDate: parseDate(currentEngagementEndDate),
          status: currentEngagementStatus.toLowerCase(),
          skills: currentEngagementTechnologies,
        },
      },
      navigate
    ).then(response => {
      console.log(response);
      setHandleNotification(true);
      setTimeout(() => {
        navigate(`/projects/${response.engagementId}`);
      }, 1000);
    });
  };
  const updateEngagement = async () => {
    data.skills = [...technologies];
    if (uploadedEngagementImage) {
      await updateEngagementData(uploadedEngagementImage);
    } else {
      await updateEngagementData(engagementDetails?.projectData?.image);
    }
  };

  const handleNewTechnology = item => {
    if (!engagementDetails?.projectData?.skills.includes(item.name)) {
      setTechnologies([...engagementDetails.projectData.skills, item.name]);
      engagementDetails.projectData.skills.push(item.name);
      setEngagementDetails({ ...engagementDetails });
    }
  };
  useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_BY_ID_URL(projectId), {}, navigate).then(response => {
      setEngagementDetails(response);
      setCurrentEngagementName(response?.projectData?.name);
      setCurrentEngagementChargeCode(response?.projectData?.chargeCode);
      setCurrentEngagementStartDate(formatDate(response?.projectData?.startDate));
      setCurrentEngagementEndDate(formatDate(response?.projectData?.endDate));
      setCurrentEngagementStatus(response?.projectData?.status);
      setCurrentEngagementTechnologies(response?.projectData?.skills);
    });
  }, []);
  return (
    <div className="bg-gray-200">
      <Header hasNav />
      {handleNotification && (
        <Notification
          message="Engagement Updated Successfully"
          handleClose={() => {
            setHandleNotification(false);
          }}
          success={true}
        />
      )}
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-4">
          <div className="flex image-style upper-container justify-between">
            <div className="flex">
              {!uploadingImage ? (
                <Image
                  imageUrl={uploadedEngagementImage ? uploadedEngagementImage : engagementDetails?.projectData?.image}
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

              <div className="ml-4 my-4 flex flex-col gap-2 engagement-form-container">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="input-style"
                  defaultValue={engagementDetails?.projectData?.name}
                  onChange={e => {
                    setCurrentEngagementName(e.target.value);
                  }}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="input-style w-36"
                    defaultValue={
                      formatDate(currentEngagementStartDate) === 'NaN/NaN/NaN'
                        ? ''
                        : formatDate(currentEngagementStartDate)
                    }
                    onChange={e => {
                      setCurrentEngagementStartDate(e.target.value);
                    }}
                  />
                  <p>:</p>
                  <input
                    type="text"
                    placeholder="End Date"
                    className="input-style w-36"
                    defaultValue={
                      formatDate(currentEngagementEndDate) === 'NaN/NaN/NaN' ? '' : formatDate(currentEngagementEndDate)
                    }
                    onChange={e => {
                      setCurrentEngagementEndDate(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Charge Code"
                  className="input-style w-36"
                  defaultValue={engagementDetails?.projectData?.chargeCode}
                  onChange={e => {
                    setCurrentEngagementChargeCode(e.target.value);
                  }}
                />

                <Dropdown
                  dropdownName={
                    engagementDetails?.projectData?.status &&
                    capitalizeFirstLetter(engagementDetails?.projectData?.status)
                  }
                  dropdownData={statusOptions}
                  selectOption={optionName => {
                    setCurrentEngagementStatus(optionName);
                  }}
                />
                <div className="flex justify-between w-36 text-gray-400 px-2 border-black border items-center h-8">
                  <p>Tags</p>
                  <p>+</p>
                </div>
                {/* <div className="flex gap-2">
                  <div className="rounded-xl bg-black text-white w-20 text-xs py-1 text-center">Front-End</div>
                  <div className="rounded-xl bg-black text-white w-20 text-xs py-1 text-center">Back-End</div>
                </div> */}
              </div>
            </div>
            <Button buttonText={'Update'} handleClick={updateEngagement} />
          </div>
          <div className="mid-container grid grid-cols-2 gap-8">
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex justify-between">
                <p className="font-bold text-2xl">Team Members</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="people-card-container">
                {engagementDetails?.usersInEngagement?.map((data, index) => (
                  <PeopleHorizontalCard
                    key={index}
                    userFMNO={data.fmno}
                    userId={data.userId}
                    userName={data.name}
                    userImage={data.image}
                    userPosition={data.role}
                    userOffice="Bangalore"
                    knowMore={true}
                  />
                ))}
                <div className="update-user-card cursor-pointer">
                  <BiPlus size={24} />
                </div>
              </div>
            </div>
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex justify-between">
                <p className="font-bold text-2xl">Technology</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="tech-card-container">
                {engagementDetails?.projectData?.skills?.map((data, index) => (
                  <TechStack key={index} techName={data} />
                ))}
                <div
                  className="add-tech-card"
                  onClick={() => {
                    setShowTechnologyModal(true);
                  }}>
                  <p className="px-4 font-semibold text-gray-400 cursor-pointer">Add +</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 case-study-container-update-engagement">
            <p className="font-bold text-2xl">Case Studies & Knowledge Materials</p>
            <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
            {engagementDetails?.caseStudiesInEngagement?.map((caseStudy, index) => (
              <HorizontalCaseStudyCards
                key={index}
                caseStudyName={caseStudy.name}
                caseStudyImage={caseStudy.image}
                caseStudyDate={caseStudy.createdAt}
                boxLink={caseStudy.boxLink}
              />
            ))}
            {/* <Button buttonText="Upload" /> */}
          </div>
        </div>
      </div>
      {showTechnologyModal && (
        <SearchAndAdd
          setIsOpen={setShowTechnologyModal}
          entity="skills"
          navigate={navigate}
          handleItem={handleNewTechnology}
        />
      )}
    </div>
  );
}
