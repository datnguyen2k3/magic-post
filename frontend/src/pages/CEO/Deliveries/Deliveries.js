import './Deliveries.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Deliveries = () => {

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [deliveries, setDeliveries] = useState()

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    const [sort, setSort] = useState('UPDATED_AT');
    const [direction, setDirection] = useState('DESC');

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveries`, config)
                setDeliveries(response.data.deliveries)
                setMaxPage(response.data.totalPages)
                console.log(response.data.deliveries)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [filteredData, page, sort, direction])

    const [fromName, setFromName] = useState()
    const [fromAddress, setFromAddress] = useState()
    const [fromPhone, setFromPhone] = useState()
    const [fromShopId, setFromShopId] = useState()
    const [toName, setToName] = useState()
    const [toAddress, setToAddress] = useState()
    const [toPhone, setToPhone] = useState()
    const [toShopId, setToShopId] = useState()
    const [statuses, setStatuses] = useState()
    const [currentShopId, setCurrentShopId] = useState()
    const [productType, setProductType] = useState()

    const handleInputChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case 'statuses':
                setStatuses(value)
                break
            case 'currentShopId':
                setCurrentShopId(value)
                break
            case 'productType':
                setProductType(value)
                break
            case 'fromName':
                value = value.toLowerCase()
                setFromName(value)
                break
            case 'fromPhone':
                setFromPhone(value)
                break
            case 'fromShopId':
                setFromShopId(value)
                break
            case 'fromAddress':
                value = value.toLowerCase()
                setFromAddress(value)
                break
            case 'toName':
                value = value.toLowerCase()
                setToName(value)
                break
            case 'toPhone':
                setToPhone(value)
                break
            case 'toShopId':
                setToShopId(value)
                break
            case 'toAddress':
                value = value.toLowerCase()
                setToAddress(value)
                break
            default:
                break
        }
    }

    useEffect(() => {
        let data = {
            ...filteredData,
            statuses,
            currentShopId,
            productType,
            fromNameContains: fromName,
            fromAddressContains: fromAddress,
            fromPhoneContains: fromPhone,
            fromShopId,
            toNameContains: toName,
            toAddressContains: toAddress,
            toPhoneContains: toPhone,
            toShopId,
            sort,
            direction
        };

        if (!statuses || statuses.length === 0) {
            // Xóa trường statuses
            delete data.statuses;
        }

        setFilteredData(data);

    }, [statuses, currentShopId, productType, fromAddress, fromPhone, fromName, fromShopId, toAddress, toPhone, toName, toShopId, sort, direction])

    const handleViewDetail = (id) => {
        navigate(`/management/delivery-detail?deliveryId=${id}`)
    }

    const prev = () => {
        setPage(Math.max(page - 1, 1))
    }

    const next = () => {
        setPage(Math.min(maxPage, page + 1))
    }

    const handleSort = (field) => {
        if (field === sort) {
            setDirection(direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSort(field);
            setDirection('ASC');
        }
    };

    const renderSortIcon = (field) => {
        if (field !== sort) {
            return <FontAwesomeIcon icon={faSort} />;
        }
        return direction === 'ASC' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />;
    };

    return <>
        <div className='deliveries'>
            <h1>Thống kê các đơn hàng hiện tại</h1>
            <Table>
                <thead>
                    <tr>
                        <th className='deliveries-sort' onClick={() => handleSort('CREATED_AT')}>Thời gian tạo{renderSortIcon('CREATED_AT')}</th>
                        <th className='deliveries-sort' onClick={() => handleSort('UPDATED_AT')}>Thời gian cập nhật mới nhất{renderSortIcon('UPDATED_AT')}</th>
                        <th>Trạng thái hiện tại</th>
                        <th>Văn phòng hiện tại</th>
                        <th>Loại hàng</th>
                        <th className='deliveries-sort' onClick={() => handleSort('FROM_NAME')}>Người gửi{renderSortIcon('FROM_NAME')}</th>
                        <th className='deliveries-sort' onClick={() => handleSort('FROM_PHONE')}>Số điện thoại người gửi{renderSortIcon('FROM_PHONE')}</th>
                        <th>Văn phòng gửi</th>
                        <th className='deliveries-sort' onClick={() => handleSort('FROM_ADDRESS')}>Địa chỉ gửi{renderSortIcon('FROM_ADDRESS')}</th>
                        <th className='deliveries-sort' onClick={() => handleSort('TO_NAME')}>Người nhận{renderSortIcon('TO_NAME')}</th>
                        <th className='deliveries-sort' onClick={() => handleSort('TO_PHONE')}>Số điện thoại người nhận{renderSortIcon('TO_PHONE')}</th>
                        <th>Văn phòng nhận</th>
                        <th className='deliveries-sort' onClick={() => handleSort('TO_ADDRESS')}>Địa chỉ nhận{renderSortIcon('TO_ADDRESS')}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><select name='statuses' onChange={handleInputChange}>
                            <option value={''}>Tất cả</option>
                            <option value={'RECEIVED_FROM_CUSTOMER'}>Đã nhận từ khách</option>
                            <option value={'GONE_FROM_SHOP'}>Đã đi khỏi văn phòng</option>
                            <option value={'COMING_TO_SHOP'}>Đang tới văn phòng khác</option>
                            <option value={'RECEIVED_FROM_SHOP'}>Đã được nhận bởi văn phòng</option>
                            <option value={'SHIPPING_TO_CUSTOMER'}>Đang ship tới khách</option>
                            <option value={'SENT_TO_CUSTOMER_SUCCESS'}>Hàng gửi thành công</option>
                            <option value={'SENT_TO_CUSTOMER_FAIL'}>Hàng gửi không thành công</option>
                        </select></th>
                        <th><input type='number' name='currentShopId' onChange={handleInputChange}></input></th>
                        <th><select name='productType' onChange={handleInputChange}>
                            <option value={''}>Tất cả</option>
                            <option value={'DOCUMENT'}>Tài liệu</option>
                            <option value={'PRODUCT'}>Hàng hóa</option>
                        </select></th>
                        <th><input type='text' name='fromName' onChange={handleInputChange}></input></th>
                        <th><input type='number' name='fromPhone' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='fromShopId' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='fromAddress' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='toName' onChange={handleInputChange}></input></th>
                        <th><input type='number' name='toPhone' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='toShopId' onChange={handleInputChange}></input></th>
                        <th><input type='text' name='toAddress' onChange={handleInputChange}></input></th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries ? deliveries.map(del => (
                        <tr onClick={() => handleViewDetail(del.deliveryId)}>
                            <td>{del.createdAt}</td>
                            <td>{del.updatedAt}</td>
                            <td>{del.currentStatus}</td>
                            <td>{del.currentShop.commune.name} - {del.currentShop.type}({del.currentShop.shopId})</td>
                            <td>{del.productType}</td>
                            <td>{del.fromName}</td>
                            <td>{del.fromPhone}</td>
                            <td>{del.fromShop.commune.name} - {del.fromShop.type}({del.fromShop.shopId})</td>
                            <td>{del.fromAddress}</td>
                            <td>{del.toName}</td>
                            <td>{del.toPhone}</td>
                            <td>{del.toShop.commune.name} - {del.toShop.type}({del.toShop.shopId})</td>
                            <td>{del.toAddress}</td>
                        </tr>
                    )) : <></>}
                </tbody>
                <button onClick={prev}>Prev</button>
                <span>{page}</span>
                <button onClick={next}>Next</button>
            </Table>
        </div>
    </>
}

export default Deliveries