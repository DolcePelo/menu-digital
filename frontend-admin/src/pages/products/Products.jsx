import { useState, useEffect } from "react";
import { getProducts, saveProduct, deleteProduct, updateProduct, addProductToCategory } from "../../api/productApi.js";
import ProductForm from "../../components/productForm/ProductForm.jsx";
import ProductList from "../../components/productList/ProductList.jsx";
import CategoryModal from "../../components/categoryModal/CategoryModa.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
                console.log("selected product: ", selectedProduct._id)
                console.log(product)
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

    const handleAssignCategory = async (productId, categoryId) => {
        try {
            await addProductToCategory(productId, categoryId);
            fetchProducts();
        } catch (error) {
            console.error("Error al asignar categoría al producto:", error);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <ProductForm onSave={handleSaveProduct} selectedProduct={selectedProduct} />
            <ProductList products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct} onOpenCategoryModal={(product) => {
                setSelectedProduct(product);
                setModalOpen(true);
            }} />
            <CategoryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onAssignCategory={handleAssignCategory}
                product={selectedProduct}
            />
        </div>
    );
};

export default Products;
