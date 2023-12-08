import { useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { selectLoggedIn } from '../app/authSlice';
import { useSelector } from 'react-redux'

const Sidebar = () => {

    const navigate = useNavigate();

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
                            <button className='sidebar-account'>Đăng xuất</button></div> : <div>
                            <button className='sidebar-account'>Đăng nhập</button>
                            <button className='sidebar-account'>Đăng ký</button></div>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar