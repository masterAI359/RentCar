

function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <form action="">
        <input type="text" id="email" className="email" />
        <input type="password" id="password" className="password" />
        <input
          type="password"
          id="confirm_password"
          className="confirm_password"
        />
      </form>
    </div>
  );
}

export default SignIn;
