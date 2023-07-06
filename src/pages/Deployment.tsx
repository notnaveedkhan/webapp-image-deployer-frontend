import { Box } from "@chakra-ui/react";
import DeploymentTable from "../components/Deployments/DeploymentTable";
import NamespaceTable from "../components/Deployments/NamespaceTable";
import KubeServiceTable from "../components/Deployments/KubeServiceTable";

export default function Deployment() {
  return (
    <Box p={6} minH="70vh">
      <DeploymentTable />
    </Box>
  );
}
