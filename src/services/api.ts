import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { signOut } from "../../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";


export function setupApiClient(ctx?: any) {

  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:333',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      //qualquer erro 401 (nao autorizado) devemos deslogar o usuario
      if (typeof window !== undefined) {
        //chamar a funcao para deslogar o usuario
        signOut();
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }
    return Promise.reject(error);
  })
  return api;
}