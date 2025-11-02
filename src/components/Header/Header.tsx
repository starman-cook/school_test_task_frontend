import { Link } from 'react-router'
import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link className={styles.link} to={'/'}>Home</Link>
                <Link className={styles.link} to={'/history'}>History</Link>
            </div>
        </header>
    )
}

export default Header