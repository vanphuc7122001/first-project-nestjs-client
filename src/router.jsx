import Home from "./Home";
import ResetPassword from "./ResetPassword";
import VerifyForgotPasswordToken from "./VerifyForgotPasswordToken";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/forgot-password",
    element: <VerifyForgotPasswordToken />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
