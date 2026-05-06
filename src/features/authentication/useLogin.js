import { useGoTo } from "../../hooks/useGoTo";
import { loginUser } from "./useAuth";
import { useUsers } from "./useUsers";

export function useLogin(reset) {
  const gotoHome = useGoTo("/");
  const { data: users, isLoading } = useUsers();

  function handleLogin(data) {
    if (isLoading) return;

    const { userEmail, userPassword } = data;

    const user = users?.find(
      (u) => u.email === userEmail && u.password === userPassword,
    );

    if (user) {
      loginUser(user);
      gotoHome();
    } else {
      alert("Incorrect email or password!");
    }

    reset();
  }

  return { handleLogin, isLoading };
}
