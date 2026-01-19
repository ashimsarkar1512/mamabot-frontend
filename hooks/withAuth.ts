import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WithAuthOptions {
  roles?: string[]; // If specified, user must have one of these roles
  redirectTo?: string; // Where to redirect if unauthorized
}

export function withAuth<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function WithAuthComponent(props: P) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        const redirectUrl = options.redirectTo || "/login";
        router.push(redirectUrl);
      } else if (
        options.roles &&
        user &&
        !options.roles.includes(user.roles[0])
      ) {
        // Redirect if user doesn't have required role
        const redirectUrl = options.redirectTo || "/";
        router.push(redirectUrl);
      }
    }, [isAuthenticated, user, options.roles, options.redirectTo, router]);

    // Show loading or nothing while checking authentication
    if (!isAuthenticated) {
      return <div>Loading...</div>;
    }

    // Check role-based access
    if (options.roles && user && !options.roles.includes(user.roles[0])) {
      return <div>Unauthorized access</div>;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
