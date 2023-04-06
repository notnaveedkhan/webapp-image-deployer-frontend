import { Box, Divider, Heading, Text } from "@chakra-ui/react";

export default function BlogPostCategories() {
  return (
      <Box>
          <Heading fontSize={"md"}>Categories</Heading>
          <Box mt={2}>
              <Box display={"flex"} w="100%" justifyContent={"space-between"} p={3}>
                  <Text>Fashion</Text>
                  <Text>(10)</Text>
              </Box>
              <Divider />
              <Box display={"flex"} w="100%" justifyContent={"space-between"} p={3}>
                  <Text>Fashion</Text>
                  <Text>(10)</Text>
              </Box>
              <Divider />
              <Box display={"flex"} w="100%" justifyContent={"space-between"} p={3}>
                  <Text>Fashion</Text>
                  <Text>(10)</Text>
              </Box>
              <Divider />
              <Box display={"flex"} w="100%" justifyContent={"space-between"} p={3}>
                  <Text>Fashion</Text>
                  <Text>(10)</Text>
              </Box>
          </Box>
    </Box>
  )
}
