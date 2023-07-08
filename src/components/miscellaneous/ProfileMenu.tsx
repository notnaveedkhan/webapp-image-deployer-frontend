import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  handleLogout: () => void;
};

export default function ProfileMenu(props: Props) {
  return (
    <Menu>
      <MenuButton>{props.children}</MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
