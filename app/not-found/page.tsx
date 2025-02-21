import Link from "next/link";
import {Button} from "@mui/material";

export default function Page() {

    return (
        <div className="flex flex-col py-16 gap-y-8 justify-center text-center">
            <h1 className="text-4xl font-bold">404 - Not Found</h1>
            <p className="text-lg">The Pokemon you are looking for does not exist.</p>
            <p className="text-lg">{"Try again or reset the application's data."}</p>
            <Link href={`/`}>
                <Button variant="contained">Go back to main menu</Button>
            </Link>
        </div>
    )
}