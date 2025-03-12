import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../api/authConfig.js";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ email, password, name });
            navigate("/login");
        } catch (error) {
            setError("Error al crear la cuenta");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4">Registro</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input className="block border p-2 w-full" type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="block border p-2 w-full mt-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="block border p-2 w-full mt-2" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-green-500 text-white px-4 py-2 mt-3" type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Signup;
