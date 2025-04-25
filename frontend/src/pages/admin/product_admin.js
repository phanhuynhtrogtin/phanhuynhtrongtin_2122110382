import React, { useState, useEffect } from 'react';
import api from '../../services/Api';
import AdminDashboard from '../../components/AdminDashboard';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_Name: '',
    price: '',
    image: '',
    description: '',
    categoryId: '',
    imageFile: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/product')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Lỗi khi lấy sản phẩm:', error));
  }, []);

  useEffect(() => {
    api.get('/Category')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Lỗi khi lấy danh mục:', error));
  }, []);

  // const handleAddProduct = () => {
  //   if (newProduct.product_Name && newProduct.price && newProduct.categoryId && newProduct.image) {
  //     const productData = {
  //       product_Name: newProduct.product_Name,
  //       price: newProduct.price,
  //       image: newProduct.image,
  //       description: newProduct.description,
  //       cat_Id: newProduct.categoryId, // backend dùng cat_Id
  //     };

  //     api.post('/product', productData)
  //       .then((response) => {
  //         console.log('Thêm sản phẩm thành công:', response.data);
  //         setProducts([...products, response.data]);
  //         setNewProduct({ product_Name: '', price: '', image: '', description: '', categoryId: '', imageFile: null });
  //         setShowAddForm(false);
  //       })
  //       .catch((error) => {
  //         console.error('Lỗi khi thêm sản phẩm:', error);
  //         alert('Không thể thêm sản phẩm. Vui lòng kiểm tra lại.');
  //       });
  //   } else {
  //     alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
  //   }
  // };
  const handleAddProduct = () => {
    if (newProduct.product_Name && newProduct.price && newProduct.categoryId) {
      const addProduct = (imageUrl) => {
        const productData = {
          product_Name: newProduct.product_Name,
          price: newProduct.price,
          image: imageUrl,
          description: newProduct.description,
          cat_Id: newProduct.categoryId,
        };
  
        api.post('/product', productData)
          .then((response) => {
            console.log('Thêm sản phẩm thành công:', response.data);
            setProducts([...products, response.data]);
            setNewProduct({ product_Name: '', price: '', image: '', description: '', categoryId: '', imageFile: null });
            setShowAddForm(false);
          })
          .catch((error) => {
            console.error('Lỗi khi thêm sản phẩm:', error);
            alert('Không thể thêm sản phẩm. Vui lòng kiểm tra lại.');
          });
      };
  
      if (newProduct.imageFile) {
        const formData = new FormData();
        formData.append('file', newProduct.imageFile);
  
        api.post('/product/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((uploadResponse) => {
            addProduct(uploadResponse.data.image); // sử dụng ảnh từ upload
          })
          .catch((error) => {
            console.error('Lỗi khi upload ảnh:', error);
            alert('Không thể upload ảnh.');
          });
      } else if (newProduct.image) {
        // Trường hợp dùng URL ảnh
        addProduct(newProduct.image);
      } else {
        alert('Vui lòng chọn ảnh hoặc nhập URL ảnh!');
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
    }
  };
  

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      api.delete(`/product/${id}`)
        .then(() => {
          setProducts(products.filter((product) => product.product_Id !== id));
        })
        .catch((error) => console.error('Lỗi khi xóa sản phẩm:', error));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    if (editingProduct.imageFile) {
      const formData = new FormData();
      formData.append('file', editingProduct.imageFile);
      formData.append('productId', editingProduct.product_Id);

      api.post('/product/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((uploadResponse) => {
          const updatedProduct = {
            ...editingProduct,
            image: uploadResponse.data.image,
          };return api.put(`/product/${editingProduct.product_Id}`, updatedProduct);
        })
        .then(() => {
          api.get('/product').then((response) => {
            setProducts(response.data);
            setEditingProduct(null);
            setShowEditForm(false);
          });
        })
        .catch((error) => console.error('Lỗi khi cập nhật sản phẩm:', error));
    } else {
      api.put(`/product/${editingProduct.product_Id}`, editingProduct)
        .then(() => {
          api.get('/product').then((response) => {
            setProducts(response.data);
            setEditingProduct(null);
            setShowEditForm(false);
          });
        })
        .catch((error) => console.error('Lỗi khi cập nhật sản phẩm:', error));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminDashboard />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        <h1>Quản lý sản phẩm</h1>
        <button style={styles.addButton} onClick={() => setShowAddForm(true)}>Thêm sản phẩm</button>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Hình ảnh</th>
              <th style={styles.th}>Tên sản phẩm</th>
              <th style={styles.th}>Giá</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.product_Id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={styles.td}>{product.product_Id}</td>
                <td style={styles.td}>
                  <img
                    src={`http://localhost:5077/api/Product/${product.product_Id}/image`}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                </td>
                <td style={styles.td}>{product.product_Name}</td>
                <td style={styles.td}>{product.price} VNĐ</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => handleEditProduct(product)}>Sửa</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteProduct(product.product_Id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddForm && (
          <div style={styles.modal}>
            <h2>Thêm sản phẩm</h2>
            <input type="text" placeholder="Tên sản phẩm" value={newProduct.product_Name}
              onChange={(e) => setNewProduct({ ...newProduct, product_Name: e.target.value })} style={styles.input} />
            <input type="number" placeholder="Giá sản phẩm" value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={styles.input} />
            <input type="text" placeholder="URL hình ảnh" value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} style={styles.input} />
            <textarea placeholder="Mô tả sản phẩm" value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} style={styles.textarea} />
            <select value={newProduct.categoryId}
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })} style={styles.input}>
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.cat_Id} value={category.cat_Id}>{category.cat_Name}</option>
              ))}
            </select>
            <button style={styles.saveButton} onClick={handleAddProduct}>Lưu</button>
            <button style={styles.cancelButton} onClick={() => setShowAddForm(false)}>Hủy</button>
          </div>
        )}

        {showEditForm && editingProduct && (
          <div style={styles.modal}>
            <h2>Chỉnh sửa sản phẩm</h2>
            <input type="text" value={editingProduct.product_Name}
              onChange={(e) => setEditingProduct({ ...editingProduct, product_Name: e.target.value })} style={styles.input} />
            <input type="number" value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} style={styles.input} />
            <input type="text" value={editingProduct.image}
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} style={styles.input} />
            <textarea value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} style={styles.textarea} />
            <select value={editingProduct.cat_Id}
              onChange={(e) => setEditingProduct({ ...editingProduct, cat_Id: e.target.value })} style={styles.input}>
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.cat_Id} value={category.cat_Id}>{category.cat_Name}</option>
              ))}
            </select>
            <input type="file" accept="image/*"
              onChange={(e) => setEditingProduct({ ...editingProduct, imageFile: e.target.files[0] })} style={styles.input} /><button style={styles.saveButton} onClick={handleSaveEdit}>Lưu</button>
              <button style={styles.cancelButton} onClick={() => setShowEditForm(false)}>Hủy</button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const styles = {
    table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
    th: { padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'left' },
    td: { padding: '10px', borderBottom: '1px solid #ddd' },
    addButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
    editButton: { padding: '5px 10px', backgroundColor: '#FFD700', color: 'white', border: 'none', cursor: 'pointer' },
    deleteButton: { padding: '5px 10px', backgroundColor: '#FF6347', color: 'white', border: 'none', cursor: 'pointer' },
    modal: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    },
    input: { padding: '10px', margin: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '300px' },
    textarea: { padding: '10px', margin: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '300px', height: '100px' },
    saveButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
    cancelButton: { padding: '10px 20px', backgroundColor: '#FF6347', color: 'white', border: 'none', cursor: 'pointer' },
  };
  
  export default ProductAdmin;