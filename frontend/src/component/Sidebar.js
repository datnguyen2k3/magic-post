import { useState } from 'react';
import Logo from '../assets/images/logo.png';
import './Sidebar.scss'
import { Link, useNavigate } from 'react-router-dom';

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

    return <>
        <div className='sidebar'>
            <div className='sidebar-box'>
                <div className='sidebar-1'>
                    <img className='sidebar-logo' src={Logo}></img>
                    <input className='sidebar-search' type='text' placeholder='Search by code' onKeyDown={(e) => handleView(e)}
                        onChange={(e) => handleInputChange(e)}></input>
                    <Link to={'/'}>
                        <button className='sidebar-statistics sidebar-bottom'>
                            Home
                        </button>
                    </Link>
                    <Link to={'/stat'}>
                        <button className='sidebar-statistics sidebar-bottom'>
                            Statistics
                        </button>
                    </Link>
                </div>
                <div className='sidebar-2'>
                    <button className='sidebar-setting sidebar-top'>Settings</button>
                    <button className='sidebar-account sidebar-top'>Account</button>
                </div>
            </div>
        </div>
    </>
}

export default Sidebar