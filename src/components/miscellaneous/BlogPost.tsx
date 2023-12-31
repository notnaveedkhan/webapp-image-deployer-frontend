import {
  Box,
  Link,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsCalendar3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";

interface BlogPostProps {
  id: number;
  image: string;
  heading: string;
  content: string;
  date: string;
  author: string;
  comments: string;
}
export default function BlogPost(props: BlogPostProps) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline">
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={props.image}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.heading}</Heading>
          <Box display={"flex"} gap={5} alignItems="center">
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <BsCalendar3 size={"14px"} />
              <Text fontSize={"sm"} color={"gray.500"}>
                {props.date}
              </Text>
            </Box>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <FiUser size={"14px"} />
              <Text fontSize={"sm"} color={"black"}>
                {props.author}
              </Text>
            </Box>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <BiCommentDetail size={"14px"} />
              <Text fontSize={"sm"} color={"gray.500"}>
                {props.comments}
              </Text>
            </Box>
          </Box>
          <Text py="2">
            <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
          </Text>
        </CardBody>

        <CardFooter>
          <Link
            as={RouterLink}
            letterSpacing={1}
            color="blue.600"
            to={`/blog/${props.id}`}>
            Read more
            <ArrowRightIcon fontSize={"x-small"} />
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
}
