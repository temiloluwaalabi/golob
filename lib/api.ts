import { User } from "@/types";
import { fetchHandler } from "./handlers/fetch";
const API_BASE_URL = process.env.NEXT_PUBLIC_API || "http://localhost:3000/api";

export const api = {
  users: {
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),
    getByID: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    // New method for creating a user with FormData
    createWithFile: (userData: {
      name: string;
      email: string;
      profilePicture: File;
    }) => {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("profilePicture", userData.profilePicture);

      return fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: formData, // Use FormData as the body
      });
    },
    create: (userData: Partial<User>) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<User>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },
};
