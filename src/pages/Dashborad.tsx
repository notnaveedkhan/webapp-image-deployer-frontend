import WelcomeToWaidk8 from "../components/miscellaneous/WelcomeToWaidk8";
import Cost from "../components/miscellaneous/Cost";
import Statistics from "../components/miscellaneous/Statistics";
import LatestAnnouncements from "../components/miscellaneous/LatestAnnouncements";
import RecentBlog from "../components/miscellaneous/RecentBlog";

function Dashboard() {
    return (
        <div className="grid w-[95%] mx-auto my-4 gap-3 grid-cols-12">
            <WelcomeToWaidk8/>
            <LatestAnnouncements/>
            <Cost/>
            <RecentBlog/>
            <Statistics/>
        </div>
    );
}

export default Dashboard;
