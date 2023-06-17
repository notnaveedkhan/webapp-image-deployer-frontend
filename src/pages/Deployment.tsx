
import { Box} from "@chakra-ui/react";
import DeploymentTable from "../components/Deployments/DeploymentTable";
import NamespaceTable from "../components/Deployments/NamespaceTable";
import KubeServiceTable from "../components/Deployments/KubeServiceTable";


export default function Deployment() {
    return (
          <Box mt={5} p={6}>
            {/* <NamespaceTable /> */}
            <KubeServiceTable />
            <DeploymentTable/>
          </Box>
      
  )
}
