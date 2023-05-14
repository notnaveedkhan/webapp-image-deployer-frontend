import {FormControl, FormLabel, Input, InputGroup, InputRightAddon, Tooltip, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useCreateTopicMutation} from "../../services/topic.service";

const CreateTopic = () => {
    const toast = useToast();
    const [topicApi] = useCreateTopicMutation();
    const FormikCreateTopic = useFormik({
        initialValues: {
            name:""
        },
        onSubmit: (values) => {
            console.log(values);
        },
        validationSchema: Yup.object({
            name:Yup.string().matches(/^[a-zA-Z\s]*$/, 'Name must only contain alphabetic characters')
        })
    })
    const handleCreateTopic = () => {
        if (FormikCreateTopic.errors.name) {
            toast({
                title: FormikCreateTopic.errors.name,
                duration: 3000,
                isClosable: true,
                status: "warning",
                position:"top"
            })
        }
        else {
            topicApi({ name: FormikCreateTopic.values.name }).then((res:any) => {
                if(res.data){
                    toast({
                        title: "Topic Created",
                        duration: 3000,
                        isClosable: true,
                        status: "success",
                        position:"top"
                    })
                }
                if(res.error){
                    toast({
                        title: res.error.data.message,
                        duration: 3000,
                        isClosable: true,
                        status: "error",
                        position:"top"
                    })
                }
            })
        }
    }
    return (
        <FormControl>
            <FormLabel>Create Topic</FormLabel>
            <InputGroup>
                <Input type={"search"} id="name" name="name" onChange={FormikCreateTopic.handleChange}
                       onBlur={FormikCreateTopic.handleBlur} value={FormikCreateTopic.values.name} placeholder="Enter topic name" />
                <Tooltip label="Create Topic"><InputRightAddon bgColor={process.env.REACT_APP_NAVBAR_BG_COLOR} cursor="pointer" _hover={{bgColor:"gray.200"}} onClick={handleCreateTopic} ><AddIcon/></InputRightAddon></Tooltip>
            </InputGroup>
        </FormControl>
    );
};

export default CreateTopic;
