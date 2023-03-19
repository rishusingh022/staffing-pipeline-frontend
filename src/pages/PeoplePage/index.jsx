import * as React from 'react';
import './PeoplePage.css';
import Footer from '../../components/Footer';
import userImage from './../../assets/images/user-default.png';

import makeRequest from '../../utils/makeRequest';
import { GET_USER_DATA_URL } from '../../constants/apiEndpoints';
import CardContainer from '../../components/CardContainer';
import UserCard from '../../components/UserCard';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';

import ToolBox from './ToolBox';
import PageLoader from '../../components/Spinner';
import { extractSkillFromUsers, extractRoleFromUsers } from '../../utils/common/user';

  
  
const PeoplePage = () => {
  const navigate = useNavigate();
  let [people, setPeople] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [technologyOptions, setTechnologyOptions] = React.useState([]);
  const [roleOptions, setRoleOptions] = React.useState([]);
  const [technologySelected, setTechnologySelected] = React.useState('');
  const [roleSelected, setRoleSelected] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = searchValue => {
    setSearchValue(() => searchValue);
  };

  const handleTechnologyChange = option => {
    if (option === 'All') option = '';
    setTechnologySelected(option);
  };

  const handleRoleChange = option => {
    if (option === 'All') option = '';
    setRoleSelected(option);
  };

  React.useEffect(() => {
    makeRequest(GET_USER_DATA_URL, {}, navigate)
      .then(data => {
        setPeople(data);
        setIsLoading(false);
        setTechnologyOptions(extractSkillFromUsers(data));
        setRoleOptions(extractRoleFromUsers(data));
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        setError(error);
      });
  }, []);
  if (error) {
    return (
      <div>
        <Header hasNav={true} navigate={navigate} />
        <h1>People Page</h1>
        <p>{error.message}</p>
        <Footer />
      </div>
    );
  }
  if (isLoading) {
    return <PageLoader />;
  }
  if (people) {
    if (technologySelected && roleSelected) {
      people = people.filter(person => {
        return person.skills.includes(technologySelected) && person.role === roleSelected;
      });
    } else if (technologySelected) {
      people = people.filter(person => {
        return person.skills.includes(technologySelected);
      });
    } else if (roleSelected) {
      people = people.filter(person => {
        return person.role === roleSelected;
      });
    }
    if (searchValue) {
      people = people.filter(person => {
        return person.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    const peopleCards = people.map(person => {
      return (
        <UserCard
          key={person.fmno}
          imageUrl={userImage}
          altText="person"
          identityNumber={person.fmno}
          name={person.name}
          designation={person.role}
          location="Bangalore Office"
          handleButtonClick={() => {
            navigate(`/users/${person.userId}`);
          }}
        />
      );
    });
    return (
      <div className="people-page">
        <Header hasNav={true} />
        <ToolBox
          handleSearchChange={handleSearch}
          handleTechnologyChange={handleTechnologyChange}
          handleRoleChange={handleRoleChange}
          technologyOptions={technologyOptions}
          roleOptions={roleOptions}
        />
        <div className="container-in-people">
          <CardContainer>{peopleCards}</CardContainer>
        </div>
      </div>
    );
  } else {
    return <PageLoader />;
  }
};
export default PeoplePage;
