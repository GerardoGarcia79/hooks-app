import { type PropsWithChildren } from "react";

// interface Props {
//   children: React.ReactNode;
// }

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};
