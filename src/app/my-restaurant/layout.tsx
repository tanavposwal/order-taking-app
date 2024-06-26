import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (session) {
    return (<main className="text-black h-screen max-w-screen-md mx-auto">{children}</main>);
  } else {
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

          <div className="flex flex-col items-center gap-4">
            <p className="text-2xl font-semibold text-white">
              Login to Continue
            </p>

            <Link
              href="/api/auth/signin"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
