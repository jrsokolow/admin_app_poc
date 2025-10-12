/**
 * API SERVICE - Manual Implementation (NO REFINE)
 * 
 * Without Refine, you must manually:
 * - Define all API methods
 * - Handle errors
 * - Transform data
 * - Manage pagination
 * - Handle HTTP methods
 */

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

// ❌ WITHOUT REFINE: You write every API method manually
export const api = {
    // Get all users
    async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${API_URL}/users`);
        return response.data;
    },

    // Get single user
    async getUser(id: string | number): Promise<User> {
        const response = await axios.get<User>(`${API_URL}/users/${id}`);
        return response.data;
    },

    // Create user
    async createUser(data: Partial<User>): Promise<User> {
        const response = await axios.post<User>(`${API_URL}/users`, data);
        return response.data;
    },

    // Update user
    async updateUser(id: string | number, data: Partial<User>): Promise<User> {
        const response = await axios.put<User>(`${API_URL}/users/${id}`, data);
        return response.data;
    },

    // Delete user
    async deleteUser(id: string | number): Promise<void> {
        await axios.delete(`${API_URL}/users/${id}`);
    },
};

