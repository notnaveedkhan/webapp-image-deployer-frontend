import {Box, Heading, useTab, useToast} from "@chakra-ui/react";
import {useDeleteControlPlaneMutation, useGetAllControlPlaneQuery} from "../services/controlPlane.service";
import {useEffect, useState} from "react";
import {useGetNodeGroupsQuery} from "../services/nodeGroup.service";
import ControlPlaneTable from "../components/Cluster/ControlPlaneTable";
import NodeGroupTables from "../components/Cluster/NodeGroupTables";
import {useNavigate} from "react-router-dom";

export default function Cluster() {
    const toast = useToast()
    const navigator = useNavigate();
    const [controlPlane, setControlPlane] = useState<any[]>([]);
    const [nodeGroup, setNodeGroup] = useState<any[]>([]);
    const [deleteControlPlane, {isSuccess}] = useDeleteControlPlaneMutation()
    const {
        data: controlPlaneData,
        isSuccess: controlPlaneDataSuccess,
        isLoading: controlPlaneDataLoading,
        refetch: refetchControlPlane
    } = useGetAllControlPlaneQuery();
    const {
        data: nodeGroupData,
        isSuccess: nodeGroupDataSuccess,
        isLoading: nodeGroupDataLoading,
        refetch: refetchNodeGroup
    } = useGetNodeGroupsQuery();
    useEffect(() => {
            if (controlPlaneDataSuccess && nodeGroupDataSuccess) {
                setControlPlane(controlPlaneData);
                setNodeGroup(nodeGroupData);
            }
        }      // eslint-disable-next-line react-hooks/exhaustive-deps
        , [controlPlaneData, nodeGroupData])

    const handelRefetchControlPlane = () => {
        refetchControlPlane();
    }
    const handelRefetchNodeGroup = () => {
        refetchNodeGroup();
    }

    const handleDeleteControlPlane = async (id: string): Promise<void> => {
        await deleteControlPlane(id).then(() => {

            }
        )
    }

    const handleViewControlPlane = (controlPlaneId: string) => {
        navigator(`/cluster/control-plane/${controlPlaneId}`);
    }

    return (
        <Box>
            <Box mt={5} p={6}>
                <ControlPlaneTable isLoading={controlPlaneDataLoading} controlPlanes={controlPlane}
                                   onRefresh={handelRefetchControlPlane} onView={handleViewControlPlane}/>
                <NodeGroupTables isLoading={nodeGroupDataLoading} nodeGroup={nodeGroup} controlPlane={controlPlane}
                                 onRefresh={handelRefetchNodeGroup}/>
            </Box>
        </Box>
    )
}
