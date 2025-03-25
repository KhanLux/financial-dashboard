import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold">Settings</h1>
        <SettingsForm />
      </div>
    </div>
  )
}

