import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateTopicMutation } from "../../services/topic.service";

const CreateTopic = () => {
  const toast = useToast();
  const [topicApi] = useCreateTopicMutation();
  const FormikCreateTopic = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(
        /^[a-zA-Z\s]*$/,
        "Name must only contain alphabetic characters"
      ),
    }),
  });
  const handleCreateTopic = () => {
    if (FormikCreateTopic.errors.name) {
      toast({
        title: FormikCreateTopic.errors.name,
        duration: 3000,
        isClosable: true,
        status: "warning",
        position: "top",
      });
    } else {
      topicApi({ name: FormikCreateTopic.values.name })
        .then((res: any) => {
          if (res.data) {
            toast({
              title: "Topic Created",
              duration: 3000,
              isClosable: true,
              status: "success",
              position: "top",
            });
            FormikCreateTopic.resetForm();
          }
          if (res.error) {
            toast({
              title: res.error.data.message,
              duration: 3000,
              isClosable: true,
              status: "error",
              position: "top",
            });
          }
        })
        .catch((err: any) => {
          toast({
            title: err?.error,
            duration: 3000,
            isClosable: true,
            status: "error",
            position: "top",
          });
        });
    }
  };
  return (
    <FormControl>
      <FormLabel className="text-blue-900 dark:text-white">
        Create Topic
      </FormLabel>
      <InputGroup>
        <Input
          type={"search"}
          id="name"
          name="name"
          borderColor={"gray.300"}
          className="bg-gray-100 p-2 rounded-md border-r-0"
          onChange={FormikCreateTopic.handleChange}
          onBlur={FormikCreateTopic.handleBlur}
          value={FormikCreateTopic.values.name}
          placeholder="Enter topic name"
        />
        <Tooltip label="Create Topic">
          <InputRightAddon
            className="bg-blue-900 text-white rounded-md"
            cursor="pointer"
            _hover={{}}
            sx={{
              backgroundColor: "-bg-blue-900",
            }}
            onClick={handleCreateTopic}>
            <AddIcon />
          </InputRightAddon>
        </Tooltip>
      </InputGroup>
    </FormControl>
  );
};

export default CreateTopic;
