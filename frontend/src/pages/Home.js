import Banner from '../assets/images/banner.jpeg'
import HomePara from '../component/home-component/HomePara';
import './Home.scss'
import { intro } from '../assets/introduction/introduction';

const Home = () => {
    return <>
        <div className='home'>
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