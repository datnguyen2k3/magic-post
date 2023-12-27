import './DeliveryDetail.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { beautifyId } from '../../../service/service';

const DeliveryDetail = () => {

    const params = new URLSearchParams(window.location.search);

    const deliveryId = params.get('deliveryId')

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
        console.log('ok')
    }, [])

    const viewOffice = (id) => {
        navigate(`/detail-office?shopId=${id}`)
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
                            <td><Link to={`/detail-office?shopId=${delivery.fromShop.shopId}`}>{delivery.fromShop.commune.name}({delivery.fromShop.shopId})</Link></td>
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
                            <td><Link to={`/detail-office?shopId=${delivery.toShop.shopId}`}>{delivery.toShop.commune.name}({delivery.toShop.shopId})</Link></td>
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
                            <td>{delivery.currentStatus}</td>
                            <td><Link to={`/detail-office?shopId=${delivery.currentShop.shopId}`}>{delivery.currentShop.commune.name}({delivery.currentShop.shopId})</Link></td>
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