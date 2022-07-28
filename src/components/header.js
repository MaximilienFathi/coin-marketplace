import React, { useState } from "react";
import Button from "./button";

function Header() {
  return (
    <div>
      <a className="brand-logo" href="#">
        COIN marketplace
      </a>

      <Button label="Login"></Button>
      <Button label="Sign Up"></Button>
    </div>
  );
}

export default Header;
