import axios from 'axios';

const BASE_URL = "http://localhost:3001";

export class LivrosService {
  static async getLivros() {
    try {
      const response = await axios.get(`${BASE_URL}/livros`);
      return response;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  static async getLivro(id) {
    try {
      const response = await axios.get(`${BASE_URL}/livros/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  }

  static async createLivro(body) {
    try {
      const response = await axios.post(`${BASE_URL}/livros`, body);
      return response;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  static async updateLivro(id, body) {
    try {
      const response = await axios.put(`${BASE_URL}/livros/${id}`, body);
      return response;
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  }

  static async deleteLivro(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/livros/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  }
}