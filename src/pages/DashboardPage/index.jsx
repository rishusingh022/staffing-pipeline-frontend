/* eslint-disable no-unused-vars */
import * as React from 'react';
import './DashboardPage.css';
import { Header } from '../../components';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import { RoleContext } from '../../context/RoleContext';
import makeRequest from '../../utils/makeRequest';
import {
  GET_PROJECTS_METRICS,
  GET_USER_METRICS,
  GET_ENGAGEMENT_STATUS,
  GET_USERS_STAFFING_METRICS,
} from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import applyTheme from '../../utils/chartsTheme';
import AnimatedNumber from 'animated-number-react';

const DashboardPage = () => {
  const [engagementStatusData, setEngagementStatusData] = React.useState([{}]);
  const [userStatusData, setUserStatusData] = React.useState([{}]);
  const [staffedData, setStaffedData] = React.useState();
  const [staffingPercentage, setStaffingPercentage] = React.useState(0);
  applyTheme();
  const formatValue = value => value.toFixed(2);

  React.useEffect(() => {
    makeRequest(GET_USERS_STAFFING_METRICS, {}, navigate).then(response => {
      setStaffedData(response);
    });
  }, []);

  React.useEffect(() => {
    makeRequest(GET_ENGAGEMENT_STATUS, {}, navigate).then(response => {
      const statusData = [
        { name: 'Ongoing', y: response['ongoing'] },
        { name: 'Completed', y: response['completed'] },
        { name: 'Upcoming', y: response['upcoming'] },
      ];
      setEngagementStatusData(statusData);
    });
  }, []);

  React.useEffect(() => {
    makeRequest(GET_USERS_STAFFING_METRICS, {}, navigate).then(response => {
      const statusData = [
        { name: 'Beach', y: response['unstaffedUsers'] },
        { name: 'Staffed', y: response['staffedUsers'] },
      ];
      setUserStatusData(statusData);
    });
  }, []);

  React.useEffect(() => {
    setStaffingPercentage(staffedData ? ((staffedData?.staffedUsers / staffedData?.totalUsers) * 100).toFixed(2) : 0);
    console.log('abbsbsbd', staffingPercentage);
  }, [staffedData]);

  const navigate = useNavigate();
  const { userInfo } = React.useContext(RoleContext);

  const [numberOfEngagements, setNumberofEngagements] = React.useState([]);
  const [numberOfPeopleStaffed, setNumberofPeopleStaffed] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (userInfo?.role !== 'leadership') navigate('/users');
    makeRequest(GET_PROJECTS_METRICS, {}, navigate)
      .then(response => {
        setNumberofEngagements(response);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, []);
  React.useEffect(() => {
    if (userInfo?.role !== 'leadership') navigate('/users');
    makeRequest(GET_USER_METRICS, {}, navigate)
      .then(response => {
        setNumberofPeopleStaffed(response);
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, []);
  if (error) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <>
        <Header hasNav={true} />
        <div className="dashboard">
          <div className="main-area">
            <div className="metrics">
              <div className="metric-label">This month:</div>
              People staffed : <AnimatedNumber value={staffingPercentage} formatValue={formatValue} /> %
            </div>
            <div className="main-chart">
              <p className="bar-chart-title">Staffing Metrics</p>
              <BarChart
                numberOfEngagements={numberOfEngagements}
                peopleStaffed={numberOfPeopleStaffed}
                setEngagementStatusData={setEngagementStatusData}
              />
            </div>
          </div>
          <div className="side-chart1">
            <p className="side-chart-title">Staffing Status</p>
            <PieChart data={userStatusData} name={'User Status'} />
          </div>
          <div className="side-chart2">
            <p className="side-chart-title">Engagement Status</p>
            <PieChart data={engagementStatusData} name={'Engagement Status'} />
          </div>
        </div>
      </>
    );
  }
};
export default DashboardPage;
