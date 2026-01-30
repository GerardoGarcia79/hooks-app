import {
  createContext,
  useEffect,
  useEffectEvent,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock-data";

// interface Props {
//   children: React.ReactNode;
// }

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // state
  authStatus: AuthStatus;
  user: User | null;

  // methods
  login: (userId: number) => boolean;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number): boolean => {
    const user = users.find((user) => user.id === userId);
    setAuthStatus("authenticated");
    if (!user) {
      console.log(`User not found ${userId}`);
      setAuthStatus("not-authenticated");
      setUser(null);
      return false;
    }

    setUser(user);
    setAuthStatus("authenticated");
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("userId");
  };

  const handleLoginEffectEvent = useEffectEvent(handleLogin);
  const handleLogoutEffectEvent = useEffectEvent(handleLogout);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (storedUserId) {
      handleLoginEffectEvent(+storedUserId);
      return;
    }

    handleLogoutEffectEvent();
  }, []);

  return (
    <UserContext
      value={{
        authStatus,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
