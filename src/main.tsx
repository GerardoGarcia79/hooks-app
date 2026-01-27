import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

// import { HooksApp } from "./HooksApp";
// import { TrafficLight } from "./01-useState/TrafficLight";
// import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
// import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
// import { PokemonPage } from "./03-examples/PokemonPage";
// import { FocusScreen } from "./04-useRef/FocusScreen";
// import { TasksApp } from "./05-useReducer/TaskApp";
// import { ScrambleWords } from "./05-useReducer/ScrambleWords";
// import { ScrambleWordsWithReducer } from "./05-useReducer/ScrambleWordsWithReducer";
// import { InstagromApp } from "./07-useOptimistic/InstragromApp";
import { ClientInformation } from "./08-use-suspense/ClientInformation";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <ScrambleWordsWithReducer /> */}
    {/* <InstagromApp /> */}
    <Suspense
      fallback={
        <div className="bg-gradient flex flex-col">
          <h1 className="text-2xl">Loading client information...</h1>
        </div>
      }
    >
      <ClientInformation />
    </Suspense>
  </StrictMode>,
);
