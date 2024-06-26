import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#346d02] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="my-3 flex flex-col gap-2 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Modern <span className="text-pallete-red">Order Taking</span> App
          </h1>
          <h3 className="text-xl text-white/70">
            Streamline Your Restaurant Business with Our Cutting-Edge
            Technology!
          </h3>
        </div>
        <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Order Tracking →</h3>
            <div className="text-lg">
              Keep track of every order in real-time with our intuitive order
              tracking system.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Manage orders →</h3>
            <div className="text-lg">
              You don’t have to switch between several tabs to take and process
              different order types.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Less use of paper →</h3>
            <div className="text-lg">
              Waiters can modify orders and menu items by adding, removing and
              altering the variables.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Easy billing →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl text-white font-semibold">Start Growing Your Restaurant</p>

          <Link
            href="/my-restaurant"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            List my Restro
          </Link>
        </div>
      </div>
    </main>
  );
}
