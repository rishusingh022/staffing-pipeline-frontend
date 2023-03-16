import React from 'react';
import Header from '../../components/Header';
import Image from '../../components/Image';
import EngagementDefault from '../../assets/images/engagement-default.png';
import './AddEngagement.css';
import Dropdown from '../../components/Dropdown';
import { BiPlus } from 'react-icons/bi';
import Button from '../../components/Button';

export default function AddEngagementPage() {
  return (
    <div className="bg-gray-200">
      <Header hasNav />
      <div className="bg-white min-h-screen mx-32 my-16 px-12 py-10">
        <div className="flex flex-col gap-4">
          <div className="flex image-style upper-container justify-between">
            <div className="flex left-upper">
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
            <Button buttonText="Create" />
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
                <div className="tech-card-add">
                  <p className="px-4 font-semibold text-gray-400 cursor-pointer">Add +</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 case-study-container-add-engagement">
            <p className="font-bold">Case Studies & Knowledge Materials</p>
            <Dropdown dropdownName="All" dropdownData={[]} selectOption={() => {}} />
            <Button buttonText="Upload" />
          </div>
        </div>
      </div>
    </div>
  );
}
