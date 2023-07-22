import {
  Badge,
  Center,
  Divider,
  FormControl,
  Heading,
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
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CreateReportModal from "../components/reports/CreateReportModal";
import EditReportsByAdminModal from "../components/reports/EditReportsByAdminModal";
import { isApiResponse } from "../Helper/isApiErrorResponce";
import {
  ReportResponseAdmin,
  useGetAllReportsDetailsAdminQuery,
} from "../services/report.service";

export default function AdminReports() {
  const toast = useToast();

  const [reports, setReports] = useState<ReportResponseAdmin[]>([]);

  const [pendingReports, setPendingReports] = useState<ReportResponseAdmin[]>(
    []
  );
  const [closedReports, setClosedReports] = useState<ReportResponseAdmin[]>([]);

  const { data, isSuccess, isError, error } =
    useGetAllReportsDetailsAdminQuery();

  useEffect(() => {
    setClosedReports([]);
    setPendingReports([]);
    if (isSuccess) {
      setReports(data);
      data.forEach((report: ReportResponseAdmin) => {
        if (report.status === "PENDING") {
          setPendingReports((prev) => [...prev, report]);
        } else {
          setClosedReports((prev) => [...prev, report]);
        }
      });
    }
    if (isApiResponse(error)) {
      console.log(error);
      toast({
        title: "Error",
        description: error.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  }, [data, isSuccess, isError, error]);

  return (
    <div className="min-h-screen">
      <div className="w-[80%] mx-auto my-4">
        <h1 className="text-2xl font-bold text-center">Reports</h1>
        <div className="w-full mt-6">
          <TableContainer className="min-h-[400px]">
            <Heading>Closed Reports</Heading>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Created At</Th>
                  <Th>Created By</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pendingReports.length > 0 &&
                  pendingReports.map((report: ReportResponseAdmin) => {
                    return (
                      <Tr
                        key={report.id}
                        className="hover:bg-blue-200 transition-all cursor-pointer hover:scale-100">
                        <Td>{report.id}</Td>
                        <Td>{report.title}</Td>
                        <Td>
                          <Badge colorScheme="orange">{report.status}</Badge>
                        </Td>
                        <Td>{report.createdAt}</Td>
                        <Td>{report.createdBy.email}</Td>
                        <Td>
                          <EditReportsByAdminModal
                            id={report.id}
                            status={report.status}>
                            <button className="bg-[#f6bb3b] hover:bg-[#f6ab3b] text-white font-bold py-2 px-4 rounded ml-2">
                              Edit
                            </button>
                          </EditReportsByAdminModal>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            {pendingReports.length === 0 && (
              <Center h={"200px"}>
                <p className="text-2xl font-bold text-center text-gray-500">
                  No Pending Reports
                </p>
              </Center>
            )}
          </TableContainer>
          <TableContainer className="min-h-[400px]">
            <Heading>Closed Reports</Heading>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Created At</Th>
                  <Th>Created By</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {closedReports.length > 0 &&
                  closedReports.map((report: ReportResponseAdmin) => {
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
                          <EditReportsByAdminModal
                            id={report.id}
                            status={report.status}>
                            <button className="bg-[#f6bb3b] hover:bg-[#f6ab3b] text-white font-bold py-2 px-4 rounded ml-2">
                              Edit
                            </button>
                          </EditReportsByAdminModal>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
            {closedReports.length === 0 && (
              <Center h={"200px"}>
                <p className="text-2xl font-bold text-center text-gray-500">
                  No Closed Reports
                </p>
              </Center>
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
