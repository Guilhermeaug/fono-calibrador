import { z } from "zod";

const REQUIRED_FIELD = "Campo obrigatório";

const formSchema = z.object({
  identifier: z.string().min(3, REQUIRED_FIELD),
  password: z.string().min(6, REQUIRED_FIELD),
});

const DEFAULT_VALUES = {
  identifier: "",
  password: "",
};

export { DEFAULT_VALUES, formSchema };
