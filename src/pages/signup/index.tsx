import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from '@/styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logoImg from '../../../public/logo.svg';

export default function Signup() {
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

          <form>
            <Input placeholder='Digite seu nome' type='text' />
            <Input placeholder='Digite seu email' type='text' />
            <Input placeholder='Digite sua senha' type='password' />
            <Button
              type='submit'
              loading={false}
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