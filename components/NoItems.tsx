
export default function NoItems({message}: {message?:string}) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-5">
            <span className="font-bold text-9xl">X</span>
            <h5 className="text-2xl">{message ?? 'No items were found.'}</h5>
        </div>
    );
}