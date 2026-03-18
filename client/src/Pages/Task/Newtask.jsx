import { useNavigate } from "react-router";
import { Loader } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/task";
import { toast } from "react-toastify";
import { useState } from "react";


export default function Newtask() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Urgent");

  const mutation = useMutation({
    mutationFn: (data) => createTask(data, accessToken),
    onSuccess: (res) => {
      toast.success(res.data.message || "Task created Successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/auth/mytask");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to create task",
      );
    },
  });

  const handleDone = async () => {
    mutation.mutate({ title, description, tag });
  };

  return (
    <div className="container mx-auto px-4 w-full max-w-2xl">
      <div className="flex items-center gap-1 my-6">
        <img
          src="/69036dac6c6467000c309eaf (1).png"
          alt="icon"
          className="w-[30px] h-auto cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-semibold">New Task</h1>
      </div>

      <div className="relative flex flex-col gap-6 w-full mt-15">
        {/* Task Title */}
        <div className="flex flex-col gap-2 relative">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-1 text-xl font-medium text-gray-500">
            Task Title
          </label>
          <input
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
            className="py-4 outline-none w-full border border-gray-200 rounded-md px-8"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="relative flex flex-col gap-2">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-1 text-xl font-medium text-gray-500">
            Description
          </label>
          <textarea
            placeholder="Briefly describe your task..."
            className="border border-gray-200 outline-none resize-none w-full p-4 rounded-md px-8"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2 relative">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-1 text-xl font-medium text-gray-500">
            Tags
          </label>
          <div className="flex justify-between items-center py-4 px-4 border border-gray-200 rounded-md mb-4">
            <span className="flex gap-3 pl-4 text-gray-300">
              <span className="px-1 bg-gray-500 rounded text-white text-xs">
                Urgent
              </span>
              <span className="px-1 bg-gray-500 rounded text-white text-xs">
                Important
              </span>
            </span>
            <select
              className="bg-transparent border-none outline-none text-purple-600 font-medium cursor-pointer"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white w-full rounded-lg py-4 font-semibold shadow-lg shadow-purple-100 flex justify-center items-center"
          onClick={handleDone}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader className="animate-spin mr-2" />
              Done
            </>
          ) : (
            "Done"
          )}
        </button>

        <button
          className="underline text-purple-500 py-4 text-center w-full hover:text-purple-700"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back To Top
        </button>
      </div>
    </div>
  );
}
