import HomeClient from "@/components/HomeClient";
import { AuthProvider } from "@/components/AuthProvider";

export default function LoginPage() {
  return (
    <AuthProvider>
      <HomeClient />
    </AuthProvider>
  );
}