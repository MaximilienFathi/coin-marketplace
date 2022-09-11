import React, { useState } from "react";
import { Fade, IconButton, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  //========================================================
  // CUSTOM STYLES
  const StyledIconButton = styled(IconButton)({
    position: "fixed",
    bottom: "4.2rem",
    right: "2.1rem",
    "& .MuiTouchRipple-root": {
      border: "3px solid #fa58b6",
      borderRadius: "11px",
      backgroundColor: "#112149",
      transition: "all 0.3s",
      display: visible ? "block" : "none",
      // BUG: sometimes comes slightly after arrow icon on 1st render
    },
    "&:hover .MuiSvgIcon-root": {
      color: "#fb79c5",
    },
    "&:hover .MuiTouchRipple-root": {
      border: "3px solid #fb79c5",
      backgroundColor: "#414d6d",
    },
  });

  const StyledKeyboardArrowUpIcon = styled(KeyboardArrowUpIcon)({
    width: "3rem",
    height: "auto",
    color: "#fa58b6",
    zIndex: 1,
    display: visible ? "block" : "none",
  });
  //========================================================

  const toggleVisibility = () => {
    const scrolledDistance = document.documentElement.scrollTop;
    if (scrolledDistance > 500) {
      setVisible(true);
    } else if (scrolledDistance <= 500) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisibility);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <StyledIconButton onClick={scrollToTop}>
      {/*BUG: Fade only works on arrow not IconButton*/}
      {/*<Fade in={true} timeout={1000}>*/}
      <StyledKeyboardArrowUpIcon />
      {/*</Fade>*/}
    </StyledIconButton>
  );
}

export default ScrollButton;
