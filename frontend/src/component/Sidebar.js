import { useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { selectLoggedIn, logout } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [code, setCode] = useState('')

    const handleView = (e) => {
        if (e.keyCode === 13) {
            navigate(`/detail?shipmentCode=${code}`)
        }
    }

    const handleInputChange = (e) => {
        setCode(e.target.value)
    }

    const isLoggedIn = useSelector(selectLoggedIn)

    const goToLogin = () => {
        navigate('/login');
    }

    const goToLogout = () => {
        navigate('/');
        dispatch(logout({}))
        toast.success('Đăng xuất thành công')
    }

    const goToRegister = () => {
        navigate('/register')
    }

    return <>
        <div className='sidebar'>
            <div className='sidebar-box'>
                <div className='sidebar-1'>
                    <img className='sidebar-logo' src={Logo}></img>
                    <input className='sidebar-search' type='text' placeholder='Search by code' onKeyDown={(e) => handleView(e)}
                        onChange={(e) => handleInputChange(e)}></input>
                    <Link to={'/'}>
                        <button className='sidebar-statistics sidebar-bottom'>
                            Trang chủ
                        </button>
                    </Link>
                    {isLoggedIn && <>
                        <Link to={'/stat'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Thống kê
                            </button>
                        </Link>
                        <Link to={'/create-form'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo đơn vận mới
                            </button>
                        </Link></>}
                </div>
                <div className='sidebar-2'>
                    <button className='sidebar-setting sidebar-top'>Cài đặt</button>
                    <div className='sidebar-account-box sidebar-top'>
                        {isLoggedIn ? <div>
                            <button className='sidebar-account'>Tài khoản</button>
                            <button className='sidebar-account' onClick={() => goToLogout()}>Đăng xuất</button></div> : <div>
                            <button className='sidebar-account' onClick={() => goToLogin()}>Đăng nhập</button>
                            <button className='sidebar-account' onClick={() => goToRegister()}>Đăng ký</button></div>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar