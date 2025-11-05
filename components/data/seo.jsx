"use client";
import { useEffect } from "react";

const SEO = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle + " | Company Formation UAE";
  }, []);
};

export default SEO;