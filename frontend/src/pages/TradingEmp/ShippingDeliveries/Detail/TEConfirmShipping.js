import { useEffect, useState } from 'react';
import './TEConfirmShipping.scss'
import { useSelector } from 'react-redux';
import { selectToken, selectAccount } from '../../../../app/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TEConfirmShipping = () => {

    const shopId = useSelector(selectAccount).workAt.shopId;

    const navigate = useNavigate()

    const token = useSelector(selectToken)

    const params = new URLSearchParams(window.location.search);

    const deliveryId = params.get('deliveryId')

    const [direction, setDirection] = useState('ASC')
    const [delivery, setDelivery] = useState(null)
    const [history, setHistory] = useState(null)
    const [result, setResult] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const handleDirectionChange = (e) => {
        setDirection(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                deliveryId,
                directionSort: direction
            }

            const headers = {
                'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                'Content-Type': 'application/json'
            }

            const config = {
                headers,
                params
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, config)
                setDelivery(response.data.deliveryStatusDetailHistory[0].delivery)
                setHistory(response.data.deliveryStatusDetailHistory)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [direction])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                    'Content-Type': 'application/json'
                },
                params: {
                    deliveryId
                }
            }
            console.log(shopId)
            const body = {
                shopId: shopId,
                status: result
            }
            const response = await axios.post(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, body, config)
            if (response) {
                toast.success('Xác nhận bắt đầu ship đến khách!')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleResultChange = (e) => {
        setResult(e.target.value)
    }

    return <>
        {delivery ? <div className='te-detail'>
            <label>Thứ tự trạng thái:</label>
            <select onChange={handleDirectionChange}>
                <option value={'ASC'}>Tăng dần</option>
                <option value={'DESC'}>Giảm dần</option>
            </select>
            <div className=''>
                <h3><b>Thông tin đơn hàng</b></h3>
                <span><b>Id: </b>{delivery.deliveryId}</span>
                <span><b>Được gửi từ cửa hàng: </b>{delivery.fromCommune.name} <b>đến cửa hàng</b> {delivery.toCommune.name}</span>
                <span><b>Người gửi: </b>{delivery.fromName} <b>gửi từ</b> {delivery.fromAddress}</span>
                <span><b>Người nhận: </b>{delivery.toName} <b>nhận ở</b> {delivery.toAddress}</span>
            </div>
            <div className=''>
                <h3><b>Lịch sử chuyển hàng</b></h3>
                {history !== null ? history.map(his => <>
                    <span><b>Thời gian: </b>{his.createdAt}</span>
                    <span><b>Địa điểm: </b>{his.shop.commune.name}</span>
                    <span><b>Loại văn phòng: </b>{his.shop.type === 'POST' ? 'Điểm giao dịch' : 'Điểm tập kết'}</span>
                </>
                ) : <>Loading...</>}
            </div>
        </div> : <></>}
        {(history && history[history.length - 1].statusType === 'SHIPPING_TO_CUSTOMER' && history[history.length - 1].shop.shopId === Number(shopId)) ? <>
            <div className=''>
                <select onChange={handleResultChange}>
                    <option value={''}>---</option>
                    <option value={'SENT_TO_CUSTOMER_SUCCESS'}>Gửi hàng thành công</option>
                    <option value={'SENT_TO_CUSTOMER_FAIL'}>Gửi hàng thất bại</option>
                </select>
            </div>
            <button className='te-next-confirm' onClick={handleSubmit}>Xác nhận</button>
        </> : <></>}
    </>
}

export default TEConfirmShipping