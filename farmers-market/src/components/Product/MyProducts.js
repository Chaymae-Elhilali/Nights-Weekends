import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProduct.css';
import { json } from 'react-router-dom';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [productData, setProductData] = useState({
        productName: "",
        productDescription: "",
        imageUrl: null,
        productPrice: "",
        productQuantity: "",
        productCategory: ""
    });
    
    useEffect(() => {
        // Fetch products
        axios.get('http://localhost:5000/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
            setProductData(prevData => ({
                ...prevData,
                imageUrl: file
            }));
        }
    };

    const handleAddProduct = () => {
        // Send a POST request to add a new product
        const formData = new FormData();
        formData.append('name', productData.productName);
        formData.append('description', productData.productDescription);
        formData.append('imageUrl', productData.imageUrl);
        formData.append('price', productData.productPrice);
        formData.append('quantity', productData.productQuantity);
        formData.append('category', productData.productCategory);
        console.log(productData);

        // get token from local storage
        const token = localStorage.getItem('token');

        try {
            axios.post('http://localhost:5000/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    setProducts(prevProducts => [...prevProducts, response.data]);
                    // clear the form
                    setProductData({
                        productName: "",
                        productDescription: "",
                        imageUrl: null,
                        productPrice: "",
                        productQuantity: "",
                        productCategory: ""
                    });
                    // close the modal
                    setShowAddModal(false);
                })
                .catch(error => {
                    console.error("Error adding product:", error);
                });
        } catch (error) {
            console.error("Error adding product:", error);
        }



        setShowAddModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="products-container">
         <button className="add-product-btn" onClick={() => setShowAddModal(true)}>Add Product</button>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* The Add Product Modal */}
<div className="modal" style={{ display: showAddModal ? 'block' : 'none' }} onClick={() => setShowAddModal(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}> 
        <div className="modal-header">
            <h2 className="modal-title">Add New Product</h2>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>&times;</button>
        </div>
        <div className="modal-body">
            <label htmlFor="productName">Product Name:</label>
            <input 
                        type="text" 
                        id="productName" 
                        name="productName" 
                        placeholder="Enter product name" 
                        value={productData.productName} 
                        onChange={handleInputChange} 
                        required 
                    />
            <label htmlFor="productDescription">Description:</label>
            <textarea 
            id="productDescription" 
            name="productDescription" 
            placeholder="Enter product description" 
            rows="3" 
            value={productData.productDescription} 
            onChange={handleInputChange} 
            required
        ></textarea>

            <div className="image-upload-container">
                <label htmlFor="imageUrl">
                <img src={selectedImage || "/upload.jpg"} alt="Upload placeholder" className="upload-placeholder" />
                Upload Image
                </label>
                <input type="file" id="imageUrl" name="imageUrl" className="image-upload-input" onChange={handleImageChange} />
            </div>

            <label htmlFor="productPrice">Product Price:</label>
            <input type="number" id="productPrice" name="productPrice" placeholder="Enter product price" required value={productData.productPrice} onChange={handleInputChange} />

            <label htmlFor="productQuantity">Quantity:</label>
            <input type="number" id="productQuantity" name="productQuantity" placeholder="Enter product quantity" required value={productData.productQuantity} onChange={handleInputChange} />

            <label htmlFor="productCategory">Product Category:</label>
            <select id="productCategory" name="productCategory" className="styled-select" required value={productData.productCategory} onChange={handleInputChange}>
                <option value="vegetables">Vegetables </option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
            </select>
        </div>
        <div className="modal-footer">
            <button className="submit-btn" onClick={handleAddProduct}>Submit</button>
        </div>
    </div>
</div>

        </div>
    );
}

export default MyProducts;
