import type { ChangeEventHandler } from 'react'
import styles from './Select.module.css'

type Props = {
    placeholder?: string
    value: string
    onChange: ChangeEventHandler
    errorMessage: string
    name: string
    options: {value: string, label: string}[]
}

const Select = ({placeholder, value, onChange, errorMessage, name, options}: Props) => {
    return (
        <div className={styles.inputFrame}>
            <select name={name} onChange={onChange} value={value} className={styles.select}>
                <option value={''} disabled>{placeholder}</option>
                {options.map(el => {
                    return (
                        <option key={el.value} value={el.value}>{el.label}</option>
                    )
                })}
            </select>
            <p className={styles.error} hidden={!errorMessage}>{errorMessage}</p>
        </div>
    )
}

export default Select