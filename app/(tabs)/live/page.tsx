import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Live() {
  return (
    <div>
      <Link
        href="/streams/add"
        className="fixed bottom-24 right-8 flex size-16 items-center justify-center rounded-full bg-orange-500 text-white transition-colors hover:bg-orange-400 xl:right-[30rem]"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
