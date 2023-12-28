import './TEShipping.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAccount, selectToken } from '../../../../app/authSlice'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { convertText } from '../../../../service/service'

const TEShipping = () => {

    const [deliveries, setDeliveries] = useState();
    const [filterData, setFilterData] = useState();
    const [productType, setProductType] = useState();
    const [fromName, setFromName] = useState();
    const [fromAddress, setFromAddress] = useState();
    const [fromShop, setFromShop] = useState();
    const [toName, setToName] = useState();
    const [toAddress, setToAddress] = useState();
    const [toShop, setToShop] = useState();

    const token = useSelector(selectToken);
    const shopId = useSelector(selectAccount).workAt.shopId

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [sort, setSort] = useState()
    const [direction, setDirection] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    ...filterData,
                    currentShopId: shopId,
                    statuses: 'SHIPPING_TO_CUSTOMER',
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveryStatuses`, config)
                console.log(config.params)
                setDeliveries(response.data.deliveryStatuses)
                console.log(response.data.deliveryStatuses)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [filterData])

    const handleInputChange = (e) => {
        let value = e.target.value;
        switch (e.target.name) {
            case 'productType':
                setProductType(e.target.value);
                break;
            case 'fromName':
                value = value.toLowerCase();
                setFromName(value);
                break;
            case 'fromAddress':
                value = value.toLowerCase();
                setFromAddress(value);
                break;
            case 'fromShop':
                setFromShop(e.target.value);
                break;
            case 'toName':
                value = value.toLowerCase();
                setToName(value);
                break;
            case 'toAddress':
                value = value.toLowerCase();
                setToAddress(value);
                break;
            case 'toShop':
                setToShop(e.target.value);
                break;
            default:
                break;
        }
    }

    const [page, setPage] = useState(1);

    useEffect(() => {
        setFilterData({
            ...filterData,
            productType,
            fromAddressContains: fromAddress,
            toAddressContains: toAddress,
            fromNameContains: fromName,
            toNameContains: toName,
            fromShopId: fromShop,
            toShopId: toShop,
            page: page - 1
        })

    }, [productType, fromAddress, fromName, fromShop, toAddress, toName, toShop, page])

    const prev = (e) => {
        setPage(Math.max(1, page - 1))
    }

    const next = (e) => {
        setPage(page + 1)
    }

    const handleSort = (fieldName) => {
        let direction = 'ASC';
        if (sort === fieldName && direction === 'ASC') {
            direction = 'DESC';
        }
        setSort(fieldName);
        setDirection(direction);
    };

    return <>
        <div className='te-shipping'>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Thời gian nhận
                        </th>
                        <th>Đơn hàng</th>
                        <th>Loại hàng</th>
                        <th>Người gửi</th>
                        <th>Địa chỉ người gửi</th>
                        <th>Văn phòng gửi</th>
                        <th>Người nhận</th>
                        <th>Địa chỉ người nhận</th>
                        <th>Văn phòng nhận</th>
                        <th>Xác nhận văn phòng đã nhận được</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><select name='productType' onChange={handleInputChange}>
                            <option value={''}>Tất cả các loại hàng</option>
                            <option value={'DOCUMENT'}>DOCUMENT</option>
                            <option value={'PRODUCT'}>PRODUCT</option>
                        </select></th>
                        <th><input onChange={handleInputChange} type='text' name='fromName'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='fromAddress'></input></th>
                        <th><input onChange={handleInputChange} type='number' name='fromShop'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='toName'></input></th>
                        <th><input onChange={handleInputChange} type='text' name='toAddress'></input></th>
                        <th><input onChange={handleInputChange} type='number' name='toShop'></input></th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries ? deliveries.map(del => (
                        <tr>
                            <td>{del.createdAt}</td>
                            <td>{del.delivery.name}</td>
                            <td>{convertText(del.delivery.productType)}</td>
                            <td>{del.delivery.fromName}</td>
                            <td>{del.delivery.fromAddress}</td>
                            <td>{del.delivery.fromShop.commune.name} ({del.delivery.fromShop.commune.communeId})</td>
                            <td>{del.delivery.toName}</td>
                            <td>{del.delivery.toAddress}</td>
                            <td>{del.delivery.toShop.commune.name} ({del.delivery.toShop.commune.communeId})</td>
                            <td><Link to={`/management/te-confirm-shipping?deliveryId=${del.delivery.deliveryId}`}>Chọn</Link></td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
            <div className='te-coming-pagination'>
                <button onClick={prev}>Trang trước</button>
                <span>{page}</span>
                <button onClick={next}>Trang sau</button>
            </div>
        </div>
    </>

}

export default TEShipping