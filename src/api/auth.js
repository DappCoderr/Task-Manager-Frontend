// src/apis/auth.js
// import apis from "./axios";  // uncomment when ready for real API

export const loginUser = async (credentials) => {
  return {
    success: true,
    message: "User logged in successfully",
    data: {
      id: "43ffe08d-465a-4f22-be4b-82d13ec265c5",
      username: "test",
      email: "t@t.com",
      role: "USER",
      token: "dummy-jwt-token-123",
    },
    err: {},
  };
};

export const logoutUser = async () => {
  return {
    success: true,
    message: "Logged out successfully",
    data: {},
    err: {},
  };
};

export const registerUser = async (payload) => {
  return {
    success: true,
    message: "User created successfully",
    data: {
      id: "43ffe08d-465a-4f22-be4b-82d13ec265c5",
      username: payload.username || "newuser",
      email: payload.email,
      role: "USER",
    },
    err: {},
  };
};

export const getProfile = async () => {
  return {
    success: true,
    message: "User Profile",
    data: {
      id: "43ffe08d-465a-4f22-be4b-82d13ec265c5",
      username: "test",
      email: "t@t.com",
      role: "USER",
      createdAt: "2026-06-12T13:54:49.596Z",
      updatedAt: "2026-06-13T10:54:46.529Z",
    },
    err: {},
  };
};