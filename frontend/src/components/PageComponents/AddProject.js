import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";
import "../../styles/dashboard.css";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useFormik, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import TextField from "../FormsUI/TextField";
import SelectField from "../FormsUI/SelectField";
import DatePicker from "../FormsUI/DatePicker";
import StartDatePicker from "../FormsUI/StartDatePicker";
import SubmitButton from "../FormsUI/SubmitButton";
import Toast from "../FormsUI/Toast";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "../FormsUI/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// FORMIK
const INITIAL_FORM_STATE = {
  projectName: "",
  company: "",
  credits: "",
  team: "",
  deadline: "",
  startDate: "",
  description: "",
};

//YUP
const FORM_VALIDATION = Yup.object().shape({
  projectName: Yup.string().required("Required!"),
  company: Yup.string().required("Required!"),
  credits: Yup.number().integer().required("Required!"),
  team: Yup.string().required("Required!"),
  startDate: Yup.date().required("Required!"),
  deadline: Yup.date().required("Required!"),
  description: Yup.string().required("Required!"),
});

export default function AddProject(props) {
  const navigate = useNavigate();
  const { openPopup, setOpenPopup } = props;

  // TOAST
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  // AUTHENTICATION HEADER
  const token = localStorage.getItem("token");

  return (
    <Dialog open={openPopup} maxWidth="sm" TransitionComponent={Transition}>
      {/* ERROR MSG START*/}
      <Toast open={alert} onClose={handleClose} type={type} message={msg} />
      {/* ERROR MSG END*/}

      <div className="popup">
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p className="popupTitle">Add Project</p>
            <ClearIcon
              onClick={() => {
                setOpenPopup(false);
              }}
              sx={{
                cursor: "pointer",
                color: "var(--blue)",
                fontSize: "1.7rem",
                marginTop: "6px",
                marginRight: "10px",
              }}
            />
          </div>

          <Divider
            sx={{
              height: "1px",
              backgroundColor: "var(--dark)",
            }}
          />
        </DialogTitle>

        <DialogContent>
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              await axios
                .post(
                  "http://localhost:8070/project/create",
                  {
                    projectName: values.projectName,
                    company: values.company,
                    credits: values.credits,
                    team: values.team,
                    deadline: values.deadline,
                    startDate: values.startDate,
                    description: values.description,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  sessionStorage.setItem("projectCreated", "1");
                  setOpenPopup(false);
                  navigate("/project");
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  ) {
                    setType("error");
                    setMsg(err.response.data.errorMessage);
                    setAlert(true);
                  }
                });
            }}
          >
            <Form>
              <Grid container sx={{ paddingTop: "10px" }} spacing={2}>
                {/* 1st row */}
                <Grid item xs={12}>
                  <TextField name="projectName" label="Project Name" />
                </Grid>

                {/* 2nd row */}

                <Grid item xs={6}>
                  <TextField name="company" label="Client" />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="credits"
                    label="Credit Points"
                    type="number"
                    rows
                  />
                </Grid>

                {/* 3rd row */}

                <Grid item xs={6}>
                  <StartDatePicker name="startDate" />
                </Grid>

                <Grid item xs={6}>
                  <DatePicker name="deadline" />
                </Grid>

                {/* 4th row */}

                <Grid item xs={12}>
                  <SelectField
                    name="team"
                    label="Team"
                    options={{
                      Shenal: "Shenal",
                      Shashini: "Shashini",
                      Akith: "Akith",
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Project Description"
                    multiline
                    minRows={4}
                    placeholder="In this project we should...."
                  />
                </Grid>
                <div className="d-flex addProjectButtons">
                  <ButtonWrapper
                    startIcon={<ClearIcon />}
                    style={{ marginRight: "15px" }}
                  >
                    Clear
                  </ButtonWrapper>

                  <SubmitButton startIcon={<AddIcon />}>Create</SubmitButton>
                </div>
              </Grid>
            </Form>
          </Formik>
        </DialogContent>
      </div>
    </Dialog>
  );
}
