import React, { useState } from 'react';
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
import { RoleContext } from '../../context/RoleContext';
import SearchAndAdd from '../../components/SearchAndAdd';
import TechStack from '../../components/TechStack';

export default function AddEngagementPage() {
  const { userInfo } = React.useContext(RoleContext);
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [chargeCode, setChargeCode] = useState();
  const [handleNotification, setHandleNotification] = useState();
  const [engagementImage, setEngagementImage] = useState('');
  React.useEffect(() => {
    if (userInfo?.role !== 'pd') navigate('/users');
  }, []);
  const [technologies, setTechnologies] = useState([]);
  const [showAddTechnologyModal, setShowAddTechnologyModal] = useState(false);

  const handleImageChange = e => {
    console.log('e.target.files[0]', e.target.files[0]);
    setEngagementImage(e.target.files[0]);
  };

  const handleAddTechnology = item => {
    setTechnologies([...technologies, item.name]);
  };

  const handleCreateClick = async () => {
    if (projectName && startDate && endDate && selectedStatus && chargeCode && engagementImage !== '') {
      const formData = new FormData();
      formData.append('file', engagementImage);
      await makeRequest(
        UPLOAD_ENGAGEMENT_IMAGE_ROUTE,
        {
          data: formData,
        },
        navigate
      ).then(response => {
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
              image: response.imageUrl,
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
      });
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
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-6">
          <div className="flex image-style upper-container justify-between">
            <div className="flex left-upper gap-4">
              <div className="add-engagement-image-container">
                <Image
                  imageUrl={EngagementDefault}
                  altText="default"
                  hasOverlay
                  handleImageSelect={handleImageChange}
                />
                {engagementImage && <p>File selected: {engagementImage.name}</p>}
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
                    type="text"
                    placeholder="MM/DD/YYYY"
                    className="input-style w-32"
                    onChange={e => {
                      setStartDate(e.target.value);
                    }}
                  />
                  <p>:</p>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
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
            <Button buttonText="Upload" />
          </div>
        </div>
      </div>
      {showAddTechnologyModal && (
        <SearchAndAdd entity="skills" setIsOpen={setShowAddTechnologyModal} handleItem={handleAddTechnology} />
      )}
    </div>
  );
}
