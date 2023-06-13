
import { Box} from "@chakra-ui/react";
import DeploymentTable from "../components/Deployments/DeploymentTable";
import NamespaceTable from "../components/Deployments/NamespaceTable";
import ServiceTable from "../components/Deployments/ServiceTable";


export default function Deployment() {
    return (
          <Box mt={5} p={6}>
            {/* <NamespaceTable /> */}
            <ServiceTable />
            <DeploymentTable/>
          </Box>
      
  )
}
