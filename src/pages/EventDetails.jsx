import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

// Import des images (à remplacer par vos propres imports)
import concertImage from '../assets/enactus.jpg';
import artImage from '../assets/Festival.jpg';
import gastronomieImage from '../assets/festival-.jpg';
import techImage from '../assets/conference.jpg';
import sportImage from '../assets/sport.jpg';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement depuis une API
    setLoading(true);
    
    setTimeout(() => {
      // Données d'exemple - dans une application réelle, vous feriez un appel API
      const demoEvents = [
        {
          id: "1",
          titre: "Concert de Jazz",
          date: "2023-12-15",
          heure: "20:00",
          lieu: "Salle Apollo",
          region: "Tunis",
          categorie: "Musique",
          prix: 25,
          description: "Un concert de jazz avec les meilleurs artistes de la scène locale. Venez profiter d'une soirée exceptionnelle dans une ambiance chaleureuse et conviviale. Des musiciens talentueux vous feront voyager à travers différents styles de jazz.",
          image: concertImage,
          organisateur: "Association Musicale de Tunis",
          contact: "contact@musictunis.tn",
          places_disponibles: 120
        },
        {
          id: "2",
          titre: "Exposition d'Art Moderne",
          date: "2023-12-10",
          heure: "10:00",
          lieu: "Galerie Lumière",
          region: "Sousse",
          categorie: "Art",
          prix: 15,
          description: "Découvrez les œuvres des artistes contemporains les plus prometteurs. Cette exposition présente une collection diversifiée d'œuvres d'art qui explorent des thèmes actuels et des techniques innovantes.",
          image: artImage,
          organisateur: "Galerie Lumière",
          contact: "info@galerielumiere.tn",
          places_disponibles: 200
        },
        {
          id: "3",
          titre: "Festival de Gastronomie",
          date: "2023-12-18",
          heure: "12:00",
          lieu: "Parc Central",
          region: "Sfax",
          categorie: "Gastronomie",
          prix: 30,
          description: "Dégustez des plats délicieux préparés par des chefs renommés. Ce festival met en valeur la richesse culinaire tunisienne et internationale avec des dégustations, des ateliers et des démonstrations de cuisine.",
          image: gastronomieImage,
          organisateur: "Association Culinaire de Sfax",
          contact: "festival@gastronomie.tn",
          places_disponibles: 500
        },
        {
          id: "4",
          titre: "Conférence Tech",
          date: "2023-12-20",
          heure: "14:00",
          lieu: "Centre de Conférences",
          region: "Tunis",
          categorie: "Technologie",
          prix: 0,
          description: "Les dernières innovations technologiques présentées par des experts. Cette conférence rassemble des professionnels du secteur pour discuter des tendances actuelles et futures dans le domaine de la technologie.",
          image: techImage,
          organisateur: "TechTunisia",
          contact: "info@techtunisia.tn",
          places_disponibles: 300
        },
        {
          id: "5",
          titre: "Tournoi Sportif",
          date: "2023-12-22",
          heure: "19:30",
          lieu: "Stade Municipal",
          region: "Bizerte",
          categorie: "Sport",
          prix: 12,
          description: "Une compétition sportive avec les meilleures équipes de la région. Ce tournoi annuel rassemble des équipes de toute la Tunisie pour des matchs passionnants et une ambiance festive.",
          image: sportImage,
          organisateur: "Fédération Sportive de Bizerte",
          contact: "tournoi@sport.tn",
          places_disponibles: 1000
        }
      ];
      
      const foundEvent = demoEvents.find(e => e.id === id);
      
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Événement non trouvé
        console.error("Événement non trouvé");
      }
      
      setLoading(false);
    }, 800);
  }, [id]);

  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Gérer la réservation
  const handleReservation = () => {
    alert("Votre réservation a été prise en compte !");
    // Dans une application réelle, vous enverriez une requête à votre API
  };

  if (loading) {
    return (
      <div className="event-details-loading">
        <div className="spinner"></div>
        <p>Chargement des détails de l'événement...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Événement non trouvé</h2>
        <p>L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
        <button onClick={() => navigate('/Evenements')} className="btn-back">
          Retourner à la liste des événements
        </button>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <div className="event-details-header">
        <button onClick={() => navigate('/Evenements')} className="btn-back">
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>

      <div className="event-details-content">
        <div className="event-details-image">
          <img src={event.image} alt={event.titre} />
          <div className="event-category-badge">{event.categorie}</div>
        </div>

        <div className="event-details-info">
          <h1>{event.titre}</h1>
          
          <div className="event-meta">
            <div className="meta-item">
              <i className="fas fa-calendar"></i>
              <span>{formatDate(event.date)} à {event.heure}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{event.lieu}, {event.region}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-ticket-alt"></i>
              <span>{event.prix === 0 ? 'Gratuit' : `${event.prix} TND`}</span>
            </div>
          </div>

          <div className="event-description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>

          <div className="event-additional-info">
            <div className="info-item">
              <h4>Organisateur</h4>
              <p>{event.organisateur}</p>
            </div>
            <div className="info-item">
              <h4>Contact</h4>
              <p>{event.contact}</p>
            </div>
            <div className="info-item">
              <h4>Places disponibles</h4>
              <p>{event.places_disponibles}</p>
            </div>
          </div>

          <div className="event-actions">
            <button onClick={handleReservation} className="btn-reserve">
              Réserver maintenant
            </button>
            <button className="btn-share">
              <i className="fas fa-share-alt"></i> Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 