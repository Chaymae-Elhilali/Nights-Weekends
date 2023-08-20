import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProduct.css';
import { json } from 'react-router-dom';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); 
    const [selectedEditImage, setSelectedEditImage] = useState(null);
   const [editProductData, setEditProductData] = useState({
    productName: "",
    productDescription: "",
    imageUrl: null,
    productPrice: "",
    productQuantity: "",
    productCategory: ""
});

    const baseUrl = 'https://api-0l05.onrender.com';


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
        axios.get(baseUrl+'/products/')
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
            axios.post(baseUrl+'/products/', formData, {
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
    const handleEditProduct = (productId) => {
    const productToEdit = products.find(product => product._id === productId);
    setEditingProduct(productToEdit);
    setEditProductData({
        productName: productToEdit.name,
        productDescription: productToEdit.description,
        imageUrl: productToEdit.imageUrl,
        productPrice: productToEdit.price,
        productQuantity: productToEdit.quantity,
        productCategory: productToEdit.category
    });
    setShowEditModal(true);
};


    const handleUpdateProduct = async () => {
        const formData = new FormData();
        formData.append('name', editProductData.productName);
        formData.append('description', editProductData.productDescription);
        formData.append('imageUrl', editProductData.imageUrl);
        formData.append('price', editProductData.productPrice);
        formData.append('quantity', editProductData.productQuantity);
        formData.append('category', editProductData.productCategory);

        const token = localStorage.getItem('token');
    
    try {
        await axios.put(`${baseUrl}/products/${editingProduct._id}`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        // Update local products list
        const updatedProducts = products.map(product =>
            product._id === editingProduct._id ? {...editingProduct, ...editProductData} : product
        );
        setProducts(updatedProducts);
        // Close the modal
        setShowEditModal(false);
    } catch (error) {
        console.error("Error updating product:", error);
    }
};


    const handleDeleteProduct = async (productId) => {
          const token = localStorage.getItem('token');
        try {
            await axios.delete(`${baseUrl}/products/${productId}`,{
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
            });
            // Filter out the deleted product
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleImageChangeForEdit = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setSelectedEditImage(reader.result); // This assumes you have a similar state to `selectedImage` for the edit product image
    }

    if (file) {
        reader.readAsDataURL(file);
        setEditProductData(prevData => ({
            ...prevData,
            imageUrl: file
        }));
    }
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
                                <button className="edit-btn" onClick={() => handleEditProduct(product._id)}>Edit</button>
    <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
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
    {/* update model */}
    

</div>
<div className="modal" style={{ display: showEditModal ? 'block' : 'none' }} onClick={() => setShowEditModal(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}> 
        <div className="modal-header">
            <h2 className="modal-title">Edit Product</h2>
            <button className="close-btn" onClick={() => setShowEditModal(false)}>&times;</button>
        </div>
        <div className="modal-body">
            <label htmlFor="editProductName">Product Name:</label>
            <input 
                type="text" 
                id="editProductName" 
                name="productName" 
                placeholder="Enter product name" 
                value={editProductData.productName} 
                onChange={(e) => {
                    const { name, value } = e.target;
                    setEditProductData(prevData => ({ ...prevData, [name]: value }));
                }} 
                required 
            />

            <label htmlFor="editProductDescription">Description:</label>
            <textarea 
                id="editProductDescription" 
                name="productDescription" 
                placeholder="Enter product description" 
                rows="3" 
                value={editProductData.productDescription} 
                onChange={(e) => {
                    const { name, value } = e.target;
                    setEditProductData(prevData => ({ ...prevData, [name]: value }));
                }} 
                required
            ></textarea>

            <div className="image-upload-container">
                <label htmlFor="editImageUrl">
                <img src={selectedEditImage || "/upload.jpg"} alt="Upload placeholder" className="upload-placeholder" />
                Change Image
                </label>
                <input 
                    type="file" 
                    id="editImageUrl" 
                    name="imageUrl" 
                    className="image-upload-input" 
                    onChange={handleImageChangeForEdit} 
                />
            </div>

            <label htmlFor="editProductPrice">Product Price:</label>
            <input 
                type="number" 
                id="editProductPrice" 
                name="productPrice" 
                placeholder="Enter product price" 
                value={editProductData.productPrice} 
                onChange={(e) => {
                    const { name, value } = e.target;
                    setEditProductData(prevData => ({ ...prevData, [name]: value }));
                }} 
                required 
            />

            <label htmlFor="editProductQuantity">Quantity:</label>
            <input 
                type="number" 
                id="editProductQuantity" 
                name="productQuantity" 
                placeholder="Enter product quantity" 
                value={editProductData.productQuantity} 
                onChange={(e) => {
                    const { name, value } = e.target;
                    setEditProductData(prevData => ({ ...prevData, [name]: value }));
                }} 
                required 
            />

            <label htmlFor="editProductCategory">Product Category:</label>
            <select 
                id="editProductCategory" 
                name="productCategory" 
                className="styled-select" 
                value={editProductData.productCategory} 
                onChange={(e) => {
                    const { name, value } = e.target;
                    setEditProductData(prevData => ({ ...prevData, [name]: value }));
                }} 
                required
            >
                <option value="vegetables">Vegetables </option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
            </select>
        </div>
        <div className="modal-footer">
            <button className="submit-btn" onClick={handleUpdateProduct}>Update</button>
        </div>
    </div>
</div>


        </div>
    );
}

export default MyProducts;
