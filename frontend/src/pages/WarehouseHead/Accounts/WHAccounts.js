import './WHAccounts.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken, selectAccount } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const WHAccounts = () => {

    const token = useSelector(selectToken)

    const shopId = useSelector(selectAccount).workAt.shopId

    const navigate = useNavigate()

    const [accounts, setAccounts] = useState()

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    const [sortField, setSortField] = useState('');
    const [direction, setDirection] = useState('');

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                    roles: 'EMPLOYEE',
                    shopId
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
    }, [filteredData, page, sortField, direction])

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
            sort: sortField,
            direction
        })
    }, [page, sortField, direction])

    const handleSort = (field) => {
        if (field === sortField) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortField(field);
            setDirection('ASC');
        }
    };

    const handleViewDetail = (username, role) => {
        navigate(`/wh-detail-account?username=${username}&role=${role}`)
    }

    const handleInputChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case 'name':
                value = value.toLowerCase();
                setName(value);
                break;
            case 'address':
                value = value.toLowerCase();
                setAddress(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'email':
                value = value.toLowerCase();
                setEmail(value);
                break;
            default:
        }
    }

    useEffect(() => {
        setFilteredData({
            ...filteredData,
            nameContains: name,
            addressContains: address,
            phoneContains: phone,
            emailContains: email,
        })
    }, [name, address, phone, email])

    return <>
        <div className='accounts'>
            <h1>Các tài khoản trưởng điểm</h1>
            <Table>
                <thead>
                    <tr>
                        <th className='accounts-sort' onClick={() => handleSort('NAME')}>Tên</th>
                        <th className='accounts-sort' onClick={() => handleSort('ADDRESS')}>Địa chỉ</th>
                        <th className='accounts-sort' onClick={() => handleSort('ROLE')}>Vai trò</th>
                        <th className='accounts-sort' onClick={() => handleSort('PHONE')}>Số điện thoại</th>
                        <th className='accounts-sort' onClick={() => handleSort('PHONE')}>Email</th>
                        <th className='accounts-sort' onClick={() => handleSort('SHOP_ID')}>Id Văn phòng</th>
                        <th className='accounts-sort' onClick={() => handleSort('COMMUNE_ID')}>Id Địa chỉ Văn phòng</th>
                        <th className='accounts-sort' onClick={() => handleSort('COMMUNE_NAME')}>Địa chỉ Văn phòng </th>
                        <th className='accounts-sort' onClick={() => handleSort('EMPLOYEE_NUMBER')}>Số nhân viên</th>
                        <th className='accounts-sort' onClick={() => handleSort('CURRENT_DELIVERY_NUMBER')}>Số đơn đang tồn</th>
                    </tr>
                    <tr>
                        <th><input type='text' name='name' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='address' onChange={handleInputChange}></input></th>
                        <th></th>
                        <th><input type='number' name='phone' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='email' onChange={handleInputChange}></input></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {accounts ? accounts.map(acc => <>
                        <tr onClick={() => handleViewDetail(acc.username, acc.role)}>
                            <td>{acc.name}</td>
                            <td>{acc.address}</td>
                            <td>{acc.role}</td>
                            <td>{acc.phone}</td>
                            <td>{acc.email}</td>
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

export default WHAccounts