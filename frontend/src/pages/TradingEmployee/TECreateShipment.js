import './TECreateShipment.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../logic/verification'
import { toast } from 'react-hot-toast'

const TECreateShipment = () => {

    //state

    const [senderRegion, setSenderRegion] = useState('')
    const [sRCode, setSRCode] = useState()
    const [sPCode, setSPCode] = useState()
    const [sDCode, setSDCode] = useState()
    const [sWCode, setSWCode] = useState()
    const [senderName, setSenderName] = useState('')
    const [senderPhone, setSenderPhone] = useState('')
    const [senderEmail, setSenderEmail] = useState('')

    const [receiverRegion, setReceiverRegion] = useState('')
    const [rRCode, setRRCode] = useState()
    const [rPCode, setRPCode] = useState()
    const [rDCode, setRDCode] = useState()
    const [rWCode, setRWCode] = useState()
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

    const [provinceData, setProvinceData] = useState(null)
    const limitOfProvince = [[1, 37], [38, 68], [70, 96]]
    const [districtData, setDistrictData] = useState(null)
    const [wardData, setWardData] = useState(null)

    //--------------------------------------------------------------

    //handle changes

    const handleSRegionChange = (e) => {
        setSRCode(e.target.value);
        switch (e.target.value) {
            case '1':
                setSenderRegion('Miền Bắc')
                break;
            case '2':
                setSenderRegion('Miền Trung')
                break;
            case '3':
                setSenderRegion('Miền Nam')
                break;
            default:
                break
        }
    }

    const handleSProvinceChange = (e) => {
        setSPCode(e.target.value)
        setSDCode(0)
        setSWCode(0)
    }

    const handleSDistrictChange = (e) => {
        setSDCode(e.target.value)
        setSWCode(0)
    }

    const handleSWardChange = (e) => {
        setSWCode(e.target.value)
    }

    const handleRRegionChange = (e) => {
        setRRCode(e.target.value);
        switch (e.target.value) {
            case '1':
                setReceiverRegion('Miền Bắc')
                break;
            case '2':
                setReceiverRegion('Miền Trung')
                break;
            case '3':
                setReceiverRegion('Miền Nam')
                break;
            default:
                break
        }
    }

    const handleRProvinceChange = (e) => {
        setRPCode(e.target.value)
        setRDCode(0)
        setRWCode(0)
    }

    const handleRDistrictChange = (e) => {
        setRDCode(e.target.value)
        setRWCode(0)
    }

    const handleRWardChange = (e) => {
        setRWCode(e.target.value)
    }

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

    //-------------------------------------------------------------

    //getData

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://provinces.open-api.vn/api/p');
            setProvinceData(result.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://provinces.open-api.vn/api/d');
            setDistrictData(result.data);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://provinces.open-api.vn/api/w');
            setWardData(result.data);
        }

        fetchData();
    }, []);

    //------------------------------

    //getData from code

    const getProvinceByCode = async (code) => {
        let text;

        const fetchData = async () => {
            const result = await axios.get(`https://provinces.open-api.vn/api/p/${code}`);
            text = result.data.name;
        }

        await fetchData();
        return text;
    }

    const getDistrictByCode = async (code) => {
        let text;

        const fetchData = async () => {
            const result = await axios.get(`https://provinces.open-api.vn/api/d/${code}`);
            text = result.data.name;
        }

        await fetchData();
        return text;
    }

    const getWardByCode = async (code) => {
        let text;

        const fetchData = async () => {
            const result = await axios.get(`https://provinces.open-api.vn/api/w/${code}`);
            text = result.data.name;
        }

        await fetchData();
        return text;
    }

    //-----------------------------

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
        } else if (!(sRCode && sPCode && sDCode && sWCode &&
            rRCode && rPCode && rDCode && rWCode)) {
            message = 'Thông tin địa chỉ bị thiếu';
            isValidAll = false;
        } else {
            message = 'Thông tin đã được xác nhận';
            isValidAll = true;
        }
        if (!isValidAll) {
            toast.error(message)
        } else {
            const senderProvince = await getProvinceByCode(sPCode);
            const senderDistrict = await getDistrictByCode(sDCode);
            const senderWard = await getWardByCode(sWCode);
            const receiverProvince = await getProvinceByCode(rPCode);
            const receiverDistrict = await getDistrictByCode(rDCode);
            const receiverWard = await getWardByCode(rWCode);
            toast.success(message)
            let info = {
                sender: {
                    senderName,
                    senderEmail,
                    senderPhone,
                    senderRegion,
                    senderProvince,
                    senderDistrict,
                    senderWard,
                },
                receiver: {
                    receiverName,
                    receiverEmail,
                    receiverPhone,
                    receiverRegion,
                    receiverProvince,
                    receiverDistrict,
                    receiverWard,
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
        <div className='te-create-shipment'><h1>Điền thông tin đơn vận</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                                    <option value={1}>Bắc</option>
                                    <option value={2}>Trung</option>
                                    <option value={3}>Nam</option>
                                </select>
                                <label>Tỉnh/thành</label>
                                <select onChange={(e) => handleSProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (provinceData && sRCode) ? provinceData.map(province => {
                                            if (province.code >= limitOfProvince[sRCode - 1][0] &&
                                                province.code <= limitOfProvince[sRCode - 1][1]) {
                                                return <option value={province.code}>{province.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
                                    }
                                </select>
                                <label>Quận/Huyện</label>
                                <select onChange={(e) => handleSDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (districtData && sPCode && sRCode) ? districtData.map(district => {
                                            if (district.province_code === Number(sPCode)) {
                                                return <option value={district.code}>{district.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
                                    }
                                </select>
                                <label>Xã/Phường</label>
                                <select onChange={(e) => handleSWardChange(e)}>
                                    <option value=''>Chọn Xã/Phường</option>
                                    {
                                        (wardData && sDCode && sPCode && sRCode) ? wardData.map(ward => {
                                            if (ward.district_code === Number(sDCode)) {
                                                return <option value={ward.code}>{ward.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
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
                                <h3>Điểm nhận</h3>
                                <label>Miền</label>
                                <select onChange={(e) => handleRRegionChange(e)}>
                                    <option value=''>Chọn miền</option>
                                    <option value={1}>Bắc</option>
                                    <option value={2}>Trung</option>
                                    <option value={3}>Nam</option>
                                </select>
                                <label>Tỉnh/thành</label>
                                <select onChange={(e) => handleRProvinceChange(e)}>
                                    <option value=''>Chọn Tỉnh/thành</option>
                                    {
                                        (provinceData && rRCode) ? provinceData.map(province => {
                                            if (province.code >= limitOfProvince[rRCode - 1][0] &&
                                                province.code <= limitOfProvince[rRCode - 1][1]) {
                                                return <option value={province.code}>{province.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
                                    }
                                </select>
                                <label>Quận/Huyện</label>
                                <select onChange={(e) => handleRDistrictChange(e)}>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {
                                        (districtData && rPCode && rRCode) ? districtData.map(district => {
                                            if (district.province_code === Number(rPCode)) {
                                                return <option value={district.code}>{district.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
                                    }
                                </select>
                                <label>Xã/Phường</label>
                                <select onChange={(e) => handleRWardChange(e)}>
                                    <option value=''>Chọn Xã/Phường</option>
                                    {
                                        (wardData && rDCode && rPCode && rRCode) ? wardData.map(ward => {
                                            if (ward.district_code === Number(rDCode)) {
                                                return <option value={ward.code}>{ward.name}</option>
                                            }
                                            return <></>
                                        }) : <></>
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
    </>
}

export default TECreateShipment