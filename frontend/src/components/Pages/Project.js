import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/dashboard.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddProject from "../PageComponents/AddProject";
import axios from "axios";
import ButtonWrapper from "../FormsUI/Button";
import SkeletonBars from "../FormsUI/SkeletonBars";

// DATE DIFFERENCE
const dateDifference = (date1, date2) => {
  const dt1 = new Date(date1);
  const dt2 = new Date(date2);

  function diff() {
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }

  if (diff() == 1) {
    return diff() + " day left";
  } else {
    return diff() + " days";
  }
};

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get("http://localhost:8070/project/getProjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProjects(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);

  const changeBgColor = (status) => {
    if (status === "Early") {
      return "#ccffcc";
    } else if (status === "Late") {
      return "#ffcccc";
    } else if (status === "Started") {
      return "#ffffb3";
    } else if (status === "Completed") {
      return "#ccccff";
    } else if (status === "Not Started") {
      return "#ccccff";
    } else {
      return "transparent";
    }
  };

  const changeFontColor = (status) => {
    if (status === "Early") {
      return "#008000";
    } else if (status === "Late") {
      return "#cc0066";
    } else if (status === "Started") {
      return "#808000";
    } else if (status === "Completed") {
      return "#000099";
    } else if (status === "Not Started") {
      return "#000099";
    } else {
      return "transparent";
    }
  };

  const changeProgressColor = (status) => {
    if (status === "Early") {
      return "primary";
    } else if (status === "Late") {
      return "danger";
    } else if (status === "Started") {
      return "primary";
    } else if (status === "Completed") {
      return "primary";
    } else {
      return "transparent";
    }
  };

  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-end">
        <ButtonWrapper
          onClick={() => {
            setOpenPopup(true);
          }}
          startIcon={<AddIcon />}
          style={{ marginBottom: "25px" }}
        >
          New project
        </ButtonWrapper>
      </div>

      <TableContainer
        sx={{
          boxShadow: "0 5px 15px lightgray",
        }}
        component={Paper}
      >
        {loading ? (
          <SkeletonBars />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ paddingLeft: "30px" }}>
                  <p className="tbHeading">Project</p>
                </TableCell>
                <TableCell align="left">
                  <p className="tbHeading">Team</p>
                </TableCell>
                <TableCell align="left">
                  <p className="tbHeading">Status</p>
                </TableCell>
                <TableCell align="left">
                  <p className="tbHeading">Progress</p>
                </TableCell>
                <TableCell align="right" sx={{ paddingRight: "30px" }}>
                  <p className="tbHeading">Deadline</p>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {projects.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "var(--tb-hover)" },
                    cursor: "pointer",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ paddingLeft: "30px" }}
                  >
                    <p className="tableCommon tableData">{row.projectName}</p>
                    <p className="tableCommon tableSubData">{row.company}</p>
                  </TableCell>
                  <TableCell align="left">{row.team}</TableCell>
                  <TableCell align="left">
                    <div
                      className="statusBadge"
                      style={{
                        backgroundColor: changeBgColor(row.status),
                        color: changeFontColor(row.status),
                      }}
                    >
                      {row.status}
                    </div>
                  </TableCell>
                  <TableCell align="left" className="col-md-2">
                    <ProgressBar
                      variant={changeProgressColor(row.status)}
                      now={60}
                      label={`${60}%`}
                      // now={row.progress}
                      // label={`${row.progress}%`}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ paddingRight: "30px" }}>
                    <p className="tableCommon tableData ">
                      {new Date(row.deadline).toLocaleDateString()}
                    </p>
                    <p className="tableCommon tableSubData ">
                      {dateDifference(
                        new Date().toLocaleDateString(),
                        new Date(row.deadline).toLocaleDateString()
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <AddProject
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></AddProject>
    </>
  );
}
