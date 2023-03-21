import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PageLoader from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { UPLOAD_EXCEL_ROUTE } from '../../constants/apiEndpoints';
import { RoleContext } from '../../context/RoleContext';

function UploadExcelPage() {
  const { userInfo } = React.useContext(RoleContext);
  useEffect(() => {
    if (userInfo?.role !== 'pd') navigate('/users');
  }, []);
  const [isLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const navigate = useNavigate();
  const handleFileSelect = event => {
    setFile(event.target.files[0]);
  };
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      makeRequest(
        UPLOAD_EXCEL_ROUTE,
        {
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        navigate
      )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert('Please select a file');
    }
  };

  return isLoading ? (
    <div>
      <PageLoader />
    </div>
  ) : (
    <div>
      <Header hasNav />
      <div className="w-full flex flex-col items-center">
        <p className="text-3xl text-center p-10">Upload Staffing Excel</p>
        <div className="bg-[#f8f8ee] w-4/5 p-8 rounded-xl border-2 border-dotted border-[#ad8a09]">
          <p className="text-lg pb-4">Rules to upload excel: </p>
          <ul className="list-disc list-inside">
            <li>
              Excel file must be in <b>.xlsx</b> format
            </li>
            <li>
              Excel file must have atleast 4 columns: <b>UserId, EngagmentId, AssignmentStartDate</b> and{' '}
              <b>AssignmentEndDate.</b>
            </li>
            <li>
              Excel file must have <b>1 header</b> row
            </li>
            <li>
              Excel file must have at least <b>1 data</b> row
            </li>
            <li>
              Excel file must <b>not</b> have any <b>empty</b> cells
            </li>
          </ul>
        </div>
        {file && (
          <div className="flex gap-4 p-4">
            <p className="font-bold">Selected File: </p>
            <p>{file.name}</p>
          </div>
        )}
        <div className="flex gap-4 py-4">
          <label
            htmlFor="excelUpload"
            className="bg-[#051b2c] text-white px-3 py-2 text-sm flex items-center cursor-pointer">
            Select Excel
          </label>
          <input
            onChange={handleFileSelect}
            id="excelUpload"
            className="hidden"
            type={'file'}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></input>
          <Button buttonText="Upload" handleClick={handleUpload} />
        </div>
      </div>
    </div>
  );
}

export default UploadExcelPage;
