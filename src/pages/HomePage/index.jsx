import React from 'react';
import './HomePage.css';
import Footer from '../../components/Footer';
import { Header } from '../../components';
import ToolBox from './ToolBox';
import { useNavigate } from 'react-router';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header hasNav={true} navigate={navigate} />
      <div className="home-page-body">
        <ToolBox />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
