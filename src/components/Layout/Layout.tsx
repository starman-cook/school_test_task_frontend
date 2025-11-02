import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { QuestionsContext } from "./context";
import type { TQuestionsState } from "../../types/TQuestionsState";


const Layout = () => {
    const [state, setState] = useState<TQuestionsState>({
        data: [],
        amount: 0
    })
    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <QuestionsContext.Provider value={[state, setState]}>
            <Header />
            <main className={styles.layout}>
                <Outlet />
            </main>
        </QuestionsContext.Provider>
    )
}

export default Layout