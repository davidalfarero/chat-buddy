import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  message: null,
  setMessage: (message) => set({ message }),
  onlineUsers: [],
  error: null,
  setError: (error) => set({ error }),
  isUpdatingProfile: false,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');

      set({ user: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    try {
      set({ isLoading: true, error: null });

      const res = await axiosInstance.post('/auth/signup', formData);

      set({
        user: res.data.user,
        isAuthenticated: true,
        message: res.data.message || 'Signup successful!',
      });
      get().connectSocket();
      return true;
    } catch (error) {
      const serverError = error.response?.data?.message || 'Error signing up.';
      set({ error: serverError, isLoading: false });
      return false;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post('/auth/verify-email', { code });
      set({ user: res.data.user, isAuthenticated: true, isLoading: false });
      return res.data;
    } catch (error) {
      set({ error: error.res.data.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  login: async (formData) => {
    try {
      set({ isLoading: true, error: null, });

      const res = await axiosInstance.post('/auth/login', formData);

      set({ user: res.data });
      get().connectSocket();
      return true;
    } catch (error) {
      const serverError = error.response?.data?.message || 'Error logging in.';
      set({ error: serverError, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });

      await axiosInstance.post('/auth/logout');

      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false
      });
      get().disconnectSocket();
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({
        user: res.data,
        message: res.data.message || 'Photo changed successfully!',
      });
    } catch (error) {
      console.log("error in update profile:", error);
      set({ error });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  forgotPassword: async (formData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axiosInstance.post('/auth/forgot-password', formData);
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }

  },

  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: user._id,
      }
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  }
}));