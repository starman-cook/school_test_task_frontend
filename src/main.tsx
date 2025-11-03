import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout/Layout.tsx'
import FormPage from './pages/FormPage/FormPage.tsx'
import HistoryPage from './pages/HistoryPage/HistoryPage.tsx'
import QuestionPage from './pages/QuestionPage/QuestionPage.tsx'
import ResultsPage from './pages/ResultsPage/ResultsPage.tsx'
import SearchHistoryPage from './pages/SearchHistoryPage/SearchHistoryPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: '/form',
        element: <FormPage />
      },
      {
        path: '/history',
        element: <HistoryPage />
      },
      {
        path: '/questions/:index',
        element: <QuestionPage />
      },
      {
        path: '/results',
        element: <ResultsPage />
      },
      {
        path: '/history',
        element: <HistoryPage />
      },
      {
        path: '/search_history',
        element: <SearchHistoryPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
