import Link from "next/link";

export default function RouteToSignIn() {
  return (
    <div className="flex gap-2 polymath">
      <div className="text-r14 text-slate-700">Already have an account?</div>
      <Link href="/sign-in" className="text-m14 text-slate-500 underline cursor-pointer">
        Sign In
      </Link>
    </div>
  );
}
