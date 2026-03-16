import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
