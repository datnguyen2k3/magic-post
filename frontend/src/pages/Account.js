import './Account.scss'
import { selectAccount } from '../app/authSlice';
import { useSelector } from 'react-redux';
import { convertText } from '../service/service';

const Account = () => {

    const account = useSelector(selectAccount)
    console.log(account)

    return <>
        <div className='account'>
            <h2>Thông tin tài khoản</h2>
            <span><h3>{account.name} - {convertText(account.role)}</h3></span><br></br>
            <span><b>Tên tài khoản:</b> {account.username}</span><br></br>
            <span><b>Địa chỉ:</b> {account.address}</span><br></br>
            <span><b>Số điện thoại:</b> {account.phone}</span><br></br>
            <span><b>Email:</b> {account.email}</span><br></br>
            <span><b>Làm việc tại:</b> {account.workAt.shopId}</span><br></br>
        </div>
    </>
}

export default Account;