// Industry pages at /industries/<slug>, only for sectors DMSA's commercial service already
// names (services-data.js): offices, retail spaces, warehouses and construction sites.
// TODO(owner): confirm before adding restaurants, schools, hotels or condominium associations.

/** @type {import("../lib/content-types").Industry[]} */
export const industries = [
  {
    slug: "offices",
    name: "Offices",
    title: "Pest control for offices",
    metaTitle: "Pest Control for Offices",
    metaDescription: "Office pest control for cockroaches, ants, rodents and termites, planned around working hours, with a free ocular inspection and an action summary.",
    summary: "Offices attract pests through pantries, food at desks, garbage areas and the gaps around cables and pipes. DMSA inspects the whole site, schedules treatment around working hours and leaves an action summary for the building or office manager.",
    cardSummary: "Pantries, ceilings and cable runs: pest control planned around working hours.",
    relatedPests: ["cockroaches-ipis", "rodents-daga", "ants-langgam", "termites-anay"],
    relatedGuides: ["how-to-prepare-for-pest-control-treatment", "how-to-keep-cockroaches-and-ants-out"],
    sections: [
      {
        id: "common-problems",
        heading: "Common pest problems in offices",
        paragraphs: [
          "Offices may not look like a place for pests, but they offer what pests need. Pantries and break rooms have food, sinks and garbage. Desks hold snacks and coffee cups. Ceilings, raised floors and cable trays give rodents and cockroaches quiet places to travel, and stored files and boxes give termites something to eat.",
        ],
        list: [
          "Cockroaches (ipis) in pantries, under sinks, behind vending machines and in drains.",
          "Ants (langgam) along desks, pantry counters and window frames.",
          "Rats and mice (daga) in ceilings, storerooms and garbage areas, with a risk of gnawed cables.",
          "Termites (anay) in wooden partitions, door frames, cabinets and stored paper.",
          "Flies (langaw) around garbage areas and building entrances.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why it matters for an office",
        paragraphs: [
          "Pests in a workplace lead to staff complaints, damaged files and stock, and in the case of rodents, a risk to cabling and equipment. A cockroach seen by a client in a meeting room can also hurt how a business is seen. Regular attention keeps small problems from spreading through a floor or building.",
        ],
      },
      {
        id: "how-dmsa-works",
        heading: "How DMSA works with offices",
        list: [
          "Free ocular inspection of the office, including pantries, storerooms, ceilings where accessible, garbage areas and entry points.",
          "An operations review covering working hours, restricted areas and building rules.",
          "A treatment plan with the areas, schedule and price confirmed before work begins.",
          "Service coordinated around your operations where possible.",
          "An action summary afterwards, with practical steps for staff and facilities.",
        ],
      },
      {
        id: "shared-buildings",
        heading: "Offices in shared buildings",
        paragraphs: [
          "In a building with several tenants, pests move between units through ceilings, risers, drains and shared garbage rooms. Treating one office helps, but lasting results often need the building administrator to deal with common areas too. Share the administrator's contact details when you request a quotation, and report activity in shared pantries, comfort rooms and garbage areas to building management.",
        ],
      },
      {
        id: "preparation",
        heading: "How to prepare the office",
        list: [
          "Name one contact person who can give the team access to all areas.",
          "Tell staff which areas will be off-limits and for how long.",
          "Clear pantry counters and store food, cups and utensils in the areas to be treated.",
          "Share building management rules on contractor access and work permits.",
        ],
      },
      {
        id: "prevention",
        heading: "Keeping pests out between visits",
        list: [
          "Empty pantry and desk bins daily, and keep food in sealed containers.",
          "Report leaks, gaps around cables and damaged ceiling boards to facilities.",
          "Move stored files and boxes off the floor and away from walls.",
          "Keep the garbage area clean and its bins closed.",
          "Ask the cleaning team to wipe pantry counters and clear food left on desks at the end of each day.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call DMSA",
        paragraphs: [
          "Request a quotation when staff report pests, when you find droppings or gnaw marks, or when you move into a new office. The ocular inspection is free and included in the quotation process.",
        ],
      },
    ],
    faqs: [
      { question: "Can pest control be done outside office hours?", answer: "Share your preferred schedule and access needs when you request a quotation. DMSA coordinates the visit around your operations where possible after the operations review." },
      { question: "Do we need to send staff home during treatment?", answer: "It depends on the treatment and the areas involved. DMSA explains which areas will be off-limits and for how long after the inspection." },
      { question: "Do you work with building administrators?", answer: "Yes. Share the building's rules on contractor access and work permits, and DMSA coordinates with the contact person you name." },
      { question: "What do we receive after the service?", answer: "DMSA provides an action summary after service, with practical guidance on cleaning routines, storage and closing access points." },
    ],
  },
  {
    slug: "retail-shops",
    name: "Retail shops",
    title: "Pest control for shops and retail spaces",
    metaTitle: "Pest Control for Shops and Retail",
    metaDescription: "Pest control for shops, stores and retail spaces: cockroaches, ants, rodents, flies and termites around stock and customers, with a free ocular inspection.",
    summary: "Shops have stock, packaging, food and a steady flow of customers, all of which bring pests in. DMSA inspects the sales floor, stockroom and garbage area, plans treatment around opening hours and gives staff simple steps to keep pests away.",
    cardSummary: "Stock, stockrooms and opening hours: pest control that protects goods and customers.",
    relatedPests: ["cockroaches-ipis", "rodents-daga", "ants-langgam", "flies-langaw"],
    relatedGuides: ["how-to-prepare-for-pest-control-treatment", "how-to-keep-cockroaches-and-ants-out"],
    sections: [
      {
        id: "common-problems",
        heading: "Common pest problems in shops",
        paragraphs: [
          "Retail spaces receive deliveries every day, and pests can arrive with boxes and pallets. Stockrooms are often crowded and rarely moved, which gives rodents and cockroaches places to hide, and food items, packaging and garbage give them something to eat.",
        ],
        list: [
          "Rats and mice (daga) gnawing packaging and stock in stockrooms.",
          "Cockroaches (ipis) behind shelves, counters, chillers and drains.",
          "Ants (langgam) around food items, drinks and counters.",
          "Flies (langaw) near doors, food displays and garbage.",
          "Termites (anay) in wooden shelves, fixtures and display cabinets.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why it matters for a shop",
        paragraphs: [
          "Damaged packaging means stock that can't be sold, and a pest seen by a customer can cost repeat business. Rodents can also gnaw wiring. Dealing with pests early, and keeping the stockroom in order, protects both goods and reputation.",
        ],
      },
      {
        id: "how-dmsa-works",
        heading: "How DMSA works with shops",
        list: [
          "Free ocular inspection of the sales floor, stockroom, receiving area, garbage area and entry points.",
          "An operations review covering opening hours, deliveries and areas customers use.",
          "A treatment plan with the areas, schedule and price confirmed before work begins.",
          "Service coordinated around opening hours where possible.",
          "An action summary with practical steps on stock rotation, cleaning routines and closing access points.",
        ],
      },
      {
        id: "malls",
        heading: "Shops in malls and commercial buildings",
        paragraphs: [
          "Stores in malls and arcades usually have rules on when contractors may work and which areas they may enter. Share the administrator's requirements, such as work permits and allowed hours, when you request a quotation. Pests can also come from neighbouring units, back corridors and shared garbage areas, so report activity there to building management as well.",
        ],
      },
      {
        id: "preparation",
        heading: "How to prepare the shop",
        list: [
          "Move or cover stock and food in the areas to be treated, as advised.",
          "Clear space along walls in the stockroom so the team can reach the corners.",
          "Name a contact person who can open all areas, including storage and utility rooms.",
          "Tell staff the schedule and which areas will be closed.",
        ],
      },
      {
        id: "prevention",
        heading: "Keeping pests out between visits",
        list: [
          "Check deliveries for droppings, gnaw marks or insects before stocking shelves.",
          "Rotate stock (first in, first out) so nothing sits untouched for months.",
          "Keep stock off the floor and a little away from walls.",
          "Close gaps under doors and around pipes, and keep the back door closed.",
          "Clean under counters and display racks, where crumbs and spills collect.",
          "Empty and clean bins daily.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call DMSA",
        paragraphs: [
          "Request a quotation when you find damaged packaging, droppings or insects around stock, or when you open a new branch. The ocular inspection is free and included in the quotation process.",
        ],
      },
    ],
    faqs: [
      { question: "Can treatment be done without closing the shop?", answer: "It depends on the treatment and the areas involved. Share your opening hours when you request a quotation, and DMSA recommends a schedule after the inspection and operations review." },
      { question: "Do you treat stockrooms and receiving areas?", answer: "Yes. The inspection covers the stockroom, receiving area and garbage area, since pests often enter and hide there." },
      { question: "How do we stop rats from damaging stock?", answer: "Keep stock off the floor and away from walls, rotate it regularly and close entry points. DMSA's inspection finds how rodents are getting in and plans treatment and prevention together." },
      { question: "What do we receive after the service?", answer: "An action summary with practical steps on stock rotation, cleaning routines and closing structural access points." },
      { question: "Do you serve sari-sari stores and small shops?", answer: "Yes. Commercial pest control covers retail spaces of any size. Share the size of the store and where you see pests when you request a quotation." },
    ],
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    title: "Pest control for warehouses and storage facilities",
    metaTitle: "Pest Control for Warehouses",
    metaDescription: "Warehouse pest control for rodents, cockroaches, termites and stored-goods pests, with a site inspection, coordinated service and an action summary.",
    summary: "Warehouses hold large amounts of stock, cardboard and pallets in spaces that are open for deliveries and quiet at night. That makes them attractive to rodents, cockroaches and termites. DMSA inspects the site, plans treatment around operations and leaves a clear action summary.",
    cardSummary: "Pallets, cardboard and loading bays: pest control for stock in storage.",
    relatedPests: ["rodents-daga", "cockroaches-ipis", "termites-anay", "flies-langaw"],
    relatedGuides: ["how-to-prepare-for-pest-control-treatment", "signs-of-anay-termites-in-your-house"],
    sections: [
      {
        id: "common-problems",
        heading: "Common pest problems in warehouses",
        paragraphs: [
          "Loading bays open and close all day, letting pests in with goods and from outside. Inside, stacked cartons, pallets and quiet corners give pests shelter, and spilled goods or packaging give them food.",
        ],
        list: [
          "Rats and mice (daga) nesting between stacks, gnawing cartons and contaminating goods.",
          "Cockroaches (ipis) in drains, staff areas and around spilled goods.",
          "Termites (anay) in wooden pallets, crates, shelving and the building structure.",
          "Flies (langaw) around waste areas and loading bays.",
          "Ants (langgam) where food goods are stored or packed.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why it matters for a warehouse",
        paragraphs: [
          "Contaminated or damaged goods can be rejected by clients, and rodents gnawing cables or packaging cause costly losses. Termites in pallets can also spread to the building itself. Because warehouses are large, finding where pests enter and hide matters more than treating what you can see.",
        ],
      },
      {
        id: "how-dmsa-works",
        heading: "How DMSA works with warehouses",
        list: [
          "Free ocular inspection of storage areas, loading bays, offices, staff areas, drains, garbage areas and the building perimeter.",
          "An operations review covering operating hours, stock types and areas that must stay open.",
          "A treatment plan with the areas, schedule and price confirmed before work begins.",
          "Service coordinated around your operations where possible.",
          "An action summary with practical guidance on stock rotation, cleaning routines and closing access points.",
        ],
      },
      {
        id: "outside",
        heading: "Outside the building",
        paragraphs: [
          "The ground around a warehouse matters as much as the inside. Tall grass, piled pallets and waste near the walls give rodents cover, and poor drainage keeps soil damp for termites. Keep a clear strip along the walls, store spare pallets away from the building, and fix drainage so water does not pool against the foundations.",
        ],
      },
      {
        id: "preparation",
        heading: "How to prepare the warehouse",
        list: [
          "Name a contact person who can give access to all areas, including mezzanines and utility rooms.",
          "Share site safety rules and any areas that need permits or escorts.",
          "Leave space between stacks and walls so the team can inspect and treat.",
          "Cover or move sensitive stock in the areas to be treated, as advised.",
        ],
      },
      {
        id: "prevention",
        heading: "Keeping pests out between visits",
        list: [
          "Keep a gap between stock and walls, and stack goods on pallets rather than the floor.",
          "Inspect incoming goods and pallets for droppings, insects and termite damage.",
          "Close loading bay doors when not in use, and seal gaps around doors and pipes.",
          "Clean up spills quickly and keep waste areas away from storage.",
          "Remove old, damaged pallets and unused cardboard.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call DMSA",
        paragraphs: [
          "Request a quotation when you find droppings, gnawed cartons, termite-damaged pallets or insects in stored goods, or before you start using a new storage space. The ocular inspection is free and included in the quotation process.",
        ],
      },
    ],
    faqs: [
      { question: "Can you treat a warehouse without stopping operations?", answer: "Service is coordinated after an operations review. Share the areas that must stay open and your preferred schedule when you request a quotation." },
      { question: "Do termites in pallets affect the building?", answer: "Termite-infested pallets and crates can bring termites close to the building's wooden parts. Inspect incoming pallets and remove damaged ones, and request an inspection if you see mud tubes or damaged wood." },
      { question: "How often should a warehouse be checked?", answer: "It depends on the goods stored, the building and past pest activity. DMSA advises whether follow-up checks are needed after the inspection and treatment." },
      { question: "Do you handle rodents in large storage areas?", answer: "Yes. Rodent control is part of DMSA's general pest control. The inspection looks for droppings, gnaw marks and entry points across the site." },
      { question: "What do we receive after the service?", answer: "An action summary covering what was treated, with practical steps on stock rotation, cleaning routines and closing access points." },
    ],
  },
  {
    slug: "construction-sites",
    name: "Construction sites",
    title: "Termite treatment for construction sites and new buildings",
    metaTitle: "Termite Treatment for Construction",
    metaDescription: "Pre-construction anti-termite soil treatment for new houses and buildings, timed with your contractor before the slab is poured. Free site inspection.",
    summary: "The best time to protect a building from subterranean termites is during construction, when the soil under and around it can be treated directly. DMSA provides pre-construction anti-termite soil treatment timed with your contractor's schedule, before the floor slab is poured.",
    cardSummary: "Soil treatment timed with the contractor, before the slab is poured.",
    relatedPests: ["termites-anay"],
    relatedGuides: ["soil-poisoning-before-construction", "what-affects-termite-treatment-cost"],
    sections: [
      {
        id: "why-before-construction",
        heading: "Why treat before the building goes up",
        paragraphs: [
          "Subterranean termites live in the soil and reach buildings through cracks, joints and the gaps around pipes. Once the floor slab is poured, the soil under it can no longer be reached directly, and later treatment has to go through drilled injection points. Treating the soil during construction is simpler and covers the whole footprint.",
        ],
      },
      {
        id: "timing",
        heading: "When soil treatment fits in the schedule",
        paragraphs: [
          "Soil treatment goes in after the ground has been levelled and compacted and before the floor slab is poured. It covers the area under the slab, around footings and column bases, along the outer edge of the building and where pipes will pass through. The guide to soil poisoning before construction explains each step in more detail.",
          "Because the slab date can move, it helps to book DMSA as soon as the construction schedule is set and to confirm the treatment day once the ground is ready.",
        ],
      },
      {
        id: "who-it-is-for",
        heading: "Who it is for",
        list: [
          "Homeowners building a new house or extension.",
          "Contractors and builders who need termite protection included in the project.",
          "Developers and businesses putting up commercial buildings, warehouses or shops.",
        ],
      },
      {
        id: "how-dmsa-works",
        heading: "How DMSA works with construction projects",
        list: [
          "Free ocular inspection of the site and a review of the construction stage and schedule.",
          "A treatment plan covering the building footprint, the areas and the price, confirmed before work begins.",
          "Treatment timed with the contractor, before the slab is poured.",
          "Advice on protecting treated soil until the slab is in place.",
        ],
      },
      {
        id: "coordinating",
        heading: "What DMSA needs from the owner or contractor",
        list: [
          "The site address or a map pin, and a contact person on site.",
          "The current construction stage and the expected slab-pouring date.",
          "The size and layout of the building, including extensions, outbuildings and utility runs.",
          "Site rules on access, safety gear and working hours.",
          "A heads-up if excavation or backfilling will happen after treatment, so DMSA can advise what to do.",
        ],
      },
      {
        id: "after-construction",
        heading: "After the building is finished",
        paragraphs: [
          "Soil treatment is one part of termite protection. Keep wood from touching the soil, fix leaks and damp areas, and inspect renovations before they are enclosed. If signs of termites appear later, DMSA also treats finished buildings through chemical injection, wood treatment and soil treatment of exposed areas. Keep a note of when the soil was treated, so future owners and contractors know.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call DMSA",
        paragraphs: [
          "Request a quotation as soon as you have a construction schedule, and choose Termite Control. DMSA reviews the site and construction stage during the free ocular inspection and confirms the method, schedule and price.",
        ],
      },
    ],
    faqs: [
      { question: "When should soil poisoning be done during construction?", answer: "After the ground has been levelled and compacted and before the floor slab is poured, including around footings, column bases and where pipes pass through the slab." },
      { question: "Can it be done after the slab is poured?", answer: "Yes, but treatment then goes through small drilled injection points in floors or walls, and exposed soil around the building is treated directly. Treating before the slab is simpler." },
      { question: "Do you work directly with contractors?", answer: "Yes. Share the contractor's schedule and the slab-pouring date, and DMSA times the treatment with the project." },
      { question: "Is the site inspection free?", answer: "Yes. The ocular inspection is free and included in the quotation process." },
      { question: "Does DMSA also treat termites after the building is finished?", answer: "Yes. For finished buildings, DMSA provides termite inspection and treatment, including chemical injection, wood treatment and soil treatment of exposed areas such as garden strips along the walls." },
    ],
  },
];
