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
import CreateAccount from '../pages/CEO/CreateAccount';
import TMCreateAccount from '../pages/TradingManager/TMCreateAccount';
import TradingManager from './auth-component/TradingManager'
import ManagerDetail from '../pages/CEO/ManagerDetail';
import TMEmps from '../pages/TradingManager/TMEmps';
import TMEmpDetail from '../pages/TradingManager/TMEmpDetail';
import Shipments from '../pages/CEO/Shipments';
import ShipmentDetail from '../pages/CEO/ShipmentDetail'
import TMShipments from '../pages/TradingManager/TMShipments';
import TMShipmentDetail from '../pages/TradingManager/TMShipmentDetail';
import GMCreateAccount from '../pages/GatheringManager/GMCreateAccount';
import GatheringManager from '../component/auth-component/GatheringManager'
import GMEmps from '../pages/GatheringManager/GMEmps';
import GMEmpDetail from '../pages/GatheringManager/GMEmpDetail';
import GMShipments from '../pages/GatheringManager/GMShipments';
import GMShipmentDetail from '../pages/GatheringManager/GMShipmentDetail';
import TradingEmp from './auth-component/TradingEmp'
import TECreateShipment from '../pages/TradingEmployee/TECreateShipment';
import TEComingToShop from '../pages/TradingEmployee/TEComingToShop';
import TEComingDetail from '../pages/TradingEmployee/TEComingDetail';

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
                    <Route path='/create-account' element={<CEO><CreateAccount /></CEO>}></Route>
                    <Route path='/manager-detail' element={<CEO><ManagerDetail /></CEO>}></Route>
                    <Route path='/shipments' element={<CEO><Shipments /></CEO>}></Route>
                    <Route path='/shipment-detail' element={<CEO><ShipmentDetail /></CEO>}></Route>

                    {/* Trading Manager */}
                    <Route path='/tm-create-account' element={<TradingManager><TMCreateAccount /></TradingManager>}></Route>
                    <Route path='/tm-emps' element={<TradingManager><TMEmps /></TradingManager>}></Route>
                    <Route path='/tm-emp-detail' element={<TradingManager><TMEmpDetail /></TradingManager>}></Route>
                    <Route path='/tm-shipments' element={<TradingManager><TMShipments /></TradingManager>}></Route>
                    <Route path='/tm-shipment-detail' element={<TradingManager><TMShipmentDetail /></TradingManager>}></Route>

                    {/* Gathering Manager */}
                    <Route path='/gm-create-account' element={<GatheringManager><GMCreateAccount /></GatheringManager>}></Route>
                    <Route path='/gm-emps' element={<GatheringManager><GMEmps /></GatheringManager>}></Route>
                    <Route path='/gm-emp-detail' element={<GatheringManager><GMEmpDetail /></GatheringManager>}></Route>
                    <Route path='/gm-shipments' element={<GatheringManager><GMShipments /></GatheringManager>}></Route>
                    <Route path='/gm-shipment-detail' element={<GatheringManager><GMShipmentDetail /></GatheringManager>}></Route>

                    {/* Trading Employee */}
                    <Route path='/te-create-shipment' element={<TradingEmp><TECreateShipment /></TradingEmp>}></Route>
                    <Route path='/te-coming' element={<TradingEmp><TEComingToShop /></TradingEmp>}></Route>
                    <Route path='/te-coming-detail' element={<TradingEmp><TEComingDetail /></TradingEmp>}></Route>
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