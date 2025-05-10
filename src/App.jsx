import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // Import unique de AuthProvider
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Evenements from "./pages/Evenements"; // Import de la page Evenements
import Accueil from "./pages/Accueil"; // Import de la page Accueil
import AddEvent from "./pages/AddEvent"; // Import de la page AddEvent
import ManageEvents from "./pages/ManageEvents"; // Import de la page ManageEvents
import Profile from "./pages/Profile"; // Import de la page Profile
import EventDetails from "./pages/EventDetails"; // Import de la page EventDetails
import Navbar from './components/Navbar'; // Chemin relatif vers votre composant


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
          <Route path="/Evenements" element={<Evenements />} /> {/* Route pour la page d'événements */}
          <Route path="/AddEvent" element={<AddEvent />} /> {/* Route pour la page d'ajout d'événement */}
          <Route path="/ManageEvents" element={<ManageEvents />} /> {/* Route pour la gestion des événements */}
          <Route path="/Profile" element={<Profile />} /> {/* Route pour la page de profil */}
          <Route path="/EventDetails/:id" element={<EventDetails />} /> {/* Route pour la page de détails d'événement */}
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
