import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation";

import { SignUpView } from "@/modules/auth/sign-up/ui/views/sign-up-view";

const Page = async () => {
  // console.log("Sign up page!"); // server

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return <SignUpView />
}

export default Page