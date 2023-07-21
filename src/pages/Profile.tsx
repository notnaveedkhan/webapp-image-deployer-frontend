import { AddIcon, CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Divider,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import CardModal from "../components/Card/CardModal";
import EditProfile from "../components/profile/EditProfile";
import {
  CardDetails,
  useDeleteCardMutation,
  useGetCardsQuery,
} from "../services/card.service";
import { UserResponse, useGetUserQuery } from "../services/user.service";

const Profile = () => {
  const [user, setUser] = useState<UserResponse>({
    id: 0,
    name: "",
    email: "",
    address: "",
    phone: "",
    verified: false,
    roles: [],
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUserQuery();

  const toast = useToast();

  const [cards, setCards] = useState<CardDetails[]>([]);

  const { data, isLoading, isSuccess, isError, error } = useGetCardsQuery();

  const [deleteCard] = useDeleteCardMutation();

  useEffect(() => {
    if (isSuccess) {
      setCards(data);
    }
    if (isUserSuccess) {
      setUser(userData);
    }
  }, [
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    userData,
    userError,
    isUserSuccess,
  ]);

  const handleDelete = (id: number) => {
    deleteCard(String(id)).then((res: any) => {
      if (res.data) {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
          icon: <CheckIcon />,
        });
      }
      if (res.error) {
        toast({
          title: "Failure",
          description: res.error.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
          icon: <WarningIcon />,
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col mt-6 ">
      <div className="flex gap-2 w-[80%] mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-1  gap-10">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
          />

          <div>
            <h1 className="text-2xl font-bold ">{user.name}</h1>
            <p className="text-gray-600 text-sm">Full Stack Developer</p>
            <div className="flex gap-3">
              <button className="border-blue-500 border text-blue-500 p-2 rounded-md mt-4">
                Change Password
              </button>
              <EditProfile userData={userData}>
                <button className="border-blue-500 border text-blue-500 p-2 rounded-md mt-4">
                  Edit Profile
                </button>
              </EditProfile>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          <Divider
            orientation="vertical"
            className="text-gray-600 border-gray-600"
          />
          <div>
            <p className="text-lg text-blue-500 flex gap-3">
              Email :<span className="text-black">{user.email}</span>
            </p>
            <p className="text-lg text-blue-500 flex gap-3">
              Phone :<span className="text-black">{user.phone}</span>
            </p>
            <p className="text-lg text-blue-500 flex gap-3">
              Address :<address className="text-black">{user.address}</address>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-[80%] mx-auto p-6 bg-white rounded-lg shadow-md mt-3">
        <CardModal>
          <button className="border-blue-500 w-fit flex justify-center gap-3 items-center border border-dashed text-blue-500 p-2 rounded-md mt-4">
            <AddIcon />
            Add Card
          </button>
        </CardModal>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Card Holder</Th>
                <Th>Card Number</Th>
                <Th>Expiry Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cards.map((card: CardDetails) => (
                <Tr key={card.id}>
                  <Td>{card.id}</Td>
                  <Td>{card.cardholderName}</Td>
                  <Td>{card.number}</Td>
                  <Td>{card.expiryDate}</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleDelete(card.id)}
                      colorScheme={"red"}
                      aria-label="delete"
                      icon={<AiFillDelete />}
                      variant={"ghost"}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Profile;
