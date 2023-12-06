import './Statistics.scss'
import { useEffect, useState } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Statistics = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [shipments, setShipments] = useState([]);
    const [searchFields, setSearchFields] = useState({
        shipmentCode: '',
        senderName: '',
        senderProvince: '',
        senderDate: '',
        receiverName: '',
        receiverProvince: ''
    });

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        // Tạo một chuỗi query từ searchFields
        // const searchParams = new URLSearchParams(searchFields); <-- real project
        const searchParams = new URLSearchParams();

        // Thêm _page và _limit vào chuỗi query
        searchParams.append('_page', currentPage);
        searchParams.append('_limit', itemsPerPage);

        console.log('check params: ', searchParams.toString())

        // fetch(`${backendUrl}/shipments?${searchParams.toString()}`) <-- real projects
        fetch(`${backendUrl}/shipments?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setShipments(data);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, [searchFields, currentPage]);

    const handleSearchChange = (e) => {
        setSearchFields({
            ...searchFields,
            [e.target.name]: e.target.value
        });
    };

    const [allShipments, setAllShipments] = useState([])

    useEffect(() => {
        fetch(`${backendUrl}/shipments`)
            .then(response => response.json())
            .then(data => {
                setAllShipments(data);
            })
            .catch(error => console.log('Có lỗi xảy ra: ', error));
    }, [])

    let totalPages = Math.ceil(allShipments.length / itemsPerPage);

    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item disabled={currentPage === number} key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const navigate = useNavigate();

    const handleView = (code) => {
        console.log(code)
        navigate(`/detail?shipmentCode=${code}`)
    }

    return <>
        <div className='statistics'>
            <h1 className='statistics-title'>Shipments Statistics</h1>
            {shipments.length ? <>
                <Table className='statistics-table' striped bordered hover style={{ width: '100%' }}>
                    <thead style={{ backgroundColor: '#e5e5e5' }}>
                        <tr className='mt-3'>
                            <th>Shipment Code</th>
                            <th>Sender's Name</th>
                            <th>Sender's Province</th>
                            <th>Sent Date</th>
                            <th>Receiver's Name</th>
                            <th>Receiver's Province</th>
                        </tr>
                        <tr>
                            <th><Form.Control type="text" name="shipmentCode" value={searchFields.shipmentCode} onChange={handleSearchChange} placeholder="Shipment Code" /></th>
                            <th><Form.Control type="text" name="senderName" value={searchFields.senderName} onChange={handleSearchChange} placeholder="Sender's Name" /></th>
                            <th><Form.Control type="text" name="senderProvince" value={searchFields.senderProvince} onChange={handleSearchChange} placeholder="Sender's Province" /></th>
                            <th><Form.Control type="text" name="senderDate" value={searchFields.senderDate} onChange={handleSearchChange} placeholder="Sent Date" /></th>
                            <th><Form.Control type="text" name="receiverName" value={searchFields.receiverName} onChange={handleSearchChange} placeholder="Receiver's Name" /></th>
                            <th><Form.Control type="text" name="receiverProvince" value={searchFields.receiverProvince} onChange={handleSearchChange} placeholder="Receiver's Province" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((shipment, index) => (
                            <tr key={index} onClick={() => handleView(shipment.shipmentCode)} >
                                <td>{shipment.shipmentCode}</td>
                                <td>{shipment.senderName}</td>
                                <td>{shipment.senderProvince}</td>
                                <td>{shipment.senderDate}</td>
                                <td>{shipment.receiverName}</td>
                                <td>{shipment.receiverProvince}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination className='statistics-pagination'>
                    <Pagination.First disabled={currentPage === 1} onClick={() => setCurrentPage(1)}></Pagination.First>
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}></Pagination.Prev>
                    {paginationItems}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}></Pagination.Next>
                    <Pagination.Last disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}></Pagination.Last>
                </Pagination>
            </> : ''}
        </div>
    </>
}

export default Statistics