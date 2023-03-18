import React from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import PageLoader from '../../components/Spinner';

function UploadExcelPage() {
  const [isLoading] = React.useState(false);
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
            <li>Excel file must be in .xlsx format</li>
            <li>Excel file must have 4 columns: Name, Email, Role, Start Date</li>
            <li>Excel file must have 1 header row</li>
            <li>Excel file must have at least 1 data row</li>
            <li>Excel file must not have any empty cells</li>
            <li>Excel file must not have any duplicate emails</li>
          </ul>
        </div>
        <div className="flex gap-4 py-4">
          <label
            htmlFor="excelUpload"
            className="bg-[#051b2c] text-white px-3 py-2 text-sm flex items-center cursor-pointer">
            Select Excel
          </label>
          <input
            id="excelUpload"
            className="hidden"
            type={'file'}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></input>
          <Button buttonText="Upload" />
        </div>
      </div>
    </div>
  );
}

export default UploadExcelPage;
