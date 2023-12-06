import './Page.scss'
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom'
import Statistics from '../pages/Statistics';
import Details from '../pages/Details';
import CreateForm from '../pages/CreateForm';
import { Toaster } from 'react-hot-toast'


const Page = () => {
    return <>
        <div className='page'>
            <div className='page-box'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/stat' element={<Statistics />}></Route>
                    <Route path='/detail' element={<Details />}></Route>
                    <Route path='/create-form' element={<CreateForm />}></Route>
                </Routes>
                <Toaster toastOptions={{
                    style: {
                        background: 'black',
                        color: 'white',
                    }
                }} />
            </div>
        </div>
    </>
}

export default Page;