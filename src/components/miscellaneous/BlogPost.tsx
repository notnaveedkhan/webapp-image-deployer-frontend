import { Box, Link, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { BsCalendar3, BsFolder2Open } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'
import { Link as RouterLink } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";

interface BlogPostProps{
  image: string,
  heading: string,
  content: string,
  date: string,
  catogary: string,
  comments:string
}
export default function BlogPost(props:BlogPostProps) {
  return (
      <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={props.image}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
          <Heading size='md'>{ props.heading}</Heading>
          <Box display={"flex"} gap={5} alignItems="center">
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <BsCalendar3 size={"14px"}/>
              <Text fontSize={"sm"} color={"gray.500"}>{ props.date}</Text>
            </Box>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <BsFolder2Open size={"14px"}/>
              <Text fontSize={"sm"} color={"black"}>{ props.catogary}</Text>
            </Box>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <BiCommentDetail size={"14px"}/>
              <Text fontSize={"sm"} color={"gray.500"}>{ props.comments}</Text>
            </Box>
       </Box>
      <Text py='2'>
          {props.content}
      </Text>
    </CardBody>

    <CardFooter>
      <Link as={RouterLink} letterSpacing={1} color="blue.600" to="/blog-details">
            Read more
            <ArrowRightIcon fontSize={"x-small"}/>
      </Link>
    </CardFooter>
  </Stack>
</Card>
  )
}
