import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext'; // Import de AuthProvider et useAuth
import Login from "./pages/internaute/Login";
import Signup from "./pages/internaute/Signup";
import Evenements from "./pages/Evenements"; // Import de la page Evenements
import Accueil from "./pages/Accueil"; // Import de la page Accueil
import AddEvent from "./pages/organisateur/AddEvent"; // Import de la page AddEvent
import ManageEvents from "./pages/organisateur/ManageEvents"; // Import de la page ManageEvents
import Profile from "./pages/Profile"; // Import de la page Profile
import EventDetails from "./pages/EventDetails"; // Import de la page EventDetails
import Navbar from './components/Navbar'; // Import de la navbar standard
import UserNavbar from './components/UserNavbar'; // Import de la navbar utilisateur
import OrganizerNavbar from './components/OrganizerNavbar'; // Import de la navbar organisateur

// Composant qui gère l'affichage conditionnel de la navbar
const AppContent = () => {
  const { isAuthenticated, currentUser } = useAuth();
  
  // Détermine quelle navbar afficher
  const renderNavbar = () => {
    if (isAuthenticated()) {
      // Si l'utilisateur est connecté, on vérifie son rôle
      if (currentUser) {
        if (currentUser.role === 'user') {
          return <UserNavbar />;
        } else if (currentUser.role === 'organisateur' || currentUser.role === 'vendeur') {
          return <OrganizerNavbar />;
        }
      }
    }
    // Par défaut, on affiche la navbar standard
    return <Navbar />;
  };

  return (
    <Router>
      {renderNavbar()}
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
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
