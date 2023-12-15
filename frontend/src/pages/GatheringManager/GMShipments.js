import './GMShipments.scss'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'

const GMShipments = () => {

    const [shipments, setShipments] = useState()

    const navigate = useNavigate()

    const [filteredData, setFilteredData] = useState({
        search: '',
        transactionId: '',
        previousStoreId: '',
        nextStoreId: '',
        sendingStoreId: '',
        receivingStoreId: '',
        status: '',
    })

    const handleChange = (event) => {
        setFilteredData({
            ...filteredData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/gmshipments`).then(res => {
            setShipments(res.data);
            console.log(res.data);
            console.log(filteredData)
        }).catch(error => {
            console.log(error)
        })
    }, [filteredData])

    const handleViewShipmentDetail = (transactionId) => {
        navigate(`/gm-shipment-detail?transactionId=${transactionId}`)
    }

    return <>
        <div className='gm-shipments'><h2><b>Các đơn vận hiện tại:</b></h2>
            <div><span>Search all here: </span><input disabled={!!(filteredData.transactionId || filteredData.previousStoreId || filteredData.nextStoreId || filteredData.sendingStoreId || filteredData.receivingStoreId)} name="all" value={filteredData.all} onChange={handleChange} /></div>
            <Table striped bordered hover className='gm-shipments-table'>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>ID Điểm trước đó</th>
                        <th>ID Điểm sau đó</th>
                        <th>ID Văn phòng gửi</th>
                        <th>ID Văn phòng nhận</th>
                        <th>Trạng thái</th>
                    </tr>
                    <tr>
                        <th><input disabled={!!filteredData.all} name="transactionId" value={filteredData.transactionId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="previousStoreId" value={filteredData.previousStoreId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="nextStoreId" value={filteredData.nextStoreId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="sendingStoreId" value={filteredData.sendingStoreId} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="receivingStoreId" value={filteredData.receivingStoreId} onChange={handleChange}></input></th>
                        <th><select name="status" value={filteredData.status} onChange={handleChange}>
                            <option value="">Trạng thái</option>
                            <option value="đang đến">Đang đến</option>
                            <option value="đang tồn">Đang tồn</option>
                            <option value="đã đi">Đã đi</option>
                        </select></th>
                    </tr>
                </thead>
                <tbody>
                    {shipments ? shipments.map(shipment => {
                        return <tr onClick={() => handleViewShipmentDetail(shipment.transactionId)}>
                            <td>{shipment.transactionId}</td>
                            <td>{shipment.previousStoreId}</td>
                            <td>{shipment.nextStoreId}</td>
                            <td>{shipment.sendingStoreId}</td>
                            <td>{shipment.receivingStoreId}</td>
                            <td>{shipment.status}</td>
                        </tr>
                    }) : ''}
                </tbody>
            </Table></div>
    </>
}

export default GMShipments