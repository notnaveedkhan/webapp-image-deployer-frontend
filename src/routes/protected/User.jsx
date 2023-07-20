import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DeploymentForm from '../../components/Deployments/DeploymentForm'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import AboutUs from '../../pages/AboutUs'
import Blog from '../../pages/Blog'
import BlogDetails from '../../pages/BlogDetails'
import Cluster from '../../pages/Cluster'
import ClusterDetail from '../../pages/ClusterDetail'
import CreateBlog from '../../pages/CreateBlog'
import Dashboard from '../../pages/Dashborad'
import Deployment from '../../pages/Deployment'
import Reports from '../../pages/Reports'

export default function User() {
    return (
        <div className="overflow-x-hidden dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/cluster" element={<Cluster />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="/cluster" element={<Cluster />} />
                <Route path="/cluster/control-plane/:id" element={<ClusterDetail />} />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/deployments" element={<Deployment />} />
                <Route path="/create-deployment" element={<DeploymentForm />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
            <Footer />
        </div>
    )
}
