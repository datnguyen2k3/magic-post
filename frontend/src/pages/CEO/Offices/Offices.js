import { useEffect, useState } from 'react'
import './Offices.scss'
import { useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../app/authSlice'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { convertText } from '../../../service/service'

const Offices = () => {

    const navigate = useNavigate()

    const [offices, setOffices] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const [filteredData, setFilteredData] = useState(null)

    const [page, setPage] = useState(1)

    const [maxPage, setMaxPage] = useState();

    const [type, setType] = useState();

    const [communeId, setCommuneId] = useState();

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
                setMaxPage(response.data.totalPages)
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [filteredData, page, type, communeId])

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(Math.min(maxPage, page + 1))
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            page: page - 1,
            type,
            communeId
        })
    }, [page, type, communeId])

    const handleViewDetail = (id) => {
        navigate(`/management/detail-office?shopId=${id}`)
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'communeId':
                setCommuneId(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            default:
                break;
        }
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
                    <tr>
                        <th></th>
                        <th><input name='communeId' placeholder='Tìm kiếm theo id địa chỉ' onChange={handleInputChange}></input></th>
                        <th>
                            <select name='type' onChange={handleInputChange}>
                                <option value={''}>Tất cả</option>
                                <option value={'POST'}>Văn phòng giao dịch</option>
                                <option value={'WAREHOUSE'}>Văn phòng tập kết</option>
                            </select>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {offices ? offices.map(off => (
                        <tr onClick={() => handleViewDetail(off.shopId)}>
                            <td>{off.shopId}</td>
                            <td>{off.commune.name} ({off.commune.communeId})</td>
                            <td>{convertText(off.type)}</td>
                            <td>{off.employeeNumber}</td>
                            <td>{off.comingDeliveryNumber}</td>
                            <td>{off.currentDeliveryNumber}</td>
                            <td>{off.goneDeliveryNumber}</td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
            <button onClick={prev}>Trang trước</button>
            <span>{page}/{maxPage}</span>
            <button onClick={next}>Trang sau</button>
        </div>
    </>
}

export default Offices