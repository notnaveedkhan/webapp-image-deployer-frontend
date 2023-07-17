import { Box, Heading, useTab, useToast } from "@chakra-ui/react";
import {
  useDeleteControlPlaneMutation,
  useGetAllControlPlaneQuery,
  useLazyGetAllControlPlaneQuery,
} from "../services/controlPlane.service";
import { useEffect, useState } from "react";
import {
  useGetNodeGroupsQuery,
  useLazyGetNodeGroupsQuery,
} from "../services/nodeGroup.service";
import ControlPlaneTable from "../components/Cluster/ControlPlaneTable";
import NodeGroupTable from "../components/Cluster/NodeGroupTable";
import { useNavigate } from "react-router-dom";

export default function Cluster() {
  const toast = useToast();
  const navigator = useNavigate();
  const [controlPlane, setControlPlane] = useState<any[]>([]);
  const [nodeGroup, setNodeGroup] = useState<any[]>([]);
  const [deleteControlPlane, { isSuccess }] = useDeleteControlPlaneMutation();
  const {
    data: controlPlaneData,
    isSuccess: controlPlaneDataSuccess,
    isLoading: controlPlaneDataLoading,
    refetch: refetchControlPlane,
  } = useGetAllControlPlaneQuery();

  const [getAllControlPlane] = useLazyGetAllControlPlaneQuery();
  const [getAllNodeGroups] = useLazyGetNodeGroupsQuery();

  const {
    data: nodeGroupData,
    isSuccess: nodeGroupDataSuccess,
    isLoading: nodeGroupDataLoading,
    refetch: refetchNodeGroup,
  } = useGetNodeGroupsQuery();

  useEffect(
    () => {
      if (controlPlaneDataSuccess && nodeGroupDataSuccess) {
        setControlPlane(controlPlaneData);
        setNodeGroup(nodeGroupData);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [controlPlaneData, nodeGroupData]
  );

  useEffect(() => {
    setInterval(() => {
      getAllControlPlane()
        .then((res: any) => {
          if (res.data) {
            setControlPlane(res.data);
          }
          if (res.error) {
            toast({
              title: "Error",
              description: res.error?.data.message
                ? res.error.data.message
                : res.error.data.error,
              status: "error",
              duration: 3000,
              position: "top",
              isClosable: true,
              variant: "left-accent",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err?.message,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
            variant: "left-accent",
          });
        });

      getAllNodeGroups()
        .then((res: any) => {
          if (res.data) {
            setNodeGroup(res.data);
          }
          if (res.error) {
            toast({
              title: "Error",
              description: res.error?.data.message
                ? res.error.data.message
                : res.error.data.error,
              status: "error",
              duration: 3000,
              position: "top",
              isClosable: true,
              variant: "left-accent",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err?.message,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
            variant: "left-accent",
          });
        });
    }, 60000);
  });

  const handelRefetchControlPlane = () => {
    refetchControlPlane().catch((err) => {
      toast({
        title: "Error",
        description: err?.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
        variant: "left-accent",
      });
    });
  };

  const handelRefetchNodeGroup = () => {
    refetchNodeGroup().catch((err) => {
      toast({
        title: "Error",
        description: err?.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
        variant: "left-accent",
      });
    });
  };

  const handleDeleteControlPlane = async (id: string): Promise<void> => {
    await deleteControlPlane(id).then(() => {});
  };

  const handleViewControlPlane = (controlPlaneId: string) => {
    navigator(`/cluster/control-plane/${controlPlaneId}`);
  };

  return (
    <Box>
      <Box mt={5} p={6}>
        <ControlPlaneTable
          isLoading={controlPlaneDataLoading}
          controlPlanes={controlPlane}
          onRefresh={handelRefetchControlPlane}
          onView={handleViewControlPlane}
        />
        <NodeGroupTable
          isLoading={nodeGroupDataLoading}
          nodeGroup={nodeGroup}
          controlPlane={controlPlane}
          onRefresh={handelRefetchNodeGroup}
        />
      </Box>
    </Box>
  );
}
