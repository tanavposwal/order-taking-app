import Link from "next/link";
import randomstring from "randomstring"
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function Home() {
  const session = await getServerAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      restro: {
        include: {
          tables: {
            include: {
              cart: true,
            },
          },
        },
      },
    },
  });

  async function createTable(formdata: FormData) {
    "use server";

    const name = randomstring.generate(4)

    if (user?.restro) {
      await db.table.create({
        data: {
          restroId: user?.restro.id,
          name
        },
      });
    }
  }

  return (
    <div>
      {user?.restro ? (
        <div className="m-5 rounded-2xl border p-5">
          <h2 className="text-4xl font-bold">{user.restro.name}</h2>
          <h1 className="text-xl">Your Restaurant</h1>
          <p className="mb-2">@ {user.restro.location}</p>
          <div className="flex gap-3">
            <Link
              className="text-md rounded-lg bg-neutral-100 px-4 py-2 transition-colors hover:bg-neutral-200"
              href="/my-restaurant/edit"
            >
              Edit Menu
            </Link>
            <form action={createTable}>
              <button
                type="submit"
                className="text-md rounded-lg bg-neutral-100 px-4 py-2 transition-colors hover:bg-neutral-200"
              >
                Add Table
              </button>
            </form>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {user.restro.tables.map((table) => (
              <div className="border rounded-xl p-3">
                <h3 className="text-lg font-bold">{table.name}</h3>
                <Link href={'/customer/'+user.restro?.id+'/'+table.id}>Customer facing link</Link>
                <p className="text-xs text-neutral-500">{table.id}</p>
                <ul className="list-decimal">
                  {table.cart.map(dish => (
                    <li>{dish.name}</li>
                  ))}
                </ul>
              </div>
            ))}
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
            <h4 className="text-xl font-bold">{user?.name}</h4>
            <p>{user?.email}</p>
          </div>
        </div>
        <p>{user?.createdAt.toDateString()}</p>
      </div>
    </div>
  );
}
