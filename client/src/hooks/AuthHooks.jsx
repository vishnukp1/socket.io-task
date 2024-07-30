import { useState } from "react";
import { toast } from "react-toastify";
import { Axios } from "../api/Axois";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const register = async ({ username, email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.post("/register", {
        username,
        email,
        password,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error(err);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

// Custom hook for user login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.post("/login", { email, password });
      toast.success(response.data.message);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error(err);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};