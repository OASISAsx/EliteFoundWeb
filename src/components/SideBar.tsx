import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Collapse,
  Chip,
  styled,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  HomeOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  ChatBubbleOutline,
  CalendarTodayOutlined,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  PowerSettingsNew,
  DashboardOutlined,
  MenuOpen,
  Menu,
} from "@mui/icons-material";

const drawerWidth = 270;
const collapsedWidth = 88;

// Styled components for custom look
const SidebarWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? collapsedWidth : drawerWidth,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
}));

const NavSectionTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  padding: theme.spacing(3, 3, 1, 3),
  fontSize: "0.75rem",
  fontWeight: 700,
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
  display: collapsed ? "none" : "block",
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  margin: theme.spacing(0.5, 2),
  borderRadius: "8px",
  paddingLeft: collapsed ? theme.spacing(1.5) : theme.spacing(2),
  justifyContent: collapsed ? "center" : "initial",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& .MuiListItemIcon-root": {
      color: "#fff",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserProfileBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{ collapsed?: boolean }>(({ theme, collapsed }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: "#e3f2fd",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
  gap: collapsed ? 0 : theme.spacing(2),
  transition: theme.transitions.create(["padding", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

interface NavItem {
  title: string;
  icon?: React.ReactNode;
  chip?: string;
  chipColor?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "default";
  chipVariant?: "filled" | "outlined";
  children?: NavItem[];
}

const navItems: { section: string; items: NavItem[] }[] = [
  {
    section: "HOME",
    items: [
      {
        title: "Modern",
        icon: <DashboardOutlined />,
        chip: "New",
        chipColor: "primary",
      },
      { title: "Analytical", icon: <BarChartOutlined /> },
      { title: "eCommerce", icon: <ShoppingCartOutlined /> },
    ],
  },
  {
    section: "APPS",
    items: [
      { title: "Chat", icon: <ChatBubbleOutline /> },
      { title: "Calendar", icon: <CalendarTodayOutlined /> },
    ],
  },
  {
    section: "OTHER",
    items: [
      {
        title: "Menu Level",
        icon: <HomeOutlined />,
        children: [{ title: "Sub Menu 1" }, { title: "Sub Menu 2" }],
      },
      { title: "Salma", icon: <FiberManualRecord sx={{ fontSize: 10 }} /> },
      {
        title: "Chip",
        icon: <FiberManualRecord sx={{ fontSize: 10 }} />,
        chip: "6",
        chipColor: "primary",
      },
      {
        title: "Outline",
        icon: <FiberManualRecord sx={{ fontSize: 10 }} />,
        chip: "outlined",
        chipVariant: "outlined",
        chipColor: "primary",
      },
      {
        title: "External Link",
        icon: <FiberManualRecord sx={{ fontSize: 10 }} />,
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState("Modern");

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
    if (!collapsed) setOpenSubMenu(null); // Close submenus when collapsing
  };

  const handleSubMenuClick = (title: string) => {
    if (collapsed) {
      setCollapsed(false);
      setOpenSubMenu(title);
    } else {
      setOpenSubMenu(openSubMenu === title ? null : title);
    }
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selectedItem === item.title;

    const content = (
      <StyledListItemButton
        collapsed={collapsed}
        selected={isSelected}
        onClick={() => {
          if (hasChildren) {
            handleSubMenuClick(item.title);
          } else {
            setSelectedItem(item.title);
          }
        }}
        sx={{ pl: isSubItem && !collapsed ? 4 : 2 }}
      >
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 40,
              color: isSelected ? "inherit" : "text.secondary",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}

        {!collapsed && (
          <>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: "0.875rem",
                fontWeight: isSelected ? 600 : 400,
              }}
            />
            {item.chip && (
              <Chip
                label={item.chip}
                size="small"
                color={item.chipColor || "default"}
                variant={item.chipVariant || "filled"}
                sx={{ height: 20, fontSize: "0.65rem" }}
              />
            )}
            {hasChildren &&
              (openSubMenu === item.title ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              ))}
          </>
        )}
      </StyledListItemButton>
    );

    return (
      <React.Fragment key={item.title}>
        {collapsed ? (
          <Tooltip title={item.title} placement="right">
            {content}
          </Tooltip>
        ) : (
          content
        )}

        {hasChildren && !collapsed && (
          <Collapse
            in={openSubMenu === item.title}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.children?.map((child) => renderNavItem(child, true))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={(theme) => ({
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          border: "none",
          //   transition: (theme) =>
          //     theme.transitions.create("width", {
          //       easing: theme.transitions.easing.sharp,
          //       duration: theme.transitions.duration.enteringScreen,
          //     }),
          overflowX: "hidden",
        },
      })}
    >
      <SidebarWrapper collapsed={collapsed}>
        {/* Logo Section with Toggle Button */}
        <Box
          sx={(theme) => ({
            // background:
            //   theme.palette.mode === "dark"
            //     ? "linear-gradient(to right,#9891CC,#7799F7)"
            //     : "linear-gradient(to right,#2563eb,#7c3aed)",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          })}
        >
          {!collapsed && (
            <Typography variant="h6" fontWeight={700} color="primary">
              MODERNIZE
            </Typography>
          )}
          <IconButton onClick={handleToggleSidebar} size="small">
            {collapsed ? <Menu /> : <MenuOpen />}
          </IconButton>
        </Box>

        {/* Navigation List */}
        <Box sx={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}>
          {navItems.map((section) => (
            <List key={section.section} disablePadding>
              <NavSectionTitle collapsed={collapsed} variant="overline">
                {section.section}
              </NavSectionTitle>
              {section.items.map((item) => renderNavItem(item))}
            </List>
          ))}
        </Box>

        {/* User Profile Section */}
        <UserProfileBox collapsed={collapsed}>
          <Avatar
            alt="Mathew"
            src="https://mui.com/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
          {!collapsed && (
            <>
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography variant="subtitle2" fontWeight={700} noWrap>
                  Mathew
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  Designer
                </Typography>
              </Box>
              <IconButton size="small" color="primary">
                <PowerSettingsNew fontSize="small" />
              </IconButton>
            </>
          )}
        </UserProfileBox>
      </SidebarWrapper>
    </Drawer>
  );
};

export default Sidebar;
