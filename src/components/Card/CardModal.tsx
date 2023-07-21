import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdNumbers } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { CalendarIcon } from "@chakra-ui/icons";
import { AiFillCreditCard } from "react-icons/ai";
import { useCreateCardMutation, CardBody } from "../../services/card.service";

interface Props {
  children: React.ReactNode;
}

interface FormValues {
  cardNumber: string;
  cardHolderName: string;
  expirationDateMouth: string;
  expirationDateYear: string;
  cvv: string;
}

interface FormErrors {
  cardNumber?: string;
  cardHolderName?: string;
  expirationDateMouth?: string;
  expirationDateYear?: string;
  cvv?: string;
}

const CardModal: React.FC<Props> = ({ children }) => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createCard] = useCreateCardMutation();

  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card Number is required")
      .matches(/^\d+$/, "Card Number must be a number")
      .min(16, "Card Number must be 16 digits")
      .max(16, "Card Number must be 16 digits"),
    cardHolderName: Yup.string().required("Card Holder Name is required"),
    expirationDateMouth: Yup.string(),
    expirationDateYear: Yup.string(),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "Invalid CVV")
      .min(3, "Invalid CVV")
      .max(4, "Invalid CVV"),
  });

  const Formik = useFormik<FormValues>({
    initialValues: {
      cardNumber: "",
      cardHolderName: "",
      expirationDateMouth: "",
      expirationDateYear: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const body: CardBody = {
        number: values.cardNumber,
        cardholderName: values.cardHolderName,
        expiryDate: `${values.expirationDateMouth}/${values.expirationDateYear}`,
        cvc: values.cvv,
      };
      console.log(body);
      createCard(body).then((res: any) => {
        if (res.data) {
          toast({
            title: "Success",
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
      });
    },
  });

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={Formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Debit Card Details</ModalHeader>
            <ModalBody className="flex flex-col gap-3">
              <FormControl
                isInvalid={
                  !!(Formik.touched.cardNumber && Formik.errors.cardNumber)
                }>
                <InputGroup>
                  <Input
                    {...Formik.getFieldProps("cardNumber")}
                    placeholder="Card Number"
                  />
                  <InputLeftElement>
                    <AiFillCreditCard />
                  </InputLeftElement>
                </InputGroup>
                <FormErrorMessage>{Formik.errors.cardNumber}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!(
                    Formik.touched.cardHolderName &&
                    Formik.errors.cardHolderName
                  )
                }>
                <InputGroup>
                  <Input
                    {...Formik.getFieldProps("cardHolderName")}
                    placeholder="Card Holder Name"
                  />
                  <InputLeftElement>
                    <BsPersonFill />
                  </InputLeftElement>
                </InputGroup>
                <FormErrorMessage>
                  {Formik.errors.cardHolderName}
                </FormErrorMessage>
              </FormControl>

              <div className="flex gap-3 items-center">
                <FormControl
                  flex={4}
                  isInvalid={
                    !!(
                      Formik.touched.expirationDateMouth &&
                      Formik.errors.expirationDateMouth
                    )
                  }>
                  <InputGroup>
                    <Input
                      {...Formik.getFieldProps("expirationDateMouth")}
                      placeholder="Expiration Date"
                    />
                    <InputLeftElement>
                      <CalendarIcon />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {Formik.errors.expirationDateMouth}
                  </FormErrorMessage>
                </FormControl>
                <p className="flex-1 text-center">/</p>
                <FormControl
                  flex={4}
                  isInvalid={
                    !!(
                      Formik.touched.expirationDateYear &&
                      Formik.errors.expirationDateYear
                    )
                  }>
                  <InputGroup>
                    <Input
                      {...Formik.getFieldProps("expirationDateYear")}
                      placeholder="Expiration year"
                    />
                    <InputLeftElement>
                      <CalendarIcon />
                    </InputLeftElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {Formik.errors.expirationDateYear}
                  </FormErrorMessage>
                </FormControl>
              </div>

              <FormControl
                isInvalid={!!(Formik.touched.cvv && Formik.errors.cvv)}>
                <InputGroup>
                  <Input {...Formik.getFieldProps("cvv")} placeholder="CVV" />
                  <InputLeftElement>
                    <MdNumbers />
                  </InputLeftElement>
                </InputGroup>
                <FormErrorMessage>{Formik.errors.cvv}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
              <Button ml={2} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CardModal;
