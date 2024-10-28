import Banner from "../Banner/Banner";
import Footer from "../../../shared/Footer/Footer"
import AllList from "../AllList/AllList";
import LatestSites from "../LatestSites/LatestSites";
import Featured from "../Featured/Featured";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <LatestSites></LatestSites>
            <AllList></AllList>
            <Footer></Footer>
        </div>
    );
};

export default Home;