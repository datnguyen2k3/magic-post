import './ShipmentDetail.scss'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ShipmentDetail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const [shipmentDetail, setShipmentDetail] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/ceoshipments?${queryParams.toString()}`)
            .then(response => {
                setShipmentDetail(response.data[0]);
                console.log(shipmentDetail);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, []);

    return <>
        <div className='shipment-detail'>
            {shipmentDetail ? <>
                <ListGroup>
                    <ListGroup.Item variant='primary'><b>Mã đơn vận</b>: {shipmentDetail.transactionId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Người gửi</b>: {shipmentDetail.senderName}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Nơi gửi</b>: {shipmentDetail.senderLocation}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Số điện thoại người gửi</b>: {shipmentDetail.senderPhone}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Văn phòng gửi</b>: {shipmentDetail.sendingStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Người nhận</b>: {shipmentDetail.receiverName}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Nơi nhận</b>: {shipmentDetail.receiverLocation}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Số điện thoại người nhận</b>: {shipmentDetail.receiverPhone}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Văn phòng nhận</b>: {shipmentDetail.receivingStoreId}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Vị trí hiện tại</b>: {shipmentDetail.currentLocation}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Trạng thái hiện tại</b>: {shipmentDetail.status}</ListGroup.Item>
                </ListGroup>
            </> : <></>}
        </div>
    </>
}

export default ShipmentDetail