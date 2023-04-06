import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Blog from "../../pages/Blog";
import CreateBlog from "../../pages/CreateBlog";
import Dashborad from "../../pages/Dashborad";

export default function index() {
  return (
      <>
          <Navbar />
          <Box bgColor={"gray.50"} pt={"80px"}>
              <Routes>
                  <Route path="/" element={<Dashborad />} />
                  <Route path="/blogs" element={<Blog />} />
                  <Route path="/create-blog" element={ <CreateBlog/>} />
              </Routes>
          </Box>
      </>
  )
}
