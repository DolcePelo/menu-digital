import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/login" replace={true} />
    }
    return children;
};

export default ProtectedRoute;