import { AppRoutes } from "./routes/AppRoutes";
import { useAuthTokenManager } from "./features/auth/hooks/useAuthTokenManager";

export const App = () => {
  const loading = useAuthTokenManager();
  if (loading) return <div>Loading…</div>;
  return <AppRoutes />;
};
