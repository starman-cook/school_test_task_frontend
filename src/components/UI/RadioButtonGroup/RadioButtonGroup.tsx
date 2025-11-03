import type { ChangeEventHandler } from 'react'
import styles from './RadioButtonGroup.module.css'

type Props = {
    name: string
    options: {label: string, value: string}[]
    onChange: ChangeEventHandler
    index: string
    value: string
}

const RadioButtonGroup = ({name, options, onChange, index, value}: Props) => {
    return (
        <div className={styles.radioButtonGroup}>
            {options.map(el => {
                return (
                    <label className={styles.radioLabel} key={index + el.value}>
                        <input checked={el.value === value} onChange={onChange} value={el.value} name={name} type="radio" />
                        <span>{el.label}</span>    
                    </label>
                )
            })}
        </div>
    )
}

export default RadioButtonGroup