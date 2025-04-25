import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; // Tách style

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert('Bạn đã đăng xuất!');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">TT Shop</div>
      <ul className="navbar-links">
        <li onClick={() => navigate('/')}>Trang Chủ</li>
        <li onClick={() => navigate('/product')}>Sản Phẩm</li>
        <li onClick={() => navigate('/contact')}>Liên Hệ</li>
        <li onClick={() => navigate('/favorites')}>Yêu thích</li>
        <li onClick={() => navigate('/cart')}>Giỏ hàng</li>
        {!isLoggedIn && <li onClick={() => navigate('/loginuser')}>Đăng nhập</li>}
        {isLoggedIn && <li onClick={() => navigate('/logout')}>Đăng xuất</li>}
        <li onClick={handleLoginLogout}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
