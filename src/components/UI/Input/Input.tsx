import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import styles from './Input.module.css'

type Props = {
    placeholder: string
    value: string
    type: HTMLInputTypeAttribute
    onChange: ChangeEventHandler
    errorMessage: string
    name: string
}

const Input = ({placeholder, value, type, onChange, errorMessage, name}: Props) => {
    return (
        <div className={styles.inputFrame}>
            <input name={name} placeholder={placeholder} onChange={onChange} type={type} value={value} className={styles.input} />
            <p className={styles.error} hidden={!errorMessage}>{errorMessage}</p>
        </div>
    )
}

export default Input