import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const TradingManager = ({ children }) => {
    const isTradingManager = (useSelector(selectRole) === 'Trưởng điểm giao dịch');

    return isTradingManager ? children : <div>Bạn không phải là Quản lý điểm giao dịch, không thể truy cập trang này</div>;
}

export default TradingManager