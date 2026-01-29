// import type { IPricing } from "../types";

// export const pricingData: IPricing[] = [
//     {
//         name: "Basic",
//         price: 29,
//         period: "month",
//         features: [
//             "50 AI Thumbnails/mo",
//             "Basic Templates",
//             "Standard Resolution",
//             "No Watermark",
//             "Email Support"
//         ],
//         mostPopular: false
//     },
//     {
//         name: "Pro",
//         price: 79,
//         period: "month",
//         features: [
//             "Unlimited AI Thumbnails",
//             "Premium Templates",
//             "4K Resolution",
//             "A/B Testing Tools",
//             "Custom Fonts",
//             "Brand Kit Analysix"
//         ],
//         mostPopular: true
//     },
//     {
//         name: "Enterprise",
//         price: 199,
//         period: "month",
//         features: [
//             "Everything in Pro",
//             "API access",
//             "Team Colloboration",
//             "Custom Branding",
//             "Dedicated Account Manager"
//         ],
//         mostPopular: false
//     }
// ];

import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
  {
    name: "Starter",
    price: 29,
    period: "month",
    features: [
      "50 AI thumbnails per month",
      "Access to core templates",
      "HD exports",
      "No watermark",
      "Email support"
    ],
    mostPopular: false
  },
  {
    name: "Creator",
    price: 79,
    period: "month",
    features: [
      "Unlimited AI thumbnails",
      "All premium templates",
      "4K exports",
      "A/B testing tools",
      "Custom fonts & brand presets",
      "Performance analytics"
    ],
    mostPopular: true
  },
  {
    name: "Studio",
    price: 199,
    period: "month",
    features: [
      "Everything in Creator",
      "API access",
      "Team collaboration",
      "Advanced brand controls",
      "Dedicated account manager",
      "Priority support"
    ],
    mostPopular: false
  }
];
