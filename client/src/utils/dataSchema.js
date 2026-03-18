import { z } from "zod";

export const validateRegisterUserSchema = z.object({
  email: z.string().email({
    message: "A valid email is required",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

export const validateLoginUserSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

// export const validateTaskSchema = z.object({
//   title: z.string().min(3, "Title must be at least 3 characters").max(100),
//   description: z.string().min(5, "Description is too short"),
//   tag: z.string().optional(),
// });
