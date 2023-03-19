import React from 'react';
import './engagementDetails.css';
import Image from '../Image';
import Button from '../Button';
import Dropdown from '../Dropdown';
import TechStack from '../techStackCard';
import PropTypes from 'prop-types';
import PeopleHorizontalCard from '../PeopleHorizontalCard';
import HorizontalCaseStudyCards from '../HorizontalCaseStudyCards';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateTime';

export default function EngagementDetails({ engagementDetails }) {
  const navigate = useNavigate();
  return (
    <div className="container-div">
      <div className="project-container">
        <div className="image-container">
          <Image imageUrl={engagementDetails?.projectData?.image} altText={'enagagement-image'} />
        </div>
        <div className="detail-container">
          <div className="id-container">
            <p className="text-sm">ID : {engagementDetails?.engagementId}</p>
            <Button buttonText={'Update Project'} handleClick={() => navigate('edit')} />
          </div>
          <div className="project-details">
            <p className="project-text">{engagementDetails?.projectData?.name}</p>
            <div className="date-container">
              <p>Start Date:</p>
              <p>{formatDate(engagementDetails?.projectData?.startDate)}</p>
            </div>
            <div className="date-container">
              <p>End Date:</p>
              <p>{formatDate(engagementDetails?.projectData?.endDate)}</p>
            </div>
            <div className="date-container">
              <p>Status:</p>
              <p className="text-blue-600">{engagementDetails?.projectData?.status}</p>
            </div>
            <div className="date-container">
              <p>Tags:</p>
              <p>#{engagementDetails?.projectData?.tags}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="team-members-container grid grid-cols-2 gap-2">
        <div className="team-members">
          <div className="team-member-title grid grid-cols-2 gap-2">
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
              caseStudyName={data.name}
              caseStudyDate={data.createdAt}
              caseStudyImage={data.image}
            />
          ))}
        </div>
        <div className="case-study-button">
          <Button buttonText={'upload'} handleClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

EngagementDetails.propTypes = {
  engagementDetails: PropTypes.object.isRequired,
};
