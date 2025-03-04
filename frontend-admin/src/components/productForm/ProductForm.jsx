import { useState, useEffect, useRef } from 'react';


const ProductForm = ({ onSave, selectedProduct }) => {
    const [product, setProduct] = useState({ name: '', description: '', price: 0 });
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);

            setTimeout(() => {
                if (nameInputRef.current) {
                    nameInputRef.current.focus();
                    nameInputRef.current.select();
                } else {
                    console.warn("El input no está disponible todavía.");
                }
            }, 200); 
        } else {
            setProduct({ name: '', description: '', price: 0 });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product);
        setProduct({ name: '', description: '', price: 0 });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                ref={nameInputRef}
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Nombre del producto"
                className="border p-2 mr-2"
                required
            />
            <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="border p-2 mr-2"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Precio"
                className="border p-2 mr-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
                {selectedProduct ? "Actualizar" : "Agregar"}
            </button>
        </form>
    );
};

export default ProductForm;