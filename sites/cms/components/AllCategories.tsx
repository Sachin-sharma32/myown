import * as React from "react";
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
import moment from "moment";
import { useDeleteCategory, useGetCategories } from "../hooks/useCategory";
import Action from "./Actions";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AllCategories() {
    const { data: categories } = useGetCategories();
    categories;
    const [itemToDelete, setItemToDelete] = React.useState(null);
    const [deleteDialogue, setDeleteDialogue] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const onSuccess = () => {
        setSuccess(true);
        setMessage("Category deleted successfully");
    };
    const onError = () => {};
    const { mutate: deleteCategory } = useDeleteCategory(onSuccess, onError);
    const handleDelete = () => {
        deleteCategory(itemToDelete);
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
        { field: "desc", headerName: "Description", width: 100 },
        { field: "header", headerName: "Header", type: "boolean", width: 100 },
        { field: "footer", headerName: "Footer", type: "boolean", width: 100 },
        {
            field: "topCategory",
            headerName: "Top Category",
            type: "boolean",
            width: 200,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            type: "DateTime",
            width: 250,
        },
        {
            field: "edit",
            headerName: "Edit",
            type: "actions",
            renderCell: (params) => <Action params={params} type="category" />,
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

    const rows = categories?.map((category) => {
        return {
            id: category._id,
            title: category.title,
            desc: category.desc,
            createdAt: moment(category.createdAt).format("DD/MM/YYYY HH:MM:SS"),
            image: category.image,
            header: category.header,
            footer: category.footer,
            topCategory: category.topCategory,
        };
    });
    if (categories && rows) {
        return (
            <div style={{ height: 600, width: "100%", padding: "2rem" }}>
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
                            Are you sure you want to delete this category. Once
                            deleted you wonU&apos;t be able to recover it back.
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
                        top: params.isFirstVisible ? 0 : 0,
                        bottom: params.isLastVisible ? 0 : 0,
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
