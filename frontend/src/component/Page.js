import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import Statistics from '../pages/Statistics';
import Details from '../pages/Details';
import CreateForm from '../pages/CreateForm';
import { Toaster } from 'react-hot-toast'
import Login from '../pages/Login';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../app/authSlice';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector(selectLoggedIn);

    return isLoggedIn ? children : <div>Bạn cần đăng nhập để tiếp tục</div>;
}

const Page = () => {
    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/stat' element={<ProtectedRoute><Statistics /></ProtectedRoute>}></Route>
                    <Route path='/detail' element={<ProtectedRoute><Details /></ProtectedRoute>}></Route>
                    <Route path='/create-form' element={<ProtectedRoute><CreateForm /></ProtectedRoute>}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
                <Toaster toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                }} />
            </div>
        </div>
    </>
}

export default Page;