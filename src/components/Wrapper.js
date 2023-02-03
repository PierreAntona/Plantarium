import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Wrapper(props) {
  const session = useSession();
  const router = useRouter();

  if (
    (session !== null && session?.status === "authenticated") ||
    router.pathname === "/" ||
    router.query.page !== undefined
  ) {
    return props.children;
  } else {
    return (
      <>
        <h1>You don't have access to this page</h1>
        <Link href="/">Back to Home</Link>
      </>
    );
  }
}
