import React, { useState } from "react";
import dynamic from "next/dynamic";

const EditorComponent = () => {
    const CustomEditor = dynamic(() => import("./Editor"), { ssr: false });

    return <CustomEditor />;
};
export default EditorComponent;
