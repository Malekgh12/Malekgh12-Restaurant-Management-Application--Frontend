import axios from 'axios';

const API_URL = 'http://localhost:8085/api/payment'; // URL du backend Spring Boot Payment Service

class PaymentService {
    // Récupérer tous les paiements
    getAllPayments = async () => {
        try {
            const response = await axios.get(API_URL.trim());
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Créer un nouveau paiement
    createPayment = async (paymentData) => {
        try {
            const response = await axios.post(`${API_URL.trim()}/AddPayment`, paymentData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la création du paiement:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Mettre à jour un paiement
    updatePayment = async (id, paymentData) => {
        try {
            const response = await axios.put(`${API_URL.trim()}/${id}`, paymentData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du paiement:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Supprimer un paiement
    deletePayment = async (id) => {
        try {
            const response = await axios.delete(`${API_URL.trim()}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression du paiement:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Traiter un paiement
    processPayment = async (paymentRequest) => {
        try {
            const response = await axios.post(`${API_URL.trim()}/process`, paymentRequest, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors du traitement du paiement:", error.response ? error.response.data : error.message);
            throw error;
        }
    };
}

export default new PaymentService();