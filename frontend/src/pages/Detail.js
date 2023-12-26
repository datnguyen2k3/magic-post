import './Detail.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Detail = () => {

    const params = new URLSearchParams(window.location.search);

    const deliveryId = params.get('deliveryId')

    const [delivery, setDelivery] = useState()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

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

    return <>
        <div className='detail'>
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
                            <td>{delivery.deliveryId}</td>
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
                            <td>{delivery.fromShop.commune.name}({delivery.fromShop.shopId})</td>
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
                            <td>{delivery.toShop.commune.name}({delivery.toShop.shopId})</td>
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
                            <td>{delivery.currentShop.commune.name} - {delivery.currentShop.type}({delivery.currentShop.shopId})</td>
                            <td>{delivery.createdAt}</td>
                            <td>{delivery.updatedAt}</td>
                        </tr>
                    </tbody>
                </Table>
            </> : <></>}
        </div>
    </>
}

export default Detail