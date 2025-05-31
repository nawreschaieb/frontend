import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ManageEvents.css';
// Import des images
import concertImage from "../../assets/enactus.jpg";
import artImage from "../../assets/Festival.jpg";
import gastronomieImage from "../../assets/festival-.jpg";
import techImage from "../../assets/conference.jpg";
import sportImage from "../../assets/sport.jpg";
import { handleImageUpload } from '../../utils/uploadUtils'; // adapte le chemin si besoin

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/event/getallevents");

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des événements");
      }

      const data = await response.json();
      setEvents(data.events || []); // s'assurer que le backend renvoie bien { events: [...] }
      setLoading(false);
    } catch (error) {
      console.error("Erreur :", error);
      setLoading(false);
    }
  };

  fetchEvents();
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
 const deleteEvent = async () => {
  if (eventToDelete) {
    try {
      const response = await fetch(`http://localhost:5000/event/deletevents/${eventToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // si tu utilises un token
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Supprimer localement dans l'état
        setEvents(events.filter(event => event._id !== eventToDelete._id));
        setShowDeleteModal(false);
        setEventToDelete(null);
      } else {
        alert(data.message || "Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur de connexion au serveur.");
    }
  }
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const updatedEvent = {
    titre,
    date,
    heure,
    lieu,
    prix,
    categorie,
    description,
    image,
  };

  try {
    const response = await fetch(`http://localhost:5000/event/updatevents/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}` si besoin
      },
      body: JSON.stringify(updatedEvent),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Événement modifié avec succès !");
      navigate("/ManageEvents");
    } else {
      alert(`Erreur: ${data.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("Une erreur est survenue.");
  }
};


  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      try {
        const { imageUrl, public_id } = await handleImageUpload(file, 'events');
        setFormData({
          ...formData,
          image: [{ url: imageUrl, public_id }]
        });
      } catch (error) {
        // Gérer l'erreur d'upload
      }
    }
  };

  const editEvent = (id) => {
    navigate(`/EditEvent/${id}`);
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
                  <tr key={event._id}>
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
                        onClick={() => editEvent(event._id)}
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