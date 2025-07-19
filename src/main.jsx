import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./assets/css/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Volunteers from "./components/Volunteers.jsx";
import Donation from "./components/Donation.jsx";
import Event from "./components/Event.jsx";
import MilestonesTable from "./components/MilestoneTable.jsx";
import NewsTable from "./components/NewsTable.jsx";
import Beneficiaries from "./components/Beneficiaries.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/volunteers", element: <Volunteers /> },
      { path: "/donations", element: <Donation /> },
      { path: "/events", element: <Event /> },
      { path: "/milestones", element: <MilestonesTable /> },
      { path: "/beneficiaries", element: <Beneficiaries /> },
      { path: "/blog", element: <NewsTable /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
Beneficiaries