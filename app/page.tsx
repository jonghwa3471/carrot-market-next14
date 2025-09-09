export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-5 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100">
      <div className="flex w-full max-w-screen-sm flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg">
        {["Nico", "Me", "You", "Yourself", ""].map((person, index) => (
          <div key={index} className="flex items-center gap-5">
            <div className="size-10 rounded-full bg-blue-400" />
            <span className="text-lg font-medium empty:h-4 empty:w-24 empty:animate-pulse empty:rounded-full empty:bg-gray-300">
              {person}
            </span>
            <div className="relative flex size-6 items-center justify-center rounded-full bg-red-500 text-white">
              <span className="z-10">{index}</span>
              <div className="absolute size-5 animate-ping rounded-full bg-red-500" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
