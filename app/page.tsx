import Link from "next/link";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <>
        <div className="flex flex-col gap-8 p-4 items-center">

            <h1 className="font-bold text-4xl">Code challenge</h1>
            <h1 className="text-2xl">Adrián Fallas Marín</h1>
            <div className="flex border flex-col gap-4 p-4 items-center sm:w-1/2 flex-wrap">
                <Link href="/pokemon">
                    <Button variant="contained" color="primary">Pokemon list</Button>
                </Link>
                <Link href="/login">
                    <Button variant="contained" color="primary">Login</Button>
                </Link>
                <a className="block" href="https://github.com/fmadrian/code-challenge/blob/main/README.md">
                    <Button variant="contained" color="primary">README</Button>
                </a>

            </div>

        </div>
    </>
  );
}
