import { Link } from "react-router";

export default function Mytask() {
  return (
    <div className="container mx-auto md:mt-10">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-medium">My Task</h1>
        <Link to="/auth/newtask" className="flex items-center space-x-2">
          <img src="/fluent_add-24-filled.png" alt="" />
          <h1 className="text-purple-500 font-medium">Add New Task</h1>
        </Link>
      </div>
      {/* boxed content start */}
      <div className="grid sm:grid-cols-1 md:flex flex-col px-5 gap-6 md:mt-5">
        <div className="mt-6 border border-gray-300 p-3 rounded-sm">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-red-300 mb-2 text-xl">Urgent</h1>
            <Link to="/auth/edittask" className="flex items-center gap-4">
              <div className="flex gap-2 bg-purple-500 px-2 py-1 rounded-sm text-white">
                <img src="/clarity_note-edit-line (1) - Copy.png" alt="" />
                <button>Edit</button>
              </div>
              <div className="flex gap-2 border border-purple-500 px-2 py-1 rounded-sm text-purple-500">
                <img src="/fluent_delete-24-regular.png" alt="" />
                <button>Delete</button>
              </div>
            </Link>
          </div>
          <hr className="text-gray-300" />

          <h1 className="text-2xl mt-1">Fintech Website Update</h1>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat, aspernatur aut quis adipisci nulla autem consequuntur
            maxime soluta. Tempore nemo magni necessitatibus corporis ea porro
            fugit! Nobis a ullam maiores ut aperiam? Delectus asperiores amet
            porro reiciendis, re exercitationem cum, a tempora voluptas
            quibusdam explicabo expedita.
          </p>
        </div>

        <div className="mt-6 border border-gray-300 p-3 rounded-sm">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-green-300 mb-2 mt-1 text-xl">Important</h1>
            <Link to="/auth/edittask" className="flex items-center gap-4">
              <div className="flex gap-2 bg-purple-500 px-2 py-1 rounded-sm text-white">
                <img src="/clarity_note-edit-line (1) - Copy.png" alt="" />
                <button>Edit</button>
              </div>
              <div className="flex gap-2 border border-purple-500 px-2 py-1 rounded-sm text-purple-500">
                <img src="/fluent_delete-24-regular.png" alt="" />
                <button>Delete</button>
              </div>
            </Link>
          </div>
          <hr className="text-gray-300" />
          <h1 className="text-2xl">Agro Website Update</h1>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat, aspernatur aut quis adipisci nulla autem consequuntur
            maxime soluta. Tempore corporis ea porro fugit! Nobis a ullam
            maiores ut aperiam? Delectus asperiores amet porro reiciendis,
            recusandae, voluptate exercitationem cum, a tempora voluptas
            quibusdam explicabo expedita.
          </p>
        </div>

        <div className="mt-6 border border-gray-300 p-3 rounded-sm">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-red-300 mb-2 text-xl">Urgent</h1>
            {/* edit and delete icons section start from here  */}
            <Link to="/auth/edittask" className="flex items-center gap-4">
              <div className="flex gap-2 bg-purple-500 px-2 py-1 rounded-sm text-white">
                <img src="/clarity_note-edit-line (1) - Copy.png" alt="" />
                <button>Edit</button>
              </div>
              <div className="flex gap-2 border border-purple-500 px-2 py-1 rounded-sm text-purple-500">
                <img src="/fluent_delete-24-regular.png" alt="" />
                <button>Delete</button>
              </div>
            </Link>
            {/* edit and delete icons section ends here  */}
          </div>
          <hr className="text-gray-300" />
          <h1 className="text-2xl mt-1">Fintech Website Update</h1>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat, aspernatur maxime soluta. Tempore nemo magni necessitatibus
            corporis ea porro fugit! Nobis a ullam maiores ut aperiam? Delectus
            asperiores amet porro reiciendis, recusandae, voluptate
            exercitationem cum, a tempora voluptas quibusdam explicabo expedita.
          </p>
        </div>

        <div className="mt-6 border border-gray-300 p-3 rounded-sm">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-green-300 mb-2 mt-1 text-xl">Important</h1>
            <Link to="/auth/edittask" className="flex items-center gap-4">
              <div className="flex gap-2 bg-purple-500 px-2 py-1 rounded-sm text-white">
                <img src="/clarity_note-edit-line (1) - Copy.png" alt="" />
                <button>Edit</button>
              </div>
              <div className="flex gap-2 border border-purple-500 px-2 py-1 rounded-sm text-purple-500">
                <img src="/fluent_delete-24-regular.png" alt="" />
                <button>Delete</button>
              </div>
            </Link>
          </div>
          <hr className="text-gray-300" />
          <h1 className="text-2xl">Agro Website Update</h1>
          <p className="text-gray-600 mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            placeat, aspernatur aut quis adipisci nulla autem consequuntur
            maxime soluta. Tempore corporis ea porro fugit! Nobis a ullam
            maiores ut aperiam? Delectus asperiores amet porro reiciendis,
            recusandae, voluptate exercitationem cum, a tempora voluptas
            quibusdam explicabo expedita.
          </p>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full text-center py-7 underline text-purple-500"
      >
        Back to top
      </button>
    </div>
  );
}
