import HomeClient from "@/components/HomeClient";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
    <AuthProvider>
      <HomeClient />
    </AuthProvider>
  );
}
