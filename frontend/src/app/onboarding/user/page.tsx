import { redirect } from "next/navigation";

export default function UserOnboardingRedirect() {
  redirect("/dashboard");
}
