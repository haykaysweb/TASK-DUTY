import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, updateTask } from "../../api/task";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

 
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(accessToken),
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data?.data?.data) {
      const taskToEdit = data.data.data.find((t) => t._id === id);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setTag(taskToEdit.tag);
      }
    }
  }, [data, id]);

  const mutation = useMutation({
    mutationFn: (formData) => updateTask(id, formData, accessToken),
    onSuccess: (res) => {
      toast.success(res.data.message || "Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate(-1);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ title, description, tag });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full max-w-2xl">
      <div className="flex items-center gap-1 md:my-5 p-5">
        <img
          src="/69036dac6c6467000c309eaf (1).png"
          alt="back"
          className="w-[30px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-semibold">Edit Task</h1>
      </div>

      <form 
        className="relative flex flex-col p-5 gap-10 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Title Input */}
        <div className="flex flex-col relative">
          <label className="absolute -top-3 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500">
            Task Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-4 px-8 outline-none w-full border border-gray-200"
          />
        </div>

        {/* Description Input */}
        <div className="relative">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500">
            Description
          </label>
          <textarea
            placeholder="Briefly describe your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-200 outline-none resize-none w-full pl-8 p-5 break-words"
            rows={5}
          ></textarea>
        </div>

        {/* Tag Selection */}
        <div className="relative py-4 border border-gray-200 mb-8">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500">
            Tags
          </label>
          <div className="flex justify-between items-center px-6">
            <span className="flex gap-3">
              <span className={`px-1 rounded text-white text-xs ${tag === "Urgent" ? "bg-red-400" : "bg-gray-300"}`}>
                Urgent
              </span>
              <span className={`px-1 rounded text-white text-xs ${tag === "Important" ? "bg-green-400" : "bg-gray-300"}`}>
                Important
              </span>
            </span>
            <select 
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="outline-none bg-transparent text-purple-600 font-medium"
            >
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
            </select>
          </div>
        </div>
      </form>

      <div className="p-5">
        <button 
          onClick={handleUpdate}
          disabled={mutation.isPending}
          className="bg-purple-500 text-white w-full rounded py-3 flex justify-center items-center font-medium disabled:opacity-70"
        >
          {mutation.isPending ? (
            <>
              <Loader className="animate-spin mr-2" size={18} />
              Saving...
            </>
          ) : (
            "Done"
          )}
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="underline text-purple-500 my-4 text-center w-full"
        >
          Back To Top
        </button>
      </div>
    </div>
  );
}