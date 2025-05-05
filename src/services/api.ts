import axios from 'axios'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: "https://joy-system-server-production.up.railway.app"
})


const { 'joysystem.token': token } = parseCookies();

export const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

if (token) {
    fetch('https://joy-system-server-production.up.railway.app/users', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    })
}

export default api