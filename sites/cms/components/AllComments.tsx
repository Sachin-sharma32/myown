import * as React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import moment from "moment";

export default function AllComments({ comments }) {
    const columns = [
        { field: "id", headerName: "ID", width: 250 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: (params) => <Avatar src={params.value} />,
        },
        { field: "name", headerName: "Name", width: 250 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "comment", headerName: "Comment", width: 250 },
        {
            field: "likes",
            headerName: "Likes",
            width: 250,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            type: "DateTime",
            width: 250,
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

    const rows = comments?.map((comment) => {
        return {
            id: comment._id,
            name: comment.name,
            email: comment.email,
            comment: comment.message,
            createdAt: moment(comment.createdAt).format("DD/MM/YYYY HH:MM:SS"),
            likes: comment.likes.length,
        };
    });
    if (comments && rows) {
        return (
            <div style={{ height: 400, width: "100%", padding: "2rem" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={4}
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
