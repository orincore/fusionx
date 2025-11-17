import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | FusionX",
  description: "Refund & Cancellation Policy for FusionX events, ticket purchases, and services by GlitzFusion.",
  openGraph: {
    title: "Refund & Cancellation Policy | FusionX",
    description: "Refund & Cancellation Policy for FusionX events, ticket purchases, and services by GlitzFusion.",
  },
};

export default function RefundPolicyPage() {
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
            Refund & Cancellation Policy
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
              Thank you for choosing <strong className="text-emerald-400">FusionX</strong>. This Refund & Cancellation Policy applies to all event tickets, passes, add-ons, and any purchases made through{" "}
              <a href="https://fusionx.glitzfusion.in" className="text-emerald-400 hover:text-emerald-300">
                fusionx.glitzfusion.in
              </a>.
            </p>
            <p className="mt-4 text-zinc-300">
              By purchasing from us, you acknowledge and agree to the terms stated below.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">1. General Refund Policy</h2>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
              <p className="mb-4 text-zinc-200 font-medium">
                All ticket purchases made through FusionX are <strong className="text-red-400">FINAL & NON-REFUNDABLE</strong>, except under specific circumstances outlined in this policy.
              </p>
              <p className="text-zinc-300">
                FusionX events involve advance bookings, venue arrangements, artist bookings, and other fixed costs; therefore, refunds are not possible for most user-initiated cancellations.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">2. Non-Refundable Situations</h2>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
              <p className="mb-6 text-zinc-200 font-medium">
                A refund will <strong className="text-red-400">NOT</strong> be provided in the following situations:
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-red-300">2.1 Customer-Related Reasons</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Change of mind</li>
                  <li>• Incorrect date or event selection</li>
                  <li>• Inability to attend</li>
                  <li>• Scheduling conflicts</li>
                  <li>• Travel issues or delays</li>
                  <li>• Personal emergencies</li>
                  <li>• Late arrival or no-show</li>
                  <li>• Age restriction mismatch (e.g., 18+/21+ events)</li>
                  <li>• Entry denied due to intoxication or misconduct</li>
                  <li>• Violation of event rules or venue policies</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-red-300">2.2 Misuse or Unauthorized Activity</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Tickets purchased from unauthorized sellers</li>
                  <li>• Unauthorized reselling or transferring of passes</li>
                  <li>• Fraudulent transactions</li>
                  <li>• Duplicate or incorrect email entries</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">3. Eligible Refund Situations</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-6 text-zinc-200">
                A refund may be provided only if:
              </p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">3.1 Event Cancellation</h3>
                <p className="mb-3 text-zinc-200">If FusionX fully cancels an event without a rescheduled date, we will:</p>
                <ul className="mb-4 space-y-2 text-zinc-300">
                  <li>• Issue a refund automatically, OR</li>
                  <li>• Provide a credit voucher usable for future FusionX events</li>
                </ul>
                <p className="text-sm text-zinc-400">
                  <strong>Refund timeline:</strong> 5–14 working days depending on the bank/payment gateway.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-emerald-300">3.2 Event Postponement</h3>
                <p className="mb-3 text-zinc-200">If the event is rescheduled:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Your ticket remains valid for the new date</li>
                  <li>• If you cannot attend the new date, you may request a refund within <strong className="text-emerald-400">72 hours</strong> of the official announcement</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-emerald-300">3.3 Venue or Organizer Denial (Not Customer Fault)</h3>
                <p className="mb-3 text-zinc-200">Refunds may apply if:</p>
                <ul className="mb-4 space-y-2 text-zinc-300">
                  <li>• You were denied entry due to overselling or venue capacity mismanagement</li>
                  <li>• The event was stopped mid-way due to technical issues caused by the organizer</li>
                </ul>
                <p className="text-sm text-zinc-400">
                  Each case will be reviewed individually.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">4. Ticket Transfers & Resale</h2>
            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-6">
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-yellow-300">4.1 Transfers</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Ticket transfers may be allowed only after official approval by FusionX</li>
                  <li>• Unauthorized transfers may lead to cancellation without refund</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium text-yellow-300">4.2 Resale</h3>
                <p className="mb-3 text-zinc-200">Reselling tickets at inflated or unapproved prices is strictly prohibited and may lead to both:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Ticket cancellation</li>
                  <li>• Permanent ban from future FusionX events</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">5. Event Modifications (No Refund)</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                Refunds are not provided if:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Artist lineup changes</li>
                <li>• Set timings change</li>
                <li>• Venue layout changes</li>
                <li>• Event duration changes</li>
                <li>• Seating or standing zones are altered due to safety or logistics</li>
                <li>• Weather delays or temporary halts</li>
              </ul>
              <p className="text-zinc-400 text-sm">
                Events may be modified due to safety, legal, or operational reasons.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">6. Weather & Safety Conditions</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                Most FusionX events are weather-safe. Refunds are not given for:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Rain</li>
                <li>• Storm</li>
                <li>• Heat conditions</li>
              </ul>
              <p className="mb-4 text-zinc-300">
                unless the event is officially cancelled.
              </p>
              <p className="text-zinc-400 text-sm">
                Safety-related pauses or delays do not qualify for refunds.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">7. Payment Gateway Charges</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                If a refund is approved, any:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Payment gateway fees</li>
                <li>• Processing charges</li>
              </ul>
              <p className="mb-4 text-zinc-300">
                may be deducted depending on gateway rules.
              </p>
              <p className="text-zinc-400 text-sm">
                FusionX is not responsible for delays caused by your bank or payment provider.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">8. How to Request a Refund (If Applicable)</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                If your situation fits the eligible refund categories:
              </p>
              
              <div className="mb-6">
                <p className="mb-3 text-zinc-200 font-medium">Email us at:</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-emerald-400">📩</span>
                  <a href="mailto:fusionx@glitzfusion.in" className="text-emerald-400 hover:text-emerald-300">
                    fusionx@glitzfusion.in
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-3 text-zinc-200 font-medium">Include:</p>
                <ul className="space-y-2 text-zinc-300">
                  <li>• Full Name</li>
                  <li>• Registered Email / Phone</li>
                  <li>• Ticket ID / Order ID</li>
                  <li>• Event Name</li>
                  <li>• Reason for Refund Request</li>
                </ul>
              </div>

              <p className="text-emerald-300 font-medium">
                Our team will respond within 48–72 hours.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">9. No Cash Refunds</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-zinc-200">
                All approved refunds will be processed via:
              </p>
              <ul className="mb-4 space-y-2 text-zinc-300">
                <li>• Original payment method, OR</li>
                <li>• FusionX credit vouchers</li>
              </ul>
              <p className="text-zinc-300 font-medium">
                No cash refunds will be provided under any circumstances.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold text-emerald-400">10. Contact Information</h2>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="mb-4 text-zinc-200">
                For all refund or event-related questions:
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
          <div className="mt-12 rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-zinc-200 font-medium">
              Please read this policy carefully before making any purchase. All sales are final unless explicitly covered under eligible refund situations.
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              This policy is designed to ensure fairness while maintaining the sustainability of our events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
