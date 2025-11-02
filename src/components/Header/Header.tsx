import { Link, useParams } from 'react-router'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'

const Header = () => {
    const params = useParams()
    const [showHomeBtn, setShowHomeBtn] = useState<boolean>(true)
    useEffect(() => {
        const ls = localStorage.getItem('state')
        const parsedLs = JSON.parse(ls || '{}')
        setShowHomeBtn(parsedLs.amount)
    }, [params])
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {showHomeBtn ? <Link className={styles.link} to={'/'}>Home</Link> : null}
                <Link className={styles.link} to={'/history'}>History</Link>
            </div>
        </header>
    )
}

export default Header