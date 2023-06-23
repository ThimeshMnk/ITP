import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

const StartDatePicker = (name, ...otherProps) => {
  const [field, meta] = useField(name);

  const configDatePicker = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    label: "Start Date",
  };

  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  return <TextField {...configDatePicker} />;
};

export default StartDatePicker;
