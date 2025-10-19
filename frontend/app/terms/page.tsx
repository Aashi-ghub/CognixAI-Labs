"use client"

export default function TermsPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-5xl mx-auto">
			<div className="mb-8">
				<div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
				<h1 className="text-3xl font-semibold tracking-tight mt-2">Terms of Service</h1>
				<p className="text-muted-foreground mt-2 max-w-3xl">
					Please read these Terms carefully before using our website and services.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-[280px_1fr]">
				<section aria-label="Table of contents" className="md:sticky md:top-20 h-max">
					<div className="bg-card border rounded-xl p-4">
						<h2 className="text-sm font-medium text-muted-foreground">On this page</h2>
						<nav className="mt-3 grid gap-2 text-sm">
							<a className="hover:underline" href="#agreement">Agreement</a>
							<a className="hover:underline" href="#use-of-services">Use of services</a>
							<a className="hover:underline" href="#accounts">Accounts</a>
							<a className="hover:underline" href="#ip">Intellectual property</a>
							<a className="hover:underline" href="#disclaimers">Disclaimers</a>
							<a className="hover:underline" href="#liability">Limitation of liability</a>
							<a className="hover:underline" href="#contact">Contact</a>
						</nav>
					</div>
				</section>

				<section className="space-y-6">
					<div id="agreement" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Agreement</h2>
						<p className="text-muted-foreground mt-2">
							By accessing or using this site, you agree to be bound by these Terms. If you do not
							agree, do not use the site.
						</p>
					</div>

					<div id="use-of-services" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Use of services</h2>
						<ul className="list-disc pl-6 mt-3 text-muted-foreground">
							<li>Do not misuse or attempt to disrupt the service.</li>
							<li>Comply with applicable laws and third‑party rights.</li>
						</ul>
					</div>

					<div id="accounts" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Accounts</h2>
						<p className="text-muted-foreground mt-2">
							You are responsible for maintaining the confidentiality of your account and for all
							activities under it.
						</p>
					</div>

					<div id="ip" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Intellectual property</h2>
						<p className="text-muted-foreground mt-2">
							All content, trademarks, and logos are the property of their respective owners.
						</p>
					</div>

					<div id="disclaimers" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Disclaimers</h2>
						<p className="text-muted-foreground mt-2">
							Services are provided "as is" without warranties of any kind to the fullest extent
							permitted by law.
						</p>
					</div>

					<div id="liability" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Limitation of liability</h2>
						<p className="text-muted-foreground mt-2">
							To the maximum extent permitted by law, we are not liable for any indirect or
							consequential damages arising from use of the service.
						</p>
					</div>

					<div id="contact" className="bg-card border rounded-xl p-6">
						<h2 className="text-xl font-semibold">Contact</h2>
						<p className="text-muted-foreground mt-2">
							For questions about these Terms, contact
							{' '}<a className="underline" href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>.
						</p>
					</div>
				</section>
			</div>
		</main>
	)
}
