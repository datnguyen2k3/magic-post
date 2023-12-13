import './TMEmpDetail.scss'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const TMEmpDetail = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)

    const [empDetail, setEmpDetail] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/tradingemps?${queryParams.toString()}`)
            .then(response => {
                setEmpDetail(response.data[0]);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, []);

    return <>
        <div className='manager-detail'>
            {
                empDetail ?
                    <>
                        <ListGroup>
                            <ListGroup.Item variant='primary'><b>Tên</b>: {empDetail.name}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Username</b>: {empDetail.username}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Email</b>: {empDetail.email}</ListGroup.Item>
                            <ListGroup.Item variant='primary'><b>Số điện thoại</b>: {empDetail.phone}</ListGroup.Item>
                        </ListGroup>
                    </> : <></>
            }
        </div>
    </>
}

export default TMEmpDetail