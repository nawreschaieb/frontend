// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import nawres from '../assets/nawres.jpg';

const Navbar = () => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Simuler un état d'authentification (à remplacer par votre logique d'authentification réelle)
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mettre à true pour tester l'interface utilisateur connecté

  // Vérifier si le lien est actif
  const estActif = (chemin) => {
    return location.pathname === chemin;
  };

  // Gérer le scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMenuOuvert(false);
    setDropdownOpen(false);
  }, [location]);

  // Simuler une déconnexion
  const handleLogout = () => {
    setIsAuthenticated(false);
    // Ajouter ici la logique réelle de déconnexion
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">Tunisian Event</span>
        </Link>

        {/* Menu pour mobile */}
        <div className="menu-icon" onClick={() => setMenuOuvert(!menuOuvert)}>
          <div className={`hamburger ${menuOuvert ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Menu de navigation */}
        <ul className={`nav-menu ${menuOuvert ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Evenements" className={`nav-link ${estActif('/Evenements') ? 'active' : ''}`}>
              Événements
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/ManageEvents" className={`nav-link ${estActif('/ManageEvents') ? 'active' : ''}`}>
                Gérer les événements
              </Link>
            </li>
          )}
          
          {/* Boutons d'authentification pour mobile */}
          <div className="auth-buttons-mobile">
            {!isAuthenticated ? (
              <>
                <Link to="/Login" className="btn-auth login">
                  Connexion
                </Link>
                <Link to="/Signup" className="btn-auth signup">
                  Inscription
                </Link>
              </>
            ) : (
              <>
                <Link to="/Profile" className="mobile-menu-item">
                  <i className="fas fa-user"></i> Mon profil
                </Link>
                <Link to="/ManageEvents" className="mobile-menu-item">
                  <i className="fas fa-calendar-alt"></i> Mes événements
                </Link>
                <button className="mobile-menu-item logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </>
            )}
          </div>
        </ul>

        {/* Boutons d'authentification ou menu utilisateur pour desktop */}
        <div className="auth-buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/Login" className="btn-auth login">
                Connexion
              </Link>
              <Link to="/Signup" className="btn-auth signup">
                Inscription
              </Link>
            </>
          ) : (
            /* Menu utilisateur */
            <div className="user-menu">
              <div 
                className="user-avatar" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img src={nawres} alt="Avatar" />
              </div>
              
              <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
                <Link to="/Profile" className="dropdown-item">
                  <i className="fas fa-user"></i> Mon profil
                </Link>
                <Link to="/ManageEvents" className="dropdown-item">
                  <i className="fas fa-calendar-alt"></i> Mes événements
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;