import './Deliveries.scss'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../app/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Deliveries = () => {

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    const [deliveries, setDeliveries] = useState()

    const [filteredData, setFilteredData] = useState({})

    const [page, setPage] = useState(1)

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [maxPage, setMaxPage] = useState();

    const [sortField, setSortField] = useState('');
    const [direction, setDirection] = useState('');

    const filterLastDeliveryStatus = (deliveryStatuses) => {
        const uniqueDeliveries = {};

        deliveryStatuses.forEach((deliveryStatus) => {
            const { deliveryId, createdAt } = deliveryStatus.delivery;

            if (!uniqueDeliveries[deliveryId] || createdAt > uniqueDeliveries[deliveryId].createdAt) {
                uniqueDeliveries[deliveryId] = deliveryStatus;
            }
        });

        const lastDeliveryStatuses = Object.values(uniqueDeliveries);

        return lastDeliveryStatuses;
    };

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...filteredData,
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/deliveryStatuses`, config)
                setDeliveries(response.data.deliveryStatuses)
                setMaxPage(response.data.totalPages)
                console.log(filterLastDeliveryStatus(response.data.deliveryStatuses))
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [filteredData, page, sortField, direction])

    return <>
        <div className='deliveries'>Deliveries</div>
    </>
}

export default Deliveries