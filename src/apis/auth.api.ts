import http from '../utils/http.ts'
import { AuthResponse } from '../types/auth.type.ts'

const authApi = {
  register(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout: () => http.post('/logout')
}

export default authApi
