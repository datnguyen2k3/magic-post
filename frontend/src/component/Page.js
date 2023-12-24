import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import Statistics from '../pages/Statistics';
import Details from '../pages/Details';
import CreateForm from '../pages/CreateForm';
import { Toaster } from 'react-hot-toast'
import Login from '../pages/Login';
import Logged from './auth-component/Logged';
import NotLogged from './auth-component/NotLogged';
import Register from '../pages/Register';
import Offices from '../pages/CEO/Offices';
import CEO from './auth-component/CEO';
import Managers from '../pages/CEO/Managers';
import CreateAccount from '../pages/CEO/CreateAccount';
import TMCreateAccount from '../pages/TradingManager/TMCreateAccount';
import TradingManager from './auth-component/TradingManager'
import ManagerDetail from '../pages/CEO/ManagerDetail';
import TMEmps from '../pages/TradingManager/TMEmps';
import TMEmpDetail from '../pages/TradingManager/TMEmpDetail';
import TradingEmp from './auth-component/TradingEmp';
import TECreateShipment from '../pages/TradingEmp/TECreateShipment';
import TEComingToShop from '../pages/TradingEmp/TEComingToShop';
import PostHead from './auth-component/PostHead';
import PHCreateAccount from '../pages/PostHead/PHCreateAccount';
import Account from '../pages/Account';
import NeedLogged from './auth-component/NeedLogged';
import TEDetail from '../pages/TradingEmp/TEDetail';

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
                    <Route path='/account' element={<NeedLogged><Account /></NeedLogged>}></Route>

                    {/* CEO */}
                    <Route path='/offices' element={<CEO><Offices /></CEO>}></Route>
                    <Route path='/managers' element={<CEO><Managers /></CEO>}></Route>
                    <Route path='/create-account' element={<CEO><CreateAccount /></CEO>}></Route>
                    <Route path='/manager-detail' element={<CEO><ManagerDetail /></CEO>}></Route>

                    {/* Trading Manager */}
                    <Route path='/tm-create-account' element={<TradingManager><TMCreateAccount /></TradingManager>}></Route>
                    <Route path='/tm-emps' element={<TradingManager><TMEmps /></TradingManager>}></Route>
                    <Route path='/tm-emp-detail' element={<TradingManager><TMEmpDetail /></TradingManager>}></Route>

                    {/* TradingEmp */}
                    <Route path='/te-create-shipment' element={<TradingEmp><TECreateShipment /></TradingEmp>}></Route>
                    <Route path='/te-coming' element={<TradingEmp><TEComingToShop /></TradingEmp>}></Route>
                    <Route path='/te-detail' element={<TradingEmp><TEDetail /></TradingEmp>}></Route>

                    {/* PostHead */}
                    <Route path='/ph-create-account' element={<PostHead><PHCreateAccount /></PostHead>}></Route>

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