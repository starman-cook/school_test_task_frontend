import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { QuestionsContext } from "./context";
import type { TQuestionsState } from "../../types/TQuestionsState";


const Layout = () => {
     const ls = localStorage.getItem('state')

    const parsedLs: TQuestionsState = JSON.parse(ls || '{}')
            
    const [state, setState] = useState<TQuestionsState>({
        data: parsedLs?.data,
        amount: parsedLs?.amount,
        difficulty: parsedLs?.difficulty,
        type: parsedLs?.type,
        currentPage: parsedLs?.currentPage
    })
    const [isMounted, setIsMounted] = useState<boolean>(false)
    // useEffect(() => {
    //      const ls = localStorage.getItem('state')
    //         if (ls) {
    //             const parsedLs: TQuestionsState = JSON.parse(ls || '{}')
    //             setState(parsedLs)
    //         }
    // }, [])
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('state', JSON.stringify(state))
        }
        setIsMounted(true)
    }, [state, isMounted])
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