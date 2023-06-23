import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddTask from "../PageComponents/AddTask";
import { Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import "../../styles/addTask.css";

export default function Tasks() {
  const [taskList, setTaskList] = useState([
    {
      // id:0001,
      name: "Design UI",
      asignee: [{ name: "Shenal Desilva" }, { name: "Hashan Perera" }],
      dueDate: "27/03/2023",
      stage: "Started",
      priority: "High",
    },
    {
      // id:002,
      name: "Create DataBase",
      asignee: [{ name: "Akith Wijesundara" }],
      dueDate: "30/03/2023",
      stage: "Inprogress",
      priority: "Medium",
    },
    {
      // id:003,
      name: "Develop Backend",
      asignee: [{ name: "Akith Wijesundara" }],
      dueDate: "15/04/2023",
      stage: "Not Started",
      priority: "Low",
    },
    {
      // id:004,
      name: "Code Max Function",
      asignee: [{ name: "Thanuka Warushawithana" }],
      dueDate: "28/03/2023",
      stage: "Completed",
      priority: "Low",
    },
  ]);

  const changeBgColor = (status) => {
    if (status === "Inprogress") {
      return "#ccffcc";
    } else if (status === "Not Started") {
      return "#ffcccc";
    } else if (status === "Started") {
      return "#ffffb3";
    } else if (status === "Completed") {
      return "#ccccff";
    } else {
      return "transparent";
    }
  };

  const changeFontColor = (status) => {
    if (status === "Inprogress") {
      return "#008000";
    } else if (status === "Not Started") {
      return "#cc0066";
    } else if (status === "Started") {
      return "#808000";
    } else if (status === "Completed") {
      return "#000099";
    } else {
      return "transparent";
    }
  };

  const changeFlag = (priority) => {
    if (priority === "High") {
      return <FlagIcon sx={{ color: "var(--danger)" }} />;
    } else if (priority === "Medium") {
      return <FlagIcon sx={{ color: "var(--warning)" }} />;
    } else {
      return <FlagIcon sx={{ color: "var(--dark)" }} />;
    }
  };

  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          sx={{
            border: "1px solid var(--light-blue)",
            color: "var(--light-blue)",
            "&:last-child td, &:last-child th": { border: 0 },
            "&:hover": {
              backgroundColor: "var(--light-blue)",
              color: "var(--white)",
              border: "1px solid var(--white)",
            },
            marginBottom: "25px",
          }}
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          New Task
        </Button>
      </div>

      <div></div>
      {/* <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col" class="col-md-6"></th>
            <th scope="col">Asignee</th>
            <th scope="col">Due Date</th>
            <th scope="col">Stage</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr class="shadow table-light">
              <td>{task.name}</td>
              <td>{task.asignee}</td>
              <td>{task.dueDate}</td>
              <td>{task.stage}</td>
              <td>{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <TableContainer
        sx={{ boxShadow: "0 5px 15px lightgray" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="col-md-5">
                <p className="tbHeading">Task</p>
              </TableCell>
              <TableCell align="left">
                <p className="tbHeading">Asignee</p>
              </TableCell>
              <TableCell align="left">
                <p className="tbHeading">Due Date</p>
              </TableCell>
              <TableCell align="left">
                <p className="tbHeading">Stage</p>
              </TableCell>
              <TableCell align="left">
                <p className="tbHeading">Priority</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#86868666" },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row" className="col-md-5">
                  <div className="text2">{row.name}</div>
                </TableCell>
                <TableCell align="left" sx={{ padding: 0 }}>
                  <AvatarGroup sx={{ justifyContent: "left" }}>
                    {/* {taskList.asignee.map((man)=>(
                      <Avatar
                      alt={man.name}
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    ))} */}
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/static/images/avatar/4.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/static/images/avatar/5.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </AvatarGroup>
                </TableCell>
                <TableCell align="left">
                  <div className="text2">{row.dueDate}</div>
                </TableCell>
                <TableCell align="left" sx={{ padding: 0 }}>
                  <div
                    className="statusBadge"
                    style={{
                      backgroundColor: changeBgColor(row.stage),
                      color: changeFontColor(row.stage),
                    }}
                  >
                    {row.stage}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className="flag">{changeFlag(row.priority)}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTask openPopup={openPopup} setOpenPopup={setOpenPopup}></AddTask>
    </>
  );
}
