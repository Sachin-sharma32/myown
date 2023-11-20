import React, { useEffect } from "react";
import { Button, IconButton, Stack, Snackbar, Alert } from "@mui/material";
import { setError, setSuccess } from "../redux/slices";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./Drawer";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useLogOut, useValidateToken } from "../hooks/useAuth";
import axios from "axios";
import { useGetMe } from "../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.base.success);
  const error = useSelector((state) => state.base.error);
  const message = useSelector((state) => state.base.message);

  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  useEffect(() => {
    if (!cookie.jwt) {
      router.push("/");
    }
  }, []);
  useGetMe();
  return (
    <Stack className="text-black">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setSuccess(false));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-10"
      >
        <Alert
          onClose={() => {
            dispatch(setSuccess(false));
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(setError(false));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-10"
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(setError(false));
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      {router.pathname !== "/" && (
        <Stack>
          {/* <SideBar open={open} setOpen={setOpen} /> */}
          <IconButton
            sx={{
              width: "fit-content",
              position: "fixed",
              top: "10px",
              left: "10px",
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon sx={{ width: "fit-content" }} />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default Layout;
