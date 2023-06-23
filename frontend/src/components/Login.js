import React, { useState } from "react";
import "../styles/login.css";
import logo from "../images/logo.png";
import axios from "axios";
import { useFormik, Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid } from "@mui/material";
import TextfieldWrapper from "./FormsUI/TextField";
import SubmitButton from "./FormsUI/SubmitButton";
import Toast from "./FormsUI/Toast";

// FORMIK
const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

//YUP
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username Required!"),
  password: Yup.string().required("Password Required!"),
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="login-main">
      {/* ERROR MSG START*/}
      <Toast
        open={open}
        onClose={handleClose}
        type="error"
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      {/* ERROR MSG END*/}

      <div className="login-container container">
        <div className="left">
          <a href="/" className="logo-div">
            <img src={logo} className="img-fluid logo-login" alt="Logo" />
          </a>
          <p className="intro form-label">
            Automate and manage all your team and internal work in one place.
          </p>
        </div>
        <div className="right">
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values) => {
              await axios
                .post("http://localhost:8070/user/login", {
                  username: values.username,
                  password: values.password,
                })
                .then((res) => {
                  window.localStorage.setItem("token", res.data);
                  window.localStorage.setItem("LoggedIn", true);
                  sessionStorage.setItem("showmsg", "1");
                  window.location.href = "./";
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  ) {
                    setError(err.response.data.errorMessage);
                    setOpen(true);
                  }
                });
            }}
          >
            <Form className="login-form">
              <div className="login-lead">Sign In to Workspace</div>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <p className="loginInputLabel">Username</p>
                  <TextfieldWrapper
                    name="username"
                    placeholder="Enter your username"
                  />
                </Grid>

                <Grid item xs={12}>
                  <p className="loginInputLabel">Password</p>
                  <TextfieldWrapper
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                </Grid>

                <div className="forgot-pwd-div ms-auto mt-2">
                  <a href="/forgotpwd" className="form-label">
                    Forgot password?
                  </a>
                </div>
              </Grid>
              <SubmitButton
                style={{
                  marginTop: "25px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "var(--pink)",
                  color: "var(--white)",
                  border: "1px solid var(--pink)",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    border: "1px solid var(--pink)",
                    color: "var(--pink)",
                  },
                }}
              >
                Sign In
              </SubmitButton>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
