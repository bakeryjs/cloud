import React from "react";
import { useAuth } from "../auth";

interface Props {}

export default function Dashboard({}: Props) {
  const { resetToken } = useAuth(true);
  const logout = () => resetToken();
  return (
    <div>
      <div>Dashboard</div>
      <button onClick={logout}>Go Out</button>
    </div>
  );
}
