import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageEvents.css';
// Import des images
import concertImage from '../assets/enactus.jpg';
import artImage from '../assets/Festival.jpg';
import gastronomieImage from '../assets/festival-.jpg';
import techImage from '../assets/conference.jpg';
import sportImage from '../assets/sport.jpg';

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Charger les événements (simulation)
  useEffect(() => {
    setTimeout(() => {
      const demoEvents = [
        {
          id: 1,
          titre: "Concert de Jazz",
          date: "2023-12-15",
          heure: "20:00",
          lieu: "Salle Apollo",
          categorie: "Musique",
          prix: 25,
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
          prix: 15,
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
          prix: 30,
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
          prix: 0,
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
          prix: 12,
          description: "Une compétition sportive avec les meilleures équipes de la région.",
          image: sportImage
        }
      ];
      
      setEvents(demoEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les événements
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === '' || event.categorie === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Liste des catégories uniques
  const categories = [...new Set(events.map(event => event.categorie))];

  // Ouvrir la modal de confirmation de suppression
  const confirmDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  // Supprimer un événement
  const deleteEvent = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete.id));
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  // Éditer un événement
  const editEvent = (eventId) => {
    // Dans une application réelle, vous redirigeriez vers un formulaire d'édition
    // avec l'ID de l'événement, par exemple:
    navigate(`/EditEvent/${eventId}`);
  };

  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="manage-events-container">
      <div className="manage-events-header">
        <h1>Gérer les événements</h1>
        <p>Modifiez ou supprimez vos événements</p>
      </div>

      <div className="manage-actions">
        <Link to="/AddEvent" className="btn-add">
          <i className="fas fa-plus"></i> Ajouter un événement
        </Link>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">
          <p>Chargement des événements...</p>
        </div>
      ) : (
        <div className="events-table-container">
          {filteredEvents.length > 0 ? (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Lieu</th>
                  <th>Prix</th>
                  <th>Catégorie</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td className="event-image">
                      <img src={event.image} alt={event.titre} />
                    </td>
                    <td>{event.titre}</td>
                    <td>{formatDate(event.date)} à {event.heure}</td>
                    <td>{event.lieu}</td>
                    <td>{event.prix === 0 ? 'Gratuit' : `${event.prix} TND`}</td>
                    <td><span className="category-badge">{event.categorie}</span></td>
                    <td className="actions">
                      <button 
                        className="btn-edit"
                        onClick={() => editEvent(event.id)}
                        title="Modifier"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => confirmDelete(event)}
                        title="Supprimer"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>Aucun événement ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer l'événement <strong>"{eventToDelete?.titre}"</strong> ?</p>
            <p className="warning">Cette action est irréversible.</p>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button 
                className="btn-confirm-delete"
                onClick={deleteEvent}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents; 