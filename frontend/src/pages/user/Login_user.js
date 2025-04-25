import React, { useState } from 'react';
import '../../css/Login_user.css'; // Đảm bảo bạn tạo file CSS này
import api from '../../services/Api'; // Sử dụng API service
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const LoginUser = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const res = await api.post('/Auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Lưu thông tin người dùng vào localStorage
      alert('Đăng nhập thành công!');
      navigate('/'); // Chuyển hướng đến trang Home
    } catch (err) {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  };

  return (
    <div className="login-container">
       
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Tên đăng nhập:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button type="submit" className="login-btn">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginUser;