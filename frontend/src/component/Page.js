import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import Statistics from '../pages/Statistics';
import Details from '../pages/Details';

const Page = () => {
    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes >
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/stat' element={<Statistics />}></Route>
                    <Route path='/detail' element={<Details />}></Route>
                </Routes>
            </div>
        </div>
    </>
}

export default Page;