import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const ProfessionalApp = () => {
  return (
    <div className="bg-gradient flex flex-col">
      <RouterProvider router={appRouter} />
    </div>
  );
};
