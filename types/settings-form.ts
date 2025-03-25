import { z } from "zod"

export const settingsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  currency: z.string().min(1, {
    message: "Please select a currency.",
  }),
  darkMode: z.boolean().default(false),
  emailNotifications: z.boolean().default(true),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>

export interface SettingsFormProps {
  className?: string
  defaultValues?: Partial<SettingsFormValues>
  onSubmit?: (values: SettingsFormValues) => void
} 