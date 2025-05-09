import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // Import unique de AuthProvider
import { VendeurRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';


import Login from "./pages/Login";
import Signup from "./pages/Signup";
 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Route par défaut qui redirige vers l'accueil */}
          <Route path="/" element={<Navigate to="/Accueil" />} />
          {/* Route d'accueil sans espace après "Accueil" */}
          <Route path="/Accueil" element={<Accueil />} />
          
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
