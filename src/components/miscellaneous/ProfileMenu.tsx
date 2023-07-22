import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  handleLogout: () => void;
};

export default function ProfileMenu(props: Props) {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton>{props.children}</MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/reports")}>Reports</MenuItem>
        <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
