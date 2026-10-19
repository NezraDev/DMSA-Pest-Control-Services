export type ChatAction = {
  label: string;
  href: string;
};

export type ChatReply = {
  text: string;
  actions: ChatAction[];
};

const quoteAction: ChatAction = {
  label: "Request a quotation",
  href: "/request-quote",
};
const servicesAction: ChatAction = { label: "View services", href: "/services" };
const locationsAction: ChatAction = {
  label: "View service locations",
  href: "/treated-locations",
};
const galleryAction: ChatAction = { label: "View service gallery", href: "/gallery" };
const testimonialsAction: ChatAction = {
  label: "View testimonials",
  href: "/testimonials",
};
const contactAction: ChatAction = { label: "Contact DMSA", href: "/contact" };
const callAction: ChatAction = { label: "Call 0955 562 9226", href: "tel:+639556292226" };
const viberAction: ChatAction = {
  label: "Viber 0918 299 5218",
  href: "viber://chat?number=%2B639182995218",
};
const emailAction: ChatAction = {
  label: "Email DMSA",
  href: "mailto:dmsapestcontrolservices@gmail.com",
};
const contactActions = [callAction, viberAction, emailAction];

type KnowledgeRule = {
  id: string;
  priority: number;
  triggers: string[];
  text: string;
  actions?: ChatAction[];
};

const rules: KnowledgeRule[] = [
  {
    id: "assistant-info",
    priority: 130,
    triggers: ["are you a bot", "is this a bot", "are you ai", "are you human", "are you a real person", "is anyone online", "live agent", "automated chat", "who am i chatting with"],
    text: "I’m DMSA Quick Answers, an automated website assistant. I can share information published on this site, but I can’t confirm bookings, check live availability, or access messages sent to DMSA. For personal help, please contact the team.",
    actions: contactActions,
  },
  {
    id: "urgent-exposure",
    priority: 129,
    triggers: ["chemical exposure", "pesticide exposure", "breathed in pesticide", "swallowed pesticide", "pesticide in my eyes", "touched the pesticide", "feeling sick after treatment", "someone feels sick after treatment"],
    text: "I can’t assess a possible chemical exposure. Move away from the treated area and contact local emergency or medical services now. If it is safe, keep the product label available for medical professionals. Please also notify DMSA about the product and service involved.",
    actions: [callAction, viberAction],
  },
  {
    id: "pricing",
    priority: 125,
    triggers: ["how much", "how much does", "how much is", "price", "prices", "pricing", "rate", "rates", "cost", "quotation cost", "estimate", "cheap", "discount", "promo", "payment amount"],
    text: "DMSA does not publish fixed prices on this site. The quotation depends on the pest concern, property, affected areas, location, and treatment scope. Request a quotation and DMSA can review the details; a free ocular inspection is included in the quotation process and may be arranged before the final scope and price are confirmed.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "booking-status",
    priority: 124,
    triggers: ["check my booking", "check my appointment", "appointment status", "check my request", "quotation status", "did you receive my request", "did my form go through", "is my appointment confirmed", "confirm my booking", "track my request", "change my appointment", "reschedule my appointment", "cancel my appointment", "cancel my booking"],
    text: "I can’t access quotation requests or appointment records. A preferred date is a request until DMSA confirms it. Please call or message the team directly to check the status.",
    actions: contactActions,
  },
  {
    id: "data-privacy",
    priority: 122,
    triggers: ["privacy", "personal information", "my data", "store my information", "save my details", "what happens to my information", "is my data stored", "data protection"],
    text: "Details submitted through the quotation form are emailed to DMSA and are not stored by this website. You can use a general location in the form if you prefer, then confirm exact property details privately with the team.",
    actions: [quoteAction, contactAction],
  },
  {
    id: "request-quotation",
    priority: 118,
    triggers: ["get a quote", "request a quote", "request a quotation", "get quotation", "send a quote", "send me a quote", "book pest control", "book a service", "schedule a service", "how do i book", "how can i book", "make an appointment", "need pest control", "need termite treatment"],
    text: "Start with DMSA’s quotation form. Share the property type, general location, pest concern, affected areas, and a preferred contact method. Submitting the form does not confirm a booking or final price; the team will review the details and confirm the next steps.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "inspection",
    priority: 116,
    triggers: ["free ocular inspection", "ocular inspection", "site inspection", "property inspection", "inspection free", "is the inspection free", "free inspection", "charge for inspection", "charged for inspection", "inspection involve", "do you inspect", "inspect my house", "visit my property"],
    text: "Yes. A free ocular inspection is included in DMSA’s quotation process and may be arranged to review the property before the scope, schedule, and price are confirmed. Request a quotation to share your details.",
    actions: [quoteAction, contactAction],
  },
  {
    id: "safety-children-pets",
    priority: 115,
    triggers: ["safe for children", "safe for babies", "safe for pets", "safe around pets", "pet safe", "child safe", "around children", "harm my pet", "harm my dog", "harm my cat", "pregnant", "allergy", "allergies", "is the treatment safe", "is pest control safe", "toxic", "non toxic"],
    text: "DMSA plans service with care for people, property, and the surrounding environment, but this site does not list product-specific safety or re-entry instructions. Tell the team about children, pets, allergies, or other concerns before treatment, and follow the technician’s instructions for the specific product and property.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "preparation-aftercare",
    priority: 113,
    triggers: ["prepare my house", "prepare for treatment", "preparation before treatment", "before pest control", "what should i prepare", "what should i do before", "after treatment", "aftercare", "when can i return", "when can i clean", "when can i go inside", "how long before i can enter", "re entry", "reenter"],
    text: "Preparation and after-care depend on the treatment and property. DMSA will provide any specific instructions when the visit is confirmed. Share access needs, children, pets, food areas, and other concerns with the team in advance; follow the technician’s directions after service.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "treatment-products",
    priority: 112,
    triggers: ["what chemical", "which chemical", "what pesticide", "product brand", "chemical brand", "what product do you use", "what chemicals do you use", "what treatment do you use", "chemical used"],
    text: "The exact product and application depend on the property and treatment plan. Product names and technical instructions are not listed on this site, so please ask DMSA directly for details about a proposed treatment.",
    actions: contactActions,
  },
  {
    id: "service-area",
    priority: 108,
    triggers: ["where do you serve", "where do you operate", "where can you provide service", "service area", "areas covered", "areas served", "do you serve", "do you cover", "available in", "near me", "around me", "service location", "service locations", "bicol", "camarines sur", "cavite", "laguna", "los banos", "batangas", "rizal", "quezon", "metro manila"],
    text: "DMSA lists service coverage across the Bicol Region, Cavite, Laguna, Batangas, Rizal, Quezon, and Metro Manila. Availability depends on the exact location and work required, so share your area with DMSA to confirm coverage.",
    actions: [locationsAction, quoteAction, ...contactActions],
  },
  {
    id: "hours",
    priority: 106,
    triggers: ["hours", "opening time", "closing time", "when are you open", "are you open", "business hours", "operating hours", "weekend", "sunday", "saturday", "after hours", "open today"],
    text: "DMSA’s published operating hours are Monday through Sunday, 8:00 AM to 5:00 PM. For a visit or service schedule, contact DMSA to confirm availability for your location.",
    actions: contactActions,
  },
  {
    id: "contact",
    priority: 104,
    triggers: ["contact", "phone number", "mobile number", "telephone", "phone", "call you", "how to reach you", "email address", "email you", "email", "viber", "talk to someone", "speak to a person", "contact number", "viber number"],
    text: "You can call DMSA at 0955 562 9226, message on Viber at 0918 299 5218, or email dmsapestcontrolservices@gmail.com. The team can help with service questions, quotations, and availability.",
    actions: contactActions,
  },
  {
    id: "locations-address",
    priority: 102,
    triggers: ["where are you located", "your location", "your address", "office address", "head office", "headquarters", "branch address", "los banos branch", "san antonio laguna", "san fernando office", "directions", "visit your office"],
    text: "DMSA lists its headquarters in Zone 3, Pamukid, San Fernando, Camarines Sur, and a Los Baños branch in San Antonio, Laguna. Please contact DMSA for directions or to confirm whether an office visit is available.",
    actions: contactActions,
  },
  {
    id: "service-process",
    priority: 99,
    triggers: ["how does it work", "what is the process", "service process", "what happens next", "what happens after i request", "what is included", "included in the quote", "included in the quotation", "what does the quote include", "steps", "how do you work", "what to expect"],
    text: "The process starts with a quotation request and review of your property concern. A free ocular inspection is included and may be arranged, then DMSA confirms the recommended scope, schedule, and price. After service, the team provides practical guidance for the treatment carried out.",
    actions: [quoteAction, servicesAction],
  },
  {
    id: "choose-service",
    priority: 97,
    triggers: ["which service", "what service do i need", "help me choose", "not sure what service", "unsure which service", "what should i select", "which option should i choose", "i am unsure", "im unsure", "not sure what i need"],
    text: "If you are unsure, choose “Unsure” in the quotation form and describe the pest signs and affected areas. DMSA can assess the property and confirm the appropriate service.",
    actions: [quoteAction, servicesAction],
  },
  {
    id: "termite-preconstruction",
    priority: 95,
    triggers: ["pre construction", "preconstruction", "before construction", "before building", "soil treatment", "soil poisoning", "anti termite soil", "new construction", "construction termite"],
    text: "Yes. DMSA lists pre-construction anti-termite soil treatment, along with post-construction inspection and treatment options. The recommended approach depends on the site and construction stage; request a quotation to discuss the property.",
    actions: [{ label: "Termite control information", href: "/services#termite-control" }, quoteAction],
  },
  {
    id: "termite-control",
    priority: 90,
    triggers: ["termite", "termites", "anay", "mud tube", "mud tubes", "termite wings", "termite damage", "hollow wood", "wood treatment", "termite colony", "termite inspection"],
    text: "DMSA provides termite inspection and treatment options, including soil treatment, wood treatment, and colony-focused systems selected for the property and construction stage. Mud tubes, damaged or hollow-sounding timber, discarded wings, and swarming insects can be useful signs to mention when requesting an inspection.",
    actions: [{ label: "Termite control information", href: "/services#termite-control" }, quoteAction],
  },
  {
    id: "general-pest",
    priority: 88,
    triggers: ["ants", "ant problem", "cockroach", "cockroaches", "roach", "flies", "fly problem", "rodent", "rodents", "rat", "rats", "mice", "mouse", "general pest", "common pests", "what pests do you treat", "pests do you handle", "which pests", "pest control for", "pest problem"],
    text: "DMSA’s general pest control information covers common pests such as ants, cockroaches, flies, and rodents. Describe where you have seen activity and any signs such as trails, droppings, gnaw marks, or damaged packaging so the team can review the concern.",
    actions: [{ label: "General pest control information", href: "/services#general-pest-control" }, quoteAction],
  },
  {
    id: "residential-commercial",
    priority: 85,
    triggers: ["residential", "my house", "my home", "apartment", "condominium", "commercial", "business property", "office", "retail", "warehouse", "construction site", "business pest control"],
    text: "DMSA serves residential and commercial properties, including houses, apartments, condominiums, offices, retail spaces, warehouses, and construction sites. The service plan depends on the property and pest concern.",
    actions: [servicesAction, quoteAction],
  },
  {
    id: "other-pests",
    priority: 84,
    triggers: ["bed bugs", "bedbug", "mosquito", "mosquitoes", "wasp", "wasps", "snake", "lizard", "spider", "spiders", "wildlife", "termite eggs", "other pest", "pest not listed"],
    text: "The website lists general pest control for common pests and separately lists termite control. It does not confirm service details for every pest type. Send the team a description or photo and ask whether DMSA can assess and treat it.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "timing-availability",
    priority: 82,
    triggers: ["same day", "today", "tomorrow", "emergency service", "urgent service", "how soon", "how long to get", "when can you come", "availability", "next available", "how long does treatment take", "treatment duration", "how long will it take"],
    text: "I can’t check live availability or estimate treatment time for a specific property. A preferred date is subject to confirmation, and the visit duration depends on the site and treatment scope. Contact DMSA with your location and preferred schedule.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "warranty-followup",
    priority: 80,
    triggers: ["warranty", "guarantee", "guaranteed", "follow up", "follow-up", "retreatment", "come back", "recurrence", "pests came back", "pest came back"],
    text: "This site does not list a standard warranty, guarantee, or follow-up schedule. Ask DMSA to include any treatment-specific follow-up terms in the quotation or service instructions.",
    actions: contactActions,
  },
  {
    id: "payment-insurance",
    priority: 78,
    triggers: ["payment methods", "how do i pay", "payment options", "cash", "gcash", "credit card", "installment", "insurance", "covered by insurance", "hmo", "financing"],
    text: "Payment methods and insurance coverage are not listed on this site. Please confirm them directly with DMSA before arranging service.",
    actions: contactActions,
  },
  {
    id: "credentials",
    priority: 77,
    triggers: ["license", "licensed", "certified", "certification", "permit", "accredited", "insured company", "pest control license"],
    text: "I don’t have published licensing or certification details to confirm. Please contact DMSA directly if you need specific credentials or documents for your property or organization.",
    actions: contactActions,
  },
  {
    id: "gallery",
    priority: 74,
    triggers: ["photos", "pictures", "gallery", "past work", "previous work", "projects", "examples of work", "show me your work"],
    text: "You can browse DMSA’s service gallery for examples of documented pest-control work. Map locations are generalized to protect customer privacy.",
    actions: [galleryAction, locationsAction],
  },
  {
    id: "reviews",
    priority: 73,
    triggers: ["reviews", "testimonials", "customer feedback", "client comments", "ratings", "stars", "are reviews real"],
    text: "DMSA’s testimonials page is reserved for approved customer feedback. Names are omitted, with only a general location such as the client’s town or area shown. Visit the page to see the feedback currently published.",
    actions: [testimonialsAction],
  },
  {
    id: "environment",
    priority: 71,
    triggers: ["environment", "environmentally friendly", "eco friendly", "environmentally responsible", "green pest control"],
    text: "DMSA describes its service as environmentally responsible and planned with care for people and surroundings. Specific products and application details depend on the property and should be confirmed with the team.",
    actions: [servicesAction, ...contactActions],
  },
  {
    id: "services-list",
    priority: 69,
    triggers: ["what services do you offer", "what are your services", "what services", "list of services", "services offered", "all services", "service list", "what do you do", "services"],
    text: "DMSA offers general pest control, termite control, residential pest control, and commercial pest control. Coverage includes homes and varied commercial properties, with the exact treatment plan confirmed after review of the concern and site.",
    actions: [servicesAction, quoteAction],
  },
  {
    id: "greeting",
    priority: 20,
    triggers: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "help", "what can you help with"],
    text: "Hello. I can answer common questions about DMSA’s services, locations, quotations, inspections, preparation, and contact details. Try one of the suggested questions, or contact the team if you need a detail I can’t confirm.",
    actions: [quoteAction, ...contactActions],
  },
  {
    id: "thanks",
    priority: 10,
    triggers: ["thank you", "thanks", "appreciate it", "that helps"],
    text: "You’re welcome. If you would like help choosing a service or discussing your property, DMSA’s team can talk it through.",
    actions: [quoteAction, contactAction],
  },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function triggerScore(query: string, triggers: string[]) {
  const paddedQuery = ` ${query} `;
  return triggers.reduce((best, trigger) => {
    const phrase = normalize(trigger);
    return phrase && paddedQuery.includes(` ${phrase} `)
      ? Math.max(best, phrase.length)
      : best;
  }, 0);
}

export function getChatbotReply(question: string): ChatReply {
  const query = normalize(question);
  if (!query) {
    return {
      text: "Ask about DMSA’s services, coverage, quotations, inspections, or preparation.",
      actions: [],
    };
  }

  const match = rules
    .map((rule) => ({ rule, score: triggerScore(query, rule.triggers) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.rule.priority - a.rule.priority || b.score - a.score)[0];

  if (match) {
    return { text: match.rule.text, actions: match.rule.actions ?? [] };
  }

  return {
    text: "I don’t have a confirmed answer for that yet. DMSA’s team can help with your specific concern, service area, quotation, or schedule.",
    actions: contactActions,
  };
}

export const chatbotSuggestions = [
  "What services do you offer?",
  "Is the ocular inspection free?",
  "Do you serve my area?",
  "How do I request a quotation?",
];

export const chatbotWelcome: ChatReply = {
  text: "Hi, I’m DMSA Quick Answers, an automated website assistant. Ask about services, termite treatment, service areas, quotations, inspections, preparation, or contact details. I’ll point you to the team when a detail needs confirmation.",
  actions: [],
};
