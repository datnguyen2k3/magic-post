import './GMEmps.scss'
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GMEmps = () => {

    const [emps, setEmps] = useState();

    const navigate = useNavigate();

    const [filteredData, setFilteredData] = useState({
        search: '',
        name: '',
        username: '',
        email: '',
        idNumber: '',
        phone: ''
    })

    const handleChange = (event) => {
        setFilteredData({
            ...filteredData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/gatheringemps`).then(res => {
            setEmps(res.data);
            console.log(res.data);
            console.log(filteredData)
        }).catch(error => {
            console.log(error)
        })
    }, [filteredData])

    const handleViewEmpDetail = (idNumber) => {
        navigate(`/gm-emp-detail?idNumber=${idNumber}`)
    }

    return <>
        <div className='gm-emps'>
            <h2><b>Thống kê các nhân viên điểm tập kết</b></h2>
            <div><span>Tìm kiếm theo tất cả các trường: </span><input disabled={!!(filteredData.name || filteredData.username || filteredData.email || filteredData.idNumber || filteredData.phone)} name="all" value={filteredData.all} onChange={handleChange} /></div>
            <Table striped bordered hover className='gm-emps-table'>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>CCCD</th>
                        <th>Số điện thoại</th>
                    </tr>
                    <tr>
                        <th><input disabled={!!filteredData.all} name="name" value={filteredData.name} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="username" value={filteredData.username} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="email" value={filteredData.email} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="idNumber" value={filteredData.idNumber} onChange={handleChange}></input></th>
                        <th><input disabled={!!filteredData.all} name="phone" value={filteredData.phone} onChange={handleChange}></input></th>
                    </tr>
                </thead>
                <tbody>
                    {emps ? emps.map(emp => {
                        return <tr onClick={() => handleViewEmpDetail(emp.idNumber)}>
                            <td>{emp.name}</td>
                            <td>{emp.username}</td>
                            <td>{emp.email}</td>
                            <td>{emp.idNumber}</td>
                            <td>{emp.phone}</td>
                        </tr>
                    }) : ''}
                </tbody>
            </Table>
        </div>
    </>
}

export default GMEmps