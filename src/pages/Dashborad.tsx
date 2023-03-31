import {Box, Divider, Link, Text} from '@chakra-ui/react'
import { RxDragHandleDots1 } from 'react-icons/rx'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import ResentVisted from '../components/miscellaneous/ResentVisted'
import WelcomeToWaidk8 from '../components/miscellaneous/WelcomeToWaidk8'
import Waidk8Health from '../components/miscellaneous/Waidk8Health'
import CostAndusage from '../components/miscellaneous/CostAndusage'
import BuildSloution from '../components/miscellaneous/BuildSloution'
import TurstedAdvisor from '../components/miscellaneous/TurstedAdvisor'
import ExploreWaidk8 from '../components/miscellaneous/ExploreWaidk8'
import LatestAnnouncements from '../components/miscellaneous/LatestAnnouncements'
import RecentBlog from '../components/miscellaneous/RecentBlog'

function Dashborad() {

    return (
        <Box marginX={5} >
            <Box marginY={3} display={"flex"} flexShrink="wrap" gap={2} w={"100%"} paddingX="20px" >
                <ResentVisted />
                <WelcomeToWaidk8/>
            </Box>
             <Box  display={"flex"} flexShrink="wrap" gap={2} w={"100%"} paddingX="20px" >
                <Waidk8Health/>
                <CostAndusage/>
            </Box>
            <Box  display={"flex"} mt={2} flexShrink="wrap" gap={2} w={"100%"} paddingX="20px" >
                <BuildSloution/>
                 <TurstedAdvisor/>
            </Box>
            <Box display={"flex"} mt={2} flexShrink="wrap" gap={2} w={"100%"} paddingX="20px" >
                <LatestAnnouncements />
                <RecentBlog/>
            </Box>
        </Box>
    )
}

export default Dashborad;
