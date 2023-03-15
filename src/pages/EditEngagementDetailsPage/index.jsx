import React from 'react';
import Header from '../../components/Header';
import Image from '../../components/Image';
import EngagementDefault from '../../assets/images/engagement-default.png';
import './EditEngagementDetails.css';
import Dropdown from '../../components/Dropdown';
import HorizontalCaseStudyCards from '../../components/HorizontalCaseStudyCards';
import PeopleHorizontalCard from '../../components/PeopleHorizontalCard';
import TechStack from '../../components/techStackCard';
import { BiPlus } from 'react-icons/bi';

export default function EditEngagementDetailsPage() {
  return (
    <div className="bg-gray-200">
      <Header hasNav />
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-4">
          <div className="flex image-style">
            <Image imageUrl={EngagementDefault} altText="default" hasOverlay />
            <div className="ml-4 my-4 flex flex-col gap-2 engagement-form-container">
              <input type="text" placeholder="Project Name" className="input-style" />
              <div className="flex gap-2">
                <input type="text" placeholder="Start Date" className="input-style w-32" />
                <p>:</p>
                <input type="text" placeholder="End Date" className="input-style w-32" />
              </div>
              <Dropdown
                dropdownName="Status"
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
          <div className="mid-container grid grid-cols-2 gap-2">
            <div className="flex w-1/2 gap-2 flex-col">
              <div className="flex gap-16 items-center">
                <p className="font-bold text-2xl">Team Members</p>
                <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
              </div>
              <div className="people-card-container">
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
                <div className="update-user-card">
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
                <TechStack techName="React" />
                <TechStack techName="React" />
                <TechStack techName="React" />
                <div className="add-tech-card">
                  <p className="px-4 font-semibold text-gray-400">Add +</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Case Studies & Knowledge Materials</p>
            <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
            <HorizontalCaseStudyCards caseStudyId="1234" />
            <HorizontalCaseStudyCards caseStudyId="1235" />
          </div>
        </div>
      </div>
    </div>
  );
}
