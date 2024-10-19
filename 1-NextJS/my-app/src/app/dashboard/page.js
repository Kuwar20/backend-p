import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
            <div>
                <p>Dashboard page</p>
            </div>
            <div className="block">
                <Link href="/"
                className="border rounded-lg m-3 p-3 bg-blue-600 hover:bg-blue-400 text-white"
                >Back to Home page?</Link>
            </div>
        </div>
    );
}
