import { ZodError } from "zod";

export const validateFormData = (schema) => (req, res, next) => {
  try {
    //recievee the form from the req.body and transform via zod
    const parsedData = schema.parse(req.body); //run schema validation against form data
    req.body = parsedData; //transformed formData with no error - validation passed
    next(); //call the next action that is supposed to happen - invoke the controller function
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.issues.map((issue) => ({
        message: `${issue.message}`,
      }));
      return res.status(400).json({
        error: "Error validating form data",
        details: errorMsg,
      });
    }
    next(error);
  }
};
