// // import { useParams } from 'react-router-dom';
// // import { useEffect, useState } from 'react';
// // import api from '../../services/Api'; // Adjust the import path as necessary
// // import Navbar from '../../components/Navbar';
// // import '../../css/ProductDetail.css'; // Đảm bảo bạn đã tạo file CSS này
// // import Footer from '../../components/Footer';

// // function ProductDetail() {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal

// //   useEffect(() => {
// //     api.get(`/Product/${id}`).then((res) => setProduct(res.data));
// //   }, [id]);

// //   if (!product) return <div>Loading...</div>;

// //   const handleImageClick = () => {
// //     setIsModalOpen(true); // Mở modal khi nhấn vào ảnh
// //   };

// //   const handleCloseModal = () => {
// //     setIsModalOpen(false); // Đóng modal
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="product-detail-container">
// //         <div className="product-detail-header">
// //           <h2>{product.name}</h2>
// //           <img
// //             src={`https://localhost:7252/api/Product/${product.product_Id}/image`} // Map đúng trường "image" từ JSON
// //             alt={product.product_Name}
// //             onClick={handleImageClick} // Thêm sự kiện click vào ảnh
// //             style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }}
// //           />
// //         </div>
// //         <div className="product-detail-description">
// //           <p>{product.description}</p> {/* Map đúng trường "description" */}
// //         </div>
// //         <div className="product-detail-price">
// //           Giá: {product.price} VNĐ {/* Map đúng trường "price" */}
// //         </div>
// //         <div className="product-detail-icons">
// //           <i className="fas fa-heart" title="Yêu thích"></i>
// //           <i className="fas fa-shopping-cart" title="Thêm vào giỏ hàng"></i>
// //           <i className="fas fa-share-alt" title="Chia sẻ"></i>
// //         </div>
// //       </div>

// //       {/* Modal hiển thị ảnh lớn */}
// //       {isModalOpen && (
// //         <div className="modal-overlay" onClick={handleCloseModal}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <img
// //               src={`https://localhost:7252/api/Product/${product.product_Id}/image`}
// //               alt={product.product_Name}
// //               style={{ maxWidth: '100%', borderRadius: '8px' }}
// //             />
// //             <button className="close-modal-btn" onClick={handleCloseModal}>
// //               Đóng
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </div>
// //   );
// // }

// // export default ProductDetail;

// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import api from '../../services/Api';
// import Navbar from '../../components/Navbar';
// import '../../css/ProductDetail.css';
// import Footer from '../../components/Footer';

// function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (id) {
//       console.log("ID lấy từ URL:", id);
//       const fetchProduct = async () => {
//         try {
//           const res = await api.get(`/Product/${id}`);
//           setProduct(res.data);
//         } catch (error) {
//           console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
//         }
//       };

//       fetchProduct();
//     } else {
//       console.warn("Không tìm thấy ID sản phẩm trong URL!");
//     }
//   }, [id]);

//   if (!product) return <div>Đang tải sản phẩm...</div>;

//   const handleImageClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="product-detail-container">
//         <div className="product-detail-header">
//           <h2>{product.product_Name || "Tên sản phẩm"}</h2>
//           <img
//             src={`https://localhost:5077/api/Product/${product.product_Id}/image`}
//             alt={product.product_Name}
//             onClick={handleImageClick}
//             style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }}
//           />
//         </div>
//         <div className="product-detail-description">
//           <p>{product.description || "Mô tả đang được cập nhật..."}</p>
//         </div>
//         <div className="product-detail-price">
//           Giá: {product.price?.toLocaleString('vi-VN')} VNĐ
//         </div>
//         <div className="product-detail-icons">
//           <i className="fas fa-heart" title="Yêu thích"></i>
//           <i className="fas fa-shopping-cart" title="Thêm vào giỏ hàng"></i>
//           <i className="fas fa-share-alt" title="Chia sẻ"></i>
//         </div>
//       </div>

//       {/* Modal hiển thị ảnh lớn */}
//       {isModalOpen && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={`https://localhost:7252/api/Product/${product.product_Id}/image`}
//               alt={product.product_Name}
//               style={{ maxWidth: '100%', borderRadius: '8px' }}
//             />
//             <button className="close-modal-btn" onClick={handleCloseModal}>
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default ProductDetail;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/Api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../css/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("ID lấy từ URL:", id); // Debug

    if (!id) {
      console.warn("❌ Không tìm thấy ID sản phẩm trong URL!");
      return;
    }

    api.get(`/${id}`)
      .then((res) => {
        console.log("✅ Dữ liệu sản phẩm:", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy sản phẩm:", err);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const imageUrl = product?.product_Id
    ? `http://localhost:5077/api/Product/${product.product_Id}/image`
    : 'https://via.placeholder.com/200x150?text=No+Image';

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-header">
          <h2>{product.Product_Name}</h2>
          <img
            src={imageUrl}
            alt={product.product_Name}
            className="product-image"
            onClick={handleImageClick}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/200x150?text=No+Image';
            }}
          />
        </div>

        <div className="product-detail-price">
          Giá: {product.price?.toLocaleString()} VNĐ
        </div>

        <div className="product-detail-icons">
          <i className="fas fa-heart" title="Yêu thích"></i>
          <i className="fas fa-shopping-cart" title="Thêm vào giỏ hàng"></i>
          <i className="fas fa-share-alt" title="Chia sẻ"></i>
        </div>
      </div>

      {/* Modal xem ảnh lớn */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={imageUrl}
              alt={product.product_Name}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <button className="close-modal-btn" onClick={handleCloseModal}>
              Đóng
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetail;
