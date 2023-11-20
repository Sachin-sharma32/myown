import React from "react";
import { Box, Fab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";

const Action = ({ params, type }) => {
    return (
        <Link href={`/${type}/${params.id}`}>
            <Fab
                sx={{
                    width: 40,
                    height: 40,
                }}
            >
                <EditIcon />
            </Fab>
        </Link>
    );
};

export default Action;
