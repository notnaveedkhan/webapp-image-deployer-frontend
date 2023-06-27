import { Box } from "@chakra-ui/react";
import ResentVisited from "../components/miscellaneous/ResentVisted";
import WelcomeToWaidk8 from "../components/miscellaneous/WelcomeToWaidk8";
import Waidk8Health from "../components/miscellaneous/Waidk8Health";
import CostAndUsage from "../components/miscellaneous/CostAndUsage";
import BuildSolution from "../components/miscellaneous/BuildSolution";
import TrustedAdvisor from "../components/miscellaneous/TrustedAdvisor";
import LatestAnnouncements from "../components/miscellaneous/LatestAnnouncements";
import RecentBlog from "../components/miscellaneous/RecentBlog";

function Dashboard() {
  return (
    <Box marginX={{ base: 0, md: 5 }}>
      <Box
        marginY={3}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        gap={2}
        w={"100%"}
        paddingX="20px">
        <LatestAnnouncements />
        <WelcomeToWaidk8 />
      </Box>
      <Box
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        gap={2}
        w={"100%"}
        paddingX="20px">
        <Waidk8Health />
        <CostAndUsage />
      </Box>
      <Box
        display={"flex"}
        mt={2}
        flexDir={{ base: "column", md: "row" }}
        gap={2}
        w={"100%"}
        paddingX="20px">
        <BuildSolution />
        <TrustedAdvisor />
      </Box>
      <Box
        display={"flex"}
        mt={2}
        flexDir={{ base: "column", md: "row" }}
        gap={2}
        w={"100%"}
        paddingX="20px">
        <RecentBlog />
      </Box>
    </Box>
  );
}

export default Dashboard;
