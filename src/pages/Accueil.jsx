import React from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css';

const Accueil = () => {
  return (
    <div className="accueil-container">
      <div className="accueil-header">
        <h1>Bienvenue sur notre plateforme</h1>
        <p>Découvrez tous nos services et événements</p>
      </div>

      <div className="accueil-sections">
        <div className="section">
          <h2>Événements à venir</h2>
          <p>Consultez notre liste d'événements pour ne rien manquer des activités à venir dans votre région.</p>
          <Link to="/Evenements" className="btn-accueil">Voir les événements</Link>
        </div>

        <div className="section">
          <h2>Rejoignez-nous</h2>
          <p>Créez un compte ou connectez-vous pour profiter de tous nos services.</p>
          <div className="boutons-groupe">
            <Link to="/Login" className="btn-accueil">Connexion</Link>
            <Link to="/Signup" className="btn-accueil btn-secondaire">Inscription</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil; 