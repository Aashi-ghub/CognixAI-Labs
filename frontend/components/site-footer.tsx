

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--section-dark)] text-[color:var(--text)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <img 
              src="/images/white logo.png" 
              alt="CognixAI Labs" 
              className="h-6 w-auto"
            />
            <p className="font-semibold text-[color:var(--text-strong)]">CognixAI Labs</p>
          </div>
          <p className="text-sm text-[color:var(--text-muted)]">Cinematic AI automations for modern teams.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-2 text-sm text-[color:var(--text)]">
            <li>
              <a href="#showcase" className="hover:text-[color:var(--text-strong)]">
                Solutions
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[color:var(--text-strong)]">
                About
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-[color:var(--text-strong)]">
                Clients
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[color:var(--text-strong)]">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-[color:var(--text-strong)]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-[color:var(--text-strong)]">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-[color:var(--text-strong)]">
                Cookies Policy
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-sm text-[color:var(--text-muted)]">Contact</p>
          <p className="text-sm text-[color:var(--text)]">
            <a href="mailto:hello@cognixailabs.com" className="hover:text-[color:var(--text-strong)]">hello@cognixailabs.com</a>
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href="#" aria-label="LinkedIn" className="hover:text-[color:var(--text-strong)]">
              LinkedIn
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[color:var(--text-strong)]">
              Twitter
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-[color:var(--text-strong)]">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--border)] py-4 text-center text-xs text-[color:var(--text-muted)]">
        © {new Date().getFullYear()} CognixAI Labs. All rights reserved.
      </div>
    </footer>
  )
}
