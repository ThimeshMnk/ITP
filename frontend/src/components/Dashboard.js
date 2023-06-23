import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import drawerLogo from "../images/drawerLogo.png";
import logoIcon from "../images/logo-icon.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TaskIcon from "@mui/icons-material/Task";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Project from "./Pages/Project";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Tasks from "./Pages/Tasks";
import LeaveReq from "./Pages/LeaveReq";
import Chat from "./Pages/Chat";
import Documents from "./Pages/Documents";
import Teams from "./Pages/Teams";
import Meetings from "./Pages/Meetings";
import ToDo from "./Pages/ToDo";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Finances from "./Pages/Finances";
import Employees from "./Pages/Employees";
import AddTask from "./PageComponents/AddTask";
import AddProject from "./PageComponents/AddProject";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Toast from "./FormsUI/Toast";

const drawerWidth = 240;

// NAVIGATION
const commonNav = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { name: "Projects", icon: <AccountTreeIcon />, path: "/project" },
  { name: "Tasks", icon: <TaskIcon />, path: "/tasks" },
  { name: "Teams", icon: <GroupsIcon />, path: "/teams" },
  { name: "Chat", icon: <ChatIcon />, path: "/chats" },
  { name: "Meetings", icon: <VideocamIcon />, path: "/meetings" },
  { name: "Documents", icon: <ArticleIcon />, path: "/documents" },
  { name: "ToDo", icon: <TaskAltIcon />, path: "/todo" },
  { name: "Request leave", icon: <ExitToAppIcon />, path: "/leaveReq" },
];

const roleNav = [
  { name: "Finances", icon: <AttachMoneyIcon />, path: "/finances" },
  { name: "Employees", icon: <EngineeringIcon />, path: "/employees" },
];

// SEARCH
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--blue)",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        backgroundColor: "#86868666",
        width: "25ch",
        borderRadius: "10px",
      },
    },
  },
}));
// SEARCH END

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
  width: `calc(${theme.spacing(7)} + 0px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 0px)`,
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "white",
  color: "black",
  zIndex: 5,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "white",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// FUNCTION
export default function Dashboard() {
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("showmsg") == "1") {
      setType("success");
      setMsg("Sign In Successful!");
      setAlert(true);
      sessionStorage.removeItem("showmsg");
    }

    if (sessionStorage.getItem("projectCreated") == "1") {
      setType("success");
      setMsg("Project Created!");
      setAlert(true);
      sessionStorage.removeItem("projectCreated");
      window.location.reload();
    }
  });

  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [windowName, setWindow] = useState("Dashboard");

  const setWindowName = (name) => {
    setWindow(name);
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* ERROR MSG START*/}
      <Toast open={alert} onClose={handleClose} type={type} message={msg} />
      {/* ERROR MSG END*/}

      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="topbar"
        style={{
          boxShadow: "none",
          backgroundColor: "var(--dashboard-bg)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
            className="iconbtn-waste"
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title={open ? "Collapse" : "Expand"}>
            <IconButton
              onClick={() => {
                setOpen(!open);
              }}
              className="iconbtn"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <p className="pageTitle">{windowName}</p>

          {/* SEARCH */}
          <Box sx={{ flexGrow: 0 }} className="ms-auto d-flex">
            <Search
              className="mx-auto me-3"
              style={{
                backgroundColor: "var(--dashboard-bg)",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search….."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            {/* SEARCH END */}

            {/* PROFILE ICON */}

            <Tooltip title="Notifications">
              <IconButton
                sx={{ color: "var(--blue)" }}
                size="medium"
                color="inherit"
                className="me-4"
              >
                <Badge
                  badgeContent={9}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: "#d10061",
                    },
                  }}
                >
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                sx={{ color: "var(--blue)" }}
                size="medium"
                color="inherit"
                onClick={() => {
                  logout();
                }}
                className="me-4"
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={"/static/images/avatar/1.jpg"}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {/* PROFILE ICON */}
        </Toolbar>
        <Divider
          variant="middle"
          sx={{
            height: "1px",
            backgroundColor: "var(--dark)",
          }}
        />
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <div className="drawer">
          <DrawerHeader sx={{ margin: "10px 0px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
              }}
              onClick={() => setWindowName("Dashboard")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  height: "40px",
                  marginRight: open ? "10px" : "0px",
                }}
              >
                <img src={logoIcon} alt="Logo" className="logoIcon" />
              </ListItemIcon>
              <ListItemIcon
                primary="Workspace"
                sx={{
                  height: "40px",
                  opacity: open ? 1 : 0,
                  marginRight: open ? "20px" : "10px",
                  display: open ? "flex" : "none",
                }}
              >
                <img src={drawerLogo} alt="Logo" className="logoIcon" />
              </ListItemIcon>
            </Link>
          </DrawerHeader>
          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--blue)",
              marginBottom: "10px",
            }}
          />
          <List sx={{ marginTop: "10px" }}>
            {commonNav.map((item, index) => (
              <ListItem key={item.name} disablePadding>
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                  }}
                  className={
                    location.pathname === item.path
                      ? "selectOn drawerBtns"
                      : "drawerBtns"
                  }
                  onClick={() => setWindowName(item.name)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                      className="drawerIcons"
                    >
                      {item.icon}
                    </p>
                    <p
                      style={{
                        display: open ? "flex" : "none",
                      }}
                      className="drawerItems"
                    >
                      {item.name}
                    </p>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>

          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--blue)",
              marginBottom: "10px",
            }}
          />

          {/* Optional List */}

          <List sx={{ marginTop: "10px" }}>
            {roleNav.map((item, index) => (
              <ListItem key={item.name} disablePadding>
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                  }}
                  className={
                    location.pathname === item.path
                      ? "selectOn drawerBtns"
                      : "drawerBtns"
                  }
                  onClick={() => setWindowName(item.name)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                      className="drawerIcons"
                    >
                      {item.icon}
                    </p>
                    <p
                      style={{
                        display: open ? "flex" : "none",
                      }}
                      className="drawerItems"
                    >
                      {item.name}
                    </p>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexWrap: "wrap",
          justifyContent: "flex-start",
          flexGrow: 1,
          p: 3,
          backgroundColor: "var(--dashboard-bg)",
          minHeight: "100vh",
          paddingTop: "30px",
        }}
      >
        <DrawerHeader />

        {/* DASHBOARD CONTENT */}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/project" element={<Project />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/teams" element={<Teams />} />
          <Route exact path="/chats" element={<Chat />} />
          <Route exact path="/meetings" element={<Meetings />} />
          <Route exact path="/documents" element={<Documents />} />
          <Route exact path="/todo" element={<ToDo />} />
          <Route exact path="/leaveReq" element={<LeaveReq />} />
          <Route exact path="/finances" element={<Finances />} />
          <Route exact path="/employees" element={<Employees />} />
          <Route exact path="/addProject" element={<AddProject />} />
          <Route exact path="/AddTask" element={<AddTask />} />
        </Routes>

        {/* DASHBOARD CONTENT END */}
      </Box>
    </Box>
  );
}
