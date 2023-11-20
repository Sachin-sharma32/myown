import * as React from "react";
import dynamic from "next/dynamic";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import {
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    Snackbar,
    Alert,
    Fab,
} from "@mui/material";
import Action from "./Actions";
import { useDeleteTag, useGetTags } from "../hooks/useTag";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

export default function AllTags() {
    const { data: tags } = useGetTags();
    const [itemToDelete, setItemToDelete] = React.useState(null);
    const [deleteDialogue, setDeleteDialogue] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const onSuccess = () => {
        setSuccess(true);
        setMessage("Tag deleted successfully");
    };
    const onError = () => {};
    const { mutate: deleteTag } = useDeleteTag(onSuccess, onError);
    const handleDelete = () => {
        deleteTag(itemToDelete);
        setDeleteDialogue(false);
        setItemToDelete(null);
    };
    const columns = [
        { field: "id", headerName: "ID", width: 250 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: (params) => <Avatar src={params.value} />,
        },
        { field: "title", headerName: "Title", width: 250 },
        {
            field: "createdAt",
            headerName: "Created At",
            type: "DateTime",
            width: 250,
        },
        { field: "footer", headerName: "Footer", type: "boolean", width: 250 },
        {
            field: "edit",
            headerName: "Edit",
            type: "actions",
            renderCell: (params) => <Action params={params} type="tag" />,
        },
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (params) => (
                <Fab
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                    onClick={() => {
                        setItemToDelete(params.row.id);
                        setDeleteDialogue(true);
                    }}
                >
                    <DeleteIcon />
                </Fab>
            ),
        },
    ];

    tags;
    const rows = tags?.map((tag) => {
        return {
            id: tag._id,
            title: tag.title,
            image: tag.image,
            createdAt: moment(tag.createdAt).format("DD/MM/YYYY HH:MM:SS"),
            footer: tag.footer,
        };
    });
    if (tags && rows) {
        return (
            <div style={{ height: 800, width: "100%", padding: "2rem" }}>
                {success && (
                    <Snackbar
                        open={success}
                        autoHideDuration={4000}
                        onClose={() => setSuccess(false)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <Alert
                            onClose={() => setSuccess(false)}
                            severity="success"
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                )}
                <Dialog open={deleteDialogue}>
                    <DialogTitle>Warning</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this tag. Once
                            deleted you won&apos;t be able to recover it back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button
                            onClick={() => {
                                setDeleteDialogue(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    sx={{
                        [`&.${gridClasses.row}`]: {
                            backgroundColor: "primary.dark",
                        },
                    }}
                    onCellEditCommit={(params) => setRow(params.id)}
                />
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}
