import React from "react";
import { motion } from 'framer-motion'

const SuccessModel = (props) => {
    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className=" fixed top-64 left-1/2 -translate-x-1/2 bg-green-500 p-4 rounded-sm text-white z-50">
            {props.children}
        </motion.div>
    );
};

export default SuccessModel;
