
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// import Login from './pages/admin/Login';
// import ProductList from './pages/user/ProductList';
// import ProductDetail from './pages/user/ProductDetail';
// import UserHomePage from './components/Home';
// import Contact from './components/Contact';
// import Navbar from './components/Navbar';
// import AdminDashboard from './components/AdminDashboard';
// import Footer from './components/Footer';
// import ProductAdmin from './pages/admin/product_admin';
// import CategoryAdmin from './pages/admin/Category_admin';
// import UserAdmin from './pages/admin/User_admin';
// import Cart from './components/Cart';
// import Favorites from './components/Favorites';
// import OrderAdmin from './pages/admin/Order_admin';
// import LoginUser from './pages/user/Login_user';
// import LogoutUser from './pages/user/Logout_user';
// import OrderDetailAdmin from './pages/admin/Orderdetail_admin';
// import Banner from './components/Banner';
// import CheckOut from './components/CheckOut';
// import CheckoutSuccess from './components/Checkoutsuccess';
// import OrderDetail from './pages/admin/DetailOrder';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [favoriteItems, setFavoriteItems] = useState([]);

//   const handleAddToCart = (product) => {
//     setCartItems((prevCart) => [...prevCart, product]);
//   };

//   const handleAddToFavorites = (product) => {
//     setFavoriteItems((prevFavorites) => [...prevFavorites, product]);
//   };

//   const handleRemoveFromCart = (id) => {
//     setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const handleRemoveFromFavorites = (id) => {
//     setFavoriteItems((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Admin Routes */}
//         <Route path="/admin/login" element={<Login />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/productadmin" element={<ProductAdmin />} />
//         <Route path="/admin/categories" element={<CategoryAdmin />} />
//         <Route path="/admin/users" element={<UserAdmin />} />
//         <Route path="/admin/order" element={<OrderAdmin />} />
//         <Route path="/admin/orderdetail" element={<OrderDetailAdmin />} />
//         <Route path="/admin/orders/:id" element={<OrderDetail />} />

//         {/* User Routes */}
//         <Route path="/" element={<UserHomePage />} />

//         {/* ⚠ Quan trọng: Đặt /product/:id trước /product */}
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route
//           path="/product"
//           element={
//             <ProductList
//               handleAddToCart={handleAddToCart}
//               handleAddToFavorites={handleAddToFavorites}
//             />
//           }
//         />

//         <Route path="/contact" element={<Contact />} />
//         <Route path="/banner" element={<Banner />} />
//         <Route path="/checkout-success" element={<CheckoutSuccess />} />
//         <Route path="/checkout" element={<CheckOut cartItems={cartItems} />} />
//         <Route path="/footer" element={<Footer />} />
//         <Route path="/loginuser" element={<LoginUser />} />
//         <Route path="/logout" element={<LogoutUser />} />

        

//         <Route
//           path="/cart"
//           element={
//             <Cart
//               cartItems={cartItems}
//               handleRemoveFromCart={handleRemoveFromCart}
//             />
//           }
//         />

//         <Route
//           path="/favorites"
//           element={
//             <Favorites
//               favoriteItems={favoriteItems}
//               handleRemoveFromFavorites={handleRemoveFromFavorites}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Admin pages
import Login from './pages/admin/Login';
import ProductAdmin from './pages/admin/product_admin';
import CategoryAdmin from './pages/admin/Category_admin';
import UserAdmin from './pages/admin/User_admin';
import OrderAdmin from './pages/admin/Order_admin';
import OrderDetailAdmin from './pages/admin/Orderdetail_admin';
import OrderDetail from './pages/admin/DetailOrder';

// User pages & components
import ProductList from './pages/user/ProductList';
import ProductDetail from './pages/user/ProductDetail';
import LoginUser from './pages/user/Login_user';
import LogoutUser from './pages/user/Logout_user';
import UserHomePage from './components/Home';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import Banner from './components/Banner';
import CheckOut from './components/CheckOut';
import CheckoutSuccess from './components/Checkoutsuccess';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  // Thêm vào yêu thích (tránh trùng lặp)
  const handleAddToFavorites = (product) => {
    setFavoriteItems((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.product_Id === product.product_Id);
      return exists ? prevFavorites : [...prevFavorites, product];
    });
  };

  // Xóa khỏi giỏ hàng
  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.product_Id !== id));
  };

  // Xóa khỏi yêu thích
  const handleRemoveFromFavorites = (id) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.filter((item) => item.product_Id !== id)
    );
  };

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/productadmin" element={<ProductAdmin />} />
        <Route path="/admin/categories" element={<CategoryAdmin />} />
        <Route path="/admin/users" element={<UserAdmin />} />
        <Route path="/admin/order" element={<OrderAdmin />} />
        <Route path="/admin/orderdetail" element={<OrderDetailAdmin />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} />

        {/* User routes */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/product"
          element={
            <ProductList
              handleAddToCart={handleAddToCart}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout" element={<CheckOut cartItems={cartItems} />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/logout" element={<LogoutUser />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favoriteItems={favoriteItems}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

