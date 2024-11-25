import axios from 'axios';

const API_URL = 'http://localhost:8083/api/Reservation/AddReservation'; // URL du backend Spring Boot

// Récupérer toutes les réservations
export const getAllReservations = async () => {
    try {
        const response = await axios.post(API_URL.trim());
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer une réservation par ID
export const getReservationById = async (reservationId) => {
    try {
        const response = await axios.post(`${API_URL.trim()}/with-users/${reservationId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la réservation:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Enregistrer une nouvelle réservation
export const saveReservation = async (reservation) => {
    try {
        console.log("Données envoyées au backend :", reservation);
        const response = await axios({
            method: 'post',
            url: API_URL.trim(),
            data: JSON.stringify(reservation),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de la réservation:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Supprimer une réservation par ID
export const deleteReservation = async (reservationId) => {
    try {
        const response = await axios.delete(`${API_URL.trim()}/${reservationId}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Mettre à jour une réservation existante
export const updateReservation = async (reservation) => {
    try {
        const response = await axios.put(API_URL.trim(), reservation, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la réservation:", error.response ? error.response.data : error.message);
        throw error;
    }
};
