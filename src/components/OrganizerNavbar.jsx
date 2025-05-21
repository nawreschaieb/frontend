import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Réutilisation du même CSS
import nawres from '../assets/nawres.jpg';
import { useAuth } from '../context/AuthContext';

const OrganizerNavbar = () => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

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

  // Gérer la déconnexion
  const handleLogout = () => {
    logout();
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

        {/* Menu de navigation - Adapté pour l'organisateur */}
        <ul className={`nav-menu ${menuOuvert ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/Evenements" className={`nav-link ${estActif('/Evenements') ? 'active' : ''}`}>
              Événements
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ManageEvents" className={`nav-link ${estActif('/ManageEvents') ? 'active' : ''}`}>
            Gérer les Événements
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/AddEvent" className={`nav-link ${estActif('/AddEvent') ? 'active' : ''}`}>
              Ajouter Événement
            </Link>
          </li>
          
          {/* Boutons d'authentification pour mobile */}
          <div className="auth-buttons-mobile">
            <Link to="/Profile" className="mobile-menu-item">
              <i className="fas fa-user"></i> Mon profil
            </Link>
            <button className="mobile-menu-item logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </div>
        </ul>

        {/* Menu utilisateur pour desktop */}
        <div className="auth-buttons">
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
              <Link to="/AddEvent" className="dropdown-item">
                <i className="fas fa-plus-circle"></i> Ajouter un événement
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar; 