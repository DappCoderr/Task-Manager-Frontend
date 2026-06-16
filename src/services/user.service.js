import { getProfileRequest } from "@/api/users"

export const userService = {
  getProfile: async () => {
    const response = await getProfileRequest()
    return response
  },
}