import { useAuth } from "../auth";

type HTTPMethod = "get" | "post" | "put" | "delete";

export const useFetch = () => {
  const { getToken } = useAuth();
  const request = (url: string, method?: HTTPMethod, body?: object) =>
    fetch(url, {
      method: method || "get",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  return { request };
};
