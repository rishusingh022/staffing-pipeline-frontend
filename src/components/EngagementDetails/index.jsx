import React, { useState } from 'react';
import './engagementDetails.css';
import Image from '../Image';
import Button from '../Button';
import Dropdown from '../Dropdown';
import TechStack from '../techStackCard';
import PropTypes from 'prop-types';
import PeopleHorizontalCard from '../PeopleHorizontalCard';
import HorizontalCaseStudyCards from '../HorizontalCaseStudyCards';
import CaseStudyModal from '../CaseStudyModal';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateTime';

export default function EngagementDetails({ engagementDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="container-div">
      <div className="project-container">
        <div className="image-container">
          <Image imageUrl={engagementDetails?.projectData?.image} altText={'test-image'} />
        </div>
        <div className="detail-container">
          <div className="project-details">
            <div className="project-name-update">
              <p className="project-text">{engagementDetails?.projectData?.name}</p>
              <Button buttonText={'Update Project'} handleClick={() => navigate('edit')} />
            </div>

            <div className="id-container">
              <p className="text-sm">Charge Code: {engagementDetails?.projectData?.chargeCode}</p>
              {/* <Button buttonText={'Update Project'} handleClick={() => navigate('edit')} /> */}
            </div>
            <table>
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Start Date:</td>
                  <td>{formatDate(engagementDetails?.projectData?.startDate)}</td>
                </div>
              </tr>

              <tr>
                <div className="date-container">
                  <td className="table-row-item">End Date:</td>
                  <td>{formatDate(engagementDetails?.projectData?.endDate)}</td>
                </div>
              </tr>
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Status:</td>
                  <td className="text-blue-600">{engagementDetails?.projectData?.status}</td>
                </div>
              </tr>
              <tr>
                <div className="date-container">
                  <td className="table-row-item">Tags:</td>
                  <td>#{engagementDetails?.projectData?.tags}</td>
                </div>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="team-members-container grid grid-cols-2 gap-2">
        <div className="team-members">
          <div className="team-member-title flex grid grid-cols-2 gap-2">
            <div className="title-box">Team Members</div>
            <div className="user-dropdown">
              <Dropdown dropdownName="All" />
            </div>
          </div>
          <div className="team-member-detail">
            {engagementDetails?.usersInEngagement?.length === 0 && <p>No Teams Members are assigned</p>}
            {engagementDetails?.usersInEngagement?.map((data, index) => (
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
              <Dropdown dropdownName="Technology" dropdownData={['React', 'NodeJs', 'Express']} />
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
        <div className="case-dropdown">
          <Dropdown dropdownName="All" />
        </div>
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
        <div className="case-study-button">
          <Button
            buttonText={'upload'}
            handleClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      {isOpen && <CaseStudyModal setIsOpen={setIsOpen} />}
    </div>
  );
}

EngagementDetails.propTypes = {
  engagementDetails: PropTypes.object.isRequired,
};
