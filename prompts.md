# Nymbl Landing Page — Design Prompts

The prompts from the build conversation that shaped this landing page, in order.
Kept as a record of the brief and how it evolved.

---

**1. Business is a broad automation service (not video-only)**
> "This is why I said to make the list so we can see that there is a lot of different
> automation that I offer not just AI videos to social media — also posting to Slack, pulling
> leads from emails and organizing them, etc. A whole gamut of services but showcasing AI social
> media posts because many businesses want to post videos for their business on social media but
> don't have the time."

**2. Headline direction**
> "We automate your marketing — so you don't have to."
> (with "automate" in gradient text; headline sells automation broadly, demo showcases AI video)

**3. Target market**
> "Small businesses, massage therapists, real estate agents, insurance agents, landscapers,
> roofing companies, solar agents, skydiving and scuba diving businesses, water sports businesses,
> handmade jewelry (not gold/diamonds/high-end), handmade clothes, boutiques, and more. All are
> welcome."

**4. Pricing tiers (spunky names, monthly subscriptions)**
> "A monthly subscription for automated services: 5 automated services/month for $50/month,
> 10 automated services $150/month, 20 automated services $500/month."
> Names chosen: **Kickstart / Cruise Control / Full Throttle.**

**5. Business name**
> "I like Nymbl" — deployed on Vercel.

**6. The AI video demo flow (form-driven, capped)**
> "I need an AI video that is spunky to increase skydiving and scuba diving / extreme sports sales
> to post on social media, preferably a male, young and adventurous — that's the form entry, then
> AI writes the personalized script, then sends it to HeyGen, then I have it but won't include the
> last step in Zap. I am skipping the auto-send to them but adding it in my landing page so that no
> one abuses me on the demo landing page."
> → **The video is generated but it isn't sent to the customer, to prevent abuse.**

**7. Full mockup request**
> "A mockup of the landing page with the header, price subscription and 15-min book a call, form
> for AI video, testimonials — and the page must appeal to both the skydiver extremist, real estate
> agent, massage therapist, and handmade jewelry maker, who all must see colors on the landing page
> that appeal to them. The page must have large and small font, one landing page, scroll down, words
> appear fade in, bright colors that remind the audience of media and AI."

**8. Palette correction #1**
> "No purple, and drop massage therapist as the theme driver because it tones the look down to calm,
> and that's not what I was aiming for. Bold colors and sections."

**9. Palette correction #2**
> "No neon green."
> → lime replaced with electric yellow-gold `#ffd400`.

**10. Pricing visual correction**
> "I hate the white subscription cards with the border box, it doesn't match the landing page."
> → tiers became **full saturated color blocks** (blue / gradient / magenta) on a dark section.

**11. Script engine**
> "For the 'Write my script' I can use OpenAI."
> → server-side Next.js API route calling OpenAI; key never exposed to the browser.

**12. Booking**
> "I will be using Cal.com for the 15-min book a call."

**13. Build stack + code constraints**
> "Next.js, TypeScript, CSS. Code constraints: no `any`, no `var`, closure-based functions,
> `textContent` on user input, minimal code but not minimal to the sense of reducing the quality
> of the code."

**14. Demo heading and copy refinements**
> "This should be one line can you extend the width: See it build you a video"
> "add a break after renders: Demo writes a preview script. The full service renders the video and posts it for you."
> "remove the break after renders and add if after service"
> "this isn't a 60 second script is AI limited to the amount of words or characters for the section because this is what it rendered after I asked it to create a 60 second video script"

**15. Testimonials heading refinement**
> "this is not a button this is a header, I need to expand this section so it is two lines. it is currently 3 lines: They stopped posting. Nymbl didn't."
> "add a break after posting: They stopped posting. Nymbl didn't."

**16. Instagram/social section**
> "I want a video section before Simple monthly plans"
> "with color balance, theme balance, font balance, that highlights the landing pages social media ai generated post on instagram add the instagram icon and add this video on the landing page: https://www.instagram.com/p/DaYfRkalc7d/"

**17. Stripe subscriptions**
> "Add Stripe subscription checkout to this Next.js (App Router, TypeScript) app for three monthly tiers: Kickstart ($50), Cruise ($150), Full Throttle ($500). Use Stripe Checkout Sessions in test mode."
> "Add a server-side API route to create a Stripe Customer Portal session so users can cancel/manage their subscription; add a \"Manage subscription\" link that opens it."
> "Create branded success and cancel pages that match the existing site's design exactly."

**18. Constraint verification**
> "what has less than 25% of my monthly left? codex or stripe?"
> "also there are coding constraints no var, no any in typescript and closure based functions did you follow these coding constraints if no please correct, for user input text content no innerhtml to prevent XSS. add all remaining prompts to prompts.md"

**19. Stripe checkout route details**
> "Use Stripe Checkout Sessions instead of exposing payment links in the browser."
> "Keep Stripe keys server-side, use monthly recurring Price IDs from environment variables,
> and send users to branded success and cancel pages after checkout."
> -> implemented with `/api/checkout`, `STRIPE_SECRET_KEY`, and tier-specific `STRIPE_PRICE_*`
> environment variables.

**20. Customer Portal behavior**
> "Add a Manage subscription link so users can cancel or manage their subscription."
> "Open Stripe's Customer Portal from the server-side route, using the completed Checkout Session
> to find the Stripe customer."
> -> implemented with `/api/customer-portal` and a saved checkout session id.

**21. Branded status pages**
> "Create branded success and cancel pages that match the existing site's design exactly."
> -> success confirms the subscription and offers the script demo plus subscription management;
> cancel sends users back to plans or the demo without starting a subscription.

**22. Environment and setup documentation**
> "Document the setup clearly so I know which values go in `.env` and which ones are safe for the
> browser."
> -> README now separates server-only OpenAI/Stripe secrets from public Cal.com configuration and
> explains local setup, Stripe test mode, and Vercel deployment.

**23. Code constraint cleanup**
> "Correct the code if it does not follow no `any`, no `var`, closure-based functions, and safe
> user input rendering."
> -> TypeScript shapes use explicit interfaces and `unknown` guards, functions stay closure-based,
> and user-visible input is rendered through React text nodes instead of `dangerouslySetInnerHTML`.

**24. Prompt log completion**
> "add remaining prompts in prompts.md"
> -> this file now includes the follow-up implementation prompts that came after the first landing
> page build notes.
