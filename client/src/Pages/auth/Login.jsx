import { Link, NavLink } from "react-router";
import { validateLoginUserSchema } from "../../utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const {setAccessToken} = useAuth();
  const [revealPassword, setRevealPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validateLoginUserSchema) });

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login successful");
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response.data ||
          "Login failed",
      );
    },
  });

  const onSubmitForm = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md p-2 lg:p-8">
        <NavLink to="/" className="flex items-center justify-center w-full">
          <img
            src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
            alt=""
            className="w-[157px] h-[41px]"
          />
        </NavLink>
        <h2 className="text-3xl font-bold  mt-6">Login</h2>
        <p className="mb-4">Login Into Your Account</p>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full focus:outline-[#980ffa]"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
          <div className="relative">
            <input
              type={revealPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full focus:outline-[#980ffa] mb-2"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs ">{errors.password.message}</p>
            )}
            <button
              onClick={togglePasswordReveal}
              className="absolute right-2 top-2"
            >
              {revealPassword ? (
                <EyeClosed className="text-[#980ffa] " />
              ) : (
                <Eye className="text-[#980ffa] " />
              )}
            </button>
          </div>

          <button
            className="btn bg-[#980ffa] hover:bg-[#7a0cc7] text-white border-none w-full mt-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} />
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#980ffa] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
