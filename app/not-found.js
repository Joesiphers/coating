import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">click to Return Home</Link>
    </div>
  );
}
