import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Liste des régions de Tunisie
  const regions = [
    "Tunis",
    "Ariana",
    "Ben Arous",
    "Manouba",
    "Nabeul",
    "Zaghouan",
    "Bizerte",
    "Béja",
    "Jendouba",
    "Kef",
    "Siliana",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Kairouan",
    "Kasserine",
    "Sidi Bouzid",
    "Gabès",
    "Medenine",
    "Tataouine",
    "Gafsa",
    "Tozeur",
    "Kebili"
  ];
  
  // État initial du formulaire basé sur le schéma MongoDB
  const [formData, setFormData] = useState({
    titre: '',
    prix: '',
    date: '',
    region: '',
    lieu: '',
    image: '',
    categorie: '',
  });

  // État pour les erreurs de validation du formulaire
  const [errors, setErrors] = useState({});

  // Liste des catégories disponibles
  const categories = [
    'Musique',
    'Art',
    'Sport',
    'Gastronomie',
    'Technologie',
    'Éducation',
    'Spectacle',
    'Autre'
  ];

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur quand l'utilisateur commence à saisir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Gestion du téléchargement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Pour un téléchargement réel, vous utiliseriez FormData et une API
      // Ici, nous simulons juste une URL d'image
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData({
        ...formData,
        image: file.name // Dans une application réelle, ce serait l'URL après téléchargement
      });
    }
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titre.trim()) {
      newErrors.titre = "Le titre est requis";
    }
    
    if (!formData.prix || isNaN(formData.prix) || formData.prix <= 0) {
      newErrors.prix = "Veuillez entrer un prix valide";
    }
    
    if (!formData.date) {
      newErrors.date = "La date est requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être dans le passé";
      }
    }
    
    if (!formData.region) {
      newErrors.region = "La région est requise";
    }
    
    if (!formData.lieu.trim()) {
      newErrors.lieu = "Le lieu est requis";
    }
    
    if (!formData.categorie) {
      newErrors.categorie = "La catégorie est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/event/createvents", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(formData),
      } );
      // Simuler l'envoi à un serveur

      // Dans une application réelle, vous utiliseriez fetch ou axios pour envoyer les données à votre API
      console.log('Données à envoyer:', formData);
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Rediriger vers la page des événements après succès
      alert('Événement créé avec succès !');
      navigate('/Evenements');
      
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      setErrors({
        submit: "Une erreur s'est produite lors de la création de l'événement. Veuillez réessayer."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-container">
      <div className="add-event-header">
        <h1>Créer un nouvel événement</h1>
        <p>Remplissez le formulaire ci-dessous pour ajouter un événement</p>
      </div>

      <form className="add-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titre">Titre de l'événement *</label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex: Concert de Jazz"
            className={errors.titre ? 'error' : ''}
          />
          {errors.titre && <span className="error-message">{errors.titre}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prix">Prix (TND) *</label>
            <input
              type="number"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              placeholder="Ex: 25"
              min="0"
              step="0.01"
              className={errors.prix ? 'error' : ''}
            />
            {errors.prix && <span className="error-message">{errors.prix}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="region">Région *</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={errors.region ? 'error' : ''}
            >
              <option value="">Sélectionnez une région</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
            {errors.region && <span className="error-message">{errors.region}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lieu">Lieu précis *</label>
            <input
              type="text"
              id="lieu"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              placeholder="Ex: Théâtre Municipal, Avenue Habib Bourguiba"
              className={errors.lieu ? 'error' : ''}
            />
            {errors.lieu && <span className="error-message">{errors.lieu}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categorie">Catégorie *</label>
          <select
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            className={errors.categorie ? 'error' : ''}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categorie && <span className="error-message">{errors.categorie}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image de l'événement</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Aperçu" />
              ) : (
                <div className="no-image">Aucune image sélectionnée</div>
              )}
            </div>
          </div>
        </div>

        {errors.submit && <div className="error-global">{errors.submit}</div>}

        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => navigate('/Evenements')}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer l\'événement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent; 