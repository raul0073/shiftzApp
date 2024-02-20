import { useState } from 'react';
import { ZodIssue, ZodSchema, z } from 'zod';

interface UseZodValidationProps {
  [key: string]: any;
}

interface UseZodValidationResult {
  formData: UseZodValidationProps;
  validationErrors: ZodIssue | null;
  validateField: (fieldName: string, value: string | number) => Promise<void>;
}

const useZodValidation = (
  initialData: UseZodValidationProps,
  schema: ZodSchema
): UseZodValidationResult => {
  const [formData, setFormData] = useState<UseZodValidationProps>(initialData);
  const [validationErrors, setValidationErrors] = useState<ZodIssue | null>(null);

  const validateField = async (fieldName: string, value: string | number): Promise<void> => {
    try {
      const updatedFormData = { ...formData, [fieldName]: value };
      await schema.parseAsync(updatedFormData);
      setValidationErrors(null);
      setFormData(updatedFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === fieldName);
        setValidationErrors(fieldError || null);
      }
    }
  };

  return { formData, validationErrors, validateField };
};

export default useZodValidation;
