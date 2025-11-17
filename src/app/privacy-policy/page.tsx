import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FusionX",
  description: "Privacy Policy for FusionX website, event bookings, and data protection by GlitzFusion.",
  openGraph: {
    title: "Privacy Policy | FusionX",
    description: "Privacy Policy for FusionX website, event bookings, and data protection by GlitzFusion.",
  },
};

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-zinc-300">
            Last Updated: {currentDate}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-emerald max-w-none">
          {/* Introduction */}
          <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-zinc-200 leading-relaxed">
              <strong className="text-emerald-400">FusionX</strong> ("we", "our", "us") operates the website{" "}
              <a href="https://fusionx.glitzfusion.in" className="text-emerald-400 hover:text-emerald-300">
                fusionx.glitzfusion.in
              </a>.
              We are committed to protecting your privacy and ensuring a safe online experience.
            </p>
            <p className="mt-4 text-zinc-300">
              This Privacy Policy explains how we collect, use, store, and protect your information when you access our website, purchase tickets, register for events, or interact with any FusionX services.
            </p>
            <p className="mt-4 text-zinc-300 font-medium">
              By using our website, you agree to the terms described in this policy.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">1. Information We Collect</h2>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-6">
              <p className="mb-6 text-zinc-200">
                We collect two types of information:
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-blue-300">1.1. Personal Information</h3>
                <p className="mb-3 text-zinc-200">When you engage with FusionX, you may provide:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Full Name</li>
                  <li>• Email Address</li>
                  <li>• Phone Number</li>
                  <li>• Date of Birth (for age-restricted events)</li>
                  <li>• Billing Address (if required)</li>
                  <li>• Payment-related details (processed via secure third-party gateways)</li>
                  <li>• ID Proof (for VIP events or age verification)</li>
                  <li>• Social media handles (if login/marketing permissions are given)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-blue-300">1.2. Non-Personal Information</h3>
                <p className="mb-3 text-zinc-200">Automatically collected through website usage:</p>
                <ul className="mb-4 space-y-2 text-zinc-300">
                  <li>• Browser type</li>
                  <li>• Device information</li>
                  <li>• IP address</li>
                  <li>• Pages visited</li>
                  <li>• Session duration</li>
                  <li>• Click behavior</li>
                  <li>• Cookies and analytical tracking data</li>
                </ul>
                <p className="text-zinc-400 text-sm">
                  This helps us improve website performance and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">2. How We Use Your Information</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-6 text-zinc-200">
                FusionX uses collected information to:
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">2.1. Deliver Core Services</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Process ticket purchases</li>
                  <li>• Generate and send digital passes</li>
                  <li>• Verify age/identity for selected events</li>
                  <li>• Provide customer support</li>
                  <li>• Communicate event updates, timings, safety guidelines, etc.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">2.2. Improve User Experience</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Website performance optimization</li>
                  <li>• User behavior analysis</li>
                  <li>• Event and content personalization</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-emerald-300">2.3. Marketing & Communication</h3>
                <p className="mb-3 text-zinc-200">With your consent, we may use your information to send:</p>
                <ul className="mb-4 space-y-2 text-zinc-300">
                  <li>• Event announcements</li>
                  <li>• Early-bird offers</li>
                  <li>• Discounts and promotions</li>
                  <li>• Updates on upcoming FusionX events</li>
                </ul>
                <p className="text-emerald-300 font-medium">
                  You may opt-out anytime by clicking "unsubscribe" or contacting us.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">3. Payment Information</h2>
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-6">
              <p className="mb-4 text-zinc-200 font-medium">
                <strong className="text-green-400">FusionX does not store</strong> your credit card, debit card, UPI, or banking information.
              </p>
              <p className="mb-4 text-zinc-300">
                All payments are securely processed by trusted third-party gateways (e.g., Razorpay, Stripe, Paytm, etc.).
              </p>
              <p className="text-zinc-400 text-sm">
                These platforms comply with industry security standards such as PCI-DSS.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">4. How We Share Your Data</h2>
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-6">
              <p className="mb-6 text-zinc-200 font-medium">
                We respect your privacy. We do <strong className="text-purple-400">NOT sell or rent</strong> your data.
              </p>
              <p className="mb-4 text-zinc-200">We may share your information only with:</p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-purple-300">4.1. Service Providers</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Payment gateways</li>
                  <li>• SMS/email service providers</li>
                  <li>• Event venues or partners (only if required for entry or security)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-purple-300">4.2. Legal Requirements</h3>
                <p className="mb-3 text-zinc-200">We may share information if required by:</p>
                <ul className="mb-4 space-y-2 text-zinc-300">
                  <li>• Law enforcement</li>
                  <li>• Court order</li>
                  <li>• Government authorities</li>
                </ul>
                <p className="text-zinc-400 text-sm">
                  This will only be done when legally necessary.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">5. Cookies & Tracking Technologies</h2>
            <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                We use cookies and similar technologies to:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Improve site functionality</li>
                <li>• Remember your preferences</li>
                <li>• Analyze traffic & user behavior</li>
                <li>• Enhance event discovery and personalization</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                You can disable cookies via your browser settings, but certain website functions may not work properly.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">6. Data Protection & Security</h2>
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                We use industry-standard security measures to protect your data including:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• SSL Encryption</li>
                <li>• Firewall protection</li>
                <li>• Restricted-access servers</li>
                <li>• Secure third-party payment gateways</li>
              </ul>
              <p className="text-yellow-300 font-medium">
                However, no system is 100% secure. Users share information at their own risk.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">7. Data Retention</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                We retain your information only as long as necessary for:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Legal compliance</li>
                <li>• Event participation</li>
                <li>• Customer support</li>
                <li>• Accounting or audit requirements</li>
              </ul>
              <p className="text-emerald-300 font-medium">
                You may request deletion of your data anytime (unless legally restricted).
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">8. Age Restrictions</h2>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                FusionX does not knowingly collect personal information from individuals under 18 years without parental consent.
              </p>
              <p className="text-zinc-300">
                Age-restricted events (18+/21+) require valid ID proof at entry.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">9. Your Rights</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                Depending on your location and applicable laws, you may:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Request access to your data</li>
                <li>• Request correction or updates</li>
                <li>• Request deletion of your information</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Request details of how your data is used</li>
              </ul>
              <p className="text-emerald-300 font-medium">
                Contact us to raise any such request.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">10. Third-Party Links</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                Our website may link to:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Social media platforms</li>
                <li>• Payment gateways</li>
                <li>• Partner event pages</li>
                <li>• External resources</li>
              </ul>
              <p className="mb-4 text-zinc-300">
                FusionX is not responsible for external privacy practices.
              </p>
              <p className="text-zinc-400 text-sm">
                We recommend reading third-party privacy policies.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">11. Changes to This Policy</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                FusionX may update this Privacy Policy at any time. Changes will be posted with a new "Last Updated" date.
              </p>
              <p className="text-zinc-300 font-medium">
                Continuing to use the website after updates means you accept the changes.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">12. Contact Information</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                For any privacy-related questions, concerns, or data requests:
              </p>
              <div className="space-y-3 text-zinc-300">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">📩</span>
                  <a href="mailto:fusionx@glitzfusion.in" className="text-emerald-400 hover:text-emerald-300">
                    fusionx@glitzfusion.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">📞</span>
                  <div className="space-x-4">
                    <a href="tel:7841910619" className="text-emerald-400 hover:text-emerald-300">
                      7841910619
                    </a>
                    <span className="text-zinc-500">/</span>
                    <a href="tel:70030514457" className="text-emerald-400 hover:text-emerald-300">
                      70030514457
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">📍</span>
                  <span>FusionX, Mumbai, India</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="mt-12 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
            <p className="text-zinc-200 font-medium">
              Your privacy is important to us. We are committed to protecting your personal information and being transparent about our data practices.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              If you have any questions about this Privacy Policy, please don't hesitate to contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
