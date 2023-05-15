import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (allowManage?: boolean) => {
  const getAuth = () => {
    return !!localStorage.getItem("token");
  };
  const [isAuth, setAuth] = useState(getAuth());
  const navigate = useNavigate();
  useEffect(() => {
    if (allowManage && !isAuth) {
      navigate("/login");
    }
  }, [allowManage, isAuth, navigate]);
  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
    setAuth(true);
  };
  const resetToken = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };
  return { isAuth, saveToken, resetToken };
};
