import { Table } from 'react-bootstrap'
import './Offices.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Offices = () => {

    const [offices, setOffices] = useState([])

    const [filteredData, setFilteredData] = useState({
        search: '',
        province: '',
        district: '',
        type: '',
        numOfEmp: 0,
        upComing: 0,
        waiting: 0,
        delivered: 0
    })

    const handleChange = (event) => {
        setFilteredData({
            ...filteredData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/offices?type=${filteredData.type}`).then(res => {
            setOffices(res.data);
            console.log(res.data);
            console.log(filteredData)
        }).catch(error => {
            console.log(error)
        })
    }, [filteredData])

    return <>
        <div className='offices'>
            <h2><b>List of Offices</b></h2>
            <div><span>Tìm kiếm theo tất cả các trường: </span><input disabled={!!filteredData.province} name="all" value={filteredData.all} onChange={handleChange} /></div>
            <Table striped bordered hover className='offices-table'>
                <thead>
                    <tr>
                        <th>Tỉnh/Thành phố</th>
                        <th>Quận/Huyện</th>
                        <th>Phường/Xã</th>
                        <th>Loại văn phòng</th>
                        <th>Quản lý</th>
                        <th>Số nhân viên</th>
                        <th>Số đơn đến</th>
                        <th>Số đơn đợi</th>
                        <th>Số đơn đi</th>
                    </tr>
                    <tr>
                        <th><input disabled={!!filteredData.all} name="province" value={filteredData.province} onChange={handleChange}></input></th>
                        <th><input disabled={!filteredData.province} name="district" value={filteredData.district} onChange={handleChange}></input></th>
                        <th><input disabled={!filteredData.district} name="ward" value={filteredData.ward} onChange={handleChange}></input></th>
                        <th><select name="type" value={filteredData.type} onChange={handleChange}>
                            <option value="">Chọn loại</option>
                            <option value="tập kết">Tập kết</option>
                            <option value="giao dịch">Giao dịch</option>
                        </select></th>
                        <th></th>
                        <th><select name="numOfEmp" value={filteredData.numOfEmp} onChange={handleChange}>
                            <option value="0">Sắp xếp</option>
                            <option value="-1">Tăng</option>
                            <option value="1">Giảm</option>
                        </select></th>
                        <th><select name="upComing" value={filteredData.upComing} onChange={handleChange}>
                            <option value="0">Sắp xếp</option>
                            <option value="-1">Tăng</option>
                            <option value="1">Giảm</option>
                        </select></th>
                        <th><select name="waiting" value={filteredData.waiting} onChange={handleChange}>
                            <option value="0">Sắp xếp</option>
                            <option value="-1">Tăng</option>
                            <option value="1">Giảm</option>
                        </select></th>
                        <th><select name="delivered" value={filteredData.delivered} onChange={handleChange}>
                            <option value="0">Sắp xếp</option>
                            <option value="-1">Tăng</option>
                            <option value="1">Giảm</option>
                        </select></th>
                    </tr>
                </thead>
                <tbody>
                    {offices.length > 0 ? offices.map(office => {
                        return <tr>
                            <td>{office.province}</td>
                            <td>{office.district}</td>
                            <td>{office.ward}</td>
                            <td>{office.type}</td>
                            <td>{office.manager}</td>
                            <td>{office.numOfEmp}</td>
                            <td>{office.upComing}</td>
                            <td>{office.waiting}</td>
                            <td>{office.delivered}</td>
                        </tr>
                    }) : ''}
                </tbody>
            </Table>
        </div>
    </>
}

export default Offices