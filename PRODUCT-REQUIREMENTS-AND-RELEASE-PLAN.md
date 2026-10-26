# Kutumhome / Shivam Duplex — Product Requirements & Release Plan

## Product goal
Provide one secure, mobile-first society system for 203 duplex houses. Preserve existing features while replacing the inconsistent legacy UI with a calm, readable Premium SaaS interface. UI previews are not proof that persistence, permissions, payments, or notifications work.

## Decisions required before production data entry
1. **Maintenance fee conflict:** the requirements mention ₹300/month and also ₹600/month. The existing portal code uses ₹600/month, ₹3,600/6 months and ₹7,200/year. Do not bulk-generate invoices until the society confirms the approved fee schedule. Keep fees configurable by effective date, never duplicated as unrelated hard-coded values.
2. **House inventory:** requirement says 203 houses. Existing JavaScript comments and committee allocation helpers still reference 40 houses / five groups. Verify the official house-number list and committee-to-house mapping before seeding data.
3. **Brand:** UI is being rebranded to Kutumhome, but the society itself may still officially be called SHIVAM DUPLEX. Confirm whether public/legal documents should display “SHIVAM DUPLEX Society” or “Kutumhome”.
4. **Payment details:** QR image, account holder name, bank, account number, IFSC and UPI ID must be supplied and verified by the society. Never fabricate bank details or display an unverified QR.
5. **Mobile app distribution:** a PWA can offer an install prompt on supported Android browsers and “Add to Home Screen” instructions on iPhone Safari. A web button cannot force-install an iOS app or directly install an Android APK without browser/OS confirmation. True store-distributed native apps require signed Android/iOS builds and Google Play / Apple App Store release accounts.

## Roles and authority boundaries
- **Admin / Committee:** separate credentials and server-enforced permissions; committee members see only their assigned houses and assigned work queues unless explicitly granted broader committee permissions.
- **House owner:** manages their own owner profile and submits tenant / lease information for their house. Committee should review status and relevant information, not become the author of tenant data.
- **Tenant / rental resident:** separate account associated with the lease and house; sees permitted house notices, requests and account information while lease is active.
- **Owner, tenant and committee sessions must not be interchangeable.** A UI role switch is not authorization. Every API must check the authenticated user, active membership, house scope and role server-side.

## Modules and acceptance criteria

### 1. House/member directory
- Seed exactly 203 verified house records only after the official house list is supplied.
- Owner can mark a house rented and enter tenant name, phone/email, occupation, family-member count, lease dates, rent amount and required proof documents.
- Tenant profile becomes usable only after the owner submits it and the configured approval/verification flow completes.
- Tenant is shown beneath the owner in committee views with a tenant indicator; ordinary residents only see fields they are authorized to view.
- Aadhaar/PAN are high-risk personal data: prefer a masked identifier and private document reference, encrypt sensitive values, restrict access and retention, audit reads/downloads, and never show full numbers in general member tables. Collect only legally/operationally necessary fields.

### 2. Maintenance invoices and print
- Generate one invoice per eligible house and billing period in a single transaction/batch; enforce a unique house + billing-period constraint so retrying cannot create duplicate bills.
- Single Bill opens a modal; Bulk Generate opens a panel with billing period, due date, fee schedule preview, eligible-house count, duplicate count and explicit confirmation.
- Each bill row has a checkbox. Selection toolbar offers Print Selected and Mark as Paid (with confirmation and audit event). Print All applies to the current filtered set.
- A4 print layouts: 1, 2 or 4 horizontal receipt strips per A4 page. Preview must match print CSS; include bill number, member, house, period, amount breakdown, amount in words, payment status, society identity and signature lines. Paid stamp only appears for confirmed paid bills.
- Print dialog must preserve the requested horizontal division and cut lines; test physical A4 output in Chromium and Safari print paths.

### 3. Resident portal
- Residents sign in; do not expose private account data from house number alone. House number can be an initial lookup only if followed by proper authentication/verification.
- Show invoice history, verified payment history, notices, tenant information where authorized, advance credit and outstanding balance.
- Balance is calculated from invoices, adjustments and reconciled payments on the server; show “as of” date and explain credits/refunds.
- “Print Pending Bills” prints only the authenticated resident’s pending bills.
- Fee schedule shown only after official rates are confirmed and effective dates are configured.

### 4. Payments and bank/UPI
- Display only society-verified QR and bank details with copyable UPI/account information.
- Record payment status as pending until confirmed by an authorized reconciliation or a verified provider webhook. Never mark paid merely because a user clicked “I paid” or returned from a checkout page.
- Support Regular, 6-Month Advance, Annual Advance and Extra Advance; reconcile credits against future invoices without double counting.
- Keep an immutable payment/audit trail, receipt number, reference/UTR, mode, collector, date and reversal/adjustment workflow.

### 5. Event/festival management
- Event page needs four related workspaces: event overview, house-by-house contributions, day-wise schedule and itemized expenses.
- Contributions: event, house number, contributor, amount expected/received, date, mode/reference, collector, receipt and pending/received status. Report totals from saved rows; no hand-maintained totals.
- Schedule: event day/date, start/end time, program/pooja/katha, venue, description, in-charge, supplies/prasad, estimated cost and notes.
- Expense ledger: expense date, item/service, category, vendor/person, amount, paid by, payment mode/reference, receipt attachment, notes and approval status.
- Event summary calculates collected contributions, committed budget, actual expenses and remaining balance; event and fund accounting must not silently mix.
- Export and print contribution register, schedule and itemized expense ledger. All create/edit/delete actions require authorization and audit trail.

### 6. Committee house assignments and complaints
- Store explicit assignment rows rather than infer assignments from house-number ranges.
- Assign each committee member their verified list of roughly 20 houses; allow an approved exception if allocation is uneven.
- Residents create a complaint with category, description, optional photo and urgency. Server resolves the assigned committee member from house mapping; client cannot choose arbitrary assignees.
- Track Open → In Progress → Resolved/Closed, comments, timestamps and notifications. Residents see only their own house tickets; committee members see their authorized queue.

### 7. Vehicles and parking lookup
- Owner/authorized household member manages multiple cars and two-wheelers with type, make/model, registration number and active status.
- Normalize number plates for search and prevent duplicates.
- Parking lookup returns only minimum necessary information to an authenticated resident: house number, owner/contact details only when allowed by society policy and consent. Rate-limit searches and audit them to prevent directory scraping.
- Do not expose Aadhaar/PAN, tenant job/family details, or unrelated personal data through vehicle lookup.

### 8. Reporting
- Advance Balance Report derives total billed, reconciled payments, adjustments, available credit and outstanding per house.
- Required Excel exports should use the same server-calculated values as dashboard totals and have a generated-at timestamp and filters included.
- Validate all 9 report types against known test fixtures before release.

### 9. Responsive UI and accessibility
- Test all major pages at 320px, 375px, 390px, 768px and desktop widths. No blurred text, clipped forms, overlapping modals or hidden primary actions.
- Use responsive cards for dense tables or an explicitly labelled horizontal scroll region; controls need touch-sized targets and visible focus.
- Follow WCAG 2.2 AA contrast, labels, focus order and reduced-motion preferences.
- Test on real Android Chrome and iPhone Safari, including Gujarati text, zoom and poor network conditions.

### 10. Mobile installation / native apps
- PWA phase: valid manifest, service worker, HTTPS, correct icons, install prompt where supported, offline-safe shell and honest iOS instructions.
- Never label PWA installation as a direct APK/iOS download. Android APK installation requires a signed artifact and OS trust/install confirmation; iOS installation requires App Store/TestFlight or an approved enterprise distribution path.
- Native release phase: choose Capacitor or a native wrapper only after core flows are stable; build and sign Android and iOS separately, test push notifications and secure storage, then publish through the relevant stores.

## Technical release gates
- Reconcile the current static HTML/Firebase paths with the Next.js/Prisma/PostgreSQL backend. Pick and document one authoritative data path per feature; do not silently split live data between two backends.
- Add database migrations for event schedule/contribution/expense fields, household profile data and explicit committee-house assignments as needed. Review migration safety before production.
- Add server-enforced RBAC, house-level authorization, CSRF/session protection, rate limiting, idempotency, input validation, audit logs and private file storage.
- Tests: duplicate bulk-bill retry, concurrent payment webhook, advance-credit arithmetic, cross-house access denial, tenant lease expiry, event ledger totals, print preview/physical print, mobile responsive screenshots, and migration rollback/restore.
- Keep secrets out of Git. Rotate any previously exposed database credentials. Set deployment environment variables only through the hosting provider.
- A successful deployment or HTTP 200 is not a release gate by itself. Verify database connectivity, real authentication, every critical workflow, error/empty/offline states and backup restoration.

## Current work completed in the redesign branch
- Premium light design tokens and homepage / resident portal refinements.
- Responsive recovery CSS to reduce blur/backdrop-filter effects and improve narrow layouts.
- Event ledger visual cleanup and Kutumhome PWA manifest branding.
- PWA install copy no longer claims a direct download.

## Not yet verified
- Live DB/API persistence, authentication and authorization, production fee schedule, 203-house roster, real QR/bank details, event workflow writes, cross-device PWA installability, native app builds, and end-to-end print output.
