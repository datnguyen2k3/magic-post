import axios from 'axios';
import './GuestSearch.scss'
import { useState } from 'react';
import { beautifyId } from '../../../service/service';

const GuestSearch = () => {

    const [deliveryId, setDeliveryId] = useState()
    const [delivery, setDelivery] = useState()

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async () => {
        const config = {
            params: {
                deliveryId
            }
        }

        try {
            const response = await axios.get(`${backendUrl}/deliveries/${deliveryId}`)
            setDelivery(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitByButton = async (e) => {
        e.preventDefault()
        await handleSubmit();
    }

    return <>
        <div className='guest-search'>
            <h2>Tìm kiếm đơn vận qua id:</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setDeliveryId(e.target.value)}></input>
            </form>
            <button onClick={handleSubmitByButton}>Tìm kiếm</button>
            {delivery && <>
                <span><b>ID Đơn: </b>{beautifyId(delivery.deliveryId)}</span><br></br>
                <span><b>Người gửi: </b>{delivery.fromName}</span><br></br>
                <span><b>Số điện thoại người gửi: </b>{delivery.fromPhone}</span><br></br>
                <span><b>Người nhận: </b>{delivery.toName}</span><br></br>
                <span><b>Số điện thoại người nhận: </b>{delivery.toPhone}</span><br></br>
            </>}
        </div>
    </>
}

export default GuestSearch;