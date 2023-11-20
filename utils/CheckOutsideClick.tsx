import React, { useEffect } from "react";
import { useRef } from "react";
import { ref } from "yup";
import { CheckOutsideClickProps } from "./types";

const CheckOutsideClick = ({
  children,
  handleClose,
  setToggleCategories,
}: CheckOutsideClickProps) => {
  const boxRef = useRef(null);
  const handleOutsideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      handleClose && handleClose();
      setToggleCategories && setToggleCategories(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);
  if (!children) {
    return;
  }
  return <div ref={boxRef}>{children}</div>;
};

export default CheckOutsideClick;
