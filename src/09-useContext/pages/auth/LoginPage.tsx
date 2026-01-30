import { UserContext } from "@/09-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const { login } = useContext(UserContext);

  const navigation = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(+userId);

    if (!result) {
      toast.error("Usuario no encontrado");
      return;
    }

    navigation("/profile");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar sesión</h1>
      <hr />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-10">
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          type="number"
          placeholder="ID del usuario"
        />
        <Button type="submit">Login</Button>
      </form>

      <Link to="/">
        <Button variant="ghost">Volver a la página principal</Button>
      </Link>
    </div>
  );
};
