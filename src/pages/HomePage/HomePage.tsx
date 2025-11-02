import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Button from "../../components/UI/Button/Button";

const HomePage = () => {
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        const ls = localStorage.getItem('currentTest')
        if (!ls) {
            navigate('/form')
        } else {
            setIsMounted(true)
        }
    }, [navigate])
    return (
        <>
            {isMounted ?
                <>
                    <h1>Home</h1>
                    <Button>Start new test</Button>
                    <Button>Continue the previous test</Button>
                </>
                : null}

        </>
    )
}

export default HomePage
