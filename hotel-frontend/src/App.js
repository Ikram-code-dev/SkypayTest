import React, { useState, useEffect } from "react";

function App() {
  const API = 'http://localhost:8080/api/hotel';

  const [userId, setUserId] = useState(1);
  const [roomId, setRoomId] = useState(1);
  const [roomType, setRoomType] = useState('STANDARD');
  const [price, setPrice] = useState(1000);
  const [amount, setAmount] = useState(10000);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  const createUser = async () => {
    try {
      const res = await fetch(`${API}/user?id=${userId}&balance=${amount}`, { method: 'POST' });
      if (res.ok) {
        setMessage(`✅ Utilisateur ${userId} créé avec ${amount} MAD`);
      } else {
        const error = await res.text();
        setMessage(`❌ Erreur création utilisateur : ${error}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur réseau : ${error.message}`);
    }
  };

  const createRoom = async () => {
    try {
      const res = await fetch(`${API}/room?id=${roomId}&type=${roomType}&price=${price}`, { method: 'POST' });
      if (res.ok) {
        setMessage(`✅ Chambre ${roomId} de type ${roomType} à ${price} MAD créée`);
      } else {
        const error = await res.text();
        setMessage(`❌ Erreur création chambre : ${error}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur réseau : ${error.message}`);
    }
  };

  const book = async () => {
    if (!checkIn || !checkOut) {
      setMessage('❗ Veuillez saisir les dates de check-in et check-out.');
      return;
    }
    try {
      const res = await fetch(`${API}/book?userId=${userId}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}`, { method: 'POST' });
      const text = await res.text();
      setMessage(text);
      loadBookings();
    } catch (error) {
      setMessage(`❌ Erreur réservation : ${error.message}`);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetch(`${API}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      setMessage(`❌ Erreur chargement réservations : ${error.message}`);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: 'auto' }}>
      <h1> Système de Réservation d'Hôtel</h1>
 
      {message && <p style={{ color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
 
      <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <h2>Créer un nouvel utilisateur</h2>
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(Number(e.target.value))}
          placeholder="ID utilisateur"
          style={{ marginRight: 10 }}
        />
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          placeholder="Solde initial (MAD)"
          style={{ marginRight: 10 }}
        />
        <button onClick={createUser}>Créer Utilisateur</button>
      </div> 
      <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <h2>Créer une nouvelle chambre</h2>
        <input
          type="number"
          value={roomId}
          onChange={e => setRoomId(Number(e.target.value))}
          placeholder="ID chambre"
          style={{ marginRight: 10 }}
        />
        <select value={roomType} onChange={e => setRoomType(e.target.value)} style={{ marginRight: 10 }}>
          <option value="STANDARD">STANDARD</option>
          <option value="JUNIOR">JUNIOR</option>
          <option value="SUITE">SUITE</option>
        </select>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Prix par nuit (MAD)"
          style={{ marginRight: 10 }}
        />
        <button onClick={createRoom}>Créer Chambre</button>
      </div>
 
      <div style={{ border: '2px solid #007BFF', padding: 15, borderRadius: 8, marginBottom: 20, backgroundColor: '#f0f8ff' }}>
        <h2>Faire une réservation</h2>

        <div style={{ marginBottom: 10 }}>
          <strong> Choisir un utilisateur :</strong>
          <input
            type="number"
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
            placeholder="ID utilisateur"
            style={{ marginLeft: 10 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Choisir une chambre :</strong>
          <input
            type="number"
            value={roomId}
            onChange={e => setRoomId(Number(e.target.value))}
            placeholder="ID chambre"
            style={{ marginLeft: 10 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Dates de réservation :</strong><br />
          <input
            type="date"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <input
            type="date"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
            style={{ marginTop: 5 }}
          />
        </div>

        <button onClick={book}>Réserver</button>
      </div>

      {/* LISTE DES RÉSERVATIONS */}
      <div style={{ borderTop: '2px solid #ddd', paddingTop: 20 }}>
        <h2>📄 Réservations</h2>
        {bookings.length === 0 ? (
          <p>Aucune réservation pour le moment.</p>
        ) : (
          <ul>
            {bookings.map((b, i) => (
              <li key={i}>
                 Chambre {b.room.id} ({b.room.type}) — réservée par Utilisateur {b.user.id} du {b.checkIn} au {b.checkOut}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
