import React, { useState } from "react";
import {
    Drawer,
    Stack,
    Button,
    Avatar,
    Box,
    Typography,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useGetMe } from "../hooks/useUser";
import { useLogOut } from "../hooks/useAuth";

const SideBar = ({ open, setOpen }) => {
    const [active, setActive] = useState(0);
    const { data: user } = useGetMe();
    const { mutate: logout } = useLogOut();
    const handleLogout = () => {
        logout();
        setOpen(false);
    };
    const Links = ["home", "posts", "users", "authors", "tags", "categories"];
    return (
        <Drawer open={open}>
            <IconButton
                sx={{
                    width: "fit-content",
                    color: "primary.darkest",
                    position: "absolute",
                    right: "0",
                }}
                onClick={() => {
                    setOpen(false);
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Stack
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "primary.main",
                        height: "200px",
                        gap: "10px",
                        color: "primary.darkest",
                    }}
                >
                    <Link href={`/user/${user?._id}`}>
                        <Avatar
                            src={user?.image}
                            sx={{ width: "100px", height: "100px" }}
                            onClick={() => {
                                setOpen(false);
                            }}
                        />
                    </Link>
                    <Typography variant="h5">{user?.name}</Typography>
                </Stack>
                <Stack sx={{ width: "200px" }}>
                    {Links.map((link, index) => (
                        <Link href={`/${link}`} key={index} className="w-full">
                            <Button
                                variant="outlined"
                                key={index}
                                onClick={() => {
                                    setActive(index);
                                    setOpen(false);
                                }}
                                sx={{
                                    width: "100%",
                                    height: "50px",
                                    color:
                                        active == index
                                            ? "primary.darkest"
                                            : "primary.dark",
                                }}
                            >
                                {link}
                            </Button>
                        </Link>
                    ))}
                    <Button
                        variant="success"
                        sx={{ marginTop: "20px" }}
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default SideBar;
