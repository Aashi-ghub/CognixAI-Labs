"use client"

export default function TermsPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-3xl mx-auto prose prose-invert">
			<h1>Terms of Service</h1>
			<p>Last updated: {new Date().toLocaleDateString()}</p>

			<h2>Agreement</h2>
			<p>
				By accessing or using this site, you agree to be bound by these Terms. If you do not
				agree, do not use the site.
			</p>

			<h2>Use of Services</h2>
			<ul>
				<li>Do not misuse or attempt to disrupt the service.</li>
				<li>Comply with applicable laws and third‑party rights.</li>
			</ul>

			<h2>Accounts</h2>
			<p>
				You are responsible for maintaining the confidentiality of your account and for all
				activities under it.
			</p>

			<h2>Intellectual Property</h2>
			<p>
				All content, trademarks, and logos are the property of their respective owners.
			</p>

			<h2>Disclaimers</h2>
			<p>
				Services are provided "as is" without warranties of any kind to the fullest extent
				permitted by law.
			</p>

			<h2>Limitation of Liability</h2>
			<p>
				To the maximum extent permitted by law, we are not liable for any indirect or
				consequential damages arising from use of the service.
			</p>

			<h2>Contact</h2>
			<p>
				For questions about these Terms, contact: <a href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>
			</p>
		</main>
	)
}
