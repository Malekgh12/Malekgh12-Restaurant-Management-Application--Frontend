import axios from 'axios';

const API_URL = 'http://localhost:8082/api/Menu'; // URL du backend Spring Boot Menu Service

class MenuService {
    // Récupérer tous les items du menu
    getAllMenuItems = async () => {
        try {
            const response = await axios.get(API_URL.trim());
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des items du menu:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Récupérer un item du menu par ID
    getMenuItemById = async (id) => {
        try {
            const response = await axios.get(`${API_URL.trim()}/available/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération de l'item du menu:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Ajouter un nouvel item au menu
    addMenuItem = async (menuItem) => {
        try {
            const response = await axios.post(`${API_URL.trim()}/AddMenu`, menuItem, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'item au menu:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Mettre à jour un item du menu
    updateMenuItem = async (id, menuItem) => {
        try {
            const response = await axios.put(`${API_URL.trim()}/${id}`, menuItem, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'item du menu:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Supprimer un item du menu
    deleteMenuItem = async (id) => {
        try {
            const response = await axios.delete(`${API_URL.trim()}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'item du menu:", error.response ? error.response.data : error.message);
            throw error;
        }
    };
}

export default new MenuService();