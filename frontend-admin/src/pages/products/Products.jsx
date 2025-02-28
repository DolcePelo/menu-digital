import { useState, useEffect } from "react";
import { getProducts, saveProduct, deleteProduct, updateProduct } from "../../api/productApi.js";
import ProductForm from "../../components/productForm/ProductForm.jsx";
import ProductList from "../../components/productList/ProductList.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSaveProduct = async (product) => {
        try {
            if (selectedProduct) {
                console.log("Updating product", product);
                await updateProduct(selectedProduct._id, product);
            } else {
                await saveProduct(product);
            }

            fetchProducts();
            setSelectedProduct(null);
        } catch (error) {
            console.error("Error al guardar el Producto", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <ProductForm onSave={handleSaveProduct} selectedProduct={selectedProduct} />
            <ProductList products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
        </div>
    );
};

export default Products;
