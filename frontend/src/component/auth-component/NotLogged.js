import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotLogged = ({ children }) => {

    const navigate = useNavigate();
    const isLoggedIn = (useSelector(selectRole) !== '');

    useEffect(() => {
        if (!isLoggedIn) {
            setTimeout(() => {
                navigate('/login');
                console.log('notl')
            }, 2000)
        } else {
            navigate('/');
        }
    }, [])

    return !isLoggedIn ? children : <div>Bạn chưa đăng nhập, hệ thống sẽ điều hướng bạn về trang đăng nhập</div>;
}

export default NotLogged