import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import DeploymentForm from "../../components/Deployments/DeploymentForm";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AboutUs from "../../pages/AboutUs";
import Blog from "../../pages/Blog";
import BlogDetails from "../../pages/BlogDetails";
import Cluster from "../../pages/Cluster";
import ClusterDetail from "../../pages/ClusterDetail";
import CreateBlog from "../../pages/CreateBlog";
import Dashboard from "../../pages/Dashborad";
import Deployment from "../../pages/Deployment";

export default function index() {
  return (
    <>
      <Navbar />
      <Box bgColor={"gray.50"} pt={"80px"}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route
            path="/cluster/control-plane/:id"
            element={<ClusterDetail />}
          />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/deployments" element={<Deployment />} />
          <Route path="/create-deployment" element={<DeploymentForm />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
