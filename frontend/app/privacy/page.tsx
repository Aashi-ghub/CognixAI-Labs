"use client"

export default function PrivacyPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-3xl mx-auto prose prose-invert">
			<h1>Privacy Policy</h1>
			<p>Last updated: {new Date().toLocaleDateString()}</p>

			<p>
				This Privacy Policy explains how we collect, use, and safeguard information when you
				use our website and services. By using this site, you agree to this Policy.
			</p>

			<h2>Information We Collect</h2>
			<ul>
				<li>Contact details you submit (e.g., name, email, company)</li>
				<li>Usage data such as device, pages viewed, and interactions</li>
				<li>Authentication details handled by our identity provider</li>
			</ul>

			<h2>How We Use Information</h2>
			<ul>
				<li>Provide and improve our services</li>
				<li>Respond to enquiries and support requests</li>
				<li>Maintain security and prevent abuse</li>
			</ul>

			<h2>Cookies</h2>
			<p>
				We use essential cookies for site functionality and optional analytics cookies to
				understand usage. You can control cookies in your browser settings.
			</p>

			<h2>Data Retention</h2>
			<p>
				We retain information only as long as necessary for the purposes outlined here or as
				required by law.
			</p>

			<h2>Your Rights</h2>
			<p>
				You may request access, correction, or deletion of your information where applicable.
			</p>

			<h2>Contact</h2>
			<p>
				For privacy enquiries, contact us at: <a href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>
			</p>
		</main>
	)
}
