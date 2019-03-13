import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "ComponentsRoot";
import { MenuDropdown } from "./MenuDropdown";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";
import theme from "../theme";

const isDropdown = menuItem => (menuItem.subMenuItems);

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Box { ...props }>
    {menuData.map(menuItem => {
      if (isDropdown(menuItem)) {
        return (
          <MenuDropdown key={ menuItem.text } labelText={ menuItem.text }>
            {menuItem.subMenuItems.map(subMenuItem => (
              <SubMenuItem key={ subMenuItem.text } href={ subMenuItem.href } subText={ subMenuItem.subText }>
                {subMenuItem.text}
              </SubMenuItem>
            ))}
          </MenuDropdown>
        );
      } else {
        return (
          <MenuItem key={ menuItem.text } href={ menuItem.href }>
            {menuItem.text}
          </MenuItem>
        );
      }
    })}
  </Box>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
};

BaseDesktopMenu.defaultProps = {
  menuData: null,
};

const DesktopMenu = styled(BaseDesktopMenu)(
  {
    "button": {
      marginRight: theme.space.x1,
      ":last-child": {
        marginRight: theme.space.none,
      },
    },

  }
);

export default DesktopMenu;