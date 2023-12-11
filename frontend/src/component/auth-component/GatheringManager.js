import { useSelector } from 'react-redux';
import { selectRole } from '../../app/authSlice'

const GatheringManager = ({ children }) => {
    const isGatheringManager = (useSelector(selectRole) === 'Trưởng điểm tập kết');

    return isGatheringManager ? children : <div>Bạn không phải là Quản lý điểm tập kết, không thể truy cập trang này</div>;
}

export default GatheringManager