import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Input from "../UI/Input/Input"
import Button from "../UI/Button/Button"
import Select from "../UI/Select/Select"
import styles from './Form.module.css'
import { QuestionsContext } from "../Layout/context"

type InputValues = {
    full_name: string
    email: string
    qty: number
    difficulty: '' | 'any' | 'easy' | 'medium' | 'hard'
    type: '' | 'any' | 'multiple' | 'boolean'
}
type InputErrors = {
    full_name: string
    email: string
    qty: string
    difficulty: string
    type: string
}

const errorMessages = {
    full_name: 'Full name is required',
    email: 'Email is required and must be a valid email',
    qty: 'Quantity is required and must be less than 50',
    difficulty: 'Difficulty level is required',
    type: 'Type is required'
}

const validations = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    qty: /^(?:[1-9]|[1-4]\d)$/
}
const Form = () => {
    const [state, setState] = useContext(QuestionsContext)
    const [values, setValues] = useState<InputValues>(
        {
            full_name: '',
            email: '',
            qty: 0,
            difficulty: '',
            type: ''
        }
    )
    const [errors, setErrors] = useState<InputErrors>(
        {
            full_name: '',
            email: '',
            qty: '',
            difficulty: '',
            type: ''
        }
    )

    const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors(prev => {
                return { ...prev, [e.target.name]: '' }
            })
        }
        const ls = localStorage.getItem('form')
        const parsedLs = JSON.parse(ls || '{}')
        parsedLs[e.target.name] = e.target.value
        localStorage.setItem('form', JSON.stringify(parsedLs))
    }

    useEffect(() => {
         const ls = localStorage.getItem('form')
         if (ls) {
            const parsedLs = JSON.parse(ls || '{}')
            Object.keys(parsedLs).forEach(key => {
                setValues(prev => {
                    return {...prev, [key]: parsedLs[key]}
                })
            })
         }
    }, [])

    const submit = async (e: FormEvent) => {
        e.preventDefault()
        let isValid = true
        Object.keys(values).forEach(key => {
            const value = values[key as keyof typeof values]
            const validation = validations[key as keyof typeof validations]
            if (!value || (validation && !validation.test(value as string))) {
                isValid = false
                setErrors(prev => {
                    return { ...prev, [key]: errorMessages[key as keyof typeof errors] }
                })
            }
        })
        if (!isValid) return
        try {
            const queryString = new URLSearchParams()
            queryString.append('amount', values.qty + '')
            if (values.difficulty !== 'any') {
                queryString.append('difficulty', values.difficulty)
            }
            if (values.type !== 'any') {
                queryString.append('type', values.type)
            }
            const response = await fetch(`https://opentdb.com/api.php?${queryString.toString()}`)
            const data = await response.json()
            setState(data)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form className={styles.form} onSubmit={submit}>
            <Input
                placeholder="Full Name"
                value={values.full_name}
                type="text"
                name="full_name"
                errorMessage={errors.full_name}
                onChange={inputHandler}
            />
            <Input
                placeholder="Email"
                value={values.email}
                type="email"
                name="email"
                errorMessage={errors.email}
                onChange={inputHandler}
            />
            <Input
                placeholder="Quantity of questions"
                value={values.qty + ''}
                type="number"
                name="qty"
                errorMessage={errors.qty}
                onChange={inputHandler}
            />
            <Select
                placeholder="Please select the difficulty level"
                value={values.difficulty}
                name="difficulty"
                errorMessage={errors.difficulty}
                onChange={inputHandler}
                options={[{label: 'Any', value: 'any'}, {label: 'Easy', value: 'easy'}, {label: 'Medium', value: 'medium'}, {label: 'Hard', value: 'hard'}]}
            />
            <Select
                placeholder="Please select the type"
                value={values.type}
                name="type"
                errorMessage={errors.type}
                onChange={inputHandler}
                options={[{label: 'Any', value: 'any'}, {label: 'Multiple', value: 'multiple'}, {label: 'Boolean', value: 'boolean'}]}
            />

            <Button>Submit</Button>
        </form>
    )
}


export default Form