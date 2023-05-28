import * as React from 'react';
import './DashboardPage.css';
import { Header } from '../../components';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import { FeatureContext } from '../../context/FeatureContext';
import makeRequest from '../../utils/makeRequest';
import {
  GET_PROJECTS_METRICS,
  GET_USER_METRICS,
  GET_ENGAGEMENT_STATUS,
  GET_USERS_STAFFING_METRICS,
  GET_PROJECTS_SECTOR_METRICS,
  GET_CASE_STUDIES_SECTOR_METRICS,
} from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import applyTheme from '../../utils/chartsTheme';
import allFeatures from '../../constants/allFeatures';
import AnimatedNumber from 'animated-number-react';

const DashboardPage = () => {
  const [engagementStatusData, setEngagementStatusData] = React.useState([{}]);
  const [userStatusData, setUserStatusData] = React.useState([{}]);
  const [staffedData, setStaffedData] = React.useState();
  const [staffingPercentage, setStaffingPercentage] = React.useState(0);
  const [currentMonth, setCurrentMonth] = React.useState('');
  const [projectSectorMetrics, setProjectSectorMetrics] = React.useState([{}]);
  const [caseStudySectorMetrics, setCaseStudySectorMetrics] = React.useState([{}]);
  applyTheme();
  const formatValue = value => value.toFixed(2);

  React.useEffect(() => {
    makeRequest(GET_USERS_STAFFING_METRICS, {}, navigate).then(response => {
      setStaffedData(response);
    });
    setCurrentMonth(
      new Date().toLocaleString('default', { month: 'long' }) +
        ' ' +
        new Date().toLocaleString('default', { year: 'numeric' })
    );
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
    makeRequest(GET_USERS_STAFFING_METRICS, {}, navigate).then(response => {
      const statusData = [
        { name: 'Beach', y: response['unstaffedUsers'] },
        { name: 'Staffed', y: response['staffedUsers'] },
      ];
      setUserStatusData(statusData);
    });
    makeRequest(GET_USERS_STAFFING_METRICS, {}, navigate).then(response => {
      setStaffedData(response);
    });
    makeRequest(GET_PROJECTS_SECTOR_METRICS, {}, navigate).then(response => {
      console.log(response);
      setProjectSectorMetrics(response);
    });
    makeRequest(GET_CASE_STUDIES_SECTOR_METRICS, {}, navigate).then(response => {
      console.log(response);
      setCaseStudySectorMetrics(response);
    });
  }, []);

  React.useEffect(() => {
    setStaffingPercentage(staffedData ? ((staffedData?.staffedUsers / staffedData?.totalUsers) * 100).toFixed(2) : 0);
  }, [staffedData]);

  const navigate = useNavigate();
  const { userInfo } = React.useContext(FeatureContext);
  if (!userInfo?.featureAccess?.includes(allFeatures.read_metrics)) navigate('/casestudies');

  const [numberOfEngagements, setNumberofEngagements] = React.useState([]);
  const [numberOfPeopleStaffed, setNumberofPeopleStaffed] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
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
    makeRequest(GET_USER_METRICS, {}, navigate)
      .then(response => {
        console.log('response', response);
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
          <div className="metrics">
            <div className="metric-info">
              <div>
                <div className="metric-label">For the month:</div>
                {currentMonth}
              </div>
              <div>
                <div className="metric-label">People staffed : </div>
                <AnimatedNumber value={staffingPercentage} formatValue={formatValue} /> %
              </div>
            </div>
          </div>
          <div className="main-area">
            <p className="side-chart-title">Staffing Metrics</p>

            <div className="main-chart">
              <BarChart
                numberOfEngagements={numberOfEngagements}
                peopleStaffed={numberOfPeopleStaffed}
                setEngagementStatusData={setEngagementStatusData}
                setUserStatusData={setUserStatusData}
                numberOfPeopleStaffed={numberOfPeopleStaffed}
                setStaffingPercentage={setStaffingPercentage}
                setCurrentMonth={setCurrentMonth}
              />
            </div>
          </div>
          <div className="vr">
            <div className="vr-line"></div>
          </div>
          <div className="side-chart1">
            <p className="side-chart-title">Staffing Status</p>
            <p className="side-chart-subtitle">By month</p>
            <PieChart data={userStatusData} name={'User Status'} />
          </div>
          <div className="side-chart2">
            <p className="side-chart-title">Engagement Status</p>
            <p className="side-chart-subtitle">By month</p>
            <PieChart data={engagementStatusData} name={'Engagement Status'} />
          </div>
          <div className="sector-chart1">
            <p className="side-chart-title">Engagements in Sectors</p>
            <p className="side-chart-subtitle">By year</p>
            <PieChart data={projectSectorMetrics} name={'Engagements in Sectors'} />
          </div>
          <div className="sector-chart2">
            <p className="side-chart-title">Case Studies in Sectors</p>
            <p className="side-chart-subtitle">By year</p>
            <PieChart data={caseStudySectorMetrics} name={'Case Studies in Sectors'} />
          </div>
        </div>
      </>
    );
  }
};
export default DashboardPage;
