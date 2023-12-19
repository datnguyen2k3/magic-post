import './TEComingToShop.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Table } from 'react-bootstrap'

const TEComingToShop = () => {

    const [shipments, setShipments] = useState()

    const navigate = useNavigate()

    const [filteredData, setFilteredData] = useState({
        search: '',
        transactionId: '',
        senderLocation: '',
        receiverLocation: '',
        senderPhone: '',
        senderName: '',
        receiverName: '',
        receiverPhone: '',
        receivingStoreId: '',
        sendingStoreId: '',
        currentLocation: '',
        status: '',
    })

    const handleChange = (event) => {
        setFilteredData({
            ...filteredData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/ceoshipments`).then(res => {
            setShipments(res.data);
            console.log(res.data);
            console.log(filteredData)
        }).catch(error => {
            console.log(error)
        })
    }, [filteredData])

    const handleViewShipmentDetail = (transactionId) => {
        navigate(`/te-coming-detail?transactionId=${transactionId}`)
    }

    return <>
        <div className='te-coming-to-shop'>
            <h2>Các đơn vận đang tới shop: (click vào đơn để đến trang xác nhận)</h2>
            <div><span>Tìm kiếm theo tất cả các trường: </span><input disabled={!!(filteredData.name || filteredData.province || filteredData.type || filteredData.username || filteredData.email || filteredData.idNumber || filteredData.phone)} name="all" value={filteredData.all} onChange={handleChange} /></div>
            <Table striped bordered hover className='te-managers-table'>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Người gửi</th>
                        <th>Điểm gửi</th>
                        <th>VP gửi</th>
                        <th>Người nhận</th>
                        <th>Điểm nhận</th>
                        <th>VP nhận</th>
                        <th>Địa điểm hiện tại</th>
                    </tr>
                    <tr>
                        <th><input disabled={!!filteredData.all} name="transactionId" value={filteredData.transactionId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="senderName" value={filteredData.senderName} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="senderLocation" value={filteredData.senderLocation} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="sendingStoreId" value={filteredData.sendingStoreId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="receiverName" value={filteredData.receiverName} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="receiverLocation" value={filteredData.receiverLocation} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="receivingStoreId" value={filteredData.receivingStoreId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="currentLocation" value={filteredData.currentLocation} onChange={handleChange}></input></th>
                    </tr>
                </thead>
                <tbody>
                    {shipments ? shipments.map(shipment => {
                        return <tr onClick={() => handleViewShipmentDetail(shipment.transactionId)}>
                            <td>{shipment.transactionId}</td>
                            <td>{shipment.senderName}</td>
                            <td>{shipment.senderLocation}</td>
                            <td>{shipment.sendingStoreId}</td>
                            <td>{shipment.receiverName}</td>
                            <td>{shipment.receiverLocation}</td>
                            <td>{shipment.receivingStoreId}</td>
                            <td>{shipment.currentLocation}</td>
                        </tr>
                    }) : ''}
                </tbody>
            </Table>
        </div>
    </>
}

export default TEComingToShop