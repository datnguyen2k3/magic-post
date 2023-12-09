import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../app/authSlice'

const Logged = ({ children }) => {
    const isLoggedIn = useSelector(selectLoggedIn);

    return isLoggedIn ? children : <div>Bạn cần đăng nhập để tiếp tục</div>;
}

export default Logged