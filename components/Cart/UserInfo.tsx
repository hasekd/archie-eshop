import { useForm, SubmitHandler } from "react-hook-form";
import { theme } from "../../styles/theme";
import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const UserInfo = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <FormControl
        width={{ base: "27rem", sm: "40rem" }}
        margin="3rem auto"
        p={"0 1rem"}
      >
        <FormLabel fontWeight={"bold"}>Jmeno</FormLabel>
        <Input {...register("name")} placeholder="Jmeno" />

        <FormLabel mt="1rem" fontWeight={"bold"}>
          E-mail
        </FormLabel>
        <Input {...register("email")} placeholder="E-mail" type={"email"} />

        <FormLabel mt="1rem" fontWeight={"bold"}>
          Zprava
        </FormLabel>
        <Textarea {...register("message")} minHeight="15rem" />

        <Button
          mt="1rem"
          ml={"50%"}
          transform={"translateX(-50%)"}
          bg={theme.color.primary.orange}
          color={theme.color.text.white}
          _hover={{ bgColor: "#b8772a" }}
          size={{ base: "lg", sm: "md" }}
          type="submit"
        >
          Odeslat
        </Button>
      </FormControl>
    </form>
  );
};

export default UserInfo;
