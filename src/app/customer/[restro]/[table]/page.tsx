import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/server/db";

export default async function Customer({
  params,
}: {
  params: { restro: string; table: string };
}) {
  const restro = await db.restro.findUnique({
    where: {
      id: params.restro,
    },
    include: {
      menu: true,
    },
  });

  if (!restro) return notFound();

  async function addToTable(formdata: FormData) {
    "use server";
    
  }

  return (
    <main>
      <div className="flex w-full items-center justify-center pt-4">
        <Link className="text-5xl font-extrabold" href="/my-restaurant/">
          {restro.name}
        </Link>
      </div>
      <ul className="m-5 rounded-xl border p-5">
        {restro?.menu.map((item) => (
          <li className="flex items-center  justify-between">
            <div className="flex items-center gap-4">
              <div className="ml-4 flex h-16 w-16 items-center justify-center">
                <img src={item.image} alt="" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{item.name}</h1>
                <h2>₹{item.price}</h2>
              </div>
            </div>
            <form action={addToTable} className="mr-4">
              <input type="text" value={item.id} hidden name="id" />
              <button
                className="rounded bg-neutral-300 px-2 text-xs transition-colors hover:bg-neutral-200"
                type="submit"
              >
                ADD
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
