import type { MouseEventHandler, ReactNode } from 'react'
import styles from './Button.module.css'

type Props = {
    children: ReactNode
    onClick?: MouseEventHandler
}

const Button = ({children, onClick}: Props) => {
    return <button onClick={onClick} className={styles.button}>{children}</button>
}

export default Button