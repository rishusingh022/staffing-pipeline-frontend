import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './caseStudyModal.css';
import PeopleHorizontalCard from '../PeopleHorizontalCard';
import Button from '../Button';
import EngagementHorizontalCard from '../EngagementHorizontalCard';
import makeRequest from '../../utils/makeRequest';
import {
  CREATE_CASE_STUDIES_DATA_URL,
  GET_ENGAGEMENT_DATA_URL,
  GET_USERS_INVOLVED_IN_ENGAGEMENT,
  UPLOAD_CASE_STUDY_IMAGE_ROUTE,
} from '../../constants/apiEndpoints';
import { useNavigate, useParams } from 'react-router-dom';
// import { collaborators } from '../../mocks/DropDownOptions';

export default function CaseStudyModal({ setIsOpen }) {
  const { projectId } = useParams();
  const [allEngagements, setAllEngagements] = useState([]);
  const [selectedEngagement, setSelectedEngagement] = useState(projectId);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [inputData, setInputdata] = useState({
    caseStudyname: '',
    description: '',
    boxLink: '',
  });
  const navigate = useNavigate();

  const handleSelectedEngagementChange = engagementId => {
    setSelectedUsers([]);
    setSelectedEngagement(engagementId);
  };
  useEffect(() => {
    makeRequest(GET_ENGAGEMENT_DATA_URL, {}, navigate)
      .then(response => {
        setAllEngagements(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    makeRequest(GET_USERS_INVOLVED_IN_ENGAGEMENT(selectedEngagement), {}, navigate)
      .then(response => {
        setUsers(response);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedEngagement]);
  const handleCaseStudyImage = async () => {
    const formData = new FormData();
    formData.append('file', file);
    return await makeRequest(
      UPLOAD_CASE_STUDY_IMAGE_ROUTE,
      {
        data: formData,
      },
      navigate
    );
  };
  const uploadCaseStudy = async newCaseStudy => {
    makeRequest(
      CREATE_CASE_STUDIES_DATA_URL,
      {
        data: newCaseStudy,
      },
      navigate
    )
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  };
  const handleCreateCaseStudy = async () => {
    if (
      file &&
      inputData.caseStudyname &&
      inputData.description &&
      inputData.boxLink &&
      selectedEngagement &&
      selectedUsers.length > 0
    ) {
      console.log(selectedUsers);
      const image = await handleCaseStudyImage();
      const newCaseStudy = {
        name: inputData.caseStudyname,
        description: inputData.description,
        boxLink: inputData.boxLink,
        engagementId: selectedEngagement,
        collaboratorsIds: selectedUsers,
        image: image.imageUrl,
      };
      await uploadCaseStudy(newCaseStudy);
      setIsOpen(false);
    } else {
      alert('Fields are empty.');
    }
  };

  return (
    <>
      <div className="background fixed bg-black/[.85] w-screen h-screen top-0 left-0 flex items-center justify-center">
        <div className="modal-content divide-y flex flex-col gap-4 p-4">
          <div className="name">
            <input
              className="w-full px-3 py-2"
              placeholder="Enter case study name"
              value={inputData.caseStudyname}
              onChange={event =>
                setInputdata({
                  ...inputData,
                  caseStudyname: event.target.value,
                })
              }
            />
          </div>
          <div className="modal-image">
            {file && <p>Selected File: {file.name}</p>}
            <label htmlFor="upload-case-study-image">
              <p className="px-3 py-2 ml-2 mt-3 bg-[#051b2c] text-white w-fit hover:cursor-pointer">Select Image</p>
            </label>
            <input
              type={'file'}
              name="Upload image"
              id="upload-case-study-image"
              className="hidden"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
          <div className="modal-engagement-name">
            {allEngagements.length > 0 &&
              allEngagements.map((data, index) => (
                <div className="w-[48.5%] h-[90px]" key={index}>
                  <EngagementHorizontalCard
                    engagementTitle={data.name}
                    engagementId={data.engagementId}
                    selectedEngagement={selectedEngagement}
                    setSelectedEngagement={handleSelectedEngagementChange}
                  />
                </div>
              ))}
          </div>
          <div className="description">
            <input
              className="w-full px-3 py-2"
              placeholder="Enter description"
              value={inputData.description}
              onChange={event =>
                setInputdata({
                  ...inputData,
                  description: event.target.value,
                })
              }
            />
          </div>
          <div className="box-link">
            <input
              className="w-full px-3 py-2"
              placeholder="Paste Box Link"
              value={inputData.boxLink}
              onChange={event =>
                setInputdata({
                  ...inputData,
                  boxLink: event.target.value,
                })
              }
            />
          </div>
          <div className="modal-collaborators">
            {users.length > 0 ? (
              users.map((data, index) => (
                <div className="w-[48.5%] h-[90px] gap-2" key={index}>
                  <PeopleHorizontalCard
                    userFMNO={data.fmno}
                    userId={data.userId}
                    userName={data.name}
                    userPosition={data.role}
                    userOffice="Bangalore"
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    selected={selectedUsers.includes(data.userId)}
                  />
                </div>
              ))
            ) : (
              <p className="font-light text-gray text-center">No users involved in this engagements.</p>
            )}
          </div>
          <div className="enter-btn p-3">
            <div className="submit-btn">
              <Button buttonText={'Cancel'} handleClick={() => setIsOpen(false)} />
            </div>
            <div className="cancel-btn">
              <Button buttonText={'Submit'} handleClick={handleCreateCaseStudy} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CaseStudyModal.propTypes = {
  setIsOpen: PropTypes.bool.isRequired,
};
