import {
  registerRequest,
  loginRequest,
  logoutRequest,
  refreshtokenRequest,
} from "@/api/auth"

export const authService = {
  register: async ({ username, email, password, role }) => {
    const response = await registerRequest({ username, email, password, role })
    return response
  },

  login: async ({ email, password }) => {
    const response = await loginRequest({ email, password })
    return response
  },

  logout: async () => {
    const response = await logoutRequest()
    return response
  },

  refreshToken: async () => {
    const response = await refreshtokenRequest()
    return response
  },
}