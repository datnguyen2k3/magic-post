import toast from 'react-hot-toast'
import './CreateAccount.scss'
import { useState } from 'react'
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../logic/verification'

const CreateAccount = () => {

    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        idNumber: '',
        dob: '',
        type: '',
        officeId: '',
    })

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const createNewAccount = (user) => {
        console.log(user);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user, 'check account')
        if (Object.values(user).some(value => value === '')) {
            toast.error('Không được để trường nào trống!')
        } else if (!isValidName(user.name)) {
            toast.error('Tên chưa đúng định dạng')
        } else if (!isValidEmail(user.email)) {
            toast.error('Email chưa đúng định dạng!')
        } else if (!isValidPhoneNumber(user.phone)) {
            toast.error('Số điện thoại chưa đúng định dạng!')
        } else {
            createNewAccount(user)
        }
    }

    return <>
        <div className='create-account'>
            <h2><b>Tạo tài khoản cho trưởng điểm</b></h2>
            <form onSubmit={handleSubmit}>
                <div className='create-account-box'>
                    <div className='create-account-box-1'>
                        <label>Tên trưởng điểm</label>
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
                        <input type='text' name='idNumber' value={user.idNumber} onChange={handleInputChange}></input>
                        <label>Ngày sinh</label>
                        <input type='date' name='dob' value={user.dob} onChange={handleInputChange}></input>
                    </div>
                    <div className='create-account-box-2'>
                        <label>Loại điểm quản lý</label>
                        <select name="type" value={user.type} onChange={handleInputChange}>
                            <option value="">Chọn loại</option>
                            <option value="tập kết">Tập kết</option>
                            <option value="giao dịch">Giao dịch</option>
                        </select>
                        <label>ID Điểm làm việc</label>
                        <input type='text' name='officeId' value={user.officeId} onChange={handleInputChange}></input>
                    </div>
                </div>
                <input type='submit' value={'Hoàn thành tạo tài khoản'} className='create-account-submit'></input>
            </form>
        </div>
    </>
}

export default CreateAccount