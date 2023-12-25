import { useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';
import { selectRole, logout, selectAccount } from '../app/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import TradingEmp from './auth-component/TradingEmp';

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
    const isTradingEmp = (useSelector(selectRole) === 'EMPLOYEE')
    const isPostHead = (useSelector(selectRole) === 'POST_HEAD')
    const isWarehouseHead = (useSelector(selectRole) === 'WAREHOUSE_HEAD')
    const account = useSelector(selectAccount)

    const goToLogin = () => {
        navigate('/login');;
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
                    {isCEO && <>
                        <Link to={'/offices'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Thống kê các văn phòng
                            </button>
                        </Link>
                        <Link to={'/create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản cho trưởng điểm
                            </button>
                        </Link>
                        <Link to={'/accounts'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý tài khoản trưởng điểm
                            </button>
                        </Link>
                        <Link to={'/deliveries'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý các đơn hàng
                            </button>
                        </Link>
                    </>}
                    {isTradingEmp && <>
                        <Link to={'/te-create-shipment'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo đơn vận mới cho khách
                            </button>
                        </Link>
                        <Link to={'/te-receive'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang ở văn phòng
                            </button>
                        </Link>
                        <Link to={'/te-coming'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang đến
                            </button>
                        </Link>
                        <Link to={'/te-inshop'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã được nhận bởi văn phòng
                            </button>
                        </Link>
                        <Link to={'/te-shipping'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đang giao cho khách
                            </button>
                        </Link>
                        <Link to={'/te-after'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Quản lý đơn hàng đã giao cho khách
                            </button>
                        </Link></>
                    }
                    {isPostHead && <>
                        <Link to={'/ph-create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản nhân viên
                            </button>
                        </Link>
                    </>}
                    {isWarehouseHead && <>
                        <Link to={'/wh-create-account'}>
                            <button className='sidebar-statistics sidebar-bottom'>
                                Tạo tài khoản nhân viên
                            </button>
                        </Link>
                    </>}
                </div>
                <div className='sidebar-2'>
                    <div className='sidebar-account-box sidebar-top'>
                        {isLoggedIn ? <div>
                            <button className='sidebar-account sidebar-view-account'>{account !== undefined ? account.name : 'Tài khoản'} &nbsp;<FontAwesomeIcon icon={faChevronRight} />
                                <div className='sidebar-account-dropdown'>
                                    <button className='sidebar-account sidebar-account-dropdown-item' style={{ fontSize: '20px' }}><b>{account.role}</b></button>
                                    <button className='sidebar-account sidebar-account-dropdown-item'><Link to={'/account'}>Tài khoản</Link></button>
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
        </div >
    </>
}

export default Sidebar