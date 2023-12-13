import './ManagerDetail.scss'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const ManagerDetail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const [managerDetail, setManagerDetail] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/managers?${queryParams.toString()}`)
            .then(response => {
                setManagerDetail(response.data[0]);
                console.log(managerDetail);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, []);

    return <>
        <div className='manager-detail'>
            {
                managerDetail ?
                    <>
                        <ListGroup>
                            <ListGroup.Item variant='primary'><b>Tên</b>: {managerDetail.name}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>ID Văn phòng/Loại văn phòng</b>: {managerDetail.officeId} - {managerDetail.type}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Địa chỉ</b>: {managerDetail.ward}, {managerDetail.district}, {managerDetail.province}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Username</b>: {managerDetail.username}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Email</b>: {managerDetail.email}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Số điện thoại</b>: {managerDetail.phone}</ListGroup.Item>
                        </ListGroup>
                    </> : <></>
            }
        </div>
    </>
}

export default ManagerDetail