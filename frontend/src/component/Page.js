import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import Statistics from '../pages/Statistics';
import Details from '../pages/Details';
import CreateForm from '../pages/CreateForm';
import { Toaster } from 'react-hot-toast'
import Login from '../pages/Login';
import Logged from './auth-component/CEO';
import NotLogged from './auth-component/NotLogged';
import Register from '../pages/Register';
import Offices from '../pages/CEO/Offices';
import CEO from './auth-component/CEO';
import Managers from '../pages/CEO/Managers';

const Page = () => {
    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/stat' element={<Logged><Statistics /></Logged>}></Route>
                    <Route path='/detail' element={<Logged><Details /></Logged>}></Route>
                    <Route path='/create-form' element={<Logged><CreateForm /></Logged>}></Route>
                    <Route path='/login' element={<NotLogged><Login /></NotLogged>}></Route>
                    <Route path='/register' element={<NotLogged><Register /></NotLogged>}></Route>

                    {/* CEO */}
                    <Route path='/offices' element={<CEO><Offices /></CEO>}></Route>
                    <Route path='/managers' element={<CEO><Managers /></CEO>}></Route>
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