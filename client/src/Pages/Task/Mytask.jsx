import { useState } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../../api/task";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Loader, Search, X, AlertCircle } from "lucide-react";

export default function Mytask() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useState("");

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", searchParams],
    queryFn: () => getTasks(accessToken, searchParams),
    enabled: !!accessToken,
  });

  const tasks = data?.data?.data || [];

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTask(id, accessToken),
    onSuccess: (res) => {
      toast.success(res.data.message || "Task deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      setShowModal(false);
      setTaskToDelete(null);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete task");
    },
  });

  // Handler to trigger the modal
  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  if (isLoading && !searchParams) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto md:mt-5 relative">
        <div className="flex items-center justify-between p-5">
          <h1 className="text-3xl font-medium">My Task</h1>
          <Link to="/auth/newtask" className="flex items-center space-x-2">
            <img src="/fluent_add-24-filled.png" alt="add" />
            <h1 className="text-purple-500 font-medium">Add New Task</h1>
          </Link>
        </div>

        {/* Search Field */}
        <div className="px-5 mb-5">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              className="w-full border border-gray-300 py-2 pl-10 pr-10 rounded-md outline-none focus:border-purple-500 transition-colors shadow-sm"
            />
            {searchParams && (
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
                size={18}
                onClick={() => setSearchParams("")}
              />
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="grid sm:grid-cols-1 md:flex flex-col px-5 gap-6 md:mt-5">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              {searchParams
                ? `No tasks found matching "${searchParams}"`
                : "No tasks found. Create one!"}
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="mt-6 border border-gray-300 p-3 rounded-sm"
              >
                <div className="flex justify-between items-center py-2">
                  <h1
                    className={`${task.tag === "Urgent" ? "text-red-300" : "text-purple-500"} mb-2 text-xl font-medium`}
                  >
                    {task.tag}
                  </h1>

                  <div className="flex items-center gap-4">
                    <Link
                      to={`/auth/edittask/${task._id}`}
                      className="flex gap-2 bg-purple-500 px-2 py-1 rounded-sm text-white items-center"
                    >
                      <img
                        src="/clarity_note-edit-line (1) - Copy.png"
                        alt="edit"
                        className="w-4 h-4"
                      />
                      <span>Edit</span>
                    </Link>

                    {/* Trigger Confirmation Modal */}
                    <button
                      onClick={() => confirmDelete(task._id)}
                      className="flex gap-2 border border-purple-500 px-2 py-1 rounded-sm text-purple-500 items-center cursor-pointer hover:bg-purple-50 transition-colors"
                    >
                      <img
                        src="/fluent_delete-24-regular.png"
                        alt="delete"
                        className="w-4 h-4"
                      />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <hr className="text-gray-300" />
                <h1 className="text-lg font-semibold mt-1">{task.title}</h1>
                <div className="w-full">
                  <textarea
                    readOnly
                    defaultValue={task.description}
                    className="w-full bg-transparent outline-none border-none resize-none p-0 text-gray-600 break-words whitespace-pre-wrap"
                    rows={5}
                  ></textarea>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-full text-center py-5 underline text-purple-500"
        >
          Back to top
        </button>

        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <AlertCircle className="text-red-600" size={30} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Are you sure?
                </h2>
                <p className="text-gray-500 mt-2">
                  This task will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Keep Task
                </button>
                <button
                  onClick={() => deleteMutation.mutate(taskToDelete)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 disabled:opacity-50 flex justify-center items-center shadow-md shadow-red-100"
                >
                  {deleteMutation.isPending ? (
                    <Loader className="animate-spin" size={20} />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
