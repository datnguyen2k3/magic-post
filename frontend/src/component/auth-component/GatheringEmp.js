import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const GatheringEmp = ({ children }) => {
    const isGatheringEmp = (useSelector(selectRole) === 'Nhân viên điểm tập kết');

    return isGatheringEmp ? children : <div>Bạn không phải là Nhân viên điểm tập kết, không thể truy cập trang này</div>;
}

export default GatheringEmp