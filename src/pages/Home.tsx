import { Box } from "@chakra-ui/react";
import HeroSection from "../components/Auth/HeroSection";
import Navbar from "../components/Auth/Navbar";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
    </Box>
  );
}
