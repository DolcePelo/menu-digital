import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authConfig.js";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password); //ojo con las {}
            setUser(response);
            console.log("reponse.data: ",response)
            navigate("/dashboard");
        } catch (error) {
            setError("usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form className="p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-4">Iniciar sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input className="block border p-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="block border p-2 w-full mt-2" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white px-4 py-2 mt-3" type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;