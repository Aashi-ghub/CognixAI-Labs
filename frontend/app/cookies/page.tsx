"use client"

export default function CookiesPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-5xl mx-auto">
			<div className="mb-8">
				<div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
				<h1 className="text-3xl font-semibold tracking-tight mt-2">Cookies Policy</h1>
				<p className="text-muted-foreground mt-2 max-w-3xl">
					This policy explains how we use cookies and similar technologies on this website to
					enable core functionality, personalize your experience, and improve our services.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-[280px_1fr]">
				<section aria-label="Table of contents" className="md:sticky md:top-20 h-max">
					<div className="bg-card border rounded-xl p-4">
						<h2 className="text-sm font-medium text-muted-foreground">On this page</h2>
						<nav className="mt-3 grid gap-2 text-sm">
							<a className="hover:underline" href="#what-are-cookies">What are cookies</a>
							<a className="hover:underline" href="#types-of-cookies">Types of cookies</a>
							<a className="hover:underline" href="#how-we-use">How we use cookies</a>
							<a className="hover:underline" href="#managing-cookies">Managing cookies</a>
							<a className="hover:underline" href="#your-choices">Your choices</a>
							<a className="hover:underline" href="#contact">Contact</a>
						</nav>
					</div>
				</section>

				<section className="space-y-6">
					<div id="what-are-cookies" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">What are cookies?</h2>
						<p className="text-muted-foreground mt-2">
							Cookies are small text files stored on your device by your browser. They are
							required for core site functionality, and they help us remember your preferences
							and understand how the site is used.
						</p>
					</div>

					<div id="types-of-cookies" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Types of cookies we use</h2>
						<ul className="list-disc pl-6 mt-3 text-muted-foreground">
							<li>
								<span className="font-medium text-foreground">Essential</span>: Required for
								authentication, security, and core features.
							</li>
							<li>
								<span className="font-medium text-foreground">Preferences</span>: Remember your
								settings such as theme or language.
							</li>
							<li>
								<span className="font-medium text-foreground">Analytics</span>: Optional cookies (if
								enabled) that help us understand usage and improve performance.
							</li>
						</ul>
					</div>

					<div id="how-we-use" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">How we use cookies</h2>
						<p className="text-muted-foreground mt-2">
							We use cookies to keep you signed in, secure your account, remember preferences,
							and measure site performance. Where required, we request consent for non-essential
							cookies.
						</p>
					</div>

					<div id="managing-cookies" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Managing cookies</h2>
						<p className="text-muted-foreground mt-2">
							You can control cookies through your browser settings. Disabling some cookies may
							affect site functionality. For guidance, see your browser's help pages.
						</p>
					</div>

					<div id="your-choices" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Your choices</h2>
						<p className="text-muted-foreground mt-2">
							You may opt out of analytics cookies at any time where available. Essential
							cookies cannot be disabled because they are necessary for the website to
							function.
						</p>
					</div>

					<div className="bg-card border rounded-xl p-2">
						<details className="group">
							<summary className="cursor-pointer list-none p-4 text-sm font-medium flex items-center justify-between">
								<span>FAQs about cookies</span>
								<span className="text-muted-foreground">▼</span>
							</summary>
							<div className="px-4 pb-4 text-sm text-muted-foreground grid gap-3">
								<div>
									<p className="font-medium text-foreground">Do we sell your data?</p>
									<p>No.</p>
								</div>
								<div>
									<p className="font-medium text-foreground">Can you browse without cookies?</p>
									<p>Essential cookies are required; you can disable optional cookies.</p>
								</div>
							</div>
						</details>
					</div>

					<div id="contact" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Contact</h2>
						<p className="text-muted-foreground mt-2">
							For questions about this policy, contact
							{' '}<a className="underline" href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>.
						</p>
					</div>
				</section>
			</div>
		</main>
	)
}
