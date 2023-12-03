import { useEffect } from 'react';
import './Details.scss'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import parse from 'html-react-parser'

const Details = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const myQueryParam = queryParams.get('shipmentCode')

    const [shipment, setShipment] = useState();

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        fetch(`${backendUrl}/shipments?${queryParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setShipment(data[0]);
                console.log(shipment)
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, [queryParams])

    const convertRecordToString = (date, place, status) => {
        switch (status) {
            case 'ĐÃ_ĐI':
                return `On <b>${date}</b>, shipment left <b>${place}</b>`;
            case 'ĐÃ_ĐẾN':
                return `On <b>${date}</b>, shipment arrived <b>${place}</b>`;
            case 'ĐANG_ĐẾN':
                return `On <b>${date}</b>, shipment was on the way to <b>${place}</b>`;
            default:
                return 'Unknown status';
        }
    }

    return <>
        <div className='details'>
            {shipment ? <div className='details-content'>
                <ListGroup>
                    <ListGroup.Item variant='primary'><b>Shipment Code</b>: {shipment.shipmentCode}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Sender's Name</b>: {shipment.senderName}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Sender's Province</b>: {shipment.senderProvince}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Sent Date</b>: {shipment.senderDate}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Receiver's Name</b>: {shipment.receiverName}</ListGroup.Item>
                    <ListGroup.Item variant='primary'><b>Receiver's Province</b>: {shipment.receiverProvince}</ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    {shipment.records.map(record => {
                        return <ListGroup.Item variant='primary'>{parse(convertRecordToString(record.date, record.place, record.status))}</ListGroup.Item>
                    })}
                </ListGroup>
            </div> : <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}
        </div >
    </>
}

export default Details