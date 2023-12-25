import { useEffect, useState } from 'react'
import './Offices.scss'
import { useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../app/authSlice'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Offices = () => {

    const navigate = useNavigate()

    const [offices, setOffices] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const [filteredData, setFilteredData] = useState(null)

    const [page, setPage] = useState(1)

    useEffect(() => {

        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: { ...filteredData }
            }
            console.log('config: ', config.params)

            try {
                const response = await axios.get(`${backendUrl}/shops`, config)
                setOffices(response.data.shops)
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [filteredData, page])

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            page: page - 1
        })
    }, [page])

    const handleViewDetail = (id) => {
        navigate(`/detail-office?shopId=${id}`)
    }

    return <>
        <div className='offices'>
            <h2>Quản lý các văn phòng</h2>
            <Table>
                <thead>
                    <tr>
                        <th>ID Văn phòng</th>
                        <th>Địa chỉ (ID)</th>
                        <th>Loại văn phòng</th>
                        <th>Số nhân viên</th>
                        <th>Số đơn đến văn phòng</th>
                        <th>Số đơn đang ở văn phòng</th>
                        <th>Số đơn đã đi từ văn phòng</th>
                    </tr>
                </thead>
                <tbody>
                    {offices ? offices.map(off => (
                        <tr onClick={() => handleViewDetail(off.shopId)}>
                            <td>{off.shopId}</td>
                            <td>{off.commune.name} ({off.commune.communeId})</td>
                            <td>{off.type}</td>
                            <td>{off.employeeNumber}</td>
                            <td>{off.comingDeliveryNumber}</td>
                            <td>{off.currentDeliveryNumber}</td>
                            <td>{off.goneDeliveryNumber}</td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
            <button onClick={prev}>Prev</button>
            <span>{page}</span>
            <button onClick={next}>Next</button>
        </div>
    </>
}

export default Offices