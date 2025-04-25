import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = ({ cartItems, handleRemoveFromCart }) => {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán!');
    } else {
      navigate('/checkout'); // Chuyển hướng đến trang thanh toán
    }
  };

  return (
    <div className="cart-page" style={{ paddingTop: '80px' }}>
      <Navbar />
      <h2 className="title">🛒 Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.product_Id} className="cart-card">
              <img
                src={`http://localhost:5077/api/Product/${item.product_Id}/image`}
                alt={item.product_Name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.onerror = null; // Ngăn lỗi lặp lại
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image'; // Hiển thị ảnh mặc định nếu lỗi
                }}
              />
              <h3 className="cart-item-name">{item.product_Name}</h3>
              <p className="cart-item-price">{item.price?.toLocaleString()} VNĐ</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(item.product_Id)}
              >
                Xóa
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;