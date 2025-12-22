export default function Extras({ params }: { params: { potato: string[] } }) {
  console.log(params);
  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="font-metallica text-6xl">Extras!</h1>
      <h2 className="font-rubik">So much more to learn!</h2>
    </div>
  );
}
