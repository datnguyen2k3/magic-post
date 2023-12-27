import './TEConfirmReceive.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAccount, selectToken } from '../../../../app/authSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { beautifyId } from '../../../../service/service'
import { Link } from 'react-router-dom'

const TEConfirmReceive = () => {

    const navigate = useNavigate();

    const token = useSelector(selectToken)

    const params = new URLSearchParams(window.location.search);

    const deliveryId = params.get('deliveryId')

    const shopId = useSelector(selectAccount).workAt.shopId;

    const [direction, setDirection] = useState('ASC')
    const [delivery, setDelivery] = useState(null)
    const [history, setHistory] = useState(null)
    const [fixedHistory, setFixedHistory] = useState(null)
    const [isFixed, setIsFixed] = useState(false)

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
                if (!isFixed) {
                    setFixedHistory(response.data.deliveryStatusDetailHistory)
                }
                setIsFixed(true)
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
                status: 'RECEIVED_FROM_SHOP'
            }
            const response = await axios.post(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, body, config)
            if (response) {
                toast.success('Xác nhận thành công!')
                navigate('/te-coming')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <button><Link to={'/te-coming'}>Trở về bảng thống kê đơn đang đến</Link></button>
        {delivery ? <div className='te-confirm-receive'>
            <label>Thứ tự trạng thái:</label>
            <select onChange={handleDirectionChange}>
                <option value={'ASC'}>Tăng dần</option>
                <option value={'DESC'}>Giảm dần</option>
            </select>
            <div className=''>
                <h3><b>Thông tin đơn hàng</b></h3>
                <span><b>Id: </b>{beautifyId(delivery.deliveryId)}</span><br></br>
                <span><b>Được gửi từ cửa hàng: </b>{delivery.fromCommune.name} <b>đến cửa hàng</b> {delivery.toCommune.name}</span><br></br>
                <span><b>Người gửi: </b>{delivery.fromName} <b>gửi từ</b> {delivery.fromAddress}</span><br></br>
                <span><b>Người nhận: </b>{delivery.toName} <b>nhận ở</b> {delivery.toAddress}</span><br></br>
            </div>
            <div className=''>
                <h3><b>Lịch sử chuyển hàng</b></h3>
                {history !== null ? history.map(his => <>
                    <span><b>Thời gian: </b>{his.createdAt}</span><br></br>
                    <span><b>Địa điểm: </b>{his.shop.commune.name}</span><br></br>
                    <span><b>Loại văn phòng: </b>{his.shop.type === 'POST' ? 'Điểm giao dịch' : 'Điểm tập kết'}</span><br></br>
                </>) : <></>}
            </div>
        </div> : <></>}
        {(fixedHistory && fixedHistory[fixedHistory.length - 1].statusType === 'COMING_TO_SHOP' && fixedHistory[fixedHistory.length - 1].shop.shopId === Number(shopId)) ? <>
            <button className='te-next-confirm' onClick={handleSubmit}>Xác nhận nhận đơn</button>
        </> : <></>}
    </>
}

export default TEConfirmReceive;