import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function Create() {
  const session = await getServerAuthSession();

  async function createRestro(formdata: FormData) {
    "use server";

    // zod validation

    await db.restro.create({
      data: {
        name: formdata.get("name")! as string,
        managerId: session?.user.id!,
        location: formdata.get("location")! as string,
      },
    });
  }

  return (
    <form action={createRestro}>
      <h1 className="text-5xl font-bold">Create new restaurant</h1>
      <div className="flex flex-col">
        <label>Name</label>
        <input
          type="text"
          placeholder="Your restaurant name"
          required
          name="name"
          className="border"
        />
      </div>
      <div className="flex gap-2">
        <input type="checkbox" required />
        <p>Agree to all terms and conditions</p>
      </div>
      <div className="flex flex-col">
        <label>Upload file</label>
        <input type="file" name="logo" accept="image/*" placeholder="logo" />
      </div>
      <div className="flex flex-col">
        <label>Location</label>
        <input
          type="text"
          name="location"
          className="border"
          required
          placeholder="Location"
        />
      </div>
      <button
        type="submit"
        className="bg-pallete-red px-5 py-2 text-lg font-bold text-white"
      >
        Create
      </button>
    </form>
  );
}
