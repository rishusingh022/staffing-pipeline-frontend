/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './engagementDetails.css';
import Image from '../Image';
import Button from '../Button';
import Dropdown from '../Dropdown';
import { teamMembersoption } from '../../mocks/DropDownOptions';
import TechStack from '../TechStack';
import PropTypes from 'prop-types';
import DefaultImage from '../../assets/images/engagement-default.png';
import PeopleHorizontalCard from '../PeopleHorizontalCard';
import HorizontalCaseStudyCards from '../HorizontalCaseStudyCards';
import CaseStudyModal from '../CaseStudyModal';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateTime';
import { GET_USERS_INVOLVED_IN_ENGAGEMENT, CURRENT_USER_IN_ENGAGEMENTS } from '../../constants/apiEndpoints';
import capitalizeFirstLetter from '../../utils/common/stringUtil';
import makeRequest from '../../utils/makeRequest';
import allFeatures from '../../constants/allFeatures';
import { FeatureContext } from '../../context/FeatureContext';
export default function EngagementDetails({ engagementDetails }) {
  const { userInfo } = React.useContext(FeatureContext);
  const engagementId = engagementDetails.projectData.engagementId;
  const [isOpen, setIsOpen] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [pastUsers, setPastUsers] = useState([]);
  const [isCurrentUsers, setIsCurrentUsers] = useState(true);

  useEffect(() => {
    makeRequest(CURRENT_USER_IN_ENGAGEMENTS(engagementId), {}, navigate).then(response => {
      setCurrentUsers(response);
    });
  }, []);

  const handleCurrentUsers = async () => {
    await makeRequest(CURRENT_USER_IN_ENGAGEMENTS(engagementId), {}, navigate).then(response => {
      setCurrentUsers(
        response.map(data => {
          return data;
        })
      );
    });
    setIsCurrentUsers(true);
  };

  const handlePastUsers = async () => {
    await makeRequest(GET_USERS_INVOLVED_IN_ENGAGEMENT(engagementId), {}, navigate).then(response => {
      setPastUsers(
        response.map(data => {
          return data;
        })
      );
    });
    setPastUsers(prev => prev.filter(user => !currentUsers.find(x => x.userId === user.userId)));
    setIsCurrentUsers(false);
    console.log(isCurrentUsers);
  };

  const navigate = useNavigate();
  return (
    <div className="container-div">
      <div className="project-container">
        <div className="image-container">
          <Image
            imageUrl={engagementDetails?.projectData?.image ? engagementDetails?.projectData?.image : DefaultImage}
            altText={'test-image'}
          />
        </div>
        <div className="detail-container">
          <div className="project-details">
            <div className="project-name-update">
              <p className="project-text">{engagementDetails?.projectData?.name}</p>
              {userInfo?.featureAccess?.includes(allFeatures.edit_engagement) && (
                <Button buttonText={'Update Project'} handleClick={() => navigate('edit')} />
              )}
            </div>

            <div className="id-container">
              <p className="text-sm text-gray-500">Charge Code: {engagementDetails?.projectData?.chargeCode}</p>
            </div>
            <table>
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Start Date:</td>
                  <td>
                    {engagementDetails?.projectData?.startDate
                      ? formatDate(engagementDetails?.projectData?.startDate)
                      : null}
                  </td>
                </div>
              </tr>

              <tr>
                <div className="date-container">
                  <td className="table-row-item">End Date:</td>
                  <td>
                    {engagementDetails?.projectData?.endDate
                      ? formatDate(engagementDetails?.projectData?.endDate)
                      : null}
                  </td>
                </div>
              </tr>
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Status:</td>
                  <td className="text-blue-600">
                    {engagementDetails?.projectData?.status &&
                      capitalizeFirstLetter(engagementDetails?.projectData?.status)}
                  </td>
                </div>
              </tr>
              {/* <tr>
                <div className="date-container">
                  <td className="table-row-item">Tags:</td>
                  <td>{engagementDetails?.projectData?.tags && `#${engagementDetails?.projectData?.tags}`}</td>
                </div>
              </tr> */}
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Sector:</td>
                  <td className="text-gray-500">{engagementDetails?.projectData?.sector?.name}</td>
                </div>
              </tr>
              {engagementDetails?.projectData?.sub_sector && (
                <tr>
                  <div className="date-container">
                    <td className="table-row-item">Sub Sector:</td>
                    <td className="text-gray-500">{engagementDetails?.projectData?.sub_sector?.name}</td>
                  </div>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="team-members-container grid grid-cols-2 gap-2">
        <div className="team-members">
          <div className="team-member-title grid grid-cols-2 gap-2">
            <div className="title-box">Team Members</div>
            <div className="user-dropdown">
              <Dropdown
                dropdownName="Current members"
                dropdownData={teamMembersoption}
                selectOption={option => {
                  if (option === 'Current members') {
                    handleCurrentUsers();
                  } else if (option === 'Past members') {
                    handlePastUsers();
                  }
                }}
              />
            </div>
          </div>
          <div className="team-member-detail">
            {(isCurrentUsers ? currentUsers : pastUsers)?.length === 0 && <p>No Teams Members found</p>}
            {(isCurrentUsers ? currentUsers : pastUsers)?.map((data, index) => (
              <PeopleHorizontalCard
                key={index}
                userFMNO={data.fmno}
                userId={data.userId}
                userName={data.name}
                userPosition={data.role}
                userOffice="Bangalore"
                userImage={data.image}
                knowMore={true}
              />
            ))}
          </div>
        </div>

        <div className="technology">
          <div className="technology-title">
            <div className="title-box">Technology</div>
            <div>
              <Dropdown dropdownName="All" dropdownData={[]} />
            </div>
          </div>
          <div className="tech-stack grid grid-cols-2">
            {engagementDetails?.projectData?.skills?.map((data, index) => (
              <TechStack key={index} techName={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="case-study-container">
        <div className="case-study-title">Case Studies & Knowledge Materials</div>
        {/* <div className="case-dropdown">
          <Dropdown dropdownName="All" />
        </div> */}
        <div className="case-study-comp">
          {engagementDetails?.caseStudiesInEngagement?.length === 0 && <p>No Case Studies are uploaded</p>}
          {engagementDetails?.caseStudiesInEngagement?.map((data, index) => (
            <HorizontalCaseStudyCards
              key={index}
              caseStudyImage={data.image}
              caseStudyName={data.name}
              caseStudyDate={data.createdAt}
              boxLink={data.boxLink}
            />
          ))}
        </div>
        {/* <div className="case-study-button">
          <Button
            buttonText={'Upload'}
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div> */}
      </div>
      {isOpen && <CaseStudyModal setIsOpen={setIsOpen} />}
    </div>
  );
}

EngagementDetails.propTypes = {
  engagementDetails: PropTypes.object.isRequired,
};
