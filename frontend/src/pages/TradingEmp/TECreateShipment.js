import './TECreateShipment.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../logic/verification'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectToken } from '../../app/authSlice'

const TECreateShipment = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const [sRCode, setSRCode] = useState()
    const [sPCode, setSPCode] = useState()
    const [sDCode, setSDCode] = useState()
    const [senderName, setSenderName] = useState('')
    const [senderPhone, setSenderPhone] = useState('')
    const [senderEmail, setSenderEmail] = useState('')

    const [rRCode, setRRCode] = useState()
    const [rPCode, setRPCode] = useState()
    const [rDCode, setRDCode] = useState()
    const [receiverName, setReceiverName] = useState('')
    const [receiverPhone, setReceiverPhone] = useState('')
    const [receiverEmail, setReceiverEmail] = useState('')

    const [type, setType] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [values, setValues] = useState(0)
    const [attached, setAttached] = useState(0)
    const [mass, setMass] = useState(0)
    const [cost, setCost] = useState(0)
    const [surcharge, setSurcharge] = useState(0)

    const [sProvinceData, setSProvinceData] = useState(null)
    const [sDistrictData, setSDistrictData] = useState(null)
    const [rProvinceData, setRProvinceData] = useState(null)
    const [rDistrictData, setRDistrictData] = useState(null)

    const handleSRegionChange = (e) => {
        setSRCode(e.target.value)
    }

    const handleSProvinceChange = (e) => {
        setSPCode(e.target.value)
    }

    const handleSDistrictChange = (e) => {
        setSDCode(e.target.value)
    }

    const handleRRegionChange = (e) => {
        setRRCode(e.target.value)
    }

    const handleRProvinceChange = (e) => {
        setRPCode(e.target.value)
    }

    const handleRDistrictChange = (e) => {
        setRDCode(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'Authorization, Content-Type',
                }
                // Preflight (OPTIONS) request
                await axios.options(`${backendUrl}/states/${sRCode}/provinces`, {
                    headers: headers,
                    credentials: 'include',
                });

                // Real GET request
                const response = await axios.get(`${backendUrl}/states/${sRCode}/provinces`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.provinces;
                // Process data here
                setSProvinceData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${sPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setSDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [sPCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${rRCode}/provinces`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.provinces;
                // Xử lý dữ liệu tại đây
                setRProvinceData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rRCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${rPCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setRDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rPCode]);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'senderName':
                setSenderName(e.target.value);
                break;
            case 'senderPhone':
                setSenderPhone(e.target.value);
                break;
            case 'senderEmail':
                setSenderEmail(e.target.value);
                break;
            case 'receiverName':
                setReceiverName(e.target.value);
                break;
            case 'receiverPhone':
                setReceiverPhone(e.target.value);
                break;
            case 'receiverEmail':
                setReceiverEmail(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            case 'quantity':
                setQuantity(e.target.value);
                break;
            case 'values':
                setValues(e.target.value);
                break;
            case 'attached':
                setAttached(e.target.value);
                break;
            case 'mass':
                setMass(e.target.value);
                break;
            case 'cost':
                setCost(e.target.value);
                break;
            case 'surcharge':
                setSurcharge(e.target.value);
                break;
            default:
                break
        }
    }

    const getAddress = async (regioncode, provincecode, districtcode) => {
        try {
            // Gọi API1 để lấy các province dựa vào regioncode
            const response1 = await fetch(`api1/${regioncode}`);
            const data1 = await response1.json();

            // Lọc province có provinceId = provincecode
            const province = data1.provinces.find(province => province.provinceId === provincecode);
            if (!province) {
                throw new Error('Không tìm thấy province!');
            }

            // Gọi API2 để lấy district dựa vào provincecode
            const response2 = await fetch(`api2/${provincecode}`);
            const data2 = await response2.json();

            // Lọc district có districtId = districtcode
            const district = data2.districts.find(district => district.districtId === districtcode);
            if (!district) {
                throw new Error('Không tìm thấy district!');
            }

            // Trả về province và district
            return {
                province: province,
                district: district
            };
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidAll = false;
        let message = '';
        if (!isValidName(senderName)) {
            message = 'Tên người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidEmail(senderEmail)) {
            message = 'Email người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidPhoneNumber(senderPhone)) {
            message = 'Số điện thoại người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidName(receiverName)) {
            message = 'Tên người nhận không hợp lệ'
            isValidAll = false;
        } else if (!isValidEmail(receiverEmail)) {
            message = 'Email người nhận không hợp lệ'
            isValidAll = false;
        } else if (!isValidPhoneNumber(receiverPhone)) {
            message = 'Số điện thoại người nhận không hợp lệ'
            isValidAll = false;
        } else if (!(sRCode && sPCode && sDCode &&
            rRCode && rPCode && rDCode)) {
            message = 'Thông tin địa chỉ bị thiếu';
            isValidAll = false;
        } else {
            message = 'Thông tin đã được xác nhận';
            isValidAll = true;
        }
        if (!isValidAll) {
            toast.error(message)
        } else {
            const sAddress = await getAddress(sRCode, sPCode, sDCode)
            const rAddress = await getAddress(rRCode, rPCode, rDCode)
            toast.success(message)
            let info = {
                sender: {
                    senderName,
                    senderEmail,
                    senderPhone,
                    sAddress
                },
                receiver: {
                    receiverName,
                    receiverEmail,
                    receiverPhone,
                    rAddress
                },
                detail: {
                    type,
                    quantity,
                    values,
                    attached,
                    mass,
                    cost,
                    surcharge,
                }
            }
            console.log(info, 'check info')
        }
    }

    return <>
        <div className='te-create-shipment'>
            <h2><b>Tạo đơn vận mới cho khách hàng</b></h2>
            <div><form onSubmit={(e) => handleSubmit(e)}>
                <div className='te-form-personal-info'>
                    <div className='te-form-sender'>
                        <h2>Thông tin người gửi</h2>
                        <div className='te-form-box'>
                            <div className='te-form-sender-info'>
                                <h3>Thông tin cá nhân</h3>
                                <label>Họ và tên</label>
                                <input name='senderName' type='text' onChange={(e) => handleInputChange(e)}></input>
                                <label>Số điện thoại người nhận</label>
                                <input name='senderPhone' type='text' onChange={(e) => handleInputChange(e)}></input>
                                <label>Email người nhận</label>
                                <input name='senderEmail' type='email' onChange={(e) => handleInputChange(e)}></input>
                            </div>
                            <div className='te-form-sender-address'>
                                <h3>Điểm gửi</h3>
                                <label>Miền</label>
                                <select onChange={(e) => handleSRegionChange(e)}>
                                    <option value=''>Chọn miền</option>
                                    <option value={1}>Miền Bắc</option>
                                    <option value={2}>Miền Trung</option>
                                    <option value={3}>Miền Nam</option>
                                </select>
                                <label>Tỉnh/thành</label>
                                <select onChange={(e) => handleSProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (sProvinceData && sRCode) ? sProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                    }
                                </select>
                                <label>Quận/Huyện</label>
                                <select onChange={(e) => handleSDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (sDistrictData && sPCode && sRCode) ? sDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='te-form-receiver'>
                        <h2>Thông tin người nhận</h2>
                        <div className='te-form-box'>
                            <div className='te-form-receiver-info'>
                                <h3>Thông tin cá nhân</h3>
                                <label>Họ và tên</label>
                                <input name='receiverName' type='text' onChange={(e) => handleInputChange(e)}></input>
                                <label>Số điện thoại người nhận</label>
                                <input name='receiverPhone' type='text' onChange={(e) => handleInputChange(e)}></input>
                                <label>Email người nhận</label>
                                <input name='receiverEmail' type='email' onChange={(e) => handleInputChange(e)}></input>
                            </div>
                            <div className='te-form-receiver-address'>
                                <h3>Điểm gửi</h3>
                                <label>Miền</label>
                                <select onChange={(e) => handleRRegionChange(e)}>
                                    <option value=''>Chọn miền</option>
                                    <option value={1}>Miền Bắc</option>
                                    <option value={2}>Miền Trung</option>
                                    <option value={3}>Miền Nam</option>
                                </select>
                                <label>Tỉnh/thành</label>
                                <select onChange={(e) => handleRProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (rProvinceData && rRCode) ? rProvinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                                    }
                                </select>
                                <label>Quận/Huyện</label>
                                <select onChange={(e) => handleRDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (rDistrictData && rPCode && rRCode) ? rDistrictData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='te-form-shipment-info'>
                    <h2>Thông tin chi tiết đơn vận</h2>
                    <div className='te-form-shipment-big-box'>
                        <div className='te-form-shipment-1'>
                            <h4>Loại hàng</h4>
                            <select name='type' value={type} onChange={handleInputChange}>
                                <option value={''}>-- Chọn loại --</option>
                                <option value={'document'}>Tài liệu</option>
                                <option value={'goods'}>Hàng hóa</option>
                            </select>
                            <div className='te-form-shipment-box-c'>
                                <h4>Nội dung trị giá bưu gửi</h4>
                                <div>
                                    <label>Số lượng:</label>
                                    <input type='number' name='quantity' value={quantity} onChange={handleInputChange}></input>
                                </div>
                                <div>
                                    <label>Trị giá:</label>
                                    <input type='number' name='values' value={values} onChange={handleInputChange}></input>
                                </div>
                                <div>
                                    <label>Giấy tờ đính kèm:</label>
                                    <input type='number' name='attached' value={attached} onChange={handleInputChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className='te-form-shipment-cost'>
                            <div className='te-form-shipment-mass'><label><h4>Khối lượng:</h4></label>
                                <input type='number' name='mass' value={mass} onChange={handleInputChange}></input> &nbsp;kg</div>
                            <h4>Cước:</h4>
                            <div className='te-form-shipment-cost-box'>
                                <span>Cước chính: <input type='number' name='cost' value={cost} onChange={handleInputChange}></input></span>
                                <span>Phụ thu: <input type='number' name='surcharge' value={surcharge} onChange={handleInputChange}></input></span>
                            </div>
                            <div className='te-form-shipment-cost-box-sp'>
                                <span>Cước tổng (gồm VAT): {(cost * 0.1).toFixed(0)}</span>
                                <span><b>Tổng: {(cost * 1.1 + 1 * surcharge).toFixed(0)}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <input type='checkbox'></input><span> Khách hàng xác nhận đồng ý với các điều khoản</span>
                </div>
                <input className='te-form-submit' type='submit' value={'Xác nhận thông tin đơn vận'} onClick={handleSubmit}></input>
            </form></div>
        </div>
    </>
}

export default TECreateShipment