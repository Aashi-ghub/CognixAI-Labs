"use client"

export default function CookiesPage() {
	return (
		<main className="min-h-[80vh] px-4 py-10 max-w-3xl mx-auto prose prose-invert">
			<h1>Cookies Policy</h1>
			<p>Last updated: {new Date().toLocaleDateString()}</p>

			<p>
				This policy explains how we use cookies and similar technologies on this website.
			</p>

			<h2>What Are Cookies?</h2>
			<p>
				Cookies are small text files stored on your device to enable core functionality and
				improve your experience.
			</p>

			<h2>How We Use Cookies</h2>
			<ul>
				<li>Essential cookies for authentication and security</li>
				<li>Preference cookies to remember your settings</li>
				<li>Optional analytics to understand site usage (if enabled)</li>
			</ul>

			<h2>Managing Cookies</h2>
			<p>
				You can control cookies through your browser settings. Disabling some cookies may
				affect site functionality.
			</p>

			<h2>Contact</h2>
			<p>
				For questions about this policy, contact: <a href="mailto:hello@cognixailabs.com">hello@cognixailabs.com</a>
			</p>
		</main>
	)
}
