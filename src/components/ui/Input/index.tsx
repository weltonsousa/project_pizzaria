import { InputHTMLAttributes } from 'react'

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Input({ ...rest }: InputProps) {
  return (
    <input className={styles.input} {...rest} />
  )
}


interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> { }

export function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea className={styles.input} {...rest}></textarea>
  )
}