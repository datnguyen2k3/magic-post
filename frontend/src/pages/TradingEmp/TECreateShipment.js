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

    const [rRCode, setRRCode] = useState()
    const [rPCode, setRPCode] = useState()
    const [rDCode, setRDCode] = useState()
    const [receiverName, setReceiverName] = useState('')
    const [receiverPhone, setReceiverPhone] = useState('')

    const [type, setType] = useState('')

    const [sProvinceData, setSProvinceData] = useState(null)
    const [sDistrictData, setSDistrictData] = useState(null)
    const [sCommuneData, setSCommuneData] = useState(null)
    const [rProvinceData, setRProvinceData] = useState(null)
    const [rDistrictData, setRDistrictData] = useState(null)
    const [rCommuneData, setRCommuneData] = useState(null)

    const [sCommuneId, setSCommuneId] = useState(0)
    const [rCommuneId, setRCommuneId] = useState(0)

    const handleSRegionChange = (e) => {
        setSRCode(e.target.value)
    }

    const handleSProvinceChange = (e) => {
        setSPCode(e.target.value)
    }

    const handleSDistrictChange = (e) => {
        setSDCode(e.target.value)
    }

    const handleSCommuneChange = (e) => {
        setSCommuneId(e.target.value)
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

    const handleRCommuneChange = (e) => {
        setRCommuneId(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                const response = await axios.get(`${backendUrl}/districts/${sDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setSCommuneData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [sDCode]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${rDCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setRCommuneData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [rDCode]);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'senderName':
                setSenderName(e.target.value);
                break;
            case 'senderPhone':
                setSenderPhone(e.target.value);
                break;
            case 'receiverName':
                setReceiverName(e.target.value);
                break;
            case 'receiverPhone':
                setReceiverPhone(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            default:
                break
        }
    }

    const getAddress = async (regioncode, provincecode, districtcode) => {
        try {
            // Thiết lập header cho request
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Gọi API1 để lấy các province dựa vào regioncode
            const response1 = await axios.get(`${backendUrl}/states/${regioncode}/provinces`, config);
            const province = response1.data.provinces.find(province => province.provinceId == provincecode);

            // Lọc province có provinceId = provincecode
            if (!province) {
                throw new Error('Không tìm thấy province!');
            }

            // Gọi API2 để lấy district dựa vào provincecode
            const response2 = await axios.get(`${backendUrl}/provinces/${provincecode}/districts`, config);
            const district = response2.data.districts.find(district => district.districtId == districtcode);

            // Lọc district có districtId = districtcode
            if (!district) {
                throw new Error('Không tìm thấy district!');
            }

            // Trả về province và district
            return district.name + ', ' + province.name;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidAll = false;
        let message = '';
        if (!isValidName(senderName)) {
            message = 'Tên người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidPhoneNumber(senderPhone)) {
            message = 'Số điện thoại người gửi không hợp lệ'
            isValidAll = false;
        } else if (!isValidName(receiverName)) {
            message = 'Tên người nhận không hợp lệ'
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
                fromCommuneId: sDCode,
                fromName: senderName,
                fromPhone: senderPhone,
                fromAddress: sAddress,
                toCommuneId: rDCode,
                toName: receiverName,
                toPhone: receiverPhone,
                toAddress: rAddress,
                fromShop: sCommuneId,
                toShop: rCommuneId,
                productType: type,
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
                    <div className='te-form-shipment-info-1'>
                        <h2>Thông tin chi tiết đơn vận</h2>
                        <div className='te-form-shipment-big-box'>
                            <div className='te-form-shipment-1'>
                                <h4>Loại hàng</h4>
                                <select name='type' value={type} onChange={handleInputChange}>
                                    <option value={''}>-- Chọn loại --</option>
                                    <option value={'document'}>Tài liệu</option>
                                    <option value={'goods'}>Hàng hóa</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='te-form-shipment-info-2'>
                        <h2>Xác nhận điểm giao dịch đầu và cuối</h2>
                        <div className='te-confirm-offices-box'>
                            <label>Điểm giao dịch đầu</label>
                            <select onChange={(e) => handleSCommuneChange(e)}>
                                <option value=''>Chọn điểm</option>
                                {
                                    (sPCode && sRCode && sDCode && sCommuneData) ? sCommuneData.map(commune => <option value={commune.communeId}>{commune.name}</option>) : <></>
                                }
                            </select>
                            <label>Điểm giao dịch cuối</label>
                            <select onChange={(e) => handleRCommuneChange(e)}>
                                <option value=''>Chọn điểm</option>
                                {
                                    (rPCode && rRCode && rDCode && rCommuneData) ? rCommuneData.map(commune => <option value={commune.communeId}>{commune.name}</option>) : <></>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <input className='te-form-submit' type='submit' value={'Xác nhận thông tin đơn vận'} onClick={handleSubmit}></input>
            </form></div>
        </div>
    </>
}

export default TECreateShipment