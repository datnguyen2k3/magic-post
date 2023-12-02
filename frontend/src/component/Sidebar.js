import Logo from '../assets/images/logo.png';
import './Sidebar.scss'

const Sidebar = () => {
    return <>
        <div className='sidebar'>
            <div className='sidebar-box'>
                <div className='sidebar-1'>
                    <img className='sidebar-logo' src={Logo}></img>
                    <input className='sidebar-search' type='text'></input>
                    <button className='sidebar-statistics sidebar-bottom'>Statistics</button>
                    <button className='sidebar-statistics sidebar-bottom'>Statistics</button>
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