import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: '',
    date: '',
    lieu: '',
    prix: '',
    categorie: '',
    region: '',
    image: ''
  });

  useEffect(() => {
    // Charger les infos de l'événement à modifier
    fetch(`http://localhost:5000/event/getevent/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data.event));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/event/updatevents/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      alert('Événement modifié !');
      navigate('/ManageEvents');
    } else {
      alert('Erreur lors de la modification');
    }
  };

  const editEvent = (id) => {
    navigate(`/EditEvent/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="titre" value={formData.titre} onChange={handleChange} placeholder="Titre" />
      <input name="date" value={formData.date} onChange={handleChange} placeholder="Date" />
      <input name="heure" value={formData.heure} onChange={handleChange} placeholder="Heure" />
      <input name="lieu" value={formData.lieu} onChange={handleChange} placeholder="Lieu" />
      <input name="prix" value={formData.prix} onChange={handleChange} placeholder="Prix" />
      <input name="categorie" value={formData.categorie} onChange={handleChange} placeholder="Catégorie" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      {/* Pour l'image, tu peux ajouter un champ file si tu veux gérer l'upload */}
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default EditEvent;
