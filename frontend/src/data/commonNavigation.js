import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TaskIcon from "@mui/icons-material/Task";
import MailIcon from "@mui/icons-material/Mail";

export const commonNavigation = (navigation) => {
  const data = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { name: "Projects", icon: <AccountTreeIcon />, path: "/project" },
    { name: "Tasks", icon: <TaskIcon />, path: "/login" },
    { name: "Chat", icon: <MailIcon />, path: "/dashboard" },
    { name: "Meetings", icon: <MailIcon />, path: "/dashboard" },
    { name: "Documents", icon: <MailIcon />, path: "/dashboard" },
    { name: "ToDo", icon: <MailIcon />, path: "/dashboard" },
    { name: "Request leave", icon: <MailIcon />, path: "/dashboard" },
    //   { name: "Leadboard", icon: <MailIcon /> },
    //   { name: "Notifications", icon: <MailIcon /> }, //Topbar implementation
  ];
};

// [
//   { name: "Dashboard", icon: "<DashboardIcon />", path: "/" },
//   { name: "Projects", icon: "<AccountTreeIcon />", path: "/project" },
//   { name: "Tasks", icon: "<TaskIcon />", path: "/login" },
//   { name: "Chat", icon: "<MailIcon />", path: "/dashboard" },
//   { name: "Meetings", icon: "<MailIcon />", path: "/dashboard" },
//   { name: "Documents", icon: "<MailIcon />", path: "/dashboard" },
//   { name: "ToDo", icon: "<MailIcon />", path: "/dashboard" },
//   { name: "Request leave", icon: "<MailIcon />", path: "/dashboard" },
// ];
