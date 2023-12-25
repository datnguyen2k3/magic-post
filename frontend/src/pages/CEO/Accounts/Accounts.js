import './Account.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Accounts = () => {

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [accounts, setAccounts] = useState()

    const [roles, setRoles] = useState(['POST_HEAD', 'WAREHOUSE_HEAD'])

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                    roles: roles.join(',')
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/accounts`, config)
                setAccounts(response.data.accounts)
                setMaxPage(response.data.totalPages)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [filteredData, page])

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(Math.min(maxPage, page + 1))
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            page: page - 1
        })
    }, [page])

    return <>
        <div className='accounts'>
            <h1>Các tài khoản trưởng điểm</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Id Văn phòng</th>
                        <th>Địa chỉ Văn phòng</th>
                        <th>Số nhân viên đang quản lý</th>
                        <th>Số đơn đang ở văn phòng đó</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts ? accounts.map(acc => <>
                        <tr>
                            <td>{acc.name}</td>
                            <td>{acc.address}</td>
                            <td>{acc.role}</td>
                            <td>{acc.phone}</td>
                            <td>{acc.workAt.shopId}</td>
                            <td>{acc.workAt.commune.communeId}</td>
                            <td>{acc.workAt.commune.name}</td>
                            <td>{acc.workAt.employeeNumber}</td>
                            <td>{acc.workAt.currentDeliveryNumber}</td>
                        </tr>
                    </>) : <>Loading ...</>}
                </tbody>
                <button onClick={prev}>Prev</button>
                <span>{page}</span>
                <button onClick={next}>Next</button>
            </Table>
        </div>
    </>
}

export default Accounts