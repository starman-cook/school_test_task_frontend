import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Button from "../../components/UI/Button/Button";
import { QuestionsContext } from "../../components/Layout/context";

const HomePage = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [, setState] = useContext(QuestionsContext)
    useEffect(() => {
        const ls = localStorage.getItem('state')
        const parsedLs = JSON.parse(ls || '{}')
        if (!parsedLs.amount) {
            navigate('/form')
        } else {
            setIsMounted(true)
        }
    }, [navigate])

    const startNewOrContinue = (restart: boolean) => {
        if (restart) {
            localStorage.removeItem('state')
            localStorage.removeItem('currentPage')
            setState({
                data: [],
                amount: 0,
                difficulty: 'any',
                type: 'any',
                email: '',
                fullName: ''
            })
        }
        navigate('/form')
    }

    return (
        <>
            {isMounted ?
                <>
                    <h1>Home</h1>
                    <Button onClick={() => startNewOrContinue(true)}>Start new test</Button>
                    <Button onClick={() => startNewOrContinue(false)}>Continue the previous test</Button>
                </>
                : null}

        </>
    )
}

export default HomePage
