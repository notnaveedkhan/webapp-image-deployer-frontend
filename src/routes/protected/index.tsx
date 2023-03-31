import { Box } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Dashborad from "../../pages/Dashborad";

export default function index() {
  return (
      <>
          <Navbar />
          <Box bgColor={"gray.50"} pt={"80px"}>
              <Dashborad/>
          </Box>
      </>
  )
}
