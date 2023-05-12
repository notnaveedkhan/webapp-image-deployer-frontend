import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react"
import { countryList } from "../../Helper/CountryList";

interface Props{
    ButtonText: string;
}


export default function CreateClusterForm(props: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} bgColor="blueviolet" _hover={{}} color="white" >{props.ButtonText}</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='3xl' >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader >Create Cluster</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Cluster Name</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Regions</FormLabel>
                            <Select placeholder='Select option'>
                                {
                                    countryList.map((country, index) => {
                                        return <option value={country} key={index}>{country}</option>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            Create
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
