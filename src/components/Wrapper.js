import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Wrapper(props) {
  const session = useSession();
  const router = useRouter();

  console.log(session)
  if (
    (session !== null && session?.status === "authenticated") ||
    router.pathname === "/" ||
    router.pathname === "/login"
  ) {
    return props.children;
  } else {
    return (
      <>
        <h1>You are not authenticated</h1>
        <Link href="/">Back to Home</Link>
      </>
    );
  }
}
