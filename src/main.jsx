import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FirebaseProvider } from "./Context/Firebase.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateNote } from "./Components/CreateNote.jsx";
import { Notes } from "./Components/Notes.jsx";
import { EditNote } from "./Components/EditNote.jsx";
import { Signin } from "./Components/Signin.jsx";
import { Signup } from "./Components/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Notes /> },
      { path: "/cnote", element: <CreateNote /> },
      { path: "/enote/:id", element: <EditNote /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </StrictMode>
);
