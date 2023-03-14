import React from 'react';
import './HomePage.css';
import Footer from '../../components/Footer';
import { Header } from '../../components';
import ToolBox from './ToolBox';
const HomePage = () => {
  return (
    <div>
      <Header hasNav={true} />
      <div className="home-page-body">
        <ToolBox />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
