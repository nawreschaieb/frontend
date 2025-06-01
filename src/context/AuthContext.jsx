// src/context/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Pour décoder le token JWT

// Création du contexte d'authentification
const AuthContext = createContext(null);

// Composant Provider qui encapsule l'application
export function AuthProvider({ children }) {
  // État pour stocker l'utilisateur actuellement connecté
const [currentUser, setCurrentUser] = useState(null); // ← Ne plus avoir un utilisateur simulé


  // État pour indiquer si la vérification de l'authentification est en cours
  const [isLoading, setIsLoading] = useState(false);

  // Vérifie l'authentification dès le chargement de l'application
useEffect(() => {
  checkAuth();
}, []);

useEffect(() => {
  if (currentUser) {
    console.log("✅ currentUser changé:", currentUser);
    console.log("✅ isAuthenticated():", isAuthenticated());
    console.log("✅ isOrganisateur():", isOrganisateur());
    console.log("✅ isParticipant():", isParticipant());
  }
}, [currentUser]);

  // Fonction qui vérifie si un token valide est présent
  const checkAuth = () => {
    setIsLoading(true); // Démarre le chargement
    try {
      const token = localStorage.getItem('token'); // Récupère le token dans le stockage local

      if (token) {
        const decoded = jwtDecode(token); // Décode le token JWT
        console.log("Token décodé:", decoded);

        // Vérifie si le token n'est pas expiré
        if (decoded.exp * 1000 > Date.now()) {
          // Stocke les informations utilisateur dans l'état
        setCurrentUser({
  id: decoded.id,
  name: decoded.name,
  role: decoded.role,       // rôle unique (string)
  roles: decoded.roles || [], // tableau de rôles
  token,
});
console.log("Token décodé:", decoded);




        } else {
          // Si le token a expiré, on le supprime
          localStorage.removeItem('token');
          setCurrentUser(null);
        }
      } else {
        // Aucun token => aucun utilisateur connecté
        // Pour le test, nous gardons l'utilisateur simulé
        // Dans un environnement de production, vous devriez décommenter cette ligne
        // setCurrentUser(null);
      }
    } catch (error) {
      // Erreur lors du décodage ou traitement du token
      console.error("Erreur lors de la vérification de l'authentification:", error);
      localStorage.removeItem('token');
      // Pour le test, nous gardons l'utilisateur simulé
      // Dans un environnement de production, vous devriez décommenter cette ligne
      // setCurrentUser(null);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  // Fonction de connexion (facultatif mais pratique)
  const login = (token) => {
    localStorage.setItem('token', token);
    checkAuth(); 
    window.reload();
    // Recharge l'état utilisateur
  };

  // Fonction de déconnexion
const logout = () => {
  console.log("Déconnexion : suppression du token localStorage");
  localStorage.removeItem('token');
  setCurrentUser(null);
  console.log("Token après suppression :", localStorage.getItem('token')); 

};


  // Fonction utilitaire pour vérifier un rôle
const hasRole = (role) => {
  if (!currentUser) return false;

  const userRole = currentUser.role;
  const userRoles = currentUser.roles || [];

  // Vérifie si role est dans roles ou égal à role unique
  return (typeof userRole === 'string' && userRole === role) || userRoles.includes(role);
};

  // Fonction pour savoir si l'utilisateur est un vendeur
  const isOrganisateur = () => hasRole('organisateur');

  // Fonction pour savoir si l'utilisateur est un admin
  const isParticipant = () => hasRole('participant');

  // Vérifie simplement si un utilisateur est connecté
  const isAuthenticated = () => !!currentUser;

  // Toutes les valeurs disponibles dans le contexte
  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    checkAuth,
    isAuthenticated,
    isOrganisateur ,
    isParticipant,
  };

  // Fournit le contexte à tous les enfants du composant
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour utiliser facilement le contexte dans les composants
export function useAuth() {
  return useContext(AuthContext);
}