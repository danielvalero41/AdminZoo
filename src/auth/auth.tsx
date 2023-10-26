import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo no es valido" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener minimo 8 caracteres" })
    .regex(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      ),
      {
        message:
          "La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial",
      }
    ),
});

type FormInput = {
  email: string;
  password: string;
};

export const AuthLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ fontSize: "1.2rem", fontWeight: 600, marginTop: "40px" }}
      >
        Inicio de sesión
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "20%",
        }}
      >
        <TextField
          {...register("email")}
          margin="dense"
          fullWidth
          type="text"
          label="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          margin="dense"
          fullWidth
          label="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button type="submit" sx={{ marginTop: "16px" }}>
          Login
        </Button>
      </form>
    </Box>
  );
};
