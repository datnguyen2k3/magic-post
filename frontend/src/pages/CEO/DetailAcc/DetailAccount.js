import './DetailAccount.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../app/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { convertText } from '../../../service/service';

const DetailAccount = () => {

    const paramsWeb = new URLSearchParams(window.location.search)

    const username = paramsWeb.get("username");
    const role = paramsWeb.get("role");

    const [detail, setDetail] = useState(null)

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const token = useSelector(selectToken)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    usernameContains: username.toLowerCase(),
                    roles: role
                }
            }

            try {
                const response = await axios.get(`${backendUrl}/accounts`, config)
                setDetail(response.data.accounts[0])
                console.log(response.data.accounts[0])
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const handleViewOffice = (shopId) => {
        navigate(`/management/detail-office?shopId=${shopId}`)
    }

    const handleModifyAccount = (username, role) => {
        navigate(`/management/modify-account?username=${username}&role=${role}`)
    }

    return <>
        <div className='detail-account'>
            {detail ? <>
                <h3>{detail.name} - {convertText(detail.role)}</h3>
                <span><b>Username: </b>{detail.username}</span><br />
                <span><b>Email: </b>{detail.email}</span><br />
                <span><b>Số điện thoại: </b>{detail.phone}</span><br />
                <span><b>Số CCCD: </b>{detail.cccd}</span><br />
                <span><b>Địa chỉ: </b>{detail.address}</span><br />
                <span><b>Id Văn phòng: </b>{detail.workAt.shopId}</span><br />
                <span><b>Địa chỉ Văn phòng: </b>{detail.workAt.commune.name} - ({detail.workAt.commune.communeId})</span><br />
                <span><b>Số nhân viên đang quản lý: </b>{detail.employeeNumber}</span><br />
                <button onClick={() => handleViewOffice(detail.workAt.shopId)}>Xem thông tin về văn phòng của trưởng điểm này</button>
                <button onClick={() => handleModifyAccount(detail.username, detail.role)}>Sửa thông tin của trưởng điểm này</button>
            </> : <>Loading...</>}
        </div>
    </>
}

export default DetailAccount