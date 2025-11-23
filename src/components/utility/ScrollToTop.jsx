// src/components/utility/ScrollToTop.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// <<< 1. Accept the ref as a prop
const ScrollToTop = ({ mainContentRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (mainContentRef && mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, mainContentRef]);

  return null;
};

export default ScrollToTop;