function LoginForm({ setLogUser, users }) {
  return (
    <form className="loginForm">
      <h2>Please select user to comment</h2>
      <select
        defaultValue="guest"
        onChange={(event) => {
          setLogUser(event.target.value);
        }}
        name="Users"
        id="users"
      >
        <option>guest</option>
        {users.map((user) => {
          return (
            <option key={"lf" + users.indexOf(user)}>{user.username}</option>
          );
        })}
      </select>
    </form>
  );
}

export default LoginForm;
