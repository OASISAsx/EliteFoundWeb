import React, { useEffect, useRef, useState } from "react";
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
  ListItem,
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
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import ThemeToggleClient from "./defaultTheme/theme-toggle-client";
import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

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

  backgroundColor: theme.palette.background.paper,

  borderRight: `1px solid ${theme.palette.divider}`,

  color: theme.palette.text.primary,

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
  backgroundColor: theme.palette.mode === "dark" ? "#2c2f33" : "#E8E8E8",
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
  path?: string;
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
        title: "USER LIST",
        icon: <User2Icon />,
        path: "/usersApproval",
        // chip: "New",
        // chipColor: "primary",
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
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchedRef = useRef(false);
  useEffect(() => {
    if (!session?.user) return;
    if (fetchedRef.current) return;

    fetchedRef.current = true;
    // fetchUserDetail(session.user.id, session.user.backendToken);
  }, [session?.user]);
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

    const handleClick = () => {
      if (hasChildren) {
        handleSubMenuClick(item.title);
        return;
      }

      setSelectedItem(item.title);

      if (item.path) {
        router.push(item.path);
      }
    };

    const content = (
      <StyledListItemButton
        collapsed={collapsed}
        selected={isSelected}
        onClick={handleClick}
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
      className="sidebar"
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          border: "none",

          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge legacy

          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari
          },
        },
      }}
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
            <Image
              src=".\images\logoEF.png" // ใส่โลโก้คุณ
              alt="Logo"
              width={80}
              height={90}
              className="rounded-lg"
            />
            // <Typography variant="h6" fontWeight={700} color="primary">
            //   MODERNIZE
            // </Typography>
          )}
          {!collapsed && <ThemeToggleClient />}
          <IconButton onClick={handleToggleSidebar} size="small">
            {collapsed ? <Menu /> : <MenuOpen />}
          </IconButton>
        </Box>

        {/* Navigation List */}
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },

            flex: 1,
          }}
        >
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
        {/* User Profile Section */}
        <UserProfileBox collapsed={collapsed}>
          <Avatar
            alt={session?.user?.name || "User"}
            src={session?.user?.image || "/avatar.png"}
            sx={{ width: 40, height: 40 }}
          />

          {!collapsed && (
            <>
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography variant="subtitle2" fontWeight={700} noWrap>
                  {session?.user?.name || "Loading..."}
                </Typography>

                <Typography variant="caption" color="text.secondary" noWrap>
                  {session?.user?.userRoles?.map((ur: any) => ur.role.name) ||
                    "USER"}
                </Typography>
              </Box>

              <IconButton
                size="small"
                color="primary"
                onClick={() => signOut()}
              >
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
