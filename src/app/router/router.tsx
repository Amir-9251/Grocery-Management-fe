// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RequireAuth from './RequiredAuth';
import { LayoutPage } from '../components/layout/LayoutPage';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../components/Auth/LoginPage'));
const RegistrationForm = lazy(() => import('../components/Auth/RegistrationForm'));
const DashBoard = lazy(() => import('../components/Pages/DashBoard/DashBoard'));
const Products = lazy(() => import('../components/Pages/Products/Products'));
const Category = lazy(() => import('../components/Pages/Category/Category'));




const router = createBrowserRouter([
    {
        path: '/',
        element:
            <RequireAuth>
                <LayoutPage />
            </RequireAuth>,
        children: [
            {
                path: '/',
                element: <DashBoard />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'category',
                element: <Category />
            },

        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegistrationForm />
    }
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
