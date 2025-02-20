import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function Loading({message}: {message?:string}) {
    return (
        <div className="self-center">
            <div className="flex flex-col justify-center items-center py-12 gap-y-8">
                <CircularProgress color="primary" size={80}  />
                <span className="animate-pulse font-bold text-2xl">{message ?? 'Loading...'}</span>
            </div>
        </div>
    );
}