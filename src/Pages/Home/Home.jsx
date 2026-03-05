import { Link } from "react-router";

export default function Home() {
  return (
    <main className="md:min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center">
          <div className="flex flex-col justify center text-center md:text-left space-y-2">
            <h1 className="text-center lg:text-left font-semibold text-2xl md:text-4xl lg:text-5xl text-gray-900 leading-tight">
              Manage your Tasks on
              <span className="text-purple-600 block mt-2 text-2xl md:text-4xl lg:text-5xl font-semibold">TaskDuty</span>
            </h1>

            <p className="text-center lg:text-left w-full text-sm md:text-xl text-gray-600  md:mx-0 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. 
            </p>

            <div className="flex justify-center lg:justify-start items-center lg:items-start w-full pt-4">
              <Link
                to="/auth/mytask"
                className="inline-block bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold rounded-lg px-4 md:px-8 py-2 md:py-3 shadow-lg shadow-purple-200"
              >
                Go to my Tasks
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center items-center ">
            <img
              src="https://task-duty-proj-client.vercel.app/assets/hero-eGcUghao.png"
              alt="TaskDuty Hero Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
