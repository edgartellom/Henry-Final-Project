import { Alert, Stack } from "@mui/joy";

const ErrorAlert = ({ error }) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        Error {errorCode}! — {errorMessage}
      </Alert>
    </Stack>
  );
};

export default ErrorAlert;
