
import * as React from "react";
// import HomepageLayout from '../deneme';


export const About = () => {

  // ----Left side bar menu open and close action in mobile and tablet size------
  var sidebarToggle = "closed";

  var leftSidebarToggle = document.getElementById("toggle_id") as HTMLElement;
  var leftSidebar = document.getElementById("left_sidebar") as HTMLElement;
  if (leftSidebarToggle) {
    leftSidebarToggle.addEventListener('click', function () {
      if (sidebarToggle == "closed") {
        leftSidebar.style.display = "block";
        sidebarToggle = "opened";
      }
      else {
        leftSidebar.style.display = "none";
        sidebarToggle = "closed";
      }
    });
  }
  return (
    // <HomepageLayout/>
    <div>about</div>
  );
}
