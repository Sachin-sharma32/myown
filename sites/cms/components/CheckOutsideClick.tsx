import React, { useEffect } from "react";
import { useRef } from "react";
import { ref } from "yup";

const CheckOutsideClick = ({
  children,
  setSearch,
  setCategories,
  setProfile,
  setFocus,
  setDropDownVisible
}) => {
  const boxRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setSearch && setSearch(false);
      setCategories && setCategories(false);
      setProfile && setProfile(false);
      setFocus && setFocus(false);
      setDropDownVisible && setDropDownVisible(false)
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
  return <div ref={boxRef} className="w-full">{children}</div>;
};

export default CheckOutsideClick;
