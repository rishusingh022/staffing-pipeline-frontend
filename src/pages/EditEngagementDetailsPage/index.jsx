import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Image from '../../components/Image';
import './EditEngagementDetails.css';
import Dropdown from '../../components/Dropdown';
import HorizontalCaseStudyCards from '../../components/HorizontalCaseStudyCards';
import PeopleHorizontalCard from '../../components/PeopleHorizontalCard';
import TechStack from '../../components/techStackCard';
import { BiPlus } from 'react-icons/bi';
import Button from '../../components/Button';
import { useParams } from 'react-router';
import { GET_ENGAGEMENT_DATA_BY_ID_URL } from '../../constants/apiEndpoints';
import { default as makeRequest } from '../../utils/makeRequest';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateTime';

export default function EditEngagementDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [engagementDetails, setEngagementDetails] = useState({});

  useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_BY_ID_URL(projectId), {}, navigate).then(response => {
      setEngagementDetails(response);
    });
  }, []);
  return (
    <div className="bg-gray-200">
      <Header hasNav />
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-4">
          <div className="flex image-style upper-container justify-between">
            <div className="flex">
              <Image imageUrl={engagementDetails?.projectData?.image} altText="default" hasOverlay />
              <div className="ml-4 my-4 flex flex-col gap-2 engagement-form-container">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="input-style"
                  defaultValue={engagementDetails?.projectData?.name}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="input-style w-32"
                    defaultValue={formatDate(engagementDetails?.projectData?.startDate)}
                  />
                  <p>:</p>
                  <input
                    type="text"
                    placeholder="End Date"
                    className="input-style w-32"
                    defaultValue={formatDate(engagementDetails?.projectData?.endDate)}
                  />
                </div>
                <Dropdown
                  dropdownName={engagementDetails?.projectData?.status}
                  dropdownData={['Ongoing', 'Completed', 'Not Started']}
                  selectOption={() => {}}
                />
                <div className="flex justify-between w-32 text-gray-400 px-2 border-black border">
                  <p>Tags</p>
                  <p>+</p>
                </div>
                <div className="flex gap-2">
                  <div className="rounded-xl bg-black text-white w-20 text-xs py-1 text-center">Front-End</div>
                  <div className="rounded-xl bg-black text-white w-20 text-xs py-1 text-center">Back-End</div>
                </div>
              </div>
            </div>
            <Button buttonText="Update" />
          </div>
          <div className="mid-container grid grid-cols-2 gap-2">
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex gap-16 items-center">
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
                    userPosition={data.role}
                    userOffice="Bangalore"
                  />
                ))}
                <div className="update-user-card cursor-pointer">
                  <BiPlus size={24} />
                </div>
              </div>
            </div>
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex gap-16 items-center">
                <p className="font-bold text-2xl">Technology</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="tech-card-container">
                {engagementDetails?.projectData?.skills?.map((data, index) => (
                  <TechStack key={index} techName={data} />
                ))}
                <div className="add-tech-card">
                  <p className="px-4 font-semibold text-gray-400 cursor-pointer">Add +</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 case-study-container-update-engagement">
            <p className="font-bold">Case Studies & Knowledge Materials</p>
            <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
            {engagementDetails?.caseStudiesInEngagement?.map((caseStudy, index) => (
              <HorizontalCaseStudyCards
                key={index}
                caseStudyName={caseStudy.caseStudyId}
                caseStudyImage={caseStudy.image}
                caseStudyDate={caseStudy.createdAt}
              />
            ))}
            <Button buttonText="Upload" />
          </div>
        </div>
      </div>
    </div>
  );
}
