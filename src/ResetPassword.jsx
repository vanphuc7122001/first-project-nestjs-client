import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const { forgot_password_token } = location.state || {};

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/v1/general/auth/reset-password", {
        forgot_password_token,
        new_password: password,
      })
      .then((res) => {
        console.log("Thành công", res);
      })
      .catch((err) => {
        console.log("Thất bại", err);
      });
  };

  return (
    <div>
      <h1>Reset Password</h1>
      {forgot_password_token && <p>Token: {forgot_password_token}</p>}
      {/* Add form or other logic here */}
      <form action="" method="post">
        <p>New password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleClick}>Reset password</button>
      </form>
    </div>
  );
}
