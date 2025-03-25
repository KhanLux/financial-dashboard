import { UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SettingsFormValues } from "@/types/settings-form"

interface SettingsFormFieldsProps {
  form: UseFormReturn<SettingsFormValues>
}

export function NameField({ form }: SettingsFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Your name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function EmailField({ form }: SettingsFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Your email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function CurrencyField({ form }: SettingsFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <FormControl>
            <Input placeholder="USD" {...field} />
          </FormControl>
          <FormDescription>The currency used to display amounts</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DarkModeField({ form }: SettingsFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="darkMode"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Dark Mode</FormLabel>
            <FormDescription>Enable dark mode for the dashboard</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export function EmailNotificationsField({ form }: SettingsFormFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="emailNotifications"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Email Notifications</FormLabel>
            <FormDescription>Receive email notifications for important updates</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  )
} 