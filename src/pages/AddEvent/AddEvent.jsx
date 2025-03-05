import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  FormHelperText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomBreadcrumbs from "../../components/breadcrumb/CustomBreadcrumbs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2"; // ✅ Use Grid2 instead of Grid
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useAddEventMutation } from "../../redux/slices/apiSlice";
import CustomSnackbar from "../../components/snackbar/Snackbar";

const AddEvent = () => {
  const [postData, { isLoading, error, data }] = useAddEventMutation();

  console.log(data);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!name.trim()) tempErrors.name = "Event Name is required";
    if (!startDate) tempErrors.startDate = "Start Date is required";
    if (!endDate) tempErrors.endDate = "End Date is required";
    if (startDate && endDate && dayjs(endDate).isBefore(dayjs(startDate))) {
      tempErrors.endDate = "End Date must be after Start Date";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Create a new FormData object
    const formData = new FormData();

    // Append form data fields
    formData.append("Name", name);
    formData.append("StartDate", startDate.format("YYYY-MM-DD"));
    formData.append("EndDate", endDate.format("YYYY-MM-DD"));

    // Send FormData using postData function
    postData(formData)
      .then((res) => {
        if (res?.data?.status === true) {
          setSnackbarMessage(res?.data?.message);
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage(res?.data?.message);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      })
      .catch(() => {
        setSnackbarMessage("Something went wrong!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CustomBreadcrumbs
        items={[
          {
            label: "Add Event",
            href: "/dashboard/add-event",
            icon: <EditNoteIcon fontSize="small" />,
          },
        ]}
      />
      <Paper sx={{ height: "85vh", width: "100%", padding: 3 }}>
        <Grid container spacing={3}>
          {/* Event Name Field */}
          <Grid size={6}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          {/* Start Date Picker */}
          <Grid size={6}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    error: Boolean(errors.startDate),
                  },
                }}
              />
            </LocalizationProvider>

            {errors.startDate && (
              <FormHelperText error>{errors.startDate}</FormHelperText>
            )}
          </Grid>

          {/* End Date Picker */}
          <Grid size={6}>
            <Typography variant="subtitle1" fontWeight="500" gutterBottom>
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate} // Prevent selecting an end date before start date
                slotProps={{
                  textField: {
                    fullWidth: true, // Ensure full width
                    size: "small",
                  },
                }}
              />
            </LocalizationProvider>
            {errors.endDate && (
              <FormHelperText error>{errors.endDate}</FormHelperText>
            )}
          </Grid>

          {/* Submit Button */}
          <Grid size={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ width: "20%" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* Snackbar Component */}
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
};

export default AddEvent;
