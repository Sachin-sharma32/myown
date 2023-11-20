import React from "react";
import Image from "next/image";
import Layout from "./components/Layout";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useLogIn } from "./hooks/useAuth";
import { useRouter } from "next/router";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Author } from "./utils/types";

const Index = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const onSuccess = () => {
    setSuccess(true);
    setMessage("Login successful");
    setTimeout(() => {
      router.push("/posts");
    }, 2000);
  };
  const onError = (error: any) => {
    setError(true);
    setMessage(error.response.data.message);
  };
  const { isLoading, mutate: login } = useLogIn(onSuccess, onError);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    login(data);
  };
  return (
    // <div className="flex justify-center items-center min-h-screen min-w-full">
    //     {error && (
    //         <Snackbar
    //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //             open={error}
    //             autoHideDuration={2000}
    //             onClose={() => setError(false)}
    //         >
    //             <Alert severity="error">{message}</Alert>
    //         </Snackbar>
    //     )}
    //     {success && (
    //         <Snackbar
    //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //             open={success}
    //             onClose={() => setSuccess(false)}
    //             autoHideDuration={2000}
    //         >
    //             <Alert severity="success">{message}</Alert>
    //         </Snackbar>
    //     )}
    //     <Stack
    //         sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             width: "500px",
    //             margin: "auto",
    //             gap: "20px",
    //         }}
    //     >
    //         <Typography
    //             variant="h3"
    //             color="initial"
    //             sx={{ color: "primary.darkest" }}
    //         >
    //             SIGN IN
    //         </Typography>
    //         <TextField
    //             value={email}
    //             size="small"
    //             required
    //             sx={{ width: "500px" }}
    //             onChange={(e) => {
    //                 setEmail(e.target.value);
    //             }}
    //         />
    //         <TextField
    //             value={password}
    //             size="small"
    //             required
    //             type="password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             sx={{ width: "500px" }}
    //         />
    //         <Button
    //             onClick={submitHandler}
    //             variant="outlined"
    //             sx={{ color: "primary.darkest" }}
    //         >
    //             Login
    //         </Button>
    //     </Stack>
    // </div>
    <div className="flex  h-screen">
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={error}
          autoHideDuration={2000}
          onClose={() => setError(false)}
        >
          <Alert severity="error">{message}</Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success}
          onClose={() => setSuccess(false)}
          autoHideDuration={2000}
        >
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      )}
      <div className="bg-[#20d489] relative z-[1] flex items-center justify-center w-[50%]">
        <div className=" absolute top-20 left-1/2 text-center flex flex-col gap-10 -translate-x-1/2">
          <h2 className=" text-5xl font-extrabold">TBFE</h2>
          <p className="text-3xl text-white font-semibold">
            Unlock the Power of Personal Expression
          </p>
        </div>
        <Image
          src="/signin.png"
          width={500}
          height={500}
          className="w-[50%] absolute bottom-0 hidden lg:flex h-[50%]"
          alt="signin button"
        />
      </div>
      <div className="bg-white  w-[50%] flex flex-col px-[5%] gap-6 justify-center items-center">
        <div className=" items-center justify-center flex flex-wrap  h-screen   mb-6  w-full px-10">
          <div
            className=" w-full 
                    "
          >
            <form
              onSubmit={submitHandler}
              className="  w-full sm:w-full gap-10 flex flex-col rounded-lg  text-secondary "
            >
              <div className=" flex flex-col gap-6 text-secondary">
                <div className=" flex text-4xl font-satoshi font-semibold items-center gap-4">
                  <h1 className="  translate-y-1">Welcome to TBFE</h1>
                </div>
              </div>
              <div className=" text-lg">
                <div className=" flex flex-wrap  mb-6">
                  <div
                    className=" w-full 
                    "
                  >
                    <div className="  relative w-full">
                      <input
                        name="name"
                        className={` peer  block bg-[#f5f8fa] focus-within:bg-[#eeeeee] w-full  pl-[20px] peer rounded-xl  outline-none  py-3 px-4 mb-3 leading-tight  transition-all duration-500`}
                        id="name"
                        type="text"
                        placeholder=""
                      />
                      <div className=" txt peer peer-placeholder-shown:top-[25px] bg-transparent peer-placeholder-shown:scale-100 scale-75 top-0 absolute left-[11px] peer-placeholder-shown:left-[22px] transition-[top,transform,left] delay-[0s,0s,0s] duration-300  -translate-y-1/2">
                        Name*
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-wrap  mb-6">
                  <div
                    className=" w-full 
                    "
                  >
                    <div className="  relative w-full">
                      <input
                        name="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        className={` peer  block bg-[#f5f8fa] w-full focus-within:bg-[#eeeeee]  pl-[20px] peer rounded-xl  outline-none  py-3 px-4 mb-3 leading-tight  transition-all duration-500`}
                        id="email"
                        type="text"
                        placeholder=""
                      />
                      <div className=" txt peer peer-placeholder-shown:top-[25px] bg-transparent peer-placeholder-shown:scale-100 scale-75 top-0 absolute left-[11px] peer-placeholder-shown:left-[22px] transition-[top,transform,left] delay-[0s,0s,0s] duration-300  -translate-y-1/2">
                        Email*
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-wrap  mb-6">
                  <div
                    className=" w-full 
                    "
                  >
                    <div className="  relative w-full">
                      <input
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className={` peer  block bg-[#f5f8fa] w-full focus-within:bg-[#eeeeee]  pl-[20px] peer rounded-xl  outline-none  py-3 px-4 mb-3 leading-tight  transition-all duration-500`}
                        id="password"
                        type="text"
                        placeholder=""
                      />
                      <div className=" txt peer peer-placeholder-shown:top-[25px] bg-transparent peer-placeholder-shown:scale-100 scale-75 top-0 absolute left-[11px] peer-placeholder-shown:left-[22px] transition-[top,transform,left] delay-[0s,0s,0s] duration-300  -translate-y-1/2">
                        Password*
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className=" mx-auto md:mx-0 mt-8 h-20 w-[220px] justify-between  rounded-xl bg-[#19b674] hover:bg-[#0e5a41] text-white  text-secondary transition-all duration-300 font-medium  text-xl flex items-center gap-4 px-4 lg:px-10 py-2 lg:py-4 md:mr-2 lg:mr-0 "
                >
                  Sign In
                  {isLoading ? (
                    <CircularProgress
                      color="success"
                      className="color-[#0e5a41]"
                    />
                  ) : (
                    <LockIcon className=" " />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
