import {
  Box,
  Center,
  Divider,
  Heading,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi";
import { RxDragHandleDots1 } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { useLatestBlogQuery } from "../../services/blog.service";
import { useEffect, useLayoutEffect, useState } from "react";
import { set } from "immer/dist/internal";

export default function RecentBlog() {
  const [latestBlog, setLatestBlog] = useState<any[]>([]);
  const { data, isSuccess, isLoading } = useLatestBlogQuery({});
  useLayoutEffect(() => {
    if (isSuccess) {
      setLatestBlog([]);
      if (data.length > 3) {
        setLatestBlog(data.slice(0, 3));
      } else {
        setLatestBlog(data);
      }
    }
  }, [isSuccess]);
  return (
    <div className="md:col-span-6 col-span-12 border rounded-md border-gray-300 h-fit">
      <Box
        className="bg-blue-900 text-white rounded-md"
        p={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center">
        <Box display={"flex"} alignItems="center" gap={2}>
          <RxDragHandleDots1 fontSize={"20px"} />
          <Text>Recent Blog Post</Text>
          <Text fontSize={"x-small"} color="blue.500">
            info
          </Text>
        </Box>
        <HiOutlineDotsVertical />
      </Box>
      <Box>
        {isLoading ? (
          <Center>
            <Spinner mt={2} />
          </Center>
        ) : latestBlog.length > 0 ? (
          latestBlog.map((blog: any, index: number) => {
            return (
              <Box key={blog.id}>
                <Box p={4} mt={2} display="flex" gap={4} alignItems="center">
                  <Box>
                    <Text color={"gray.500"}>
                      {blog.createdAt.split(" ")[1]}
                    </Text>
                    <Heading fontSize={"lg"}>
                      {blog.createdAt.split(" ")[0]}
                    </Heading>
                  </Box>
                  <Heading fontSize={"md"} color="blue.500">
                    <Link>{blog.title}</Link>{" "}
                  </Heading>
                </Box>
                {index < latestBlog.length - 1 ? <Divider /> : null}
              </Box>
            );
          })
        ) : (
          <Box
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            height={"100%"}>
            <Text>No Blog Post</Text>
          </Box>
        )}
      </Box>
      <Divider mt={4} />
      <Link
        as={RouterLink}
        to={"/blogs"}
        color="gray.500"
        _hover={{}}
        className="flex gap-2 items-center justify-center py-2 text-sm hover:text-blue-900">
        View More
        <HiOutlineExternalLink />
      </Link>
    </div>
  );
}
