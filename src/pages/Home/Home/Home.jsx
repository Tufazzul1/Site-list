import Banner from "../Banner/Banner";
import Footer from "../../../shared/Footer/Footer"
import AllList from "../AllList/AllList";
import LatestSites from "../LatestSites/LatestSites";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestSites></LatestSites>
            <AllList></AllList>
            <Footer></Footer>
        </div>
    );
};

export default Home;