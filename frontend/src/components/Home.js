import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from './Banner';
import '../css/UserHomePage.css'; // Import CSS

const UserHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="user-home-container">
      <Navbar />
      <div className="banner-wrapper">
        <Banner />
      </div>
      <section className="hero-section">
        <h1 className="hero-heading">Chào mừng đến với TT Shop</h1>
        <p className="hero-subheading">Cửa hàng chuyên giày bóng đá các loại</p>
        <button className="cta-button" onClick={() => navigate('/product')}>Xem Sản Phẩm</button>
      </section>
      <Footer />
    </div>
  );
};

export default UserHomePage;
