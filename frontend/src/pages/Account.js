import './Account.scss'
import { selectAccount } from '../app/authSlice';
import { useSelector } from 'react-redux';

const Account = () => {

    const account = useSelector(selectAccount)
    console.log(account)

    return <>
        <div className='account'>
            <h2>Thông tin tài khoản</h2>
            <span><h3>{account.name} - {account.role}</h3></span>
            <span><b>Tên tài khoản:</b> {account.username}</span>
            <span><b>Địa chỉ:</b> {account.address}</span>
            <span><b>Số điện thoại:</b> {account.phone}</span>
            <span><b>Email:</b> {account.email}</span>
            <span><b>Làm việc tại:</b> {account.workAt.shopId}</span>
        </div>
    </>
}

export default Account;