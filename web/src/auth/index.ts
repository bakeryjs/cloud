import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (allowManage?: boolean) => {
  const getToken = () => localStorage.getItem("token");
  const [isAuth, setAuth] = useState(!!getToken());
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
  return { isAuth, getToken, saveToken, resetToken };
};
