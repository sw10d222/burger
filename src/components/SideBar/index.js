import React from "react";
import css from "./style.module.css";
import Logo from "../Logo";
import Menu from "../Menu";
import Shadow from "../General/Shadow";
const SideBar = (props) => {
  let classes = [css.SideBar, css.Close];
  if (props.showSidebar) {
    classes = [css.SideBar, css.Open];
  }

  return (
    <div>
      <Shadow show={props.showSidebar} Darahad={props.toggleSideBar} />
      <div onClick={props.toggleSideBar} className={classes.join(" ")}>
        <div className={css.Logo}>
          <Logo />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
