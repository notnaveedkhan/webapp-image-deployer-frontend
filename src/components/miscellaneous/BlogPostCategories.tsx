import { Box, Divider, Heading, Text, Icon, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BasicResponse } from "../../interfaces/BasicResponseType";
import {
  FollowingResultType,
  TrandingTopicsResultType,
  useFollowingTopicsQuery,
  useFollowTopicMutation,
  useTrandingTopicsQuery,
} from "../../services/topic.service";

export default function BlogPostCategories() {
  const toast = useToast();

  const [categories, setCategories] = useState<TrandingTopicsResultType[]>([]);

  const [followingTopic, setFollowingTopic] = useState<FollowingResultType[]>(
    []
  );

  const [followTopic] = useFollowTopicMutation();

  const { data, isSuccess, isLoading, isError, error } =
    useTrandingTopicsQuery();

  const { data: followingTopics, isSuccess: isFollowingTopicsSuccess } =
    useFollowingTopicsQuery();

  useEffect(() => {
    if (isSuccess) {
      setCategories(data);
    }
    if (isFollowingTopicsSuccess) {
      setFollowingTopic(followingTopics);
    }
  }, [data, error, followingTopics]);

  function handelClickFollowTopic(id: number) {
    followTopic(id)
      .then((res: any) => {
        if (res.data) {
          toast({
            title: "Topic Followed",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
        if (res.error) {
          toast({
            title: "Error",
            description: res.error.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  function handelClickUnfollowTopic(id: number) {}

  return (
    <Box>
      <Heading fontSize={"md"}>Popular Topics</Heading>
      <Box mt={2}>
        {categories.slice(0, 5).map((category: TrandingTopicsResultType) => {
          return (
            <Box
              key={category.topic.id}
              display={"flex"}
              w="100%"
              justifyContent={"space-between"}
              p={3}>
              <Text>{category.topic.name}</Text>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Text>{category.count}</Text>
                {followingTopic.some(
                  (topic: FollowingResultType) => topic.id === category.topic.id
                ) ? (
                  <Icon
                    as={AiFillStar}
                    w={5}
                    h={5}
                    color={"blueviolet"}
                    onClick={() => handelClickUnfollowTopic(category.topic.id)}
                    cursor="pointer"
                  />
                ) : (
                  <Icon
                    as={AiOutlineStar}
                    w={5}
                    h={5}
                    color={"blueviolet"}
                    onClick={() => handelClickFollowTopic(category.topic.id)}
                    cursor="pointer"
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
