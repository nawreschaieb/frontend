import React, { useEffect, useState } from 'react';

const MesReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remplace userId par la vraie valeur (depuis le contexte, redux, ou props)
    fetch(`http://localhost:5000/reservation/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setReservations(data.reservations || []);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mes Réservations</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul>
          {reservations.map(r => (
            <li key={r._id}>
              <strong>{r.eventId.titre}</strong> — {r.eventId.date} à {r.eventId.lieu}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MesReservations;
