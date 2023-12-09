import { useState } from 'react';
import './Login.scss'
import toast from 'react-hot-toast';
import axios from 'axios';
import { login } from '../app/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username) {
            toast.error('Không được để trống username')
        } else if (!password) {
            toast.error('Không được để trống mật khẩu')
        } else {
            await loginWithApi(`${backendUrl}/login`, username, password)
                .then(data => {
                    console.log(data);
                    if (!data || !data.success) {
                        toast.error(data.error)
                    } else {
                        toast.success('Đăng nhập thành công')
                        // const username = username; // edit later
                        // const name = name; // edit later
                        const account = {
                            username,
                            name: '/'
                        } // fake account information
                        dispatch(login(account))
                        navigate('/')
                    }
                });
        }
    }

    //axios login
    // async function login(url = '', username = '', password = '') {
    //     const data = {
    //         username: username,
    //         password: password
    //     };

    //     try {
    //         const response = await axios.post(url, data, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // login('https://example.com/api/v1/login', 'myUsername', 'myPassword')
    //     .then(data => {
    //         console.log(data); // JSON data parsed by `response.data`
    //     });

    //fake axios login

    async function loginWithApi(url, username, password) {
        const data = {
            username,
            password,
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

    //------------------------------

    return <>
        <div className="login">
            <div className='login-box'>
                <h3>Đăng nhập vào Magic Post</h3>
                <form className='login-form' onSubmit={(e) => handleLogin(e)}>
                    <input type='text' name='username' placeholder='Nhập username' onChange={(e) => handleInputChange(e)}></input>
                    <input type='password' name='password' placeholder='Nhập mật khẩu' onChange={(e) => handleInputChange(e)}></input>
                    <input type='submit' value={'Đăng nhập'} className='login-submit'></input>
                </form>
            </div>
        </div>
    </>
}

export default Login;