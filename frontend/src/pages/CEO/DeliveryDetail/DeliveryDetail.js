import './DeliveryDetail.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { beautifyId, convertText } from '../../../service/service';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryId, updateShopId } from '../../../app/urlSlice';

const DeliveryDetail = () => {

    const deliveryId = useSelector(selectDeliveryId)

    const [delivery, setDelivery] = useState()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                params: {
                    deliveryId
                }
            }

            const response = await axios.get(`${backendUrl}/deliveries/${deliveryId}`, config);
            setDelivery(response.data)
        }
        fetchData()
    }, [])

    const dispatch = useDispatch()

    const handleViewShop = (shopId) => {
        dispatch(updateShopId({ shopId }))
    }

    return <>
        <div className='delivery-detail'>
            {delivery ? <>
                <h1>Thông tin đơn hàng</h1>
                <Table>
                    <b>Thông tin cơ bản:</b>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên đơn hàng</th>
                            <th>Mô tả</th>
                            <th>Cân nặng - Chi phí</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{beautifyId(delivery.deliveryId)}</td>
                            <td>{delivery.name}</td>
                            <td>{delivery.description}</td>
                            <td>{delivery.weight}kg/{delivery.shippingFee}VND</td>
                        </tr>
                    </tbody>
                    <b>Thông tin phía gửi:</b>
                    <thead>
                        <tr>
                            <th>Nguời gửi</th>
                            <th>Số điện thoại người gửi</th>
                            <th>Địa chỉ người gửi</th>
                            <th>Văn phòng gửi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{delivery.fromName}</td>
                            <td>{delivery.fromPhone}</td>
                            <td>{delivery.fromAddress}</td>
                            <td><button onClick={() => handleViewShop(delivery.fromShop.shopId)}><Link to={`/management/detail-office`}>{delivery.fromShop.commune.name}({delivery.fromShop.shopId})</Link></button></td>
                        </tr>
                    </tbody>
                    <b>Thông tin phía nhận:</b>
                    <thead>
                        <tr>
                            <th>Nguời nhận</th>
                            <th>Số điện thoại người nhận</th>
                            <th>Địa chỉ người nhận</th>
                            <th>Văn phòng nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{delivery.toName}</td>
                            <td>{delivery.toPhone}</td>
                            <td>{delivery.toAddress}</td>
                            <td><button onClick={() => handleViewShop(delivery.toShop.shopId)}><Link to={`/management/detail-office`}>{delivery.toShop.commune.name}({delivery.toShop.shopId})</Link></button></td>
                        </tr>
                    </tbody>
                    <b>Trạng thái đơn hàng</b>
                    <thead>
                        <th>Trạng thái hiện tại</th>
                        <th>Văn phòng hiện tại</th>
                        <th>Thời gian tạo đơn</th>
                        <th>Thời gian cập nhật trạng thái cuối cùng</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{convertText(delivery.currentStatus)}</td>
                            <td><button onClick={() => handleViewShop(delivery.currentShop.shopId)}><Link to={`/management/detail-office`}>{delivery.currentShop.commune.name}({delivery.currentShop.shopId})</Link></button></td>
                            <td>{delivery.createdAt}</td>
                            <td>{delivery.updatedAt}</td>
                        </tr>
                    </tbody>
                </Table>
            </> : <></>}
        </div>
    </>
}

export default DeliveryDetail