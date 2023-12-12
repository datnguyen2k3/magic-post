import { useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { selectRole, logout, selectAccount } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

    const isLoggedIn = (useSelector(selectRole) !== '')
    const isCEO = (useSelector(selectRole) === 'CEO')
    const account = useSelector(selectAccount)
    console.log(account, 'check account')

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
                    {isCEO && <>
                        <Link to={'/offices'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Thống kê các văn phòng
                            </button>
                        </Link>
                        <Link to={'/managers'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Thống kê các trưởng điểm
                            </button>
                        </Link>
                    </>}
                </div>
                <div className='sidebar-2'>
                    <button className='sidebar-setting sidebar-top'>Cài đặt</button>
                    <div className='sidebar-account-box sidebar-top'>
                        {isLoggedIn ? <div>
                            <button className='sidebar-account sidebar-view-account'>{account !== undefined ? account.name : 'Tài khoản'} &nbsp;<FontAwesomeIcon icon={faChevronRight} />
                                <div className='sidebar-account-dropdown'>
                                    <button className='sidebar-account sidebar-account-dropdown-item' style={{ fontSize: '20px' }}><b>{account.role}</b></button>
                                    <button className='sidebar-account sidebar-account-dropdown-item'>Tài khoản</button>
                                    <button className='sidebar-account sidebar-account-dropdown-item' onClick={() => goToLogout()}>Đăng xuất</button>
                                </div>
                            </button>
                        </div>
                            : <div>
                                <button className='sidebar-account' onClick={() => goToLogin()}>Đăng nhập</button>
                                <button className='sidebar-account' onClick={() => goToRegister()}>Đăng ký</button></div>}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar