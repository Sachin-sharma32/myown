import React from "react";

import { Alert, Snackbar, Stack } from "@mui/material";

export const ErrorModel = ({ message, error, setError }) => {
    <Stack>
        <Snackbar
            message={message}
            autoHideDuration={2000}
            open={error}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={() => {
                    setError(false);
                }}
            />
        </Snackbar>
    </Stack>;
};
