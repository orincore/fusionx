import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | FusionX",
  description: "Terms & Conditions for FusionX events, ticket purchases, and services by GlitzFusion.",
  openGraph: {
    title: "Terms & Conditions | FusionX",
    description: "Terms & Conditions for FusionX events, ticket purchases, and services by GlitzFusion.",
  },
};

export default function TermsPage() {
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
            Terms & Conditions
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
              Welcome to <strong className="text-emerald-400">FusionX</strong>. These Terms & Conditions govern your use of our website (
              <a href="https://fusionx.glitzfusion.in" className="text-emerald-400 hover:text-emerald-300">
                fusionx.glitzfusion.in
              </a>
              ), event bookings, ticket purchases, passes, and all related services.
              By accessing, browsing, or purchasing from our website, you agree to the following terms.
            </p>
            <p className="mt-4 text-zinc-300">
              <strong>If you do not agree, please discontinue using the site.</strong>
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">1. About FusionX</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                FusionX is an event creation, entertainment, and experience-based company offering:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Event tickets & passes</li>
                <li>• Themed parties, festivals, concerts, workshops, and entertainment events</li>
                <li>• Special access passes, VIP entries, and premium experiences</li>
                <li>• Merchandise, add-ons, and event-related services</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                All events and services are subject to availability and may change without notice.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">2. Acceptance of Terms</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                By purchasing a ticket or accessing our services, you confirm that you:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Are at least 18 years old or have valid guardian consent</li>
                <li>• Understand all event guidelines and entry rules</li>
                <li>• Agree to follow venue-specific policies and government guidelines</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                FusionX reserves the right to modify these terms anytime.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">3. Ticket Purchase Policy</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                When you purchase a ticket or pass from FusionX:
              </p>
              
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">3.1. Ticket Confirmation</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• You will receive a digital confirmation via email/SMS/WhatsApp</li>
                  <li>• Entry will be granted only upon showing a valid digital or printed pass</li>
                  <li>• A government-issued ID may be required at the venue</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-emerald-300">3.2. Pricing</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• All ticket prices are listed inclusive or exclusive of taxes as applicable</li>
                  <li>• Prices may change anytime without prior notice</li>
                  <li>• Early-bird, VIP, and limited passes are subject to availability</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">4. Refund, Cancellation & Transfer Policy</h2>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
              <p className="mb-4 text-zinc-200 font-medium">
                All ticket sales are <strong className="text-red-400">FINAL & NON-REFUNDABLE</strong>, except when:
              </p>
              <ul className="mb-6 space-y-2 text-zinc-300">
                <li>• The event is fully cancelled by FusionX</li>
                <li>• The event is postponed and you opt-out within the allowed window</li>
                <li>• The venue denies entry for reasons not caused by the attendee</li>
              </ul>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-red-300">4.1. Non-Refundable Situations</h3>
                <p className="mb-3 text-zinc-200">No refund will be provided for:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• No-shows or late arrivals</li>
                  <li>• Personal issues, travel delays, or emergencies</li>
                  <li>• Misbehavior, violation of event rules, or intoxication</li>
                  <li>• Change of mind</li>
                  <li>• Wrong date selection</li>
                  <li>• Inability to attend after purchase</li>
                  <li>• Weather issues unless the event is fully cancelled</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-red-300">4.2. Ticket Transfers</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Tickets cannot be resold or transferred without official approval</li>
                  <li>• Unauthorized resale may result in cancellation of the ticket without refund</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">5. Event Rules & Entry Conditions</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                By purchasing a ticket, you agree to follow:
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">5.1. Entry Rights</h3>
                <p className="mb-3 text-zinc-200">FusionX and the venue reserve the right to deny entry or remove any person for:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Misconduct</li>
                  <li>• Harassment or disturbance</li>
                  <li>• Being under the influence beyond acceptable limits</li>
                  <li>• Not following rules or staff instructions</li>
                  <li>• Carrying prohibited items</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">5.2. Age Restrictions</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Some events may be 18+ or 21+</li>
                  <li>• If you fail to meet the age criteria, entry will be denied without refund</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-emerald-300">5.3. Bag & Security Checks</h3>
                <p className="mb-3 text-zinc-200">Mandatory security checks will be conducted. Prohibited items include:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Weapons</li>
                  <li>• Drugs</li>
                  <li>• Outside food & alcohol</li>
                  <li>• Hazardous objects</li>
                  <li>• Recording equipment (depending on event)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">6. Event Changes & Cancellations</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                FusionX reserves the right to:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Change the date, venue, artist lineup, timings, or schedule</li>
                <li>• Delay or modify the event due to weather, technical issues, or safety concerns</li>
                <li>• Cancel an event due to emergencies, government restrictions, or logistics issues</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                In case of cancellation, the refund amount (if any) will be communicated officially.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">7. No Liability Clause</h2>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                FusionX is not responsible for:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Personal injury, theft, or loss of belongings</li>
                <li>• Issues caused by third-party vendors, partners, or venue staff</li>
                <li>• Travel costs, accommodation, or other expenses if event is cancelled or rescheduled</li>
                <li>• Any technical glitches, server downtime, or payment gateway failures</li>
              </ul>
              <p className="text-yellow-300 font-medium">
                Attendees participate in events at their own risk.
              </p>
            </div>
          </section>

          {/* Sections 8-13 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">8. Payment & Billing</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                All payments made through the website are processed securely via trusted gateways. You agree that:
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li>• You are authorized to use the provided payment method</li>
                <li>• Payment confirmations are final</li>
                <li>• Chargebacks or fraudulent claims may result in legal action</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">9. Media & Content Usage</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                By attending a FusionX event, you consent to:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Being photographed or filmed</li>
                <li>• Your images being used in promotions, reels, aftermovies, live coverage, or marketing material</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                No compensation is provided for such usage.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">10. Intellectual Property</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                All content on this website including text, logos, event titles, graphics, videos, layouts, and designs belong exclusively to FusionX.
              </p>
              <p className="text-zinc-300">
                You may not copy, reuse, distribute, or modify any content without permission.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">11. Third-Party Links</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                Our website may include links to payment providers, partners, or external event pages. FusionX is not responsible for:
              </p>
              <ul className="space-y-2 text-zinc-300">
                <li>• External privacy practices</li>
                <li>• Security of other websites</li>
                <li>• Third-party service failures</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">12. Governing Law</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="text-zinc-200">
                These Terms are governed by the laws of India, under the jurisdiction of Mumbai, Maharashtra.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">13. Contact Information</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                For queries regarding events, bookings, or ticket policies:
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
                  <span>FusionX, Mumbai</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <div className="mt-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <p className="text-zinc-300">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Thank you for choosing FusionX for your entertainment experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
