import http from '../utils/http.ts'
import { AuthResponse } from '../types/auth.type.ts'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

export const logout = () => http.post('/logout')
