import Banner from '../assets/images/banner.jpeg'
import HomePara from '../component/home-component/HomePara';
import './Home.scss'
import { useState } from 'react';
import { intro } from '../assets/introduction/introduction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDeliveryId } from '../app/urlSlice';

const Home = () => {

    const [deliveryId, setDeliveryId] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleView = (e) => {
        if (e.keyCode === 13) {
            navigate(`/management/detail`)
            dispatch(updateDeliveryId({ deliveryId }))
            setDeliveryId('')
        }
    }

    const handleInputChange = (e) => {
        setDeliveryId(e.target.value)
    }

    return <>
        <div className='home'>
            <input value={deliveryId} className='sidebar-search' type='text' placeholder='Search by code' onKeyDown={(e) => handleView(e)}
                onChange={(e) => handleInputChange(e)}></input>
            <div className='home-banner'>
                <img className='home-banner-image' src={Banner}></img>
                {intro.map(item => {
                    return <HomePara title={item.title} content={item.content} list={item.list} />
                })}
            </div>
        </div>
    </>
}

export default Home;