import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import { HooksApp } from "./HooksApp";
import { TrafficLight } from "./01-useState/TrafficLight";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    <TrafficLight />
  </StrictMode>,
);
