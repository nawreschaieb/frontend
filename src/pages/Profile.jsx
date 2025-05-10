import React, { useState, useEffect } from 'react';
import './Profile.css';
import nawres from '../assets/nawres.jpg';


const Profile = () => {
  // État pour le mode d'édition
  const [isEditing, setIsEditing] = useState(false);
  // État pour le chargement
  const [loading, setLoading] = useState(true);
  // État pour les messages de succès/erreur
  const [message, setMessage] = useState({ type: '', text: '' });

  // État pour les données du profil
  const [profileData, setProfileData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    codePostal: '',
    bio: '',
    avatar: null,
    preferences: {
      musique: false,
      art: false,
      sport: false,
      gastronomie: false,
      technologie: false,
      education: false,
      spectacle: false
    }
  });

  // Charger les données du profil (simulation)
  useEffect(() => {
    setTimeout(() => {
      // Simuler un chargement de données depuis une API
      const userData = {
        nom: 'chaieb',
        prenom: 'nawres',
        email: 'chaieb.nawres2@gmail.com',
        telephone: '58771710',
        adresse: 'Rue Med Fadhel Ben Achour ',
        ville: 'Jammel',
        codePostal: '5020',
        bio: ' Passionné par la musique, l\'art, le sport, la technologie et l\'éducation.',
       

        avatar: nawres,
        preferences: {
          musique: true,
          art: true,
          sport: true,
          gastronomie: false,
          technologie: true,
          education: true,
          spectacle: false
        }
      };

      setProfileData(userData);
      setLoading(false);
    }, 1000);
  }, []);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('pref-')) {
      const preference = name.replace('pref-', '');
      setProfileData(prevData => ({
        ...prevData,
        preferences: {
          ...prevData.preferences,
          [preference]: checked
        }
      }));
    } else {
      setProfileData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Gérer le téléchargement d'avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prevData => ({
          ...prevData,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Simuler un appel API pour mettre à jour le profil
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simuler une réponse réussie
      setMessage({
        type: 'success',
        text: 'Votre profil a été mis à jour avec succès!'
      });
      
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Une erreur est survenue lors de la mise à jour du profil.'
      });
    } finally {
      setLoading(false);
      
      // Effacer le message après quelques secondes
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    }
  };

  // Annuler les modifications
  const handleCancel = () => {
    // Recharger les données originales
    setIsEditing(false);
  };

  if (loading && !profileData.nom) {
    return (
      <div className="profile-container">
        <div className="loading-indicator">
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles et préférences</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-container">
            <img 
              src={profileData.avatar || 'https://via.placeholder.com/150'} 
              alt="Avatar de profil" 
              className="avatar"
            />
            {isEditing && (
              <div className="avatar-upload">
                <label htmlFor="avatar-input" className="avatar-edit-btn">
                  <i className="fas fa-camera"></i>
                </label>
                <input 
                  type="file" 
                  id="avatar-input" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
          <h2>{profileData.prenom} {profileData.nom}</h2>
          <p className="email">{profileData.email}</p>
          
          {!isEditing && (
            <button 
              className="btn-edit-profile"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit"></i> Modifier le profil
            </button>
          )}
        </div>

        <div className="profile-details">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Informations personnelles</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input 
                    type="text" 
                    id="prenom" 
                    name="prenom"
                    value={profileData.prenom}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input 
                    type="text" 
                    id="nom" 
                    name="nom"
                    value={profileData.nom}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone</label>
                  <input 
                    type="tel" 
                    id="telephone" 
                    name="telephone"
                    value={profileData.telephone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Adresse</h3>
              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <input 
                  type="text" 
                  id="adresse" 
                  name="adresse"
                  value={profileData.adresse}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ville">Ville</label>
                  <input 
                    type="text" 
                    id="ville" 
                    name="ville"
                    value={profileData.ville}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="codePostal">Code postal</label>
                  <input 
                    type="text" 
                    id="codePostal" 
                    name="codePostal"
                    value={profileData.codePostal}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>À propos de moi</h3>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="form-section">
              <h3>Préférences d'événements</h3>
              <div className="preferences-grid">
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-musique" 
                    name="pref-musique"
                    checked={profileData.preferences.musique}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-musique">Musique</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-art" 
                    name="pref-art"
                    checked={profileData.preferences.art}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-art">Art</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-sport" 
                    name="pref-sport"
                    checked={profileData.preferences.sport}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-sport">Sport</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-gastronomie" 
                    name="pref-gastronomie"
                    checked={profileData.preferences.gastronomie}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-gastronomie">Gastronomie</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-technologie" 
                    name="pref-technologie"
                    checked={profileData.preferences.technologie}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-technologie">Technologie</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-education" 
                    name="pref-education"
                    checked={profileData.preferences.education}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-education">Éducation</label>
                </div>
                <div className="preference-item">
                  <input 
                    type="checkbox" 
                    id="pref-spectacle" 
                    name="pref-spectacle"
                    checked={profileData.preferences.spectacle}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <label htmlFor="pref-spectacle">Spectacle</label>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 