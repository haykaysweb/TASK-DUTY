import { useNavigate } from "react-router";

export default function EditTask() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto w-full">
      <div className="flex items-center gap-1 md:my-5 p-5 ">
        <img
          src="/69036dac6c6467000c309eaf (1).png"
          alt=""
          className="w-[30px]"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-semibold">Edit Task</h1>
      </div>
      <form className="relative flex flex-col p-5 gap-10 w-full">
        <div className="flex flex-col">
          <label className="absolute top-1 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500">
            Task Title
          </label>
          <input
            type="text"
            defaultValue="Project Completion"
            className=" py-4 px-8 outline-none w-full border border-gray-200"
          />
        </div>
        <div className="relative">
          <label
            htmlFor=""
            className="absolute -top-4 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500"
          >
            Description
          </label>
          <textarea
            name=""
            id=""
            placeholder="Briefly describe your task..."
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem beatae odio reiciendis quas sunt neque quod ad, molestias ipsam soluta? Temporibus ut atque fuga exercitationem blanditiis rerum dolorem sint nulla?"
            className="border border-gray-200 outline-none resize-none w-full pl-8 p-5"
            rows={5}
          ></textarea>
        </div>
        <div className="relative py-4 border border-gray-200 mb-8">
          <label className="absolute -top-4 ml-6 bg-white pl-2 pr-2 text-xl font-medium text-gray-500 pl-2">
            Tags
          </label>
          <div className="flex justify-between items-end px-6">
            <span className="flex gap-5 pl-2">
              <span className="px-1 bg-black text-white rounded">Urgent</span>
              <span className="px-1 bg-black text-white rounded">
                Important
              </span>
            </span>
            <select className="outline-none">
              <option value=""></option>
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
            </select>
          </div>
        </div>
      </form>
      <div className="p-5">
        <button className="bg-purple-500 text-white w-full rounded py-3">
          Done
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
