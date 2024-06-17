import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children, roles }) => {
    const state = useSelector(state => state.authUser);
    const user = state.user;
    const authStatus = state.request;
  
    if (authStatus) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (roles && roles.includes(user.role)) return <Navigate to="/" />;
    // console.log(!roles.includes(user.role));
    return children;
  };

  export default ProtectedRoute;