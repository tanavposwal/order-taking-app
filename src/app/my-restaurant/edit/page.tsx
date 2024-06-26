import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

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

    await db.dish.create({
      data: {
        name: formdata.get("dish")! as string,
        price: Number(formdata.get("price")),
        image: formdata.get("image")! as string,
        restroId: user?.restro?.id!,
      },
    });
  }

  return (
    <main>
      <h1>{user?.restro?.name}</h1>

      <ul className="p-5 m-5 border rounded-xl">
        {user?.restro?.menu.map((item) => (
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 flex items-center justify-center ml-4">
            <img src={item.image} alt="" />
            </div>
            <div>
            <h1 className="text-xl font-bold">{item.name}</h1>
            <h2>₹{item.price}</h2>
            </div>
          </div>
        ))}
      </ul>

      <form action={sendToMenu} className="p-5 m-5 rounded-xl border flex flex-col gap-3">

        <input type="text" name="dish" placeholder="Name" className="outline-none max-w-screen-sm" autoComplete="false" />
        <input type="number" name="price" placeholder="Price" className="outline-none" autoComplete="false" />
        <input
          type="text"
          name="image" className="outline-none" 
          autoComplete="false"
          value="https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg"
        />
        <button type="submit" className="bg-neutral-200 hover:bg-neutral-300 px-5 py-2 rounded-lg transition-colors">Send to menu</button>
      </form>
    </main>
  );
}
