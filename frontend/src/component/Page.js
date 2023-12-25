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
import Offices from '../pages/CEO/Offices/Offices';
import CEO from './auth-component/CEO';
import CreateAccount from '../pages/CEO/CreateAcc/CreateAccount';
import TradingEmp from './auth-component/TradingEmp';
import TECreateShipment from '../pages/TradingEmp/CreateShipment/Create/TECreateShipment';
import PostHead from './auth-component/PostHead';
import PHCreateAccount from '../pages/PostHead/PHCreateAccount';
import Account from '../pages/Account';
import NeedLogged from './auth-component/NeedLogged';
import TEDetail from '../pages/TradingEmp/CreateShipment/Detail/TEDetail';
import TENext from '../pages/TradingEmp/InShopDeliveries/Detail/TENext'
import TEReceive from '../pages/TradingEmp/InShopDeliveries/All/TEReceive';
import TEComing from '../pages/TradingEmp/ComingDeliveries/All/TEComing';
import WHCreateAccount from '../pages/WarehouseHead/WHCreateAccount';
import WarehouseHead from './auth-component/WarehouseHead';
import TEConfirmReceive from '../pages/TradingEmp/ComingDeliveries/Detail/TEConfirmReceive';
import TEInShop from '../pages/TradingEmp/GoingToShipping/All/TEInShop';
import TEShipToCus from '../pages/TradingEmp/GoingToShipping/Detail/TEShipToCus';
import TEShipping from '../pages/TradingEmp/ShippingDeliveries/All/TEShipping';
import TEConfirmShipping from '../pages/TradingEmp/ShippingDeliveries/Detail/TEConfirmShipping';
import TEAfter from '../pages/TradingEmp/AfterShipping/All/TEAfter';
import DetailOffice from '../pages/CEO/DetailOffice/DetailOffice';
import Accounts from '../pages/CEO/Accounts/Accounts';

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
                    <Route path='/create-account' element={<CEO><CreateAccount /></CEO>}></Route>
                    <Route path='/detail-office' element={<CEO><DetailOffice /></CEO>}></Route>
                    <Route path='/accounts' element={<CEO><Accounts /></CEO>}></Route>

                    {/* TradingEmp */}
                    <Route path='/te-create-shipment' element={<TradingEmp><TECreateShipment /></TradingEmp>}></Route>
                    <Route path='/te-receive' element={<TradingEmp><TEReceive /></TradingEmp>}></Route>
                    <Route path='/te-detail' element={<TradingEmp><TEDetail /></TradingEmp>}></Route>
                    <Route path='/te-next' element={<TradingEmp><TENext /></TradingEmp>}></Route>
                    <Route path='/te-coming' element={<TradingEmp><TEComing /></TradingEmp>}></Route>
                    <Route path='/te-confirm-receive' element={<TradingEmp><TEConfirmReceive /></TradingEmp>}></Route>
                    <Route path='/te-inshop' element={<TradingEmp><TEInShop /></TradingEmp>}></Route>
                    <Route path='/te-shiptocus' element={<TradingEmp><TEShipToCus /></TradingEmp>}></Route>
                    <Route path='/te-shipping' element={<TradingEmp><TEShipping /></TradingEmp>}></Route>
                    <Route path='/te-confirm-shipping' element={<TradingEmp><TEConfirmShipping /></TradingEmp>}></Route>
                    <Route path='/te-after' element={<TradingEmp><TEAfter /></TradingEmp>}></Route>

                    {/* PostHead */}
                    <Route path='/ph-create-account' element={<PostHead><PHCreateAccount /></PostHead>}></Route>

                    {/* WarehouseHead */}
                    <Route path='/wh-create-account' element={<WarehouseHead><WHCreateAccount /></WarehouseHead>}></Route>

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