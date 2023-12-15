import './TMShipmentDetail.scss'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const TMShipmentDetail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const [shipmentDetail, setShipmentDetail] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tmshipments?${queryParams.toString()}`)
            .then(response => {
                setShipmentDetail(response.data[0]);
                console.log(shipmentDetail);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, []);

    return <>
        <div className='tm-shipment-detail'>
            {shipmentDetail ? <>
                <ListGroup>
                    <ListGroup.Item variant='primary'><b>Mã đơn vận</b>: {shipmentDetail.transactionId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Loại hàng</b>: {shipmentDetail.type}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Văn phòng gửi</b>: {shipmentDetail.sendingStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Văn phòng nhận</b>: {shipmentDetail.receivingStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Điểm liền trước</b>: {shipmentDetail.previousStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Điểm liền sau</b>: {shipmentDetail.nextStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Trạng thái hiện tại</b>: {shipmentDetail.status}</ListGroup.Item>
                </ListGroup>
            </> : <></>}
        </div>
    </>
}

export default TMShipmentDetail