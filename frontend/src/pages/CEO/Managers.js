import { Table } from 'react-bootstrap'
import './Managers.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Managers = () => {

    const navigate = useNavigate();

    const [managers, setManagers] = useState([])

    const [filteredData, setFilteredData] = useState({
        search: '',
        name: '',
        province: '',
        district: '',
        type: '',
        username: '',
        email: '',
        idNumber: '',
        phone: ''
        // <th>Tên</th>
        //                 <th>ID Văn phòng</th>
        //                 <th>Tỉnh/Thành</th>
        //                 <th>Quận/Huyện</th>
        //                 <th>Phường/Xã</th>
        //                 <th>Loại văn phòng</th>
        //                 <th>Username</th>
        //                 <th>Email</th>
        //                 <th>CCCD</th>
        //                 <th>Số điện thoại</th>
    })

    const handleChange = (event) => {
        setFilteredData({
            ...filteredData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/managers`).then(res => {
            setManagers(res.data);
            console.log(res.data);
            console.log(filteredData)
        }).catch(error => {
            console.log(error)
        })
    }, [filteredData])

    const handleViewManagerDetail = (idNumber) => {
        navigate(`/manager-detail?idNumber=${idNumber}`)
    }

    return <>
        <div className='managers'>
            <h2><b>List of Managers</b></h2>
            <div><span>Search all here: </span><input disabled={!!(filteredData.name && filteredData.province && filteredData.type && filteredData.username && filteredData.email && filteredData.idNumber && filteredData.phone)} name="all" value={filteredData.all} onChange={handleChange} /></div>
            <Table striped bordered hover className='managers-table'>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>ID Văn phòng</th>
                        <th>Tỉnh/Thành</th>
                        <th>Quận/Huyện</th>
                        <th>Phường/Xã</th>
                        <th>Loại văn phòng</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>CCCD</th>
                        <th>Số điện thoại</th>
                    </tr>
                    <tr>
                        <th><input disabled={!!filteredData.all} name="name" value={filteredData.name} onChange={handleChange}></input></th>
                        <th></th>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.province} onChange={handleChange}></input></th>
                        <th><input disabled={!filteredData.province} name="district" value={filteredData.district} onChange={handleChange}></input></th>
                        <th><input disabled={!filteredData.district} name="ward" value={filteredData.ward} onChange={handleChange}></input></th>
                        <th><select name="type" value={filteredData.type} onChange={handleChange}>
                            <option value="">Chọn loại</option>
                            <option value="tập kết">Tập kết</option>
                            <option value="giao dịch">Giao dịch</option>
                        </select></th>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.username} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.email} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.idNumber} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.phone} onChange={handleChange}></input></th>
                    </tr>
                </thead>
                <tbody>
                    {managers.length > 0 ? managers.map(manager => {
                        return <tr onClick={() => handleViewManagerDetail(manager.idNumber)}>
                            <td>{manager.name}</td>
                            <td>{manager.officeId}</td>
                            <td>{manager.province}</td>
                            <td>{manager.district}</td>
                            <td>{manager.ward}</td>
                            <td>{manager.type}</td>
                            <td>{manager.username}</td>
                            <td>{manager.email}</td>
                            <td>{manager.idNumber}</td>
                            <td>{manager.phone}</td>
                        </tr>
                    }) : ''}
                </tbody>
            </Table>
        </div>
    </>
}

export default Managers