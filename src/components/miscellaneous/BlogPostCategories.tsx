import { Box, Divider, Heading, Text, Icon, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BasicResponse } from "../../interfaces/BasicResponseType";
import {
  FollowingResultType,
  TrendingTopicsResultType,
  useFollowingTopicsQuery,
  useFollowTopicMutation,
  useTrendingTopicsQuery,
  useUnFollowTopicMutation,
} from "../../services/topic.service";

export default function BlogPostCategories() {
  const toast = useToast();

  const [categories, setCategories] = useState<TrendingTopicsResultType[]>([]);

  const [followingTopic, setFollowingTopic] = useState<FollowingResultType[]>(
    []
  );

  const [followTopic] = useFollowTopicMutation();

  const { data, isSuccess, isLoading, isError, error } =
    useTrendingTopicsQuery();

  const { data: followingTopics, isSuccess: isFollowingTopicsSuccess } =
    useFollowingTopicsQuery();

  const [unFollowTopic] = useUnFollowTopicMutation();

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
            variant: "left-accent",
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
            variant: "left-accent",
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  function handelClickUnfollowTopic(id: number) {
    unFollowTopic(id)
      .then((res: any) => {
        if (res.data) {
          toast({
            title: "Topic Unfollowed",
            description: res.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
            variant: "left-accent",
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
            variant: "left-accent",
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  return (
    <Box>
      <Heading fontSize={"md"} className="text-blue-900 dark:text-white">
        Popular Topics
      </Heading>
      <Box mt={2} className="border border-gray-500 rounded-md">
        {categories.slice(0, 5).map((category: TrendingTopicsResultType) => {
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
                    className="text-blue-900 dark:text-white"
                    onClick={() => handelClickUnfollowTopic(category.topic.id)}
                    cursor="pointer"
                  />
                ) : (
                  <Icon
                    as={AiOutlineStar}
                    w={5}
                    h={5}
                    className="text-blue-900 dark:text-white"
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
