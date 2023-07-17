import {
  Badge,
  Divider,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CreateReportModal from "../components/reports/CreateReportModal";

export default function Reports() {
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
          <Divider borderColor={"#3b82f6"} my={2} />
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Status</Th>
                  <Th>Created At</Th>
                  <Th>Updated At</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr className="hover:bg-blue-200 transition-all cursor-pointer hover:scale-100">
                  <Td>Waidk8</Td>
                  <Td>
                    <Badge colorScheme="green">Active</Badge>
                  </Td>
                  <Td>Tuesday 24th, 2022</Td>
                  <Td>Tuesday 24th, 2022</Td>
                  <Td>
                    <button className="bg-[#f63b3b] hover:bg-[#f63b3b] text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                    <button className="bg-[#f6bb3b] hover:bg-[#f6ab3b] text-white font-bold py-2 px-4 rounded ml-2">
                      Edit
                    </button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
