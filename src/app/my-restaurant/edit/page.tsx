import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import SendToMenu from "~/app/_components/sendtomenu";
import { db } from "~/server/db";
import Link from "next/link";

export default async function Create() {
  const session = await getServerAuthSession();

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      restro: {
        include: {
          menu: true,
        },
      },
    },
  });

  async function sendToMenu(formdata: FormData) {
    "use server";

    const dish = formdata.get("dish") as string;
    const image = formdata.get("image") as string;
    const price = Number(formdata.get("price"));

    if (dish == "" || price == 0 || image == "") return;
    else {
      await db.dish.create({
        data: {
          name: dish,
          price,
          image,
          restroId: user?.restro?.id!,
        },
      });

      revalidatePath("/my-restaurant/edit/");
    }
  }

  async function deleteDish(formdata: FormData) {
    "use server";

    const id = formdata.get("id") as string;

    await db.dish.delete({
      where: {
        id,
      },
    });

    revalidatePath("/my-restaurant/edit/");
  }

  return (
    <main>
      <div className="flex w-full items-center justify-center pt-4">
        <Link className="text-5xl font-extrabold" href="/my-restaurant/">
          {user?.restro?.name}
        </Link>
      </div>
      <ul className="m-5 rounded-xl border p-5">
        {user?.restro?.menu.map((item) => (
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
            <form action={deleteDish} className="mr-4">
              <input type="text" value={item.id} hidden name="id" />
              <button
                className="rounded bg-neutral-300 px-2 text-xs transition-colors hover:bg-neutral-200"
                type="submit"
              >
                DEL
              </button>
            </form>
          </li>
        ))}
      </ul>

      <form
        action={sendToMenu}
        className="sticky bottom-0 left-0 right-0 m-5 flex flex-col gap-3 rounded-t-xl border bg-white/80 p-5 backdrop-blur-lg"
      >
        <input
          type="text"
          name="dish"
          placeholder="Name"
          className="border-b-2 bg-transparent px-1 outline-none transition-colors focus:border-black"
          autoComplete="false"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border-b-2 bg-transparent px-1 outline-none transition-colors focus:border-black"
          autoComplete="false"
        />
        <input
          type="text"
          name="image"
          className="h-fit border-b-2 bg-transparent px-1 outline-none transition-colors focus:border-black"
          autoComplete="false"
          placeholder="Image url"
        />
        <SendToMenu />
      </form>
    </main>
  );
}
