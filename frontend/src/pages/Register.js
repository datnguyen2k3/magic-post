import { useState } from 'react'
import './Register.scss'
import { isValidPhoneNumber, isValidEmail, isValidName, isValidPassword } from '../logic/verification';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    const [dob, setDob] = useState('');
    const [agree, setAgree] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break
            case 'name':
                setName(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'repassword':
                setRepassword(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'phone':
                setPhone(e.target.value)
                break
            case 'id':
                setId(e.target.value)
                break
            case 'dob':
                setDob(e.target.value)
                break
            case 'agree':
                setAgree(!agree)
                break
            default:
                break
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidName(name)) {
            toast.error('Tên không hợp lệ, vui lòng nhập lại')
        } else if (!isValidPassword(password)) {
            toast.error('Mật khẩu cần phải có ít nhất 8 kí tự, có chữ hoa, chữ thường, số và kí tự!')
        } else if (repassword !== password) {
            toast.error('Xác nhận mật khẩu chưa chính xác, vui lòng nhập lại')
        } else if (!isValidEmail(email)) {
            toast.error('Email không đúng định dạng, vui lòng nhập lại')
        } else if (!isValidPhoneNumber(phone)) {
            toast.error('Số điện thoại không đúng định dạng, vui lòng nhập lại')
        } else if (!agree) {
            toast.error('Bạn cần đồng ý với điều khoản của chúng tôi!')
        } else {
            await registerWithApi(`${backendUrl}/register`, username, name, password, phone, email, dob, id)
                .then(data => {
                    console.log(data);
                    if (!data || !data.success) {
                        toast.error(data.error)
                    } else {
                        toast.success('Đăng ký thành công')
                        navigate('/login')
                    }
                });
        }
    }

    //fake register 

    async function registerWithApi(url, username, name, password, phone, email, dob, id) {
        const data = {
            username,
            password,
            name,
            phone,
            email,
            dob,
            id
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return {
                success: true,
                user: response.data
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    return <>
        <div className='register'>
            <h2>Đăng ký tài khoản</h2>
            <div className='register-box'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='register-box-input'>
                        <div className='register-box-1'>
                            <label>Tên tài khoản</label>
                            <input type='text' name='username' onChange={(e) => handleInputChange(e)}></input>
                            <label>Họ và tên</label>
                            <input type='text' name='name' onChange={(e) => handleInputChange(e)}></input>
                            <label>Mật khẩu</label>
                            <input type='password' name='password' onChange={(e) => handleInputChange(e)}></input>
                            <label>Nhập lại mật khẩu</label>
                            <input type='password' name='repassword' onChange={(e) => handleInputChange(e)}></input>
                        </div>
                        <div className='register-box-2'>
                            <label>Email</label>
                            <input type='email' name='email' onChange={(e) => handleInputChange(e)}></input>
                            <label>Số điện thoại</label>
                            <input type='text' name='phone' onChange={(e) => handleInputChange(e)}></input>
                            <label>Số CCCD</label>
                            <input type='text' name='id' onChange={(e) => handleInputChange(e)}></input>
                            <label>Ngày sinh</label>
                            <input type='date' name='dob' className='register-dob' onChange={(e) => handleInputChange(e)}></input>
                        </div>
                    </div>
                    <div className='register-agree-box'>
                        <input type='checkbox' name='agree' id='agree' placeholder='' className='register-agree' onChange={(e) => handleInputChange(e)}></input>
                        <label for='agree'>Tôi đồng ý với mọi điều khoản của Magic Post</label>
                    </div>
                    <input type='submit' value='Đăng ký tài khoản' className='register-submit'></input>
                </form>
            </div>
        </div>
    </>
}

export default Register