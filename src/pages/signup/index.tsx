import { FormEvent, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from '@/styles/home.module.scss';

import logoImg from '../../../public/logo.svg';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    if (name === '' || email === '' || password === '') {
      toast.warn('Preencha todos os Campos!');
      return
    }
    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    //chamar funcao para criar
    signUp(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Faça seu cadsatro agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt='Logo PizzA'
          width={100}
          height={24}
          priority
        />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder='Digite seu email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
            />
            <Button
              type='submit'
              loading={loading}
            >
              Cadastrar
            </Button>
          </form>
          <Link href='/' className={styles.text}>
            Já possui uma conta? Faça o login!
          </Link>
        </div>
      </div>
    </>
  )
}