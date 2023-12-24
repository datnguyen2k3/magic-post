import './TENext.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAccount, selectToken } from '../../app/authSlice'

const TENext = () => {

    const token = useSelector(selectToken)

    const params = new URLSearchParams(window.location.search);

    const deliveryId = params.get('deliveryId')

    const shopId = useSelector(selectAccount).workAt.shopId;

    const [direction, setDirection] = useState('ASC')
    const [delivery, setDelivery] = useState(null)
    const [history, setHistory] = useState(null)

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

    const [shopRCode, setShopRCode] = useState()
    const [shopPCode, setShopPCode] = useState()
    const [shopDCode, setShopDCode] = useState()
    const [shopCommuneId, setShopCommuneId] = useState(0)

    const [shopProvinceData, setShopProvinceData] = useState(null)
    const [shopDistrictData, setShopDistrictData] = useState(null)
    const [shopCommuneData, setShopCommuneData] = useState(null)

    const handleShopRegionChange = (e) => {
        setShopRCode(e.target.value)
    }

    const handleShopProvinceChange = (e) => {
        setShopPCode(e.target.value)
    }

    const handleShopDistrictChange = (e) => {
        setShopDCode(e.target.value)
    }

    const handleShopCommuneChange = (e) => {
        setShopCommuneId(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${shopRCode}/provinces`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.provinces;
                // Xử lý dữ liệu tại đây
                setShopProvinceData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${shopPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setShopDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${shopDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setShopCommuneData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [shopDCode]);

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
                status: 'GONE_FROM_SHOP'
            }
            const response = await axios.post(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, body, config)
            if (response) {
                const body = {
                    shopId: shopCommuneId,
                    status: 'COMING_TO_SHOP'
                }
                const response = await axios.post(`${backendUrl}/deliveries/${deliveryId}/deliveryStatuses`, body, config)
                console.log(response);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        {delivery ? <div className='te-next'>
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
                </>) : <></>}
            </div>
        </div> : <></>}
        <div className='te-next-place'>
            <label>Miền</label>
            <select onChange={(e) => handleShopRegionChange(e)}>
                <option value=''>Chọn miền</option>
                <option value={1}>Miền Bắc</option>
                <option value={2}>Miền Trung</option>
                <option value={3}>Miền Nam</option>
            </select>
            <label>Tỉnh/thành</label>
            <select onChange={(e) => handleShopProvinceChange(e)}>
                <option value=''>Chọn Tỉnh/thành</option>
                {
                    (shopProvinceData && shopRCode) ? shopProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                }
            </select>
            <label>Quận/Huyện</label>
            <select onChange={(e) => handleShopDistrictChange(e)}>
                <option value=''>Chọn Quận/Huyện</option>
                {
                    (shopDistrictData && shopPCode && shopRCode) ? shopDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                }
            </select>
            <label>Phường/Xã</label>
            <select onChange={(e) => handleShopCommuneChange(e)}>
                <option value=''>Chọn Phường/Xã</option>
                {
                    (shopCommuneData && shopPCode && shopRCode && shopDCode) ? shopCommuneData.map(ward => <option value={ward.communeId}>{ward.name}</option>) : <></>
                }
            </select>
        </div>
        <button className='te-next-confirm' onClick={handleSubmit}>Xác nhận</button>
    </>
}

export default TENext;