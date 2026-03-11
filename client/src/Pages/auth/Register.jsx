import { Link, NavLink, useNavigate } from "react-router";
import { validateRegisterUserSchema } from "../../utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../api/auth";

export default function Register() {
  const [revealPassword, setRevealPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validateRegisterUserSchema) });

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration successful");
      navigate("auth/login");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response.data ||
          "Registration failed",
      );
    },
  });

  const onSubmitForm = async (data) => {
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
        <h2 className="text-3xl font-bold mt-10">Register</h2>
        <p className="mb-4">Enter Your Information To Create An Account</p>

        <form
          className="flex flex-col gap-5 mt-10"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full focus:outline-[#980ffa]"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors?.email.message}</p>
          )}
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full focus:outline-[#980ffa]"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors?.username.message}</p>
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
                <EyeClosed className="text-[#980ffa]" />
              ) : (
                <Eye className="text-[#980ffa]" />
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
                Signin up{" "}
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#980ffa] font-bold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
