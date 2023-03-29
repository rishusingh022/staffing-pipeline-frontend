import * as React from 'react';
import './DashboardPage.css';
import { Header } from '../../components';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import { RoleContext } from '../../context/RoleContext';
import makeRequest from '../../utils/makeRequest';
import { GET_PROJECTS_METRICS, GET_USER_METRICS } from '../../constants/apiEndpoints';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const engagementStatusData = [
    { name: 'Ongoing', y: 30 },
    { name: 'Completed', y: 20 },
    { name: 'Upcoming', y: 5 },
  ];

  const userStatusData = [
    { name: 'Beach', y: 10 },
    { name: 'Staffed', y: 20 },
  ];

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
        console.log(response);
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
              People staffed : 65%
            </div>
            <div className="main-chart">
              <BarChart numberOfEngagements={numberOfEngagements} peopleStaffed={numberOfPeopleStaffed} />
            </div>
          </div>

          <div className="side-chart1">
            <PieChart data={userStatusData} />
          </div>
          <div className="side-chart2">
            <PieChart data={engagementStatusData} />
          </div>
        </div>
      </>
    );
  }
};
export default DashboardPage;
