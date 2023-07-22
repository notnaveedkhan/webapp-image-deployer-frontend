import {
    Badge,
    Divider,
    FormControl, IconButton,
    Input,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import CreateReportModal from "../components/reports/CreateReportModal";
import {
    useGetAllReportByUserQuery,
    ReportResponse, useDeleteReportMutation,
} from "../services/report.service";
import {DeleteIcon} from "@chakra-ui/icons";

export default function Reports() {
    const toast = useToast();

    const [reports, setReports] = useState<ReportResponse[]>([]);
    const [deleteReport] = useDeleteReportMutation()

    const {data, isLoading, isSuccess, isError, error} =
        useGetAllReportByUserQuery();

    const handleDelete = (id: number) => {
        deleteReport(String(id))
            .then((res: any) => {
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
                    console.log(res.error);
                    toast({
                        title: "Error",
                        description: res.error.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                        variant: "left-accent",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isSuccess) {
            setReports(data);
        }
        if (isError) {
            console.log(error);
        }
    }, [data, isLoading, isSuccess, isError, error]);

    return (
        <div className="min-h-screen">
            <div className="w-[80%] mx-auto my-4">
                <h1 className="text-2xl font-bold text-center">Reports</h1>
                <div className="w-full mt-6">
                    <CreateReportModal>
                        <button className=" bg-[#3b82f6] hover:bg-[#3b82f6] text-white font-bold py-2 px-4 rounded">
                            Create Report
                        </button>
                    </CreateReportModal>
                    <Divider borderColor={"#3b82f6"} my={2}/>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Title</Th>
                                    <Th>Status</Th>
                                    <Th>Created At</Th>
                                    <Th>Updated At</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {reports.map((report: ReportResponse) => {
                                    return (
                                        <Tr
                                            key={report.id}
                                            className="hover:bg-blue-200 transition-all cursor-pointer hover:scale-100">
                                            <Td>{report.id}</Td>
                                            <Td>{report.title}</Td>
                                            <Td>
                                                <Badge colorScheme="green">{report.status}</Badge>
                                            </Td>
                                            <Td>{report.createdAt}</Td>
                                            <Td>{report.modifiedAt}</Td>
                                            <Td>
                                                <IconButton
                                                    icon={
                                                        <DeleteIcon
                                                            onClick={() => handleDelete(report.id)}
                                                            fontSize={"2xl"}
                                                        />
                                                    }
                                                    colorScheme={"red"}
                                                    aria-label="View"
                                                    border={"none"}
                                                    variant="link"
                                                />
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}
