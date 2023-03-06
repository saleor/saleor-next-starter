import { useCurrentUserQuery } from "../generated/graphql";
import { useSaleorAuthContext } from "./auth";

export const LoginForm = () => {
  const { signIn, signOut, isAuthenticating } = useSaleorAuthContext();
  const [currentUser] = useCurrentUserQuery({ pause: isAuthenticating });

  const isLoading = isAuthenticating || currentUser.fetching;

  const logInLogOut = () => {
    if (currentUser.data?.me) {
      signOut();
    } else {
      signIn({ email: `admin@example.com`, password: `admin` });
    }
  };

  const buttonLabel = isLoading
    ? "Loading…"
    : currentUser.data?.me
    ? "Log Out"
    : "Log In";

  const userText = isLoading ? (
    "…"
  ) : currentUser.data?.me ? (
    <>
      {currentUser.data?.me?.firstName} {currentUser.data?.me?.lastName}{" "}
      {currentUser.data?.me?.email} ({currentUser.data?.me?.orders?.totalCount}{" "}
      orders)
    </>
  ) : (
    <>Not authenticated</>
  );

  return (
    <div>
      <button className="button" onClick={logInLogOut}>
        {buttonLabel}
      </button>
      <p>{userText}</p>
    </div>
  );
};
