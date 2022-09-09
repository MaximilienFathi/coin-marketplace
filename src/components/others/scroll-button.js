import React, { useState } from "react";
import { IconButton, styled } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  //========================================================
  // CUSTOM STYLES
  const StyledIconButton = styled(IconButton)({
    position: "fixed",
    bottom: "2.7rem",
    right: "2.7rem",
    "& .MuiTouchRipple-root": {
      border: "3px solid #fa58b6",
      borderRadius: "11px",
      backgroundColor: "#4b1a37",
      transition: "all 0.3s",
      display: visible ? "block" : "none",
    },
    "&:hover .MuiSvgIcon-root": {
      color: "#fb79c5",
    },
    "&:hover .MuiTouchRipple-root": {
      border: "3px solid #fb79c5",
      backgroundColor: "#7d2c5b",
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
      <StyledKeyboardArrowUpIcon />
    </StyledIconButton>
  );
}

export default ScrollButton;
