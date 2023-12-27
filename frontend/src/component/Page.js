import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Login from '../pages/Login';
import NotLogged from './auth-component/NotLogged';
import Offices from '../pages/CEO/Offices/Offices';
import CEO from './auth-component/CEO';
import CreateAccount from '../pages/CEO/CreateAcc/CreateAccount';
import TradingEmp from './auth-component/TradingEmp';
import TECreateShipment from '../pages/TradingEmp/CreateShipment/Create/TECreateShipment';
import PostHead from './auth-component/PostHead';
import PHCreateAccount from '../pages/PostHead/PHCreateAcc/PHCreateAccount';
import TEDetail from '../pages/TradingEmp/CreateShipment/Detail/TEDetail';
import TENext from '../pages/TradingEmp/InShopDeliveries/Detail/TENext'
import TEReceive from '../pages/TradingEmp/InShopDeliveries/All/TEReceive';
import TEComing from '../pages/TradingEmp/ComingDeliveries/All/TEComing';
import WHCreateAccount from '../pages/WarehouseHead/WHCreateAcc/WHCreateAccount';
import WarehouseHead from './auth-component/WarehouseHead';
import TEConfirmReceive from '../pages/TradingEmp/ComingDeliveries/Detail/TEConfirmReceive';
import TEInShop from '../pages/TradingEmp/GoingToShipping/All/TEInShop';
import TEShipToCus from '../pages/TradingEmp/GoingToShipping/PostDetail/TEShipToCus';
import TEShipping from '../pages/TradingEmp/ShippingDeliveries/All/TEShipping';
import TEConfirmShipping from '../pages/TradingEmp/ShippingDeliveries/Detail/TEConfirmShipping';
import TEAfter from '../pages/TradingEmp/AfterShipping/All/TEAfter';
import DetailOffice from '../pages/CEO/DetailOffice/DetailOffice';
import Accounts from '../pages/CEO/Accounts/Accounts';
import DetailAccount from '../pages/CEO/DetailAcc/DetailAccount';
import Deliveries from '../pages/CEO/Deliveries/Deliveries';
import TEWNext from '../pages/TradingEmp/GoingToShipping/WarehouseDetail/TEWNext';
import Account from '../pages/Account';
import NeedLogged from '../component/auth-component/NeedLogged'
import PHAccounts from '../pages/PostHead/Accounts/PHAccounts';
import PHDetailAccount from '../pages/PostHead/DetailAcc/PHDetailAccount';
import PHDetailOffice from '../pages/PostHead/DetailOffice/PHDetailOffice';
import WHDetailOffice from '../pages/WarehouseHead/DetailOffice/WHDetailOffice';
import WHDetailAccount from '../pages/WarehouseHead/DetailAccount/WHDetailAccount';
import WHAccounts from '../pages/WarehouseHead/Accounts/WHAccounts';
import PostEmp from './auth-component/PostEmp';
import Detail from '../pages/Detail'

import { selectExpiredAt, logout } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DeliveryDetail from '../pages/CEO/DeliveryDetail/DeliveryDetail';
import PHDeliveries from '../pages/PostHead/Deliveries/PHDeliveries';
import ModifyAccount from '../pages/CEO/ModifyAcc/ModifyAccount';
import PHModifyAccount from '../pages/PostHead/ModifyAcc/PHModifyAccount';

const Page = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const expiredAt = useSelector(selectExpiredAt);

    useEffect(() => {
        if (expiredAt) {
            const intervalId = setInterval(() => {
                var expiredTime = new Date(expiredAt);
                const currentTime = new Date();
                if (expiredTime < currentTime) {
                    dispatch(logout({}))
                    navigate('/login')
                    toast.success('Hết thời hạn đăng nhập, mời bạn đăng nhập lại')
                }
            }, 10000);

            // Hủy bỏ setInterval khi component unmount
            return () => clearInterval(intervalId);
        }
    }, [expiredAt])

    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<NotLogged><Login /></NotLogged>}></Route>
                    <Route path='/account' element={<NeedLogged><Account /></NeedLogged>}></Route>
                    <Route path='/detail' element={<Detail />}></Route>

                    {/* CEO */}
                    <Route path='/offices' element={<CEO><Offices /></CEO>}></Route>
                    <Route path='/detail-office' element={<CEO><DetailOffice /></CEO>}></Route>
                    <Route path='/create-account' element={<CEO><CreateAccount /></CEO>}></Route>
                    <Route path='/accounts' element={<CEO><Accounts /></CEO>}></Route>
                    <Route path='/detail-account' element={<CEO><DetailAccount /></CEO>}></Route>
                    <Route path='/deliveries' element={<CEO><Deliveries /></CEO>}></Route>
                    <Route path='/delivery-detail' element={<CEO><DeliveryDetail /></CEO>}></Route>
                    <Route path='/modify-account' element={<CEO><ModifyAccount /></CEO>}></Route>

                    {/* TradingEmp */}
                    <Route path='/te-create-shipment' element={<PostEmp><TECreateShipment /></PostEmp>}></Route>
                    <Route path='/te-detail' element={<PostEmp><TEDetail /></PostEmp>}></Route>
                    <Route path='/te-shipping' element={<PostEmp><TEShipping /></PostEmp>}></Route>
                    <Route path='/te-confirm-shipping' element={<PostEmp><TEConfirmShipping /></PostEmp>}></Route>
                    <Route path='/te-after' element={<PostEmp><TEAfter /></PostEmp>}></Route>

                    <Route path='/te-receive' element={<TradingEmp><TEReceive /></TradingEmp>}></Route>
                    <Route path='/te-next' element={<TradingEmp><TENext /></TradingEmp>}></Route>
                    <Route path='/te-w-next' element={<TradingEmp><TEWNext /></TradingEmp>}></Route>
                    <Route path='/te-coming' element={<TradingEmp><TEComing /></TradingEmp>}></Route>
                    <Route path='/te-confirm-receive' element={<TradingEmp><TEConfirmReceive /></TradingEmp>}></Route>
                    <Route path='/te-inshop' element={<TradingEmp><TEInShop /></TradingEmp>}></Route>
                    <Route path='/te-shiptocus' element={<TradingEmp><TEShipToCus /></TradingEmp>}></Route>

                    {/* PostHead */}
                    <Route path='/ph-create-account' element={<PostHead><PHCreateAccount /></PostHead>}></Route>
                    <Route path='/ph-accounts' element={<PostHead><PHAccounts /></PostHead>}></Route>
                    <Route path='/ph-detail-account' element={<PostHead><PHDetailAccount /></PostHead>}></Route>
                    <Route path='/ph-detail-office' element={<PostHead><PHDetailOffice /></PostHead>}></Route>
                    <Route path='/ph-deliveries' element={<PostHead><PHDeliveries /></PostHead>}></Route>
                    <Route path='/ph-modify-account' element={<PostHead><PHModifyAccount /></PostHead>}></Route>

                    {/* WarehouseHead */}
                    <Route path='/wh-create-account' element={<WarehouseHead><WHCreateAccount /></WarehouseHead>}></Route>
                    <Route path='/wh-accounts' element={<WarehouseHead><WHAccounts /></WarehouseHead>}></Route>
                    <Route path='/wh-detail-account' element={<WarehouseHead><WHDetailAccount /></WarehouseHead>}></Route>
                    <Route path='/wh-detail-office' element={<WarehouseHead><WHDetailOffice /></WarehouseHead>}></Route>

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