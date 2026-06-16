import axios from "axios"

const apis = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise = null
let hasRedirected = false

apis.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    const isOnAuthPage =
      typeof window !== "undefined" &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/register")

    const isAuthEndpoint =
      originalRequest.url?.includes("auth/refresh") ||
      originalRequest.url?.includes("auth/login") ||
      originalRequest.url?.includes("auth/register") ||
      originalRequest.url?.includes("auth/logout")

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint &&
      !isOnAuthPage
    ) {
      originalRequest._retry = true

      if (!refreshPromise) {
        refreshPromise = apis
          .post("auth/refresh")
          .then(() => true)
          .catch(() => {
            if (!hasRedirected) {
              hasRedirected = true
              import("sonner").then(({ toast }) => {
                toast.error("Your session has expired. Please log in again.")
              })
              window.dispatchEvent(new CustomEvent("clear-query-cache"))
              setTimeout(() => {
                window.location.href = "/login"
              }, 150)
            }
            return false
          })
          .finally(() => {
            refreshPromise = null
          })
      }

      const refreshed = await refreshPromise
      if (refreshed) {
        return apis(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

export default apis