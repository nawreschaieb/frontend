import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import nawres from '../assets/nawres.jpg';
import { useAuth } from '../context/AuthContext';



const Navbar = () => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const { logout, isOrganisateur, isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOuvert(false);
    setDropdownOpen(false);
  }, [location]);

const handleLogout = () => {
  logout();          // supprime le token et remet currentUser à null
   window.location.reload();
  navigate("/Login"); // redirige vers la page de login
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
        <div className="organisateur-menu flex gap-6 items-center">

         {isAuthenticated() && !isOrganisateur() && (
    <>
       <Link to="/Evenements" className="text-black bg-white hover:bg-blue-400 hover:text-white px-3 py-1 rounded text-sm">
    Événements
  </Link>
    </>
  )}   


  {isAuthenticated() && isOrganisateur() && (
    <>
      <Link to="/ManageEvents" className="text-black bg-white hover:bg-blue-400 hover:text-white px-3 py-1 rounded text-sm">
        Gérer événement
      </Link>
      <Link to="/AddEvent" className="text-black bg-white hover:bg-blue-400 hover:text-white px-3 py-1 rounded text-sm">
        Ajouter événement
      </Link>
    </>
  )}
</div>


        {/* Boutons d'authentification pour mobile */}
        <div className="auth-buttons-mobile">
          {!isAuthenticated() ? (
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
              <Link to="/ManageEvents" className="mobile-menu-item">
                <i className="fas fa-calendar-alt"></i> Mes reservations
              </Link>
              <button className="mobile-menu-item logout" onClick={handleLogout}>
                <Link to="/Login" className="mobile-menu-item logout"></Link>
                <i className="fas fa-sign-out-alt"></i> Déconnexion
              </button>
            </>
          )}
        </div>

       {/* Menu utilisateur (desktop) */}
<div className="auth-buttons">
  {!isAuthenticated() ? (
    <>
      <Link to="/Login" className="btn-auth login">
        Connexion
      </Link>
      <Link to="/Signup" className="btn-auth signup">
        Inscription
      </Link>
    </>
  ) : (
    
    <div className="user-menu">
      <div className="user-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={nawres} alt="Avatar" />
      </div>

      <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
        <Link to="/Profile" className="dropdown-item">
          <i className="fas fa-user"></i> Mon profil
        </Link>

        {/* Afficher "Mes réservations" seulement si ce n'est PAS un organisateur */}
        {!isOrganisateur() && (
          <Link to="/MesReservations" className="dropdown-item">
            <i className="fas fa-calendar-check"></i> Mes réservations
          </Link>
        )}

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
