import * as React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useDeletePost, useGetPosts } from "../hooks/usePost";
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
} from "@mui/material";
import moment from "moment";
import { useGetCategories } from "../hooks/useCategory";
import { useGetTags } from "../hooks/useTag";
import Action from "./Actions";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

export default function AllPosts(data) {
    data = data.data;
    const { data: categories } = useGetCategories();
    const { data: tags } = useGetTags();
    const [row, setRow] = React.useState(null);
    const [itemToDelete, setItemToDelete] = React.useState(null);
    const [deleteDialogue, setDeleteDialogue] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const onSuccess = () => {
        setSuccess(true);
        setMessage("Post deleted successfully");
    };
    const onError = () => {};
    const { mutate: deletePost } = useDeletePost(onSuccess, onError);
    const handleDelete = () => {
        deletePost(itemToDelete);
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
        { field: "author", headerName: "Author", width: 250 },
        {
            field: "category",
            headerName: "Category",
            width: 250,
            type: "singleSelect",
            valueOptions: categories?.map((category) => category?.title),
        },
        {
            field: "createdAt",
            headerName: "Created At",
            type: "DateTime",
            width: 250,
        },
        {
            field: "tags",
            headerName: "Tags",
            width: 250,
        },
        {
            field: "bestPost",
            headerName: "Best Post",
            type: "boolean",
            width: 90,
        },
        {
            field: "featured",
            headerName: "Featured",
            type: "boolean",
            width: 90,
        },
        {
            field: "edit",
            headerName: "Edit",
            type: "actions",
            renderCell: (params) => <Action params={params} type="post" />,
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

    const rows = data?.map((post) => {
        return {
            id: post._id,
            title: post.title,
            author: post?.author?.name,
            category: post?.category?.title,
            createdAt: moment(post.createdAt).format("DD/MM/YYYY HH:MM:SS"),
            tags: post.tags.map((tag) => tag.title),
            bestPost: post.bestPost,
            featured: post.featured,
            image: post.image,
        };
    });
    if (data && rows) {
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
                            Are you sure you want to delete this post. Once
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
