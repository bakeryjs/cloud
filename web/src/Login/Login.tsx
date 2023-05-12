import React from "react";
import { useAuth } from "../auth";

interface Props {}

export default function Login ({}: Props) {
  const { saveToken } = useAuth();
  const login = () => {
    console.log("HEE");
    saveToken("super-token");
  }
  return (
    <button onClick={login}>Super Cool Login</button>  
  )
}
