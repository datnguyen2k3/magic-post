import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../app/authSlice'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotLogged = ({ children }) => {

    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectLoggedIn);
    console.log(isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    })


    return !isLoggedIn ? children : <div>Bạn đã đăng nhập, hệ thống sẽ điều hướng bạn về trang chủ</div>;
}

export default NotLogged