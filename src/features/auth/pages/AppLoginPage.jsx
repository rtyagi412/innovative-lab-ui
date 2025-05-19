import { AppLogin } from "../components/AppLogin";
import { RedirectIfAuthenticated } from "../components/RedirectIfAuthenticated";

export const AppLoginPage = () => {
  return (
    <RedirectIfAuthenticated>
      <AppLogin />
    </RedirectIfAuthenticated>
  );
};
