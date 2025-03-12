import { useState, useEffect } from "react";
import { getProducts, saveProduct, deleteProduct, updateProduct, addProductToCategory } from "../../api/productApi.js";
import ProductForm from "../../components/product/productForm/ProductForm.jsx";
import ProductList from "../../components/product/productList/ProductList.jsx";
import CategoryModal from "../../components/category/categoryModal/CategoryModal.jsx";
import Swal from "sweetalert2";

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
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás recuperar este producto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(id);
                    fetchProducts();
                    Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
                } catch (error) {
                    console.error("Error al eliminar el producto:", error);
                    Swal.fire("Error", "No se pudo eliminar el producto.", "error");
                }
            }
        });
    };


    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleAssignCategory = async (productId, categoryId) => {
        try {
            await addProductToCategory(productId, categoryId);
            fetchProducts();
            setSelectedProduct(null);
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
