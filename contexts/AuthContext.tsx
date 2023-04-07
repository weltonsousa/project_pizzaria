import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
  user?: UserProps,
  isAuthenticated: boolean,
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/');
  } catch (error) {
    console.log('Erro ao logar', error)
    toast.error('Erro ao logar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })
      })
        .catch(() => {
          signOut();
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {

    try {
      const response = await api.post('/session', {
        email,
        password
      })
      const { id, name, token } = response.data;

      //setar token no cookie com periodo de 30 dias
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      //Passar para proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso!')
      //Redicionar para proximas requisições o nosso token
      Router.push('/dashboard')

    } catch (error) {
      toast.error('Erro ao acessar')
      console.log('Erro ao acessar', error)
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log('Cadastrado com Sucesso')
      toast.success('Conta cadastrada com sucesso!')
      Router.push('/');

    } catch (error) {
      console.log('Error ao cadastrar', error)
      toast.error('Erro ao cadastrar')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}