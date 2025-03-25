import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-8 mb-8">
            <Link
              href="https://github.com/KhanLux"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-7 w-7" />
              <span className="sr-only">GitHub</span>
            </Link>
            <div className="h-5 w-px bg-border" />
            <Link
              href="https://www.linkedin.com/in/kevin-collazos-783564224"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-7 w-7" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Created with passion by
            </p>
            <p className="text-xl font-semibold">
              KhanLux
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 