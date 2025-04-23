import Link from "next/link";

export default function RouteToSignUp() {
  return (
    <div className="flex gap-2 polymath">
      <div className="text-r14 text-slate-700">Don&apos;t have an account?</div>
      <Link href="/sign-up" className="text-m14 text-slate-500 underline cursor-pointer">
        Sign Up
      </Link>
    </div>
  );
}
