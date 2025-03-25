import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { settingsFormSchema, SettingsFormValues } from "@/types/settings-form"

const defaultValues: SettingsFormValues = {
  name: "John Doe",
  email: "john.doe@example.com",
  currency: "USD",
  darkMode: false,
  emailNotifications: true,
}

export function useSettingsForm(
  initialValues: Partial<SettingsFormValues> = {},
  onSubmit?: (values: SettingsFormValues) => void,
) {
  const { toast } = useToast()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  })

  const handleSubmit = (values: SettingsFormValues) => {
    onSubmit?.(values)
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    })
  }

  return {
    form,
    handleSubmit,
  }
} 