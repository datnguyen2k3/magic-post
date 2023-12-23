import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const TradingEmp = ({ children }) => {
    const isTradingEmp = (useSelector(selectRole) === 'EMPLOYEE');

    return isTradingEmp ? children : <div>Bạn không phải là Nhân viên điểm giao dịch, không thể truy cập trang này</div>;
}

export default TradingEmp