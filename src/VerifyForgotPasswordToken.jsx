import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useQueryParams from "./useQueryParams";

export default function VerifyForgotPasswordToken() {
  const [message, setMessage] = useState("");
  const { token } = useQueryParams();
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();

    if (token) {
      axios
        .post(
          "http://localhost:3000/v1/general/auth/verify-forgot-password", // URL xác thực token forgot password bên API Server của các bạn
          { forgot_password_token: token },
          {
            signal: controller.signal,
          }
        )
        .then(() => {
          // Bên cái trang ResetPassword của chúng ta nó cần cái forgot_password_token để gửi lên API
          // Ở đây chúng ta có 2 cách để cái trang ResetPassword nó nhận cái forgot_password_token này
          // Cách 1: Tại đây chúng ta lưu cái forgot_password_token này vào localStorage
          // Và bên trang ResetPassword này chỉ cần get ra mà dùng là được

          // Cách 2: Chúng ta dùng state của React Router để truyền cái forgot_password_token này qua trang ResetPassword
          navigate("/reset-password", {
            state: { forgot_password_token: token },
          });
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    }
    return () => {
      controller.abort();
    };
  }, [token, navigate]);
  return <div>{message}</div>;
}
