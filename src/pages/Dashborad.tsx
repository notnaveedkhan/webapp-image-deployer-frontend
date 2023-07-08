import { Box } from "@chakra-ui/react";
import ResentVisited from "../components/miscellaneous/ResentVisted";
import WelcomeToWaidk8 from "../components/miscellaneous/WelcomeToWaidk8";
import Waidk8Health from "../components/miscellaneous/Waidk8Health";
// import CostAndUsage from "../components/miscellaneous/CostAndUsage";
import BuildSolution from "../components/miscellaneous/BuildSolution";
import TrustedAdvisor from "../components/miscellaneous/TrustedAdvisor";
import LatestAnnouncements from "../components/miscellaneous/LatestAnnouncements";
import RecentBlog from "../components/miscellaneous/RecentBlog";

function Dashboard() {
  return (
    <div className="grid w-[95%] mx-auto my-4 gap-3 grid-cols-12">
      <ResentVisited />
      <WelcomeToWaidk8 />
      <Waidk8Health />
      <RecentBlog />
      <TrustedAdvisor />
      <LatestAnnouncements />
    </div>
  );
}

export default Dashboard;
