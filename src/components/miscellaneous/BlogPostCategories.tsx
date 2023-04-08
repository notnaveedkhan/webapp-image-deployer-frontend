import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Heading, Input, Text } from "@chakra-ui/react";
import { useState} from 'react';
import { useAllTopicsQuery } from "../../services/topic.service";

export default function BlogPostCategories() {
    const [inputShow, setInputShow] = useState(false);
    const { data, isFetching, isLoading } = useAllTopicsQuery({});
    console.log(data)
  return (
      <Box>
          <Heading fontSize={"md"}>Topics</Heading>
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
