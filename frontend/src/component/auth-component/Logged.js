import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logged = ({ children }) => {

    const navigate = useNavigate();
    const isLoggedIn = (useSelector(selectRole) !== '');

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [])

    return isLoggedIn ? children : <div>Bạn đã đăng nhập, hệ thống sẽ điều hướng bạn về trang chủ</div>;
}

export default Logged