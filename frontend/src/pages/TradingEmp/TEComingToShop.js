import './TEComingToShop.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAccount, selectToken } from '../../app/authSlice'
import { Link } from 'react-router-dom'

const TEComingToShop = () => {

    const [deliveries, setDeliveries] = useState();
    const [filterData, setFilterData] = useState();
    const [name, setName] = useState();
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
                    status: 'RECEIVED_FROM_CUSTOMER',
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
        switch (e.target.name) {
            case 'productType':
                setProductType(e.target.value);
                break;
            case 'fromName':
                setFromName(e.target.value);
                break;
            case 'fromAddress':
                setFromAddress(e.target.value);
                break;
            case 'fromShop':
                setFromShop(e.target.value);
                break;
            case 'toName':
                setToName(e.target.value);
                break;
            case 'toAddress':
                setToAddress(e.target.value);
                break;
            case 'toShop':
                setToShop(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setFilterData({
            ...filterData,
            productType,
            fromAddressContains: fromAddress,
            toAddressContains: toAddress,
            fromNameContains: fromName,
            toNameContains: toName,
            fromShopId: fromShop,
            toShopId: toShop
        })

    }, [productType, fromAddress, fromName, fromShop, toAddress, toName, toShop])

    return <>
        <div className='te-coming'>
            <Table>
                <thead>
                    <tr>
                        <th>Thời gian nhận</th>
                        <th>Đơn hàng</th>
                        <th>Loại hàng</th>
                        <th>Người gửi</th>
                        <th>Địa chỉ người gửi</th>
                        <th>Văn phòng gửi</th>
                        <th>Người nhận</th>
                        <th>Địa chỉ người nhận</th>
                        <th>Văn phòng nhận</th>
                        <th>Chọn điểm đến kế tiếp</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th><select name='productType' onChange={handleInputChange}>
                            <option value={''}>Tất cả các loại hàng</option>
                            <option value={'DOCUMENT'}>DOCUMENT</option>
                            <option value={'GOODS'}>GOODS</option>
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
                            <td>{del.delivery.productType}</td>
                            <td>{del.delivery.fromName}</td>
                            <td>{del.delivery.fromAddress}</td>
                            <td>{del.delivery.fromShop.commune.name} ({del.delivery.fromShop.commune.communeId})</td>
                            <td>{del.delivery.toName}</td>
                            <td>{del.delivery.toAddress}</td>
                            <td>{del.delivery.toShop.commune.name} ({del.delivery.toShop.commune.communeId})</td>
                            <td><Link to={`/te-next?deliveryId=${del.delivery.deliveryId}`}>Chọn</Link></td>
                        </tr>
                    )) : <></>}
                </tbody>
            </Table>
        </div>
    </>

}

export default TEComingToShop