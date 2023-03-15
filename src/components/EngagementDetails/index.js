import React from 'react';
import './engagementDetails.css';
import Image from '../Image';
import Button from '../Button';
import Dropdown from '../Dropdown';
import TechStack from '../techStackCard';
import PropTypes from 'prop-types';
import PeopleHorizontalCard from '../PeopleHorizontalCard';
import HorizontalCaseStudyCards from '../HorizontalCaseStudyCards';
import { getFormattedDateFromUtcDate } from './../../utils/common/';

export default function EngagementDetails({ engagementDetails }) {
  const handleClick = () => {};

  return (
    <div className="container-div">
      <div className="project-container">
        <div className="image-container">
          <Image imageUrl={'http://surl.li/fkwje'} altText={'test-image'} />
        </div>
        <div className="detail-container">
          <div className="id-container">
            <p className="text-sm">ID : {engagementDetails?.engagementId}</p>
            <Button buttonText={'upload project'} handleClick={handleClick} />
          </div>
          <div className="project-details">
            <p className="project-text">Project</p>
            <div className="date-container">
              <p>Start Date:</p>
              <p>{getFormattedDateFromUtcDate(engagementDetails?.startDate)}</p>
            </div>
            <div className="date-container">
              <p>End Date:</p>
              <p>{getFormattedDateFromUtcDate(engagementDetails?.endDate)}</p>
            </div>
            <div className="date-container">
              <p>Status:</p>
              <p className="text-blue-600">{engagementDetails?.status}</p>
            </div>
            <div className="date-container">
              <p>Tags:</p>
            </div>
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
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
            <PeopleHorizontalCard
              userFMNO="328974"
              userId="328974"
              userName="Harsh Agarwal"
              userPosition="Intern"
              userOffice="Bangalore"
            />
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
            {engagementDetails?.skills?.map((data, index) => (
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
          {engagementDetails?.caseStudyIds?.map((data, index) => (
            <HorizontalCaseStudyCards key={index} caseStudyId={data} />
          ))}
        </div>
        <div className="case-study-button">
          <Button buttonText={'upload'} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

EngagementDetails.propTypes = {
  engagementDetails: PropTypes.object.isRequired,
};
