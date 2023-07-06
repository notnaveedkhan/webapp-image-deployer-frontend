import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function HeroSection() {
  return (
    <Box position="relative" height="80vh" width="100vw">
      <Box
        padding={[5, 5, 10]}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%">
        <Heading>Future of the Internet is here</Heading>
      </Box>
    </Box>
  );
}
