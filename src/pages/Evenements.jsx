import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Evenements.css';
// Import des images
import concertImage from '../assets/enactus.jpg';
import artImage from '../assets/Festival.jpg';
import gastronomieImage from '../assets/festival-.jpg';
import techImage from '../assets/conference.jpg';
import sportImage from '../assets/sport.jpg';

const Evenements = () => {
  const navigate = useNavigate();
  // État pour stocker les événements
  const [evenements, setEvenements] = useState([]);
  // État pour le filtre de recherche
  const [recherche, setRecherche] = useState('');
  // État pour le filtre de catégorie
  const [categorie, setCategorie] = useState('');
  // État pour le chargement
  const [chargement, setChargement] = useState(true);

  // Données d'exemple (à remplacer par un appel API réel)
  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      const evenementsDemo = [
        {
          id: 1,
          titre: "Concert de Jazz",
          date: "2023-12-15",
          heure: "20:00",
          lieu: "Salle Apollo",
          categorie: "Musique",
          description: "Un concert de jazz avec les meilleurs artistes de la scène locale.",
          image: concertImage
        },
        {
          id: 2,
          titre: "Exposition d'Art Moderne",
          date: "2023-12-10",
          heure: "10:00",
          lieu: "Galerie Lumière",
          categorie: "Art",
          description: "Découvrez les œuvres des artistes contemporains les plus prometteurs.",
          image: artImage
        },
        {
          id: 3,
          titre: "Festival de Gastronomie",
          date: "2023-12-18",
          heure: "12:00",
          lieu: "Parc Central",
          categorie: "Gastronomie",
          description: "Dégustez des plats délicieux préparés par des chefs renommés.",
          image: gastronomieImage
        },
        {
          id: 4,
          titre: "Conférence Tech",
          date: "2023-12-20",
          heure: "14:00",
          lieu: "Centre de Conférences",
          categorie: "Technologie",
          description: "Les dernières innovations technologiques présentées par des experts.",
          image: techImage
        },
        {
          id: 5,
          titre: "Tournoi Sportif",
          date: "2023-12-22",
          heure: "19:30",
          lieu: "Stade Municipal",
          categorie: "Sport",
          description: "Une compétition sportive avec les meilleures équipes de la région.",
          image: sportImage
        }
      ];
      
      setEvenements(evenementsDemo);
      setChargement(false);
    }, 1000);
  }, []);

  // Filtrer les événements selon la recherche et la catégorie
  const evenementsFiltres = evenements.filter(event => {
    const matchRecherche = event.titre.toLowerCase().includes(recherche.toLowerCase()) || 
                           event.description.toLowerCase().includes(recherche.toLowerCase());
    const matchCategorie = categorie === '' || event.categorie === categorie;
    
    return matchRecherche && matchCategorie;
  });

  // Liste des catégories uniques pour le filtre
  const categories = [...new Set(evenements.map(event => event.categorie))];

  // Fonction pour naviguer vers la page de détails
  const voirDetails = (eventId) => {
    navigate(`/EventDetails/${eventId}`);
  };

  return (
    <div className="evenements-container">
      <div className="evenements-header">
        <h1>Événements à venir</h1>
        <p>Découvrez tous les événements passionnants organisés près de chez vous</p>
      </div>
      <div className="filtres">
        <div className="recherche">
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
        
        <div className="filtre-categorie">
          <select 
            value={categorie} 
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {chargement ? (
        <div className="chargement">
          <p>Chargement des événements...</p>
        </div>
      ) : (
        <div className="liste-evenements">
          {evenementsFiltres.length > 0 ? (
            evenementsFiltres.map(event => (
              <div className="carte-evenement" key={event.id}>
                <div className="image-evenement">
                  <img src={event.image} alt={event.titre} />
                </div>
                <div className="details-evenement">
                  <h2>{event.titre}</h2>
                  <div className="info-evenement">
                    <p className="date-heure">
                      <i className="fas fa-calendar"></i> {new Date(event.date).toLocaleDateString()} à {event.heure}
                    </p>
                    <p className="lieu">
                      <i className="fas fa-map-marker-alt"></i> {event.lieu}
                    </p>
                    <p className="categorie">
                      <span className="badge">{event.categorie}</span>
                    </p>
                  </div>
                  <p className="description">{event.description}</p>
                  <button 
                    className="btn-details"
                    onClick={() => voirDetails(event.id)}
                  >
                    Voir les détails
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="aucun-resultat">
              <p>Aucun événement ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Evenements; 