import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Button from "../../components/UI/Button/Button";

const HomePage = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        const ls = localStorage.getItem('state')
        if (!ls) {
            navigate('/form')
        } else {
            setIsMounted(true)
        }
    }, [navigate])

    const startNewOrContinue = (restart: boolean) => {
        if (restart) {
            localStorage.removeItem('state')
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
