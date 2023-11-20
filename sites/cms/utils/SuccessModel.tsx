import React from "react";

import { Alert, Snackbar, Stack } from "@mui/material";

export const SuccessModel = ({ message, success, setSuccess }) => {
    <Stack>
        <Snackbar
            message={message}
            autoHideDuration={2000}
            open={success}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={() => {
                    setSuccess(false);
                }}
            />
        </Snackbar>
    </Stack>;
};
