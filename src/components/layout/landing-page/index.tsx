import { motion } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export function LandingPage(): React.JSX.Element {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main
        className="flex-grow pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
