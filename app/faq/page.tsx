import type { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion from '../../components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Land Buying FAQ – 50+ Answers About Buying & Selling Land in the USA',
  description: 'Get answers to 50+ frequently asked questions about buying cheap land in the USA. Learn about owner financing, land types, due diligence, zoning, taxes, and more.',
  keywords: [
    'land buying FAQ','how to buy land','cheap land USA','owner financing land',
    'land for sale questions','buying raw land','land investment','how to sell land',
    'land zoning','land title search','land due diligence','land loans',
  ],
  alternates: { canonical: 'https://cheaplandbuy.com/faq' },
  openGraph: {
    title: 'Land Buying FAQ – 50+ Answers | CheapLandBuy.com',
    description: 'Everything you need to know about buying, financing, and selling land in the USA.',
    url: 'https://cheaplandbuy.com/faq',
    type: 'website',
  },
};

// ─── ALL FAQ DATA ─────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    title: 'Buying Land — The Basics',
    icon: '🏕️',
    items: [
      {
        q: 'How do I buy cheap land in the USA?',
        a: 'Start by browsing listings on CheapLandBuy.com and filtering by state, price, and acreage. Cheap land is most common in rural states like New Mexico, Texas, Arizona, Arkansas, and Wyoming. Look for owner-financed properties to skip the bank, and always research the parcel before making an offer — check zoning, road access, and taxes.',
      },
      {
        q: 'What is the cheapest state to buy land in the USA?',
        a: 'New Mexico, Arizona, Arkansas, Wyoming, and West Virginia consistently offer the lowest price per acre. States with abundant rural land and low population density tend to have the most affordable parcels. CheapLandBuy.com regularly features listings under $1,000 per acre in these states.',
      },
      {
        q: 'How much does an acre of land cost in the United States?',
        a: 'It varies widely. Raw rural land can cost $500–$3,000 per acre in cheap states like New Mexico and Arizona. Agricultural land in the Midwest averages $5,000–$15,000 per acre. Residential lots near cities can run $20,000–$100,000+ per acre. Waterfront or mountain land commands premium prices.',
      },
      {
        q: 'Can you buy land with no money down?',
        a: 'Yes, though it is rare. Some sellers offer zero-down owner financing deals, especially on inexpensive rural parcels. More commonly you will find very low down payments of 5–10% through owner financing. USDA guaranteed loans and certain rural land programs can also reduce upfront costs significantly.',
      },
      {
        q: 'What is raw land and should I buy it?',
        a: 'Raw land is undeveloped property with no utilities, roads, or structures. It is the cheapest type of land to buy. Raw land is a great buy if you plan to build later, use it for hunting/camping, or hold it as a long-term investment. The tradeoff is you will need to spend money on improvements before living on it or building.',
      },
      {
        q: 'Is buying land a good investment?',
        a: 'Land is one of the few assets that can never be manufactured or destroyed. It appreciates over time, especially in growing regions. It requires no maintenance costs, has no depreciation, and generates tax advantages. Rural land suitable for hunting, farming, or future development tends to increase steadily in value over 5–10+ year horizons.',
      },
      {
        q: 'What are the risks of buying land?',
        a: 'Key risks include: buying land with unclear title or liens, purchasing property without road access (landlocked), zoning restrictions that prevent your intended use, hidden environmental issues, and overvaluing land in declining markets. Thorough due diligence — title search, survey, zoning check — eliminates most risks.',
      },
      {
        q: 'Do I need a real estate agent to buy land?',
        a: 'No. You can buy land directly from sellers, especially on platforms like CheapLandBuy.com. Land is simpler to transact than residential homes. That said, a buyer\'s agent who specializes in land can help negotiate, identify issues, and coordinate closing. Their commission is typically paid by the seller, not you.',
      },
      {
        q: 'How do I find cheap land for sale near me?',
        a: 'Use CheapLandBuy.com and filter by your state or county. You can also check county tax assessor websites for delinquent tax sales, local classifieds, estate sales, and foreclosure auctions. Off-market land is often the cheapest — driving rural roads and contacting landowners directly can uncover unlisted deals.',
      },
      {
        q: 'What is the difference between a lot and acreage?',
        a: 'A "lot" typically refers to a smaller, platted parcel in a subdivision — usually under 1 acre, intended for a single structure. "Acreage" refers to larger parcels of undivided land, generally 1 acre and up. Lots often have utilities nearby and HOA rules; acreage is typically more rural and self-sufficient.',
      },
    ],
  },
  {
    title: 'Owner Financing',
    icon: '💰',
    items: [
      {
        q: 'What is owner financing on land?',
        a: 'Owner financing (also called seller financing) means the seller acts as the bank. Instead of getting a mortgage from a lender, you make monthly payments directly to the seller over an agreed term. It is common on land because traditional banks often refuse to finance raw or rural land parcels.',
      },
      {
        q: 'How does owner financing work on land?',
        a: 'You and the seller agree on a purchase price, down payment (often 5–20%), interest rate, monthly payment, and loan term (typically 3–20 years). You sign a promissory note and sometimes a land contract or deed of trust. Once you finish all payments, you receive the deed. The seller holds the deed as collateral until then.',
      },
      {
        q: 'Can I buy land with bad credit using owner financing?',
        a: 'Yes. Most sellers offering owner financing do not run formal credit checks. They care more about your ability to make consistent monthly payments. Owner financing is one of the best options for buyers with low credit scores, no credit history, or recent bankruptcies who cannot qualify for traditional bank loans.',
      },
      {
        q: 'What is a typical owner financing interest rate for land?',
        a: 'Owner financing rates on land typically range from 7% to 12% annually, often higher than bank rates. However, the flexibility — no credit check, fast closing, low down payment — makes it worth the higher rate for many buyers. Negotiate the rate, especially on higher-priced parcels.',
      },
      {
        q: 'How much down payment do I need for owner financed land?',
        a: 'Down payments on owner-financed land typically range from 10% to 25%. Some sellers accept as little as $500–$1,000 down on low-priced rural parcels. The bigger your down payment, the lower your monthly payment and the more likely sellers are to approve the deal.',
      },
      {
        q: 'Is owner financing on land safe?',
        a: 'It can be very safe if done correctly. Get everything in writing — a signed promissory note and recorded land contract or deed of trust. Hire a title company or real estate attorney to handle closing. Verify the seller actually owns the land free and clear before signing anything. Record all documents with the county.',
      },
      {
        q: 'What is the difference between a land contract and a mortgage?',
        a: 'A mortgage is a bank loan where you receive the deed immediately and the bank holds a lien. A land contract (used in owner financing) means the seller retains the deed until you complete payments — you get "equitable title" during the payment period. Land contracts are faster and require no bank involvement.',
      },
      {
        q: 'What happens if I miss a payment on owner financed land?',
        a: 'This depends on your contract terms and your state\'s laws. Most contracts include a grace period (usually 10–15 days). After that, you may enter default. Some states allow sellers to use a faster "forfeiture" process rather than full foreclosure. Always communicate with the seller early if you anticipate payment problems.',
      },
    ],
  },
  {
    title: 'Land Types & Permitted Uses',
    icon: '🌲',
    items: [
      {
        q: 'What can I do with hunting land?',
        a: 'Hunting land is typically rural, wooded, or open acreage zoned for recreational use. You can hunt, fish, camp, build a cabin or hunting blind, install food plots, and lease hunting rights to others for income. Many buyers also hold hunting land as long-term appreciation investments.',
      },
      {
        q: 'What can I build on raw land?',
        a: 'What you can build depends entirely on the zoning. Agricultural land often allows a single-family home, barns, and farm structures. Residential zoning allows homes. Some rural land has no zoning restrictions at all. Always check with the county zoning office before buying if you plan to build.',
      },
      {
        q: 'Can I put a mobile home or tiny home on my land?',
        a: 'Often yes, but it depends on zoning and county rules. Many rural and agricultural zones allow manufactured homes or tiny homes on wheels. Some counties require a minimum square footage or foundation. Research the specific county\'s regulations before purchasing land for this purpose.',
      },
      {
        q: 'What is agricultural land used for?',
        a: 'Agricultural land (farmland) can be used for crops, livestock, orchards, vineyards, timber, aquaculture, and agribusiness operations. It often qualifies for special agricultural tax exemptions that dramatically reduce property taxes. It can also be leased to local farmers for passive income.',
      },
      {
        q: 'What is the difference between commercial land and residential land?',
        a: 'Residential land is zoned for housing — single-family homes, apartments, or manufactured homes. Commercial land is zoned for business uses — retail stores, offices, warehouses, or industrial facilities. Commercial land typically has higher values and higher taxes but generates business income potential.',
      },
      {
        q: 'Can I camp or live on my land right after buying it?',
        a: 'In many rural areas, yes — but check local ordinances. Some counties allow camping on your own land with no permit. Others restrict living in RVs or tents beyond a certain number of days. Permanent off-grid living is often permitted in unincorporated rural counties with minimal restrictions.',
      },
      {
        q: 'What is a homestead and how does homesteading work?',
        a: 'Homesteading means living a self-sufficient lifestyle on your land — growing food, raising animals, and reducing dependence on outside systems. Modern homesteaders buy rural land, drill a well, install solar or propane, build a home or cabin, and produce much of their own food. Many states also offer homestead property tax exemptions.',
      },
      {
        q: 'What is conservation land and can I build on it?',
        a: 'Conservation land is protected property where development is restricted — either through a conservation easement, government designation, or deed restriction. You typically cannot build structures or clear-cut trees. However, you may be able to hunt, hike, or farm in limited ways. Always review deed restrictions before buying.',
      },
    ],
  },
  {
    title: 'Legal & Due Diligence',
    icon: '📋',
    items: [
      {
        q: 'How do I do due diligence when buying land?',
        a: 'Due diligence on land includes: (1) title search to verify ownership and check for liens, (2) survey to confirm boundaries and acreage, (3) zoning check with the county, (4) road access verification — confirm legal access, not just physical, (5) utility availability check, (6) flood zone lookup via FEMA maps, (7) review of any HOA or deed restrictions.',
      },
      {
        q: 'What is a title search and do I need one for land?',
        a: 'A title search examines the history of ownership for a parcel to confirm the seller has clear ownership and there are no unpaid liens, judgments, or encumbrances. Yes — you always need a title search when buying land. It typically costs $75–$200 and can save you from acquiring a property with hidden legal problems.',
      },
      {
        q: 'What does it mean if land has a lien?',
        a: 'A lien is a legal claim against a property for unpaid debts — such as unpaid taxes, contractor bills, or court judgments. If you buy land with an existing lien, you can inherit responsibility for it. Always run a title search and purchase title insurance. In legitimate sales, liens are typically paid off at closing from the seller\'s proceeds.',
      },
      {
        q: 'What is zoning and why does it matter when buying land?',
        a: 'Zoning is a government-assigned classification that dictates what you can do with a piece of land — residential, agricultural, commercial, industrial, or recreational. It determines if you can build a home, run a business, keep livestock, or install structures. Always verify zoning with the county planning department before buying.',
      },
      {
        q: 'Do I need a survey before buying land?',
        a: 'A survey physically marks the exact boundaries of your parcel and confirms its acreage. It is highly recommended, especially for rural land where boundaries may not be clearly marked. Without a survey, you may not know exactly what you are buying. Surveys typically cost $300–$1,500 depending on acreage and terrain.',
      },
      {
        q: 'What is a parcel number and how do I look it up?',
        a: 'A parcel number (APN — Assessor\'s Parcel Number) is a unique identifier assigned by the county to every piece of land. It links to county records for ownership history, tax information, and legal description. You can look up any parcel number on your county\'s assessor or GIS website — most are free to access.',
      },
      {
        q: 'What taxes do I pay when I buy land?',
        a: 'At closing, you may pay transfer taxes or recording fees (varies by state). After purchase, you will pay annual property taxes based on the assessed value — rural land taxes can be as low as $50–$200/year for cheap parcels. Some states offer agricultural or homestead exemptions that further reduce taxes.',
      },
      {
        q: 'Can someone take my land through adverse possession?',
        a: 'Adverse possession is a legal doctrine where someone who openly occupies land for a set number of years (varies by state, typically 5–20 years) can claim ownership. To protect yourself, post "No Trespassing" signs, visit your land periodically, and record your ownership. This rarely affects buyers who are actively monitoring their property.',
      },
    ],
  },
  {
    title: 'Financing & Loans for Land',
    icon: '🏦',
    items: [
      {
        q: 'Can I get a bank loan to buy raw land?',
        a: 'It is difficult but possible. Most conventional lenders will not finance raw land. Specialized lenders, Farm Credit, and local community banks or credit unions are more likely to offer land loans. Expect to put 20–50% down, higher interest rates than home mortgages, and stricter qualification requirements.',
      },
      {
        q: 'What is a USDA land loan?',
        a: 'USDA Farm Service Agency loans are available for agricultural land purchases by farmers and ranchers. They offer competitive rates and longer terms than conventional land loans. They are not for general rural residential buyers — you need a qualifying agricultural plan. Check with your local USDA FSA office.',
      },
      {
        q: 'What credit score do I need to buy land with a loan?',
        a: 'For a traditional land loan from a bank or Farm Credit, you typically need a credit score of 680 or above. Local banks may go as low as 640. Owner financing requires no credit score at all in most cases. The higher your credit score and down payment, the better your rate and terms.',
      },
      {
        q: 'What is the difference between a land loan and a construction loan?',
        a: 'A land loan is used to purchase the bare land only. A construction loan covers building a home or structure on the land. Once construction is complete, a construction loan is typically converted into a standard mortgage. You can sometimes combine both into a "construction-to-permanent" loan through certain lenders.',
      },
      {
        q: 'How long can a land loan term be?',
        a: 'Land loans from banks are typically 10–20 years, shorter than the standard 30-year home mortgage. Owner-financed land deals can range from 3 to 30 years depending on the seller\'s preference. Farm Credit and agricultural lenders sometimes offer longer terms of 25–30 years for qualified buyers.',
      },
    ],
  },
  {
    title: 'Building on Your Land',
    icon: '🔨',
    items: [
      {
        q: 'How do I get utilities connected to my land?',
        a: 'For electric, contact your local power utility to get a quote on connecting to the grid — costs vary hugely based on distance. For water, you can drill a well ($5,000–$20,000+) or connect to a rural water district. For sewer, you can install a septic system ($3,000–$10,000). Off-grid solar and propane are popular alternatives.',
      },
      {
        q: 'Do I need a permit to build on rural land?',
        a: 'In most counties, yes — you need a building permit even on rural land. Permit requirements vary by county. Some very rural, unincorporated areas have no permit requirements at all. Check with your county building department before beginning any construction. Unpermitted buildings can cause issues when you sell.',
      },
      {
        q: 'How much does it cost to build on raw land?',
        a: 'Bringing raw land to a buildable state typically costs $10,000–$50,000+ depending on distance from utilities, terrain, and what is needed. Add utility hookups ($5,000–$30,000), road/driveway ($2,000–$20,000), grading ($1,000–$10,000), and permits ($500–$3,000). Plan your full budget before buying raw land.',
      },
      {
        q: 'Can I drill a well on my land?',
        a: 'In most cases yes, but you need a well permit from your county or state water agency. Well drilling costs vary widely based on depth to groundwater — typically $5,000–$20,000. A hydrogeological report or local driller can estimate depth in your area. Always check groundwater availability before buying land in arid regions.',
      },
      {
        q: 'What is a perc test and do I need one?',
        a: 'A percolation (perc) test measures how quickly soil absorbs water to determine if it can support a septic system. You need a passing perc test before installing a septic system — required if you plan to have any plumbing on your land. It is a simple test performed by a licensed engineer, typically costing $300–$700. Buy land contingent on a passing perc test.',
      },
    ],
  },
  {
    title: 'Land Investment',
    icon: '📈',
    items: [
      {
        q: 'Is land a good investment right now?',
        a: 'Land has historically been one of the most reliable long-term investments. Unlike stocks, land has intrinsic physical value and is finite in supply. In growing metro-fringe areas, land values can double in 5–10 years. Even rural land tends to appreciate 3–7% annually. It also provides tax advantages and inflation protection.',
      },
      {
        q: 'What is land flipping and how does it work?',
        a: 'Land flipping involves buying land at a discount — often through tax delinquent sales, direct owner outreach, or auctions — then selling it for a profit. Many flippers target rural parcels under $10,000 and resell them with owner financing for passive income. It requires research, marketing skills, and understanding of local land values.',
      },
      {
        q: 'Should I buy land in Texas or Florida as an investment?',
        a: 'Both are strong markets. Texas offers vast affordable rural acreage and strong long-term appreciation in fringe areas of growing metros like Austin, Dallas, and Houston. Florida offers unique appeal — waterfront, recreational, and retirement land near beaches. Texas has no state income tax and lower land prices per acre on average.',
      },
      {
        q: 'How do I make money with raw land?',
        a: 'You can generate income from raw land in several ways: lease it to hunters or farmers, install solar panels and lease the rights to energy companies, timber harvesting, billboard leases along roads, holding short-term camping/glamping events, subdividing and selling smaller parcels, or simply holding for appreciation and selling later.',
      },
      {
        q: 'What is the best acreage size to buy for investment?',
        a: '5–40 acres is the sweet spot for most land investors. This size is large enough to have significant value but small enough to sell quickly to individual buyers. Very small parcels (under 1 acre) can be hard to resell. Very large tracts (200+ acres) take longer to sell but offer more flexibility for subdivision and development.',
      },
      {
        q: 'How does land appreciate in value over time?',
        a: 'Land appreciates through population growth nearby, infrastructure improvements (new roads, utilities), zoning changes allowing denser use, regional economic development, and natural resource discovery (minerals, water). Proximity to expanding cities is the single biggest driver. Buying land in the path of growth is the classic land investment strategy.',
      },
    ],
  },
  {
    title: 'Selling Your Land',
    icon: '🏷️',
    items: [
      {
        q: 'How do I sell my land fast?',
        a: 'List on CheapLandBuy.com with high-quality photos, a clear description, and a competitive price. Offer owner financing — listings with owner financing get 3× more inquiries and sell significantly faster. Price at or slightly below comparable sales. Respond to inquiries quickly. The more channels you list on (Craigslist, Facebook Marketplace, signs on the property), the faster it sells.',
      },
      {
        q: 'What documents do I need to sell land?',
        a: 'To sell land you typically need: the deed (proof of ownership), a legal description of the property, recent property tax receipts showing taxes are current, a survey (if available), and any HOA documents or deed restrictions. A real estate attorney or title company will prepare the closing documents — deed of conveyance, bill of sale, and closing statement.',
      },
      {
        q: 'How do I price my land for sale?',
        a: 'Research comparable sales (comps) — similar parcels in the same county sold in the past 6–12 months. Check county assessor records, Zillow, LandWatch, and CheapLandBuy.com. Consider your land\'s unique features: road access, utilities, water, views, zoning. A licensed land appraiser can give you a formal value report for $300–$600.',
      },
      {
        q: 'Can I sell land without a real estate agent?',
        a: 'Yes. Selling land by owner (FSBO) is very common. You list the property, field inquiries, and hire a title company or real estate attorney to handle closing. This saves you the 5–10% commission a land broker would charge. Platforms like CheapLandBuy.com make it easy to list directly and reach thousands of buyers.',
      },
      {
        q: 'How long does it take to sell land?',
        a: 'Selling land takes longer than selling houses on average — typically 3 months to 2 years depending on location, price, and how it is marketed. Cheap rural land in less-populated states can sit longer. Land with owner financing, road access, utilities, and water sells much faster. Properly priced land in growing areas moves in weeks.',
      },
      {
        q: 'Do I pay capital gains tax when I sell land?',
        a: 'Yes. If you sell land for more than you paid, the profit is a capital gain. If you held it for over 12 months, it qualifies for long-term capital gains rates (0%, 15%, or 20% depending on your income). Short-term gains (held under 12 months) are taxed as ordinary income. Consult a CPA for your specific situation.',
      },
    ],
  },
  {
    title: 'Using CheapLandBuy.com',
    icon: '💻',
    items: [
      {
        q: 'How do I list my land for sale on CheapLandBuy.com?',
        a: 'Create a free account, click "Post a Listing" in your dashboard, and fill in your land\'s details — title, description, price, acreage, state, land type, photos, and parcel number. Toggle owner financing on if you offer it. Your listing goes live immediately and is visible to all buyers browsing the site.',
      },
      {
        q: 'Is it free to list land on CheapLandBuy.com?',
        a: 'Yes. Creating an account and posting a listing on CheapLandBuy.com is free. Our platform connects motivated land sellers directly with buyers across all 50 states without charging listing fees or commissions.',
      },
      {
        q: 'How do I contact a seller about a listing?',
        a: 'On any listing page, click the "Contact Seller" or "Send Inquiry" button. Fill in your name, email, and message. Your inquiry is sent directly to the seller. We recommend including your timeline, budget, and any specific questions about the property.',
      },
      {
        q: 'How do I search for land in a specific state or county?',
        a: 'Go to the Listings page and use the state filter to narrow by state, or search by county in the search bar. You can also filter by land type, price range, and acreage. Use the URL format /listings?state=Texas to share or bookmark state-specific searches.',
      },
      {
        q: 'What does the "Owner Financing" badge mean on a listing?',
        a: 'A green "Owner Financing" badge means the seller is willing to finance the purchase directly — no bank required. You pay the seller monthly instead of a lender. These listings are ideal for buyers with limited credit history or those who want to move quickly without the bank approval process.',
      },
      {
        q: 'Is CheapLandBuy.com a real estate broker or agent?',
        a: 'No. CheapLandBuy.com is an online marketplace platform that connects land buyers and sellers. We are not a real estate broker, agent, lender, appraiser, or title company. All transactions are conducted between buyers and sellers directly. We strongly recommend all buyers and sellers conduct proper due diligence and consult professionals before closing.',
      },
    ],
  },
];

// ─── JSON-LD FOR SCHEMA.ORG ───────────────────────────────────────────────────

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_CATEGORIES.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FaqPage() {
  const totalQ = FAQ_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HEADER ── */}
      <div className="bg-brand-800 text-white py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-4xl mb-3">❓</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Land Buying FAQ
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            {totalQ} frequently asked questions about buying, financing, and selling land in the USA — answered.
          </p>
        </div>
      </div>

      {/* ── JUMP LINKS ── */}
      <div className="bg-brand-50 border-b border-brand-100 py-4 px-4 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex gap-2 flex-wrap justify-center">
          {FAQ_CATEGORIES.map(cat => (
            <a
              key={cat.title}
              href={`#${cat.title.replace(/\s+/g, '-').toLowerCase()}`}
              className="inline-flex items-center gap-1.5 bg-white border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:border-gold hover:text-brand-800 transition-colors whitespace-nowrap"
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Scroll anchors + category count badges */}
        <div className="space-y-14">
          {FAQ_CATEGORIES.map(cat => (
            <div
              key={cat.title}
              id={cat.title.replace(/\s+/g, '-').toLowerCase()}
              className="scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-xl font-bold text-brand-800">{cat.title}</h2>
                <span className="ml-auto bg-brand-100 text-brand-600 text-xs font-bold px-2.5 py-1 rounded-full">
                  {cat.items.length} Q&amp;As
                </span>
              </div>
              <FaqAccordion categories={[{ ...cat, title: '' }]} />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-16 bg-brand-800 rounded-2xl p-8 text-center text-white">
          <div className="text-3xl mb-3">🏕️</div>
          <h3 className="text-xl font-bold mb-2">Ready to Find Your Land?</h3>
          <p className="text-white/65 text-sm mb-6">Browse thousands of affordable listings across all 50 states — ranch land, hunting land, farmland, waterfront, and more.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="bg-gold text-brand-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors">
              Browse Land Listings →
            </Link>
            <Link href="/sell" className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              List Your Land Free
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-brand-400 text-xs leading-relaxed">
          This FAQ is for informational purposes only and does not constitute legal, financial, or real estate advice.
          Always conduct your own due diligence and consult qualified professionals before any land transaction.
        </p>
      </div>
    </>
  );
}
