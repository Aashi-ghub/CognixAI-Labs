"use client"

export default function PrivacyPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-5xl mx-auto">
			<div className="mb-8">
				<div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
				<h1 className="text-3xl font-semibold tracking-tight mt-2">Privacy Policy</h1>
				<p className="text-muted-foreground mt-2 max-w-3xl">
					Your privacy matters. This Privacy Policy describes what data we collect, how we use
					it, and the rights available to you.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-[280px_1fr]">
				<section aria-label="Table of contents" className="md:sticky md:top-20 h-max">
					<div className="bg-card border rounded-xl p-4">
						<h2 className="text-sm font-medium text-muted-foreground">On this page</h2>
						<nav className="mt-3 grid gap-2 text-sm">
							<a className="hover:underline" href="#what-we-collect">Information we collect</a>
							<a className="hover:underline" href="#how-we-use">How we use information</a>
							<a className="hover:underline" href="#legal-bases">Legal bases</a>
							<a className="hover:underline" href="#cookies">Cookies</a>
							<a className="hover:underline" href="#retention">Data retention</a>
							<a className="hover:underline" href="#rights">Your rights</a>
							<a className="hover:underline" href="#contact">Contact</a>
						</nav>
					</div>
				</section>

				<section className="space-y-6">
					<div id="what-we-collect" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Information we collect</h2>
						<ul className="list-disc pl-6 mt-3 text-muted-foreground">
							<li>Contact details you submit (e.g., name, email, company)</li>
							<li>Usage data such as device, pages viewed, and interactions</li>
							<li>Authentication details handled by our identity provider</li>
						</ul>
					</div>

					<div id="how-we-use" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">How we use information</h2>
						<ul className="list-disc pl-6 mt-3 text-muted-foreground">
							<li>Provide and improve our services</li>
							<li>Respond to enquiries and support requests</li>
							<li>Maintain security and prevent abuse</li>
						</ul>
					</div>

					<div id="legal-bases" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Legal bases</h2>
						<p className="text-muted-foreground mt-2">
							Where applicable, our processing is based on legitimate interests, performance of a
							contract, compliance with legal obligations, or your consent.
						</p>
					</div>

					<div id="cookies" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Cookies</h2>
						<p className="text-muted-foreground mt-2">
							We use essential cookies for site functionality and optional analytics cookies to
							understand usage. You can control cookies in your browser settings.
						</p>
						<p className="text-muted-foreground mt-2">
							See also our <a className="underline" href="/cookies">Cookies Policy</a> for more
							detail.
						</p>
					</div>

					<div id="retention" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Data retention</h2>
						<p className="text-muted-foreground mt-2">
							We retain information only as long as necessary for the purposes outlined here or as
							required by law.
						</p>
					</div>

					<div id="rights" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Your rights</h2>
						<p className="text-muted-foreground mt-2">
							Subject to applicable law, you may request access, correction, or deletion of your
							information, and object to or restrict certain processing.
						</p>
					</div>

					<div id="contact" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Contact</h2>
						<p className="text-muted-foreground mt-2">
							For privacy enquiries, contact us at
							{' '}<a className="underline" href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>.
						</p>
					</div>
				</section>
			</div>
		</main>
	)
}
