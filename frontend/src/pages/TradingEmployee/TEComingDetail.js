import './TEComingDetail.scss'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

const TEComingDetail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const [shipmentDetail, setShipmentDetail] = useState();
    const [officeId, setOfficeId] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/ceoshipments?${queryParams.toString()}`)
            .then(response => {
                setShipmentDetail(response.data[0]);
                console.log(shipmentDetail);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, []);

    const handleInputChange = (e) => {
        setOfficeId(e.target.value)
    }

    const handleConfirm = (detail, id) => {
        console.log(detail, ' and ', id)
    }

    return <>
        <div className='te-coming-detail'>
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
                </ListGroup>
                <select value={officeId} onChange={handleInputChange}>
                    <option value="">Văn phòng</option>
                    <option value="001">Văn phòng 001</option>
                    <option value="002">Văn phòng 002</option>
                    <option value="003">Văn phòng 003</option>
                </select>
                <button className='te-coming-submit' disabled={officeId === ''} onClick={() => handleConfirm(shipmentDetail, officeId)}>Xác nhận đơn hàng</button>
            </> : <></>}
        </div>
    </>
}

export default TEComingDetail