import './DetailOffice.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../app/authSlice';
import axios from 'axios';
import { beautifyId } from '../../../service/service';
import { Link } from 'react-router-dom';

const DetailOffice = () => {

    const paramsWeb = new URLSearchParams(window.location.search)

    const shopId = paramsWeb.get("shopId");

    const [detail, setDetail] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const token = useSelector(selectToken)

    const [deliveries, setDeliveries] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    shopId
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/shops/${shopId}`, config)
                setDetail(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    currentShopId: shopId,
                    sort: 'UPDATED_AT',
                    direction: 'DESC',
                    page: 0,
                    size: 5
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveries`, config)
                console.log(response.data)
                setDeliveries(response.data.deliveries)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    return <>
        <div className='detail-office'>
            <h1>Thông tin chi tiết văn phòng</h1>
            {detail ? <>
                <span><b>Shop Id: </b>{detail.shopId}</span><br></br>
                <span><b>Địa chỉ: </b>{detail.commune.name} ({detail.commune.communeId})</span><br></br>
                <span><b>Số nhân viên: </b>{detail.employeeNumber}</span><br></br>
                <span><b>Loại văn phòng: </b>{detail.type}</span><br></br>
                <span><b>Số đơn đang tới văn phòng: </b>{detail.comingDeliveryNumber}</span><br></br>
                <span><b>Số đơn đang ở văn phòng: </b>{detail.currentDeliveryNumber}</span><br></br>
                <span><b>Số đơn đã đi khỏi văn phòng: </b>{detail.goneDeliveryNumber}</span><br></br>
            </> : <></>}
            <b>Các đơn hàng gần đây ở văn phòng này:</b><br></br>
            {deliveries ? deliveries.map(del => <>
                <span><b>Id đơn hàng: </b><Link to={`/management/delivery-detail?deliveryId=${del.deliveryId}`}>{beautifyId(del.deliveryId)}</Link></span><br></br>
                <span><b>Thời gian cập nhật gần nhất: </b>{del.updatedAt}</span><br></br>
                <span><b>Người gửi: </b>{del.fromName} - {del.fromPhone}</span> <br></br>
                <span><b>Người nhận: </b>{del.toName} - {del.toPhone}</span> <br></br>
                <span><b>Văn phòng gửi: </b>{del.fromShop.commune.name} ({del.fromShop.shopId})</span> <br></br>
                <span><b>Văn phòng nhận: </b>{del.toShop.commune.name} ({del.toShop.shopId})</span>
            </>) : <></>}
        </div>
    </>
}

export default DetailOffice