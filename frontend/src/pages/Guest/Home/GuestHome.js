import { Link } from 'react-router-dom'
import './GuestHome.scss'
import { useDispatch } from 'react-redux'
import { falseGuest } from '../../../app/guestSlice'

const GuestHome = () => {

    const dispatch = useDispatch();

    const handleManagement = (e) => {
        e.preventDefault();
        dispatch(falseGuest())
    }

    return <>
        <div className='guess-home'>
            <span>Tới trang của <button onClick={handleManagement}><Link to={'/management'}>các nhân viên quản lý</Link></button></span>
        </div>
    </>

}

export default GuestHome