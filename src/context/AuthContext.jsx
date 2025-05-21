// src/context/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Pour décoder le token JWT

// Création du contexte d'authentification
const AuthContext = createContext(null);

// Composant Provider qui encapsule l'application
export function AuthProvider({ children }) {
  // État pour stocker l'utilisateur actuellement connecté
  const [currentUser, setCurrentUser] = useState({
    // Utilisateur simulé à des fins de test
    id: '123',
    name: 'Organisateur Test',
    role: 'organisateur', // Rôle "organisateur" pour tester la OrganizerNavbar
    roles: ['organisateur'],
    token: 'fake-token-for-testing'
  });

  // État pour indiquer si la vérification de l'authentification est en cours
  const [isLoading, setIsLoading] = useState(false);

  // Vérifie l'authentification dès le chargement de l'application
  useEffect(() => {
    // En mode test, nous n'appelons pas checkAuth() car nous avons déjà un utilisateur simulé
    // Dans un environnement de production, vous devriez décommenter cette ligne
    // checkAuth();
  }, []);

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
            role: decoded.role,
            roles: decoded.roles || [], // Assure que 'roles' est un tableau
            token,
          });
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
    checkAuth(); // Recharge l'état utilisateur
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    // Pour le test, nous gardons l'utilisateur simulé
    // Dans un environnement de production, vous devriez décommenter cette ligne
    // setCurrentUser(null);
  };

  // Fonction utilitaire pour vérifier un rôle
  const hasRole = (role) => {
    if (!currentUser) return false;
    return currentUser.role === role || currentUser.roles.includes(role);
  };

  // Fonction pour savoir si l'utilisateur est un vendeur
  const isVendeur = () => hasRole('vendeur');

  // Fonction pour savoir si l'utilisateur est un admin
  const isAdmin = () => hasRole('admin');

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
    isVendeur,
    isAdmin,
  };

  // Fournit le contexte à tous les enfants du composant
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour utiliser facilement le contexte dans les composants
export function useAuth() {
  return useContext(AuthContext);
}