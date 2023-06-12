import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AboutUs from "../../pages/AboutUs";
import Blog from "../../pages/Blog";
import Cluster from "../../pages/Cluster";
import ClusterDetail from "../../pages/ClusterDetail";
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
                  <Route path="/create-blog" element={<CreateBlog />} />
                  <Route path="/cluster" element={<Cluster />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="/cluster" element={<Cluster />} />
                  <Route path="/cluster/control-plane/:id" element={<ClusterDetail/>} />
                  <Route path="/blogs" element={<Blog />} />
              </Routes>
          </Box>
      </>
  )
}
