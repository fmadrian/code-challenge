import Link from "next/link";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function Home() {
  return (
    <>
        <div className="flex flex-col gap-8 p-4">

            <h1 className="font-bold text-4xl">Code challenge</h1>
            <h1 className="text-2xl">Adrián Fallas Marín</h1>
            <div className="flex border flex-col gap-4 p-4 items-center sm:w-1/2 flex-wrap">
                <Link href="/pokemon">
                    <Button variant="contained" color="primary">Pokemon list</Button>
                </Link>
                <a target="_blank" className="block" href="https://github.com/fmadrian/code-challenge/blob/main/README.md">
                    <Button variant="contained" color="primary">README</Button>
                </a>
            </div>
            {/* Information about using the application.*/}
            <div className="flex flex-col gap-y-4 sm:w-1/2">
                <Alert severity="info">
                    {"The 'RESET DATA' button in the header will delete all the data, then fetch all the Pokemon available in PokeAPI. After resetting the data, you can add your own Pokemon. The data can be reset as many times as you need."}
                </Alert>
                <Alert severity="warning">
                    {"This application's data is stored locally. Refreshing the page or manually entering the path will wipe the data. The 'RESET DATA' button in the header will fetch all the Pokemon available in PokeAPI and you can add your own."}
                </Alert>
            </div>


        </div>
    </>
  );
}
