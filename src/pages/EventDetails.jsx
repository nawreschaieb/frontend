import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

// Import des images par défaut pour chaque catégorie
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

  // Fonction pour obtenir l'image par défaut selon la catégorie
  const getDefaultImage = (categorie) => {
    const imagesParCategorie = {
      'Musique': concertImage,
      'Art': artImage,
      'Gastronomie': gastronomieImage,
      'Technologie': techImage,
      'Sport': sportImage
    };
    return imagesParCategorie[categorie] || concertImage; // concertImage comme fallback par défaut
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  useEffect(() => {
    console.log("ID de l'événement :", id);

    setLoading(true);

    fetch(`http://localhost:5000/event/getevents/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des événements");
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.event) {
          setEvent(data.event);
        } else {
          throw new Error(data.message || "Données d'événement invalides");
        }
      })
      .catch(error => {
        console.error("Erreur fetch :", error);
        setEvent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
          <img 
            src={event?.image?.[0]?.url || getDefaultImage(event?.categorie)} 
            alt={event?.titre || 'Image de l\'événement'} 
            onError={(e) => {
              e.target.onerror = null; // Empêche la boucle infinie
              e.target.src = getDefaultImage(event?.categorie);
            }}
          />
          <div className="event-category-badge">{event?.categorie}</div>
        </div>

        <div className="event-details-info">
          <h1>{event.titre}</h1>
          
          <div className="event-meta">
            <div className="meta-item">
              <i className="fas fa-calendar"></i>
              <span>{formatDate(event.date)}</span>
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

       

          <div className="event-additional-info">
            <div className="info-item">
              <h4>Catégorie</h4>
              <p>{event.categorie}</p>
            </div>
            <div className="info-item">
              <h4>Région</h4>
              <p>{event.region}</p>
            </div>
            <div className="info-item">
              <h4>Lieu</h4>
              <p>{event.lieu}</p>
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