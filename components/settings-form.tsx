"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import {
  NameField,
  EmailField,
  CurrencyField,
  DarkModeField,
  EmailNotificationsField,
} from "@/components/ui/settings-form-fields"
import { useSettingsForm } from "@/hooks/use-settings-form"
import { SettingsFormProps } from "@/types/settings-form"

export function SettingsForm({ className, defaultValues, onSubmit }: SettingsFormProps) {
  const { form, handleSubmit } = useSettingsForm(defaultValues, onSubmit)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <NameField form={form} />
              <EmailField form={form} />
              <CurrencyField form={form} />
              <DarkModeField form={form} />
              <EmailNotificationsField form={form} />
            </div>
            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

