import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Favorites = ({ favoriteItems, handleRemoveFromFavorites }) => {
  return (
    <div className="favorites-page" style={{ paddingTop: '80px' }}>
      <Navbar />  
      <h2 className="title">💖 Danh sách yêu thích</h2>
      {favoriteItems.length === 0 ? (
        <p>Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
      ) : (
        <div className="favorites-grid">
          {favoriteItems.map((item) => (
            <div key={item.product_Id} className="favorites-card">
              <img
                src={`http://localhost:5077/api/Product/${item.product_Id}/image`}
                alt={item.product_Name}
                className="favorites-item-image"
                onError={(e) => {
                  e.target.onerror = null; // Ngăn lỗi lặp lại
                  e.target.src = 'https://via.placeholder.com/200x150?text=No+Image'; // Hiển thị ảnh mặc định nếu lỗi
                }}
              />
              <h3 className="favorites-item-name">{item.product_Name}</h3>
              <p className="favorites-item-price">{item.price?.toLocaleString()} VNĐ</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromFavorites(item.product_Id)}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Favorites;