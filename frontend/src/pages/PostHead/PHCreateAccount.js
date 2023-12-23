import toast from 'react-hot-toast'
import './PHCreateAccount.scss'
import { useState, useEffect } from 'react'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../logic/verification'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../app/authSlice'

const PHCreateAccount = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const token = useSelector(selectToken)

    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        cccd: '',
    })

    const [provinceData, setProvinceData] = useState(null)
    const [districtData, setDistrictData] = useState(null)
    const [communeData, setCommuneData] = useState(null)
    const [rCode, setRCode] = useState()
    const [pCode, setPCode] = useState()
    const [dCode, setDCode] = useState()
    const [communeId, setCommuneId] = useState(0)

    const [role, setRole] = useState('')

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegionChange = (e) => {
        setRCode(e.target.value)
    }

    const handleProvinceChange = (e) => {
        setPCode(e.target.value)
    }

    const handleDistrictChange = (e) => {
        setDCode(e.target.value)
    }

    const createNewAccount = (user) => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${backendUrl}/accounts`, user, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data;
                // Process data here
                toast.success('Tạo tài khoản thành công!')
            } catch (error) {
                toast.error('Tạo tài khoản không thành công!')
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }

    const handleCommuneChange = (e) => {
        setCommuneId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = await getAddress(rCode, pCode, dCode)
        if (Object.values(user).some(value => value === '')) {
            toast.error('Không được để trường nào trống!')
        } else if (!isValidName(user.name)) {
            toast.error('Tên chưa đúng định dạng')
        } else if (!isValidEmail(user.email)) {
            toast.error('Email chưa đúng định dạng!')
        } else if (!isValidPhoneNumber(user.phone)) {
            toast.error('Số điện thoại chưa đúng định dạng!')
        } else {
            createNewAccount({ ...user, role, address, workAt: Number(communeId) })
        }
    }

    const handleRoleChange = (e) => {
        e.preventDefault();
        setRole(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/states/${rCode}/provinces`, {
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = response.data.provinces;
                // Process data here
                setProvinceData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [rCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/provinces/${pCode}/districts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.districts;
                // Xử lý dữ liệu tại đây
                setDistrictData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [pCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/districts/${dCode}/communes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thay thế token bằng token thực tế của bạn
                        'Content-Type': 'application/json'
                    }
                });
                const data = response.data.communes;
                // Xử lý dữ liệu tại đây
                setCommuneData(data)
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, [dCode]);

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

    return <>
        <div className='ph-create-account'>
            <h2><b>Tạo tài khoản cho nhân viên điểm giao dịch</b></h2>
            <form onSubmit={handleSubmit}>
                <div className='ph-create-account-box'>
                    <div className='ph-create-account-box-1'>
                        <label>Tên nhân viên</label>
                        <input type='text' name='name' value={user.name} onChange={handleInputChange}></input>
                        <label>Username</label>
                        <input type='text' name='username' value={user.username} onChange={handleInputChange}></input>
                        <label>Password</label>
                        <input type='password' name='password' value={user.password} onChange={handleInputChange}></input>
                        <label>Email</label>
                        <input type='email' name='email' value={user.email} onChange={handleInputChange}></input>
                        <label>Số điện thoại</label>
                        <input type='text' name='phone' value={user.phone} onChange={handleInputChange}></input>
                        <label>CCCD</label>
                        <input type='text' name='cccd' value={user.idNumber} onChange={handleInputChange}></input>
                        <label>Chọn vai trò</label>
                        <select onChange={handleRoleChange}>
                            <option value=''>Vai trò</option>
                            <option value='EMPLOYEE'>Nhân viên điểm giao dịch</option>
                        </select>
                        <label>Miền</label>
                        <select onChange={(e) => handleRegionChange(e)}>
                            <option value=''>Chọn miền</option>
                            <option value={1}>Miền Bắc</option>
                            <option value={2}>Miền Trung</option>
                            <option value={3}>Miền Nam</option>
                        </select>
                        <label>Tỉnh/thành</label>
                        <select onChange={(e) => handleProvinceChange(e)}>
                            <option value=''>Chọn Tỉnh/thành</option>
                            {
                                (provinceData && rCode) ? provinceData.map(province => <option value={province.provinceId}>{province.name}</option>) : <></>
                            }
                        </select>
                        <label>Quận/Huyện</label>
                        <select onChange={(e) => handleDistrictChange(e)}>
                            <option value=''>Chọn Quận/Huyện</option>
                            {
                                (districtData && pCode && rCode) ? districtData.map(district => <option value={district.districtId}>{district.name}</option>) : <></>
                            }
                        </select>
                        <label>Văn phòng làm việc</label>
                        <select onChange={(e) => handleCommuneChange(e)}>
                            <option value=''>Chọn điểm</option>
                            {
                                (pCode && rCode && dCode && communeData) ? communeData.map(commune => <option value={commune.communeId}>{commune.name}</option>) : <></>
                            }
                        </select>
                    </div>
                </div>
                <input type='submit' value={'Hoàn thành tạo tài khoản'} className='ph-create-account-submit'></input>
            </form>
        </div>
    </>
}

export default PHCreateAccount