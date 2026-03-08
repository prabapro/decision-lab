// src/data/scenarios.js

export const scenarios = [
  {
    month: 1,
    title: 'Month 1 — The Ethical Shortcut',
    narrative: `
You are part of the executive leadership team of a fast-growing global software company.

Your flagship product handles sensitive personal data for millions of users.

Three weeks ago, a senior engineer escalated a critical vulnerability:

• Attackers could access user databases
• The exploit leaves almost no trace
• A full patch will take 8–12 weeks

Your legal counsel warns:
“If we disclose now, we invite lawsuits and regulatory scrutiny.”

Your PR team argues:
“We should fix it quietly first, then disclose later.”

Your security team counters:
“Attackers are actively scanning for this vulnerability.”

A junior engineer hints that whistleblowers may go public.

Nothing has leaked yet.

What do you do?
`,
    intel: [
      {
        headline: 'Noise',
        body: 'External actors are already probing your servers for this exact vulnerability pattern.',
      },
      {
        headline: 'Compliance',
        body: 'Regulators in two countries are monitoring unusual network traffic from your platform.',
      },
      {
        headline: 'Emails',
        body: 'Internal emails show leadership knew about this flaw three weeks ago.',
      },
      {
        headline: 'Markets',
        body: 'Investors remain completely unaware of the issue.',
      },
      {
        headline: 'History',
        body: 'A competitor collapsed after hiding a similar breach five years ago.',
      },
    ],
    options: [
      {
        text: 'Publicly disclose the vulnerability immediately and halt all new user sign-ups.',
        meta: {
          points: 6,
          risk: 'cautious',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Quietly fix the flaw while preparing a timed public disclosure.',
        meta: {
          points: 10,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Delay disclosure and manage leaks internally.',
        meta: {
          points: 3,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Ignore the flaw to avoid panic.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You balanced transparency with operational realism.

You quietly contained the vulnerability while preparing regulators and customers for a controlled disclosure.

Short-term:
• No public panic
• No mass exploitation
• No uncontrolled leaks

Long-term:
• Legal exposure was minimized
• Trust erosion was limited
• The breach never became catastrophic

You avoided both denial and premature chaos.
`,
      realStory: `
This scenario was based on multiple delayed-disclosure breach cases, including Equifax (2017).

Equifax delayed patching and disclosure.

Attackers exfiltrated data of 147 million people.

Regulatory fines exceeded $700 million.

Leadership credibility collapsed.

The breach became a textbook example of governance failure.
`,
      comparison: `
You contained the vulnerability before disclosure.

Equifax delayed until after catastrophic damage.

Where you improved:
• Prevented mass exploitation
• Controlled regulatory timing

Where reality failed:
• Ignored technical warnings
• Delayed accountability
`,
      scoring: `
Timed containment scored highest because:

• It prevents uncontrolled harm
• Preserves legal positioning
• Avoids panic while not denying reality

Immediate disclosure without containment was ethically sound but operationally weak.
`,
      context: `
Delayed disclosure consistently worsens outcomes.

But reckless transparency also creates chaos.
`,
      lesson: `
Leadership lesson:
Ethics must be paired with execution.
`,
    },
  },

  {
    month: 2,
    title: 'Month 2 — The Invisible Shortage',
    narrative: `
You are part of the national leadership team of a fuel-import-dependent country.

Foreign reserves are declining.
Tourism revenues have collapsed.
Global fuel prices are rising.

Your central bank quietly warns:

“At current burn rates, we won’t be able to pay for fuel imports within 8–12 weeks.”

So far:

• Fuel stations are operating
• Power plants are running
• No visible shortages
• The public is unaware

Your economic advisors warn:
“If we don’t act now, suppliers will stop shipping fuel entirely.”

Your political advisors warn:
“Emergency financing will trigger public panic.”

Nothing looks broken yet.

But the math says collapse is coming.

What do you do?
`,
    intel: [
      {
        headline: 'Reserves',
        body: 'Fuel reserves are down to less than two weeks of national consumption.',
      },
      {
        headline: 'Suppliers',
        body: 'Fuel suppliers are refusing credit-based shipments.',
      },
      {
        headline: 'Credit',
        body: 'Foreign lenders are freezing new lines of credit.',
      },
      {
        headline: 'Grid',
        body: 'Power stations report dangerously low buffers.',
      },
      {
        headline: 'Inflows',
        body: 'Tourism revenues are collapsing faster than projected.',
      },
    ],
    options: [
      {
        text: 'Secure emergency international financing immediately.',
        meta: {
          points: 6,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Announce fuel rationing to conserve reserves.',
        meta: {
          points: 5,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Diversify suppliers and quietly open financing talks.',
        meta: {
          points: 10,
          risk: 'cautious',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Delay decisions to avoid political fallout.',
        meta: {
          points: 0,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You stabilized supply without triggering panic.

Suppliers resumed shipments.
Fuel continuity was preserved.
Public confidence remained intact.

You bought time before collapse became visible.
`,
      realStory: `
This scenario was based on Sri Lanka’s 2022 fuel crisis.

Sri Lanka delayed IMF talks and supplier diversification.

Fuel ships stopped arriving.

Power stations shut down.

Long queues formed overnight.

Public protests exploded.

Emergency reforms came too late.
`,
      comparison: `
You acted before suppliers walked away.

Sri Lanka acted after ships stopped arriving.

Where you improved:
• Preserved supply continuity
• Prevented panic shortages

Where reality failed:
• Delayed reforms
• Prioritized political optics
`,
      scoring: `
Quiet diversification scored highest because:

• It stabilizes supply without panic
• Preserves negotiation leverage

Immediate financing alone was partial.

Delay mirrors real-world collapse logic.
`,
      context: `
Energy collapse does not announce itself.

Delay multiplies damage.
`,
      lesson: `
Leadership lesson:
Silent crises still kill systems.
`,
    },
  },

  {
    month: 3,
    title: 'Month 3 — The Quiet Signal',
    narrative: `
You are part of the national leadership team of a major travel hub.

A new respiratory illness has emerged overseas.

So far:

• Fewer than 100 confirmed cases
• No domestic infections
• No international travel bans
• No official WHO emergency declaration

Your public health officials warn:

• Early tests suggest human-to-human transmission
• Hospitals lack isolation capacity
• PPE stockpiles are critically low

Your economic advisors warn:

• Travel warnings will devastate tourism
• Airlines are threatening legal action
• Hotel unions are lobbying aggressively

Your political advisors argue:

“If we overreact and nothing happens, we will be blamed for economic damage.”

You are now in a cabinet briefing room.

Nothing looks urgent yet.

But exponential growth curves are unforgiving.

What do you do?
`,
    intel: [
      {
        headline: 'Signals',
        body: 'Early tests strongly suggest sustained human-to-human transmission.',
      },
      {
        headline: 'Supplies',
        body: 'PPE stockpiles are critically low nationwide.',
      },
      {
        headline: 'Hospitals',
        body: 'Isolation wards are unprepared for surge capacity.',
      },
      { headline: 'Pressure', body: 'Tourism lobbies demand silence.' },
      {
        headline: 'Uncertainty',
        body: 'Global agencies are still debating severity.',
      },
    ],
    options: [
      {
        text: 'Launch a full early pandemic response.',
        meta: {
          points: 10,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Quietly prepare hospitals and stockpile PPE.',
        meta: {
          points: 6,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Wait for international confirmation.',
        meta: {
          points: 3,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Downplay risk to protect tourism.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You treated uncertainty as a warning.

Hospitals were ready.
PPE shortages were avoided.
Transmission slowed.

You paid political pain early to save lives later.
`,
      realStory: `
This scenario was based on COVID-19 early-response decisions.

Countries that acted early:
• Taiwan
• South Korea
• New Zealand

Countries that delayed:
• Waited for WHO confirmation
• Avoided panic

Delay caused catastrophic outbreaks and millions of preventable deaths.
`,
      comparison: `
You acted early.

Many governments acted late.

Where you improved:
• Prepared hospitals early
• Stockpiled PPE

Where reality failed:
• Waited for certainty
• Prioritized optics
`,
      scoring: `
Early response scored highest because:

• Pandemics grow exponentially
• Early preparation saves lives

Quiet preparation was partial.

Delay mirrors real-world failure logic.
`,
      context: `
Pandemics punish political cowardice.

Uncertainty is a warning.
`,
      lesson: `
Leadership lesson:
Speed beats certainty.
`,
    },
  },

  {
    month: 4,
    title: 'Month 4 — The Clean Break',
    narrative: `
You are part of the national leadership team of an agrarian economy.

Your country relies heavily on chemical fertilizers to sustain:

• Staple food production
• Export crops
• Farmer incomes

A newly elected leadership team campaigns on environmental sustainability.

Senior ministers propose:

“We should ban chemical fertilizers immediately and shift to organic farming.”

Your agriculture ministry warns:

• Farmers lack training
• Organic inputs are insufficient
• Crop yields will fall sharply
• Food prices will rise

Your political advisors argue:

“This is our historic chance to be bold.”

You are now in a closed cabinet session.

This decision will reshape the national food system.

What do you do?
`,
    intel: [
      {
        headline: 'Readiness',
        body: 'Farmers lack training for organic methods.',
      },
      {
        headline: 'Supply',
        body: 'Organic alternatives are insufficient nationwide.',
      },
      { headline: 'Reserves', body: 'Food buffer stocks are low.' },
      { headline: 'Exports', body: 'Cash crops depend on fertilizer.' },
      {
        headline: 'Pressure',
        body: 'Environmental lobbies demand immediate action.',
      },
    ],
    options: [
      {
        text: 'Launch a phased transition over 3–5 years.',
        meta: {
          points: 10,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Reduce fertilizer imports by 30%.',
        meta: {
          points: 6,
          risk: 'moderate',
          ethics: 'medium',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Announce an immediate nationwide ban.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'ideological',
        },
      },
      {
        text: 'Delay policy entirely.',
        meta: {
          points: 4,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You preserved food security while achieving reform.

Farmers had time to adapt.
Crop yields stabilized.
Food prices remained manageable.

You avoided ideological overreach.
`,
      realStory: `
This scenario was based on Sri Lanka’s fertilizer ban in 2021.

The government imposed an immediate nationwide ban.

Consequences:
• Crop yields collapsed
• Food inflation surged
• Farmer incomes collapsed
• Export revenues fell
• The policy had to be reversed

The ban became a textbook example of policy shock failure.
`,
      comparison: `
You phased reform.

Sri Lanka shocked the system.

Where you improved:
• Prioritized transition planning
• Avoided symbolic policy

Where reality failed:
• Ignored implementation capacity
`,
      scoring: `
Phased transition scored highest because:

• Complex systems resist sudden change
• Transition capacity matters

Immediate bans scored zero.
`,
      context: `
Sustainability without logistics collapses.

Symbolic policy is not strategic policy.
`,
      lesson: `
Leadership lesson:
Implementation beats ideology.
`,
    },
  },

  {
    month: 5,
    title: 'Month 5 — The Modernization Trap',
    narrative: `
You are part of the executive leadership team of a century-old consumer technology company.

Your flagship physical product still generates:

• 80% of company revenue
• Nearly all operating profit
• The bulk of brand recognition

But consumer behavior is shifting.

Younger customers are migrating toward digital alternatives.
Competitors are investing heavily in software ecosystems.
Wall Street analysts are calling your company “obsolete.”

Your innovation division proposes:

“We should rapidly phase out the legacy product and go fully digital.”

Your finance team warns:

“The legacy product funds all our R&D. Killing it too fast will destroy cash flow.”

Your marketing team adds:

“Our brand is emotionally tied to the old product.”

The board is split.

Investors are impatient.
Employees are anxious.
Journalists are circling.

You are now in a closed boardroom session.

What do you do?
`,
    intel: [
      {
        headline: 'Revenue',
        body: 'The legacy product generates over 80% of profits.',
      },
      {
        headline: 'Volatility',
        body: 'Digital growth remains unstable and unprofitable.',
      },
      { headline: 'Loyalty', body: 'Core customers resist switching.' },
      {
        headline: 'Competition',
        body: 'Rivals are entering digital aggressively.',
      },
      {
        headline: 'Identity',
        body: 'Brand equity is tied to the old product.',
      },
    ],
    options: [
      {
        text: 'Create a legally separate digital subsidiary while preserving the legacy product.',
        meta: {
          points: 6,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Gradually increase digital investment while maintaining the legacy product.',
        meta: {
          points: 10,
          risk: 'cautious',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },

      {
        text: 'Rapidly phase out the legacy product.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'medium',
          time: 'early',
          reality: 'ideological',
        },
      },
      {
        text: 'Ignore the digital shift.',
        meta: {
          points: 3,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You preserved cash flow while enabling innovation.

The legacy business continued funding R&D.
Digital operations scaled independently.
Brand trust remained intact.

You avoided detonating your own revenue engine.
`,
      realStory: `
This scenario was based on Kodak’s strategic collapse between 1997 and 2012.

Kodak leadership dismantled their own cash-generating film business in an attempt to accelerate a digital future.

They believed:
• Brand dominance would carry into digital
• Consumers would rapidly abandon film
• Early sacrifice would guarantee future leadership

They were wrong.

The digital camera market commoditized.
Margins collapsed.
Cash flow evaporated.
R&D funding dried up.

Kodak never recovered.
`,
      comparison: `
You layered disruption.

Kodak detonated disruption.

Where you improved:
• Preserved the profit engine
• Funded digital transition
• Protected brand trust

Where reality failed:
• Abandoned cash flow too early
• Misjudged market timing
`,
      scoring: `
Creating a separate digital subsidiary scored highest because:

• Cash flow funds innovation
• Timing matters more than symbolism

Rapid phase-out mirrors Kodak’s real failure logic.
`,
      context: `
Disruption destroys companies that kill their own funding base.

Cash flow is a strategic asset.
`,
      lesson: `
Leadership lesson:
Disruption should be layered, not detonated.
`,
    },
  },

  {
    month: 6,
    title: 'Month 6 — The Moral Exit',
    narrative: `
You are part of the global executive leadership team of a major consumer brand.

Your company operates hundreds of outlets in a foreign country.

That country has just launched a full-scale military invasion of a neighboring state.

Global outrage intensifies.
Graphic images flood social media.
Governments announce sanctions.

Your company now faces an ethical and strategic dilemma.

Human rights groups demand an immediate exit.
Customers are calling for boycotts.
Employees are asking what the company stands for.

Your regional managers warn:

“If we shut down instantly, thousands of local staff lose their jobs.”

Your legal team warns:

“Sanctions may expand. Asset seizures are possible.”

Your finance team warns:

“This market generates nearly 9% of global revenue.”

You are now in a global crisis leadership call.

What do you do?
`,
    intel: [
      {
        headline: 'Revenue',
        body: 'This market generates nearly 9% of global revenue.',
      },
      { headline: 'Staff', body: 'Local employees depend on your jobs.' },
      {
        headline: 'Boycotts',
        body: 'Global consumer boycotts are intensifying.',
      },
      {
        headline: 'Sanctions',
        body: 'Legal restrictions are expanding weekly.',
      },
      {
        headline: 'Takeover',
        body: 'Competitors are ready to absorb your market share.',
      },
    ],
    options: [
      {
        text: 'Transfer ownership to a local operator and remove brand identity.',
        meta: {
          points: 6,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Exit immediately and shut everything down.',
        meta: {
          points: 5,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'ideological',
        },
      },
      {
        text: 'Suspend operations temporarily.',
        meta: {
          points: 10,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'pragmatic',
        },
      },

      {
        text: 'Continue operations quietly.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You exited ethically without detonating livelihoods.

Employees retained jobs.
Brand control ended.
Reputational damage was contained.

You balanced moral clarity with operational realism.
`,
      realStory: `
This scenario was based on McDonald’s exit from Russia in 2022.

McDonald’s faced global outrage after Russia invaded Ukraine.

They chose to:
• Sell their operations to a local franchisee
• Remove all branding
• Retain employee jobs
• Exit revenue streams

This allowed McDonald’s to:
• Uphold ethical positioning
• Avoid mass layoffs
• Prevent asset seizures
• Protect long-term brand credibility
`,
      comparison: `
You balanced ethics and realism.

McDonald’s did the same.

Where you aligned with reality:
• Ethical exit without chaos
• Operational continuity for employees

Where others failed:
• Stayed too long
• Faced reputational collapse
`,
      scoring: `
Local transfer scored highest because:

• It preserves human livelihoods
• Upholds moral positioning
• Avoids asset seizure
• Contains reputational damage

Staying mirrors corporate denial.
`,
      context: `
Corporate ethics failures permanently damage brands.

Symbolic exits without logistics cause collateral harm.
`,
      lesson: `
Leadership lesson:
Moral action still requires operational realism.
`,
    },
  },

  {
    month: 7,
    title: 'Month 7 — The Algorithmic Debt',
    narrative: `
You are part of the executive leadership team of a global social media platform.

Your recommendation algorithm has driven explosive growth.

Daily engagement is at record highs.
Advertising revenue is surging.
Investor sentiment is euphoric.

But an internal research division quietly reports disturbing findings:

• The algorithm amplifies misinformation
• Teen mental health metrics are worsening
• Polarization is increasing
• Addictive usage patterns are intensifying

The research team urges immediate algorithm changes.

Your product leadership warns:

“If we change the algorithm, engagement will fall and revenue will drop.”

Your legal team warns:

“If this leaks, we face regulatory scrutiny.”

Whistleblowers are preparing disclosures.

You are now in a closed executive ethics session.

What do you do?
`,
    intel: [
      { headline: 'Leaks', body: 'Whistleblowers are preparing disclosures.' },
      {
        headline: 'Lawmakers',
        body: 'Regulators are drafting platform legislation.',
      },
      { headline: 'Usage', body: 'Teen engagement is spiking sharply.' },
      { headline: 'Trust', body: 'Your brand is still respected.' },
      { headline: 'Revenue', body: 'Advertisers are unaware of the findings.' },
    ],
    options: [
      {
        text: 'Modify the algorithm and inform the public.',
        meta: {
          points: 10,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Quietly tweak the algorithm slightly.',
        meta: {
          points: 6,
          risk: 'moderate',
          ethics: 'medium',
          time: 'delay',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Ignore the findings.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Delay until regulators act.',
        meta: {
          points: 3,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You sacrificed growth to contain long-term harm.

Engagement fell.
Revenue dipped.
Public trust stabilized.

You paid economic pain early to prevent regulatory collapse later.
`,
      realStory: `
This scenario was based on Facebook internal research leaks in 2021.

Facebook researchers found:

• Instagram harmed teen mental health
• Algorithms amplified misinformation
• Engagement metrics incentivized polarization

Leadership delayed major algorithm changes.

Whistleblower Frances Haugen leaked documents.

Consequences:
• Congressional hearings
• Global regulatory pressure
• Massive reputational damage
• Long-term trust erosion
`,
      comparison: `
You acted before forced exposure.

Facebook acted after whistleblower leaks.

Where you improved:
• Contained ethical debt
• Preserved long-term trust

Where reality failed:
• Prioritized engagement metrics
• Delayed accountability
`,
      scoring: `
Immediate modification scored highest because:

• Ethical debt compounds
• Regulatory backlash is inevitable

Delay mirrors real-world failure logic.
`,
      context: `
Tech ethics failures now shape global regulation.

Growth without governance destroys trust.
`,
      lesson: `
Leadership lesson:
Ethical debt matures with interest.
`,
    },
  },

  {
    month: 8,
    title: 'Month 8 — The Merger Delusion',
    narrative: `
You are part of the executive leadership team of a fast-growing technology firm.

A massive legacy conglomerate offers a historic merger.

The deal promises:

• Global scale
• Media dominance
• Investor euphoria
• Immediate valuation spike

But your internal analysts warn:

• Corporate cultures are incompatible
• Tech stacks will not integrate
• Decision autonomy will vanish
• Debt load will spike
• Innovation velocity will collapse

Your investment bankers insist:

“This is a once-in-a-generation deal.”

Your engineers privately panic.

You are now in a final merger approval meeting.

What do you do?
`,
    intel: [
      { headline: 'Culture', body: 'Corporate cultures are incompatible.' },
      { headline: 'Systems', body: 'Tech stacks won’t integrate.' },
      { headline: 'Debt', body: 'Debt load will spike dangerously.' },
      { headline: 'Autonomy', body: 'Decision independence disappears.' },
      { headline: 'Shareholders', body: 'Investors want immediate gains.' },
    ],
    options: [
      {
        text: 'Reject the merger and continue organic growth.',
        meta: {
          points: 7,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Acquire a smaller competitor instead.',
        meta: {
          points: 10,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },

      {
        text: 'Renegotiate terms and slow integration.',
        meta: {
          points: 4,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Accept the merger.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'early',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You avoided a value-destroying merger.

Innovation continued.
Culture remained intact.
Debt remained manageable.

You rejected scale delusion.
`,
      realStory: `
This scenario was based on the AOL–Time Warner merger in 2000.

It was the largest corporate merger in history.

Leadership believed:
• Digital and media would integrate seamlessly
• Brand dominance would compound
• Scale guaranteed success

Reality:
• Cultural warfare
• Systems incompatibility
• Massive debt
• Strategic paralysis

The merger destroyed over $200 billion in shareholder value.
`,
      comparison: `
You rejected scale delusion.

AOL–Time Warner embraced it.

Where you improved:
• Protected innovation velocity
• Preserved cultural cohesion

Where reality failed:
• Ignored integration complexity
`,
      scoring: `
Rejecting the merger scored highest because:

• Integration failure risk dominates synergy promises
• Scale without cohesion destroys value

Acceptance mirrors real-world failure logic.
`,
      context: `
Mega-mergers destroy value more often than they create it.

Bigger is not better.
`,
      lesson: `
Leadership lesson:
Scale without integration is suicide.
`,
    },
  },

  {
    month: 9,
    title: 'Month 9 — The Unthinkable Offer',
    narrative: `
You are part of the executive leadership team of a dominant mobile hardware company.

Your devices once defined the industry.

But over the last three years:

• App developers are abandoning your operating system
• Consumers are shifting to competitor ecosystems
• Innovation velocity has slowed
• Your market share is declining

A major rival approaches you with a private offer:

“Abandon your proprietary OS and adopt our platform.”

Your engineers argue:

“Our OS is our identity. Surrendering it means surrendering the brand.”

Your strategy team warns:

“Without an app ecosystem, we will become irrelevant.”

Your board is split between pride and survival.

You are now in a closed strategic emergency session.

What do you do?
`,
    intel: [
      {
        headline: 'Developers',
        body: 'App creators are abandoning your OS rapidly.',
      },
      { headline: 'Ecosystem', body: 'Competitors dominate app platforms.' },
      { headline: 'Market', body: 'Market share is declining steadily.' },
      { headline: 'Innovation', body: 'App progress is slowing sharply.' },
      {
        headline: 'Consumers',
        body: 'Customers demand integrated ecosystems.',
      },
    ],
    options: [
      {
        text: 'Accept the partnership and abandon your OS.',
        meta: {
          points: 10,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Open-source your OS.',
        meta: {
          points: 7,
          risk: 'moderate',
          ethics: 'medium',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Double down on your OS.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Delay and observe.',
        meta: {
          points: 3,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You swallowed pride to preserve relevance.

Your hardware integrated into a thriving ecosystem.
App availability stabilized.
Customer attrition slowed.

You traded identity for survival.
`,
      realStory: `
This scenario was based on Nokia’s rejection of Android in 2007–2011.

Nokia dominated global smartphone market share.

Leadership believed:
• Their OS defined the brand
• Developers would remain loyal
• Hardware excellence was enough

They rejected Android.

Instead:
• Developers abandoned the platform
• Ecosystem momentum collapsed
• Consumer relevance vanished

Nokia’s smartphone business never recovered.
`,
      comparison: `
You accepted reality.

Nokia denied it.

Where you improved:
• Preserved ecosystem access
• Maintained developer relevance

Where reality failed:
• Let pride override survival logic
`,
      scoring: `
Accepting the partnership scored highest because:

• Ecosystems dominate hardware markets
• Platform relevance beats brand identity

Doubling down mirrors real-world failure logic.
`,
      context: `
Hardware companies now live or die by ecosystems.

Pride kills companies.
`,
      lesson: `
Leadership lesson:
Reality beats identity.
`,
    },
  },

  {
    month: 10,
    title: 'Month 10 — The Slow Burn',
    narrative: `
You are part of the national leadership team of a heavily import-dependent country.

Fuel shipments are becoming irregular.
Power cuts are quietly extended.
Transport services are intermittently suspended.

Your energy ministry warns:

“At current import rates, we will exhaust fuel reserves within weeks.”

Your finance ministry warns:

“We cannot pay suppliers. Our foreign reserves are gone.”

Your political advisors argue:

“If we announce emergency talks, panic will explode.”

Your engineers warn:

“If we delay any longer, power grid collapse is inevitable.”

You are now in an emergency cabinet meeting.

The public still believes everything is under control.

But internally, the system is fracturing.

What do you do?
`,
    intel: [
      { headline: 'Reserves', body: 'Fuel reserves are under two weeks.' },
      { headline: 'Grid', body: 'Power stations are below safe capacity.' },
      { headline: 'Suppliers', body: 'Fuel suppliers refuse new contracts.' },
      { headline: 'Debt', body: 'Foreign debt servicing is overdue.' },
      { headline: 'Protests', body: 'Small demonstrations are beginning.' },
    ],
    options: [
      {
        text: 'Negotiate emergency fuel deals and international support.',
        meta: {
          points: 6,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Increase domestic fuel prices.',
        meta: {
          points: 5,
          risk: 'moderate',
          ethics: 'medium',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Implement rolling blackouts quietly.',
        meta: {
          points: 10,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'pragmatic',
        },
      },

      {
        text: 'Delay action and reassure the public.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You stabilized power generation before collapse.

Fuel imports resumed.
Grid stability returned.
Public panic was avoided.

You absorbed political pain to preserve national continuity.
`,
      realStory: `
This scenario was based on Sri Lanka’s delayed energy response in 2022.

Leadership delayed IMF negotiations and supplier diversification.

When fuel ships stopped arriving:
• Power stations shut down
• Transport collapsed
• Long queues formed
• Public protests erupted

Emergency reforms came too late to prevent social collapse.
`,
      comparison: `
You acted early.

Sri Lanka acted late.

Where you improved:
• Secured emergency financing
• Preserved grid stability

Where reality failed:
• Delayed painful decisions
`,
      scoring: `
Emergency negotiation scored highest because:

• Energy collapse destabilizes everything
• Financing windows close fast

Delay mirrors real-world failure logic.
`,
      context: `
Energy collapse cascades into economic collapse.

Delay multiplies damage.
`,
      lesson: `
Leadership lesson:
Silent crises are still crises.
`,
    },
  },

  {
    month: 11,
    title: 'Month 11 — The Run',
    narrative: `
You are part of the central bank leadership of a major economy.

A viral rumor spreads that a major domestic bank is insolvent.

Withdrawals accelerate.

The bank’s fundamentals are weak but not collapsed.

Your financial stability team warns:

“If withdrawals continue, the bank will fail within days.”

Your political advisors argue:

“If we intervene publicly, we confirm the rumor.”

Your legal team warns:

“Guarantees create moral hazard.”

Markets are watching.

Social media is panicking.

You are now in an emergency monetary policy meeting.

What do you do?
`,
    intel: [
      { headline: 'Liquidity', body: 'The bank has limited cash on hand.' },
      {
        headline: 'Rumors',
        body: 'False insolvency claims are spreading fast.',
      },
      { headline: 'Markets', body: 'Stock prices are falling.' },
      { headline: 'Deposits', body: 'Withdrawals are accelerating hourly.' },
      { headline: 'Confidence', body: 'Public trust is fragile.' },
    ],
    options: [
      {
        text: 'Guarantee deposits and inject liquidity publicly.',
        meta: {
          points: 10,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Quietly support the bank.',
        meta: {
          points: 5,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Blame social media.',
        meta: {
          points: 3,
          risk: 'cautious',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Let the bank collapse.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'early',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You restored confidence before panic became irreversible.

Withdrawals slowed.
Markets stabilized.
The bank survived.

You prevented systemic contagion.
`,
      realStory: `
This scenario was based on historical bank runs, including the 2008 financial crisis and Silicon Valley Bank’s collapse in 2023.

In 2023:
• SVB faced a rapid bank run
• Withdrawals accelerated within hours
• Leadership delayed communication
• Confidence evaporated

Emergency guarantees came too late.

The bank collapsed.

Contagion risk surged globally.
`,
      comparison: `
You acted decisively.

SVB acted too late.

Where you improved:
• Restored confidence early
• Prevented contagion

Where reality failed:
• Delayed reassurance
`,
      scoring: `
Public guarantees scored highest because:

• Financial systems run on trust
• Panic is nonlinear

Quiet support was partial.

Delay mirrors real-world failure logic.
`,
      context: `
Bank runs are psychological events.

Confidence is infrastructure.
`,
      lesson: `
Leadership lesson:
Speed beats purity.
`,
    },
  },

  {
    month: 12,
    title: 'Month 12 — The Convergence',
    narrative: `
You are now leading a country facing cascading systemic collapse.

Multiple crises converge simultaneously:

• Energy instability
• Financial fragility
• Food inflation
• Public unrest
• Foreign debt exhaustion

Your foreign reserves are depleted.
Suppliers refuse shipments.
International lenders demand reforms.

Public protests grow violent.

Your cabinet is divided.

Some argue:

“Resign and let the next government handle it.”

Others argue:

“Delay reforms and manage unrest.”

Your economic advisors warn:

“There is no painless path left.”

You are now in the final emergency cabinet session.

This is the last move.

What do you do?
`,
    intel: [
      { headline: 'Debt', body: 'Foreign debt is unsustainable.' },
      { headline: 'Unrest', body: 'Protests are growing violent.' },
      { headline: 'Reserves', body: 'Foreign reserves are exhausted.' },
      { headline: 'Pressure', body: 'International lenders demand reforms.' },
      { headline: 'Trust', body: 'Public trust is collapsing.' },
    ],
    options: [
      {
        text: 'Launch painful reforms with international support.',
        meta: {
          points: 6,
          risk: 'bold',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Resign and call elections.',
        meta: {
          points: 10,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Delay reforms and manage unrest.',
        meta: {
          points: 4,
          risk: 'cautious',
          ethics: 'medium',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Reject reforms and blame outsiders.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `
You confronted collapse instead of escaping it.

Reforms stabilized the economy.
International support resumed.
Public unrest subsided gradually.

You preserved institutional continuity.
`,
      realStory: `
This scenario was based on multiple sovereign debt crises, including Sri Lanka’s 2022 collapse.

Leadership delayed IMF talks and structural reforms.

When reserves collapsed:
• Fuel stopped arriving
• Power grids failed
• Food inflation exploded
• Public protests forced resignations

Reforms came only after collapse.

Recovery took years.
`,
      comparison: `
You acted before institutional breakdown.

Sri Lanka acted after collapse.

Where you improved:
• Preserved governance continuity
• Contained long-term damage

Where reality failed:
• Delayed reforms
`,
      scoring: `
Reform-first scored highest because:

• Delay multiplies collapse
• International financing windows close

Resignation was partial.

Blame mirrors collapse logic.
`,
      context: `
Sovereign collapse is a process, not an event.

Delay makes it irreversible.
`,
      lesson: `
Leadership lesson:
There is no painless collapse.
`,
    },
  },
];
