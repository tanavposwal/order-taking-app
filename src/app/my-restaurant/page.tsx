import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function Home() {
  const session = await getServerAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      restro: true,
    },
  });

  return (
    <div>
      {user?.restro ? (
        <div className="m-5 rounded-2xl border p-5">
          <h2 className="text-4xl font-bold">{user.restro.name}</h2>
          <h1 className="text-xl">Your Restaurant</h1>
          <p className="mb-2">@ {user.restro.location}</p>
          <Link className="text-md bg-neutral-100 px-4 py-2 hover:bg-neutral-200 rounded-lg" href="/my-restaurant/edit">Edit Menu</Link>
          <div className="grid">

          </div>
        </div>
      ) : (
        <div>
          create a restaurant <Link href="/my-restaurant/create">Create</Link>
        </div>
      )}
      <div className="m-5 rounded-2xl border p-5">
        <div className="flex gap-4">
          <img
            src={user?.image!}
            alt={user?.name!}
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col gap-0">
            <h4 className="text-lg">{user?.name}</h4>
            <p>{user?.email}</p>
          </div>
        </div>
        <p>{user?.createdAt.toDateString()}</p>
      </div>
    </div>
  );
}
