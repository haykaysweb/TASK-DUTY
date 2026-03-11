import { useState, useEffect } from "react";
import { AuthProviderContext } from "../hooks/useAuth";
import { getAuthUser, logoutUser } from "../api/auth";
import Spinner from "../Components/Spinner";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [accessToken, setAccessToken] = useState(() => {
    const persistedState = localStorage.getItem("taskDutyToken");
    return persistedState ? persistedState : null;
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("taskDutyToken", accessToken);
    } else {
      localStorage.removeItem("taskDutyToken");
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    async function fetchUser() {
      setIsAuthenticating(true);
      try {
        const res = await getAuthUser(accessToken);
        if (res.status === 200) {
          setUser(res.data.data || res.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setAccessToken(null);
          localStorage.removeItem("taskDutyToken");
        }
      } finally {
        setIsAuthenticating(false);
      }
    }
    fetchUser();
  }, [accessToken]);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Logout Successful");
      queryClient.clear();
      setAccessToken(null);
      setUser(null);
    },
    onError: (err) => {
      import.meta.env.DEV && console.error(err);
      toast.error(err?.response?.data?.messsage || "Something went wrong");
    },
  });

  const handleLogout = async () => mutation.mutate(accessToken);

  if (isAuthenticating) return <Spinner />;

  const contextValue = {
    user,
    setUser,
    accessToken,
    setAccessToken,
    handleLogout,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}
