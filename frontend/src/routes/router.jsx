import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/RegisterPage';
import CheckEmail from '../pages/CheckEmail';
import CheckPassword from '../pages/CheckPassword';
import Message from '../components/Message';
import AuthLayouts from '../layout/AuthLayouts';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />,
                children: [
                    {
                        path: ':userId',
                        element: <Message />
                    }
                ]
            },
            {
                path: '',
                element: <AuthLayouts />,
                children: [
                    ,
                    {
                        path: '/register',
                        element: <RegisterPage />
                    },
                    ,
                    {
                        path: '/check-email',
                        element: <CheckEmail />
                    },

                    {
                        path: '/check-password',
                        element: <CheckPassword />
                    },
                    {
                        path: '/forgot-password',
                        element: <ForgotPasswordPage />
                    },
                ]
            }
        ],
        errorElement: <ErrorPage />
    }
])