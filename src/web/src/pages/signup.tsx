import { Header, Signup } from "../components";

export function SignupPage() {
  return (
    <>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <Signup />
    </>
  );
}
