import React, { FormEvent } from "react";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { useQuery } from "urql";
import { CurrentUserDocument } from "../generated/graphql";

const User = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const name =
    firstName.length > 0 && lastName.length > 0
      ? `${firstName} ${lastName}`
      : email;
  return (
    <div>
      <span>Hello {name} 👋</span>
    </div>
  );
};

type FormValues = {
  password: string;
  email: string;
};

const defaultValues: FormValues = {
  password: "",
  email: "",
};

export const LoginForm = () => {
  const [formValues, setFormValues] = React.useState<FormValues>(defaultValues);
  const [errors, setErrors] = React.useState<string[]>([]);

  const { signIn, signOut, isAuthenticating } = useSaleorAuthContext();
  const [{ data: currentUser, fetching: currentUserFetching }] = useQuery({
    query: CurrentUserDocument,
    pause: isAuthenticating,
  })

  const isLoading = isAuthenticating || currentUserFetching;

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn(formValues);

    if (result.data.tokenCreate.errors) {
      setErrors(result.data.tokenCreate.errors.map((e) => e.message));
      setFormValues(defaultValues);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  if (isLoading) return (<div>Loading...</div>);

  return (
    <section>
      {currentUser?.me ? (
        <>
          <User
            firstName={currentUser?.me.firstName}
            lastName={currentUser?.me.lastName}
            email={currentUser?.me.email}
          />
          <button className="button" onClick={() => signOut()}>
            Log Out
          </button>
        </>
      ) : (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={changeHandler}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={changeHandler}
            />
            <button className="button" type="submit">
              Log In
            </button>
          </form>
          <div>
            {errors.map((error) => (
              <p className="error" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
