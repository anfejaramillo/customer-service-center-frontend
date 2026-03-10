import { AppShell } from '@/components/layout/app-shell';
import { useAuth } from "react-oidc-context";

export default function AuthScreen() {
  let auth = useAuth();
  if (!auth.isAuthenticated) {
    return (
      <AppShell
        pageCode='auth'
        title="Sign in / Sign up"
        subtitle="Authenticate users and manage account access from this secure entry point."
        actions={[]}
      />
    );
  } else {
    return (
      <AppShell
        pageCode='auth'
        title="You are sign in sucessfully"
        subtitle={`Hello!! Your are sign in with ${auth.user?.profile['cognito:username']}, welcome to the Customer Service Center`}
        actions={[]}
      />
    )
  }

}
