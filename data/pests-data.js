// Pest pages at /pests/<slug>: what the pest is, signs, risks, prevention and how DMSA treats
// it. Only pests DMSA's services cover (see services-data.js) get a page. Keep facts general
// and well established, and describe treatment only as the services data does.
// Keyword ownership: these pages own identification and "how to get rid of" searches; the
// /services pages own the "<pest> control service" searches. Link each to the other.

/** @type {import("../lib/content-types").Pest[]} */
export const pests = [
  {
    slug: "termites-anay",
    name: "Termites",
    localName: "anay",
    title: "Termites (anay) and gamu-gamo: signs, types and treatment",
    metaTitle: "Anay (Termites) and Gamu-Gamo Guide",
    metaDescription: "How to identify anay (termites) and gamu-gamo swarms, the signs of damage, the types found in Philippine homes, prevention and how DMSA treats them.",
    summary: "Anay are termites, small pale insects that live in colonies and feed on wood and other cellulose. Gamu-gamo are the winged termites that swarm around lights, often after rain. Mud tubes, hollow-sounding wood and piles of shed wings are the signs to act on.",
    cardSummary: "Mud tubes, hollow wood and gamu-gamo swarms: what they mean and what to do.",
    relatedService: "termite-control",
    relatedGuides: ["signs-of-anay-termites-in-your-house", "anay-vs-ants-how-to-tell", "soil-poisoning-before-construction"],
    dateModified: "2026-11-19",
    sections: [
      {
        id: "what-they-are",
        heading: "What anay are",
        paragraphs: [
          "Termites, called anay in Filipino, are social insects that live in colonies of thousands to millions. Workers are soft-bodied, pale and about the size of a grain of rice. They avoid light and dry air, so you rarely see them in the open. Instead, you see what they leave behind: mud tubes, damaged wood and, at certain times of year, swarms of winged termites.",
          "Termites feed on cellulose, which is found in wood, paper, cardboard and some fabrics. In a house, that means door and window frames, cabinets, wooden ceilings, floors, roof framing, books and stored boxes. Because they eat from the inside, damage often stays hidden until a frame gives way or a cabinet crumbles.",
        ],
      },
      {
        id: "gamu-gamo",
        heading: "Gamu-gamo: what the flying swarms mean",
        paragraphs: [
          "Gamu-gamo are winged termites, the reproductive members of the colony. When conditions are right, usually warm, humid evenings after rain, a mature colony releases swarms of them to mate and start new colonies. They fly toward lights, then shed their wings, which is why you find small piles of identical wings on windowsills and floors the next morning.",
          "A few gamu-gamo flying in from outside does not always mean your house is infested. But swarms coming from inside a room, from a wall, a cabinet or a door frame, or wings collecting in the same spot again and again, suggest a colony nearby. Treat it as a reason to have the property inspected.",
        ],
        list: [
          "Turn off unneeded lights during swarming evenings and close screens.",
          "Sweep up wings and dead swarmers, and note where they collect.",
          "Look for mud tubes and damaged wood near the spot where the swarm appeared.",
          "Don't spray inside walls or break open mud tubes before an inspection.",
        ],
      },
      {
        id: "types",
        heading: "Types of termites found in Philippine homes",
        table: {
          caption: "Common termite groups and how to recognise them",
          head: ["Type", "Where they live", "Signs you see"],
          rows: [
            ["Subterranean termites", "In the soil, travelling into buildings through cracks and joints", "Mud tubes on walls, posts and foundations; damaged wood near the ground"],
            ["Drywood termites", "Inside dry wood, such as furniture, frames and roof timber, with no soil contact", "Small, hard pellets piling up below infested wood"],
            ["Tree-nesting termites", "In nests on trees, fences and posts, connected to the ground by tunnels", "Dark, rounded nests on trees or posts and tubes running down to the soil"],
          ],
        },
        paragraphs: [
          "Subterranean termites cause most of the damage to houses and buildings, because their colonies are large and they can reach a building from the surrounding soil. That is also why soil treatment is one of the main ways to protect a structure.",
        ],
      },
      {
        id: "signs",
        heading: "Signs of termites in a house",
        list: [
          "Mud tubes: pencil-wide tunnels of soil on walls, posts, foundations or inside cabinets.",
          "Wood that sounds hollow when tapped, feels soft or breaks open to show tunnels.",
          "Piles of shed wings or swarms of gamu-gamo inside the house.",
          "Small pellets below wooden furniture, frames or ceilings, a sign of drywood termites.",
          "Bubbling paint, sagging ceilings or doors and windows that suddenly stick.",
          "Damaged books, boxes or papers stored on the floor or against walls.",
        ],
        after: [
          "For a room-by-room checklist, read the guide to the signs of anay in your house.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why termites need prompt attention",
        paragraphs: [
          "Termite damage builds up slowly and out of sight. By the time a frame or ceiling shows damage, the colony may have been feeding for months. Acting at the first signs keeps repairs smaller and makes it easier to find where the termites are entering.",
          "Termites are also a concern before a house is finished. Planning soil treatment during construction, before the floor slab is poured, protects the ground under the building while it can still be reached directly.",
        ],
      },
      {
        id: "prevention",
        heading: "How to make your home less attractive to termites",
        list: [
          "Keep wood, lumber and cardboard off the ground and away from walls.",
          "Fix leaking pipes, roofs and aircon drains, and dry out damp areas.",
          "Don't let soil, mulch or plants pile up against walls or wooden posts.",
          "Inspect renovations and new cabinets before they are closed up.",
          "Check door frames, cabinets and ceilings every few months, especially after the rainy season starts.",
        ],
      },
      {
        id: "how-dmsa-treats",
        heading: "How DMSA treats termites",
        paragraphs: [
          "Termite work starts with the free ocular inspection. DMSA checks for mud tubes, damaged or hollow-sounding wood and discarded wings, and looks for where termites may be getting in, such as cracks in floors and walls, door frames, cabinets and places where wood touches soil.",
          "Depending on the site and construction stage, treatment can include chemical injection through small drilled points in affected areas, treatment of affected wood, anti-termite soil treatment or soil poisoning, and colony-focused systems. Where termites have left infested soil and debris, the team removes it during cleanup, as shown in DMSA's completed jobs. Afterwards, DMSA gives monitoring advice so new signs can be caught early.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call a professional",
        paragraphs: [
          "Call for an inspection if you find mud tubes, damaged wood, pellets or repeated gamu-gamo swarms inside the house, or if you are building and need soil treatment before the slab is poured. Request a quotation and choose Termite Control; the ocular inspection is free and included.",
        ],
      },
    ],
    faqs: [
      { question: "Are gamu-gamo the same as anay?", answer: "Yes. Gamu-gamo are winged termites, the members of a termite colony that fly out to start new colonies. They are part of the same insects that damage wood." },
      { question: "Do gamu-gamo mean my house has termites?", answer: "Not always. Swarmers can fly in from outside. But swarms coming from inside a wall, cabinet or frame, or wings collecting in the same spot, suggest a colony nearby and are worth an inspection." },
      { question: "When do termites swarm?", answer: "Swarms usually happen on warm, humid evenings, often after rain. In the Philippines, many people notice gamu-gamo at the start of the rainy season." },
      { question: "Can I treat termites myself?", answer: "Spraying the termites you can see rarely reaches the colony, and breaking mud tubes can make the activity harder to trace. For active termites, an inspection finds the source and the right treatment." },
      { question: "Is termite treatment safe for my family?", answer: "DMSA plans treatment around the household and tells you which areas will be treated and when people and pets can return. Mention children, pets and allergies during the inspection." },
    ],
  },
  {
    slug: "cockroaches-ipis",
    name: "Cockroaches",
    localName: "ipis",
    title: "Cockroaches (ipis): signs, common types and how to get rid of them",
    metaTitle: "Ipis (Cockroaches): Signs and Control",
    metaDescription: "How to identify ipis (cockroaches) at home or at work, the two most common types, signs of an infestation, prevention and how DMSA treats them.",
    summary: "Cockroaches (ipis) hide in warm, damp gaps near food and water, come out at night and breed quickly. Droppings that look like ground pepper, egg cases and a musty smell are signs of an infestation. Cleaning and sealing gaps help, but an established infestation needs treatment where they hide.",
    cardSummary: "Droppings, egg cases and night sightings: how to spot ipis and stop them returning.",
    relatedService: "general-pest-control",
    relatedGuides: ["how-to-keep-cockroaches-and-ants-out", "how-to-prepare-for-pest-control-treatment"],
    dateModified: "2026-11-19",
    sections: [
      {
        id: "what-they-are",
        heading: "What cockroaches are and why they come in",
        paragraphs: [
          "Cockroaches, called ipis in Filipino, are flat, fast insects that hide in cracks during the day and come out at night to feed. They eat almost anything, including crumbs, grease, garbage, paper, soap and pet food, and they need water, which is why kitchens, bathrooms and drains are where problems start.",
          "A single cockroach in the kitchen at night is rarely alone. Because they hide so well, the ones you see are usually a small part of the population behind cabinets, appliances, sinks and drain pipes.",
        ],
      },
      {
        id: "types",
        heading: "Two common types in Philippine homes and businesses",
        table: {
          caption: "How to tell the two most common cockroaches apart",
          head: ["", "Large cockroach (American cockroach)", "Small cockroach (German cockroach)"],
          rows: [
            ["Size and colour", "Large, reddish-brown, with wings", "Small, light brown, with two dark stripes behind the head"],
            ["Where they hide", "Drains, sewers, septic areas, basements and garbage areas", "Kitchens, inside cabinets, behind appliances and in electronics"],
            ["What it means indoors", "Often entering from drains or outside", "Usually breeding indoors, close to food"],
          ],
        },
        paragraphs: [
          "Small cockroaches breed especially fast and spread through kitchens and food areas, so they are a common problem in restaurants, food stalls and condominium units. Large cockroaches often come up through floor drains and gaps around pipes.",
        ],
      },
      {
        id: "signs",
        heading: "Signs of a cockroach infestation",
        list: [
          "Droppings that look like ground pepper or coffee grounds in drawers, shelves and corners.",
          "Brown, capsule-shaped egg cases stuck in cracks, behind furniture or under appliances.",
          "Shed skins near hiding places.",
          "A musty, oily smell in cabinets or storage rooms.",
          "Cockroaches seen in the daytime, which can mean their hiding places are crowded.",
          "Smear marks along walls and the edges of cabinets where they travel.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why cockroaches are more than a nuisance",
        paragraphs: [
          "Cockroaches walk through drains and garbage and then across counters, dishes and food, so they can spread germs and contaminate food. Their droppings, saliva and shed skins can also trigger allergies and asthma, especially in children.",
          "For businesses, a cockroach seen by a customer or found in stock can damage a reputation quickly, which is why food businesses often need regular checks rather than one-off spraying.",
        ],
      },
      {
        id: "prevention",
        heading: "How to keep cockroaches out",
        list: [
          "Store food in sealed containers and don't leave dishes in the sink overnight.",
          "Wipe grease from stovetops and the area behind and under appliances.",
          "Take out garbage daily and use bins with tight lids.",
          "Fix leaks and dry wet areas under sinks.",
          "Fit covers on floor drains and seal gaps around pipes.",
          "Cut down on stacked cardboard and newspapers, where cockroaches hide and breed.",
        ],
        after: [
          "These steps make a home less attractive, but they rarely clear an established infestation on their own. Household sprays mainly kill the cockroaches you can reach, while the rest stay hidden and keep breeding.",
        ],
      },
      {
        id: "how-dmsa-treats",
        heading: "How DMSA treats cockroaches",
        paragraphs: [
          "Treatment starts with the free ocular inspection. A DMSA technician looks at where activity is concentrated, such as kitchens, drains, storage rooms, ceilings and garbage areas, and checks for droppings, egg cases and the gaps cockroaches use to get in.",
          "Based on what the inspection finds, DMSA explains the recommended treatment, the areas it will cover, the schedule and the price before work begins. Treatment is aimed at the places where cockroaches hide and travel, not only where they are seen. Afterwards, the technician shares prevention guidance and tells you whether a follow-up check is advised.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call a professional",
        paragraphs: [
          "Call if you see cockroaches in several rooms, find egg cases or droppings regularly, see them during the day, or run a food business. Request a quotation for general pest control; the ocular inspection is free and included.",
        ],
      },
    ],
    faqs: [
      { question: "Why do I see cockroaches even though my house is clean?", answer: "Cockroaches can enter through drains, pipes and gaps from neighbouring units or outside, and they need only small amounts of food and water. Cleaning helps, but entry points and hidden harbourage areas also need attention." },
      { question: "Do cockroaches come from drains?", answer: "Large cockroaches often do. Fitting drain covers, keeping drains clean and sealing gaps around pipes help keep them out." },
      { question: "Are cockroaches dangerous?", answer: "They can contaminate food and surfaces with germs from drains and garbage, and their droppings and shed skins can trigger allergies and asthma." },
      { question: "How long does it take to get rid of cockroaches?", answer: "It depends on how established the infestation is and how much of the source can be reached. DMSA explains what to expect and whether a follow-up visit is advised after the inspection." },
      { question: "Can you treat a restaurant or food stall?", answer: "Yes. DMSA provides commercial pest control and coordinates the visit around your operations after reviewing the site." },
    ],
  },
  {
    slug: "ants-langgam",
    name: "Ants",
    localName: "langgam",
    title: "Ants (langgam) in the house: why they keep coming back and what works",
    metaTitle: "Ants (Langgam): Signs, Nests and Control",
    metaDescription: "Why ants (langgam) keep coming back, where they nest in Philippine homes, why spraying the trail rarely works, prevention tips and how DMSA treats them.",
    summary: "Ants (langgam) follow scent trails from a hidden nest to food and water. Wiping the trail and removing the food helps, but spraying the ants you see rarely reaches the nest, and with some species it splits the colony. Lasting control means finding where the trail comes from.",
    cardSummary: "Trails, nests and why spraying fails: how to deal with langgam for good.",
    relatedService: "general-pest-control",
    relatedGuides: ["how-to-keep-cockroaches-and-ants-out", "anay-vs-ants-how-to-tell"],
    dateModified: "2026-11-19",
    sections: [
      {
        id: "what-they-are",
        heading: "Why ants come into the house",
        paragraphs: [
          "Ants, called langgam in Filipino, live in colonies with workers that go out looking for food and water. When a worker finds something, such as sugar, rice, grease, pet food or a spill, it lays a scent trail back to the nest, and other workers follow it. That is why one crumb can bring a whole line of ants within minutes.",
          "The nest is often somewhere you can't see: inside a wall, under tiles, in a potted plant, in the soil outside or in a gap behind a cabinet. The ants on your counter are only the foragers.",
        ],
      },
      {
        id: "types",
        heading: "Ants you may see at home",
        table: {
          caption: "Common kinds of household ants and what they usually mean",
          head: ["What you see", "Where they usually nest", "What to know"],
          rows: [
            ["Tiny ants in the kitchen and bathroom", "Inside walls, cabinets, under tiles and around plumbing", "Colonies can be large and some split into new nests when disturbed"],
            ["Ants coming out of outlets and appliances", "Inside walls and electrical spaces", "Keep the area dry and have the source checked rather than spraying into sockets"],
            ["Red or brown ants that bite or sting outdoors", "In soil, lawns and garden beds", "Keep children and pets away from mounds"],
            ["Ants in trees and plants", "In leaves, branches and pots", "Trim branches that touch the house so they can't use them as a bridge"],
          ],
        },
      },
      {
        id: "signs",
        heading: "Signs of an ant problem",
        list: [
          "Lines of ants along counters, walls, window frames or skirting boards.",
          "Ants in sealed-looking food containers, sugar jars or pet bowls.",
          "Small piles of soil or debris near cracks, tiles or the edge of the floor.",
          "Winged ants indoors, which can mean a mature nest nearby.",
          "Ants returning to the same spot after cleaning.",
        ],
        after: [
          "Winged ants can look like gamu-gamo, the winged termites. To tell them apart, check the waist and wings, as explained in the guide to anay versus ants.",
        ],
      },
      {
        id: "why-spraying-fails",
        heading: "Why spraying the trail rarely works",
        paragraphs: [
          "Spraying the ants you can see kills the foragers but leaves the nest, the queens and the young untouched, so new workers soon take their place. With some common household species, disturbing the colony can also make it split into several new nests, which spreads the problem to more rooms.",
          "A better approach is to remove the scent trail and the food, then find and treat where the ants are coming from. That is what lasting control depends on.",
        ],
      },
      {
        id: "prevention",
        heading: "How to keep ants away",
        list: [
          "Wipe ant trails with soapy water to remove the scent they follow.",
          "Store sugar, rice and snacks in sealed containers, and wipe up spills and crumbs right away.",
          "Rinse food containers and bottles before putting them in the recycling bin.",
          "Pick up pet food after feeding, or stand bowls in a shallow dish of water.",
          "Fix leaks and dry wet areas, because ants also come in for water.",
          "Seal gaps along skirting boards, window frames and around pipes, and trim plants touching the walls.",
        ],
      },
      {
        id: "how-dmsa-treats",
        heading: "How DMSA treats ants",
        paragraphs: [
          "Ants are part of DMSA's general pest control. The free ocular inspection follows the trails back toward the source, checks kitchens, bathrooms, walls, gardens and potted plants, and looks for the gaps ants use to get in.",
          "DMSA then explains the recommended treatment, the areas it will cover, the schedule and the price before work begins. Treatment is aimed at where the ants are coming from, not only where they are seen, and the technician shares prevention guidance afterwards.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call a professional",
        paragraphs: [
          "Call if ants keep returning after cleaning, appear in several rooms, come out of walls or outlets, or are getting into stock in a shop or warehouse. Request a quotation for general pest control; the ocular inspection is free and included.",
        ],
      },
    ],
    faqs: [
      { question: "Why do ants keep coming back after I spray them?", answer: "Spraying kills the ants you see but not the nest. New workers follow the same scent trail, and some species split into new nests when disturbed. Removing the trail and food and treating the source works better." },
      { question: "Are winged ants the same as gamu-gamo?", answer: "No. Gamu-gamo are winged termites. Winged ants have a narrow waist, bent antennae and front wings longer than the back wings, while termite wings are all the same length." },
      { question: "How do I find an ant nest?", answer: "Follow the trail away from the food, especially in the evening when ants are active. Nests are often in walls, under tiles, in potted plants or in soil outside. An inspection can help when the trail disappears into a wall." },
      { question: "Can ants damage a house?", answer: "Most household ants are a nuisance around food rather than a threat to the structure. Wood damage is more often caused by termites, which is why it helps to identify the insect correctly." },
      { question: "Do you treat ants in offices and shops?", answer: "Yes. Ant control is part of DMSA's general pest control for homes and businesses, including offices, retail spaces and warehouses." },
    ],
  },
  {
    slug: "rodents-daga",
    name: "Rats and mice",
    localName: "daga",
    title: "Rats and mice (daga): signs, risks and rodent control",
    metaTitle: "Daga (Rats and Mice): Signs and Control",
    metaDescription: "How to tell if you have daga (rats or mice) in the ceiling or kitchen, the health and fire risks, how to keep them out and how DMSA handles rodent control.",
    summary: "Rats and mice (daga) come in for food, water and shelter, often nesting in ceilings, walls and storage areas. Droppings, gnaw marks, greasy rub marks and scratching noises at night are the main signs. Because they carry disease and gnaw wires, rodent problems are worth dealing with early.",
    cardSummary: "Droppings, gnaw marks and noises in the ceiling: how to spot and stop daga.",
    relatedService: "general-pest-control",
    relatedGuides: ["how-to-prepare-for-pest-control-treatment", "how-to-keep-cockroaches-and-ants-out"],
    dateModified: "2026-11-19",
    sections: [
      {
        id: "what-they-are",
        heading: "Rats and mice in Philippine homes and businesses",
        paragraphs: [
          "Rodents, called daga in Filipino, include rats and the smaller house mouse. They are mostly active at night, they are good at climbing and squeezing through small gaps, and their front teeth never stop growing, so they gnaw constantly on wood, plastic, packaging and wiring.",
          "Rodents look for three things: food, water and a safe place to nest. Kitchens, garbage areas, storerooms, ceilings and the space inside walls provide all three, which is why problems often start there.",
        ],
      },
      {
        id: "types",
        heading: "Rats or mice? How to tell",
        table: {
          caption: "Common rodents and where they are usually found",
          head: ["", "Rats that burrow", "Rats that climb", "House mice"],
          rows: [
            ["Size", "Large and heavy-bodied", "Slimmer, with a long tail", "Small, with large ears"],
            ["Where they live", "Burrows in soil, drains, sewers and garbage areas", "Ceilings, roofs, upper floors and trees", "Inside walls, cabinets and stored goods"],
            ["Droppings", "Large and blunt", "Medium-sized and pointed", "Tiny, like grains of rice"],
          ],
        },
        paragraphs: [
          "Scratching and running noises in the ceiling at night usually point to climbing rats. Burrows along walls, drains or the edge of a garden usually point to rats that burrow. Either way, the response starts with finding how they are getting in.",
        ],
      },
      {
        id: "signs",
        heading: "Signs of rats or mice",
        list: [
          "Droppings in cabinets, along walls, on top of ceilings or near food.",
          "Gnaw marks on doors, cabinets, food packaging, plastic pipes or electrical wires.",
          "Dark, greasy rub marks along walls and beams where they travel.",
          "Scratching, squeaking or running noises in the ceiling or walls at night.",
          "Nests of shredded paper, cloth or plastic in hidden corners.",
          "A strong, stale urine smell in storerooms or ceilings.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why rodents need prompt attention",
        paragraphs: [
          "Rats can spread diseases, including leptospirosis, which is passed through water or soil contaminated with rat urine and is a known risk during floods in the Philippines. Rodents also contaminate food and food surfaces with droppings and urine.",
          "Their gnawing damages property too. Chewed electrical wires are a fire risk, and gnawed pipes, doors and stock add up to costly repairs. Rodents breed quickly, so a small problem can grow fast.",
        ],
      },
      {
        id: "prevention",
        heading: "How to keep rats and mice out",
        list: [
          "Store food, rice and animal feed in sealed, hard containers.",
          "Keep garbage in bins with tight lids and take it out regularly.",
          "Seal gaps around pipes, cables and vents, and fit screens on drains and openings.",
          "Trim branches and vines that touch the roof, since climbing rats use them to get in.",
          "Clear clutter, stacked boxes and unused items from storerooms, ceilings and garages.",
          "Fix leaks and remove standing water.",
        ],
        after: [
          "Wear gloves when cleaning droppings, and wet them with disinfectant first rather than sweeping them dry, so dust from them is not stirred up.",
        ],
      },
      {
        id: "after-floods",
        heading: "After a flood or heavy rain",
        paragraphs: [
          "Floods drive rats out of drains and burrows and into homes, and floodwater can carry their urine. Take extra care in the days after heavy rain.",
        ],
        list: [
          "Avoid wading in floodwater. If you must, wear boots and cover any cuts or wounds.",
          "Wash your hands and feet with soap and clean water after contact with floodwater or mud.",
          "Clean and disinfect floors, counters and stored items that floodwater reached.",
          "See a doctor if you get a fever after exposure to floodwater, and mention the exposure.",
          "Check ceilings, storerooms and drains for new droppings or nests once the water recedes.",
        ],
      },
      {
        id: "how-dmsa-treats",
        heading: "How DMSA handles rodent control",
        paragraphs: [
          "Rodent control is part of DMSA's general pest control. The free ocular inspection looks for droppings, gnaw marks, rub marks and nests, and for the entry points rodents use, such as gaps around pipes, roof edges and drains.",
          "DMSA then explains the recommended treatment, the areas it will cover, the schedule and the price before work begins. Treatment and prevention are planned together, and the technician advises which entry points to close and how to store food and waste so rodents don't return.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call a professional",
        paragraphs: [
          "Call if you hear rodents in the ceiling, find fresh droppings or gnawed wires, or see rats in a food business, warehouse or storeroom. Request a quotation for general pest control; the ocular inspection is free and included.",
        ],
      },
    ],
    faqs: [
      { question: "How do I know if the noise in my ceiling is rats?", answer: "Scratching or running noises at night, droppings on top of ceiling boards and greasy marks along beams usually point to rats. An inspection can confirm it and find how they are getting in." },
      { question: "Are rats dangerous to health?", answer: "Yes. Rats can spread diseases such as leptospirosis, passed through water or soil contaminated with their urine, and they contaminate food with droppings and urine." },
      { question: "Can rats cause a fire?", answer: "Rats and mice gnaw on electrical wires, and damaged wiring is a fire risk. Gnaw marks on wires are a reason to act quickly." },
      { question: "How do rats get into a house?", answer: "Through gaps around pipes and cables, open drains, roof edges, vents and branches touching the roof. Rats can squeeze through surprisingly small openings." },
      { question: "Do you handle rodents in warehouses and shops?", answer: "Yes. Rodent control is part of DMSA's general pest control for homes and businesses, including warehouses, offices and retail spaces." },
    ],
  },
  {
    slug: "flies-langaw",
    name: "Flies",
    localName: "langaw",
    title: "Flies (langaw): where they come from and how to control them",
    metaTitle: "Langaw (Flies): Sources and Control",
    metaDescription: "Where flies (langaw) breed, why they matter around food, the common types in homes and businesses, how to cut them off at the source and how DMSA helps.",
    summary: "Flies (langaw) breed in garbage, drains and rotting organic matter, and in warm weather a new generation can develop in about a week. Swatting and spraying adults gives short relief; lasting control means finding and removing the place where they breed.",
    cardSummary: "Garbage, drains and breeding sites: how to cut langaw off at the source.",
    relatedService: "general-pest-control",
    relatedGuides: ["how-to-keep-cockroaches-and-ants-out", "how-to-prepare-for-pest-control-treatment"],
    dateModified: "2026-11-19",
    sections: [
      {
        id: "what-they-are",
        heading: "Why flies gather in homes and businesses",
        paragraphs: [
          "Flies, called langaw in Filipino, lay their eggs in moist, rotting material, such as garbage, food waste, animal waste, clogged drains and wet organic debris. The eggs hatch into maggots, which feed and then turn into adult flies. In warm weather the whole cycle can take about a week, so a single forgotten bin or drain can produce a steady stream of flies.",
          "Adult flies are drawn to food smells, so kitchens, eateries, markets, garbage areas and animal pens attract them most.",
        ],
      },
      {
        id: "types",
        heading: "Common flies and where they breed",
        table: {
          caption: "Types of flies and their usual breeding sites",
          head: ["Type", "What they look like", "Where they usually breed"],
          rows: [
            ["House flies", "Grey, medium-sized, with dark stripes on the back", "Garbage, food waste and animal waste"],
            ["Fruit flies", "Tiny, tan, often with red eyes", "Overripe fruit, spilled drinks, bottles and fermenting waste"],
            ["Drain flies", "Tiny, fuzzy and moth-like", "Slime inside drains, sinks and floor traps"],
            ["Blow flies", "Larger, shiny green or blue", "Meat scraps, dead animals and garbage"],
          ],
        },
      },
      {
        id: "signs",
        heading: "Signs of a fly problem",
        list: [
          "Flies gathering around bins, drains, sinks or food areas.",
          "Maggots in garbage bins or around waste.",
          "Small dark spots (fly specks) on walls, lights and windows.",
          "Tiny flies hovering over drains, fruit or bottles.",
          "More flies than usual after rain or when garbage collection is delayed.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why flies matter",
        paragraphs: [
          "Flies land on garbage and waste and then on food, plates and counters, so they can carry germs onto anything they touch. In food businesses, flies are also a sign customers notice straight away.",
          "Because flies breed quickly, numbers can rise fast in warm, wet weather. Removing the breeding site is what brings the numbers down.",
        ],
      },
      {
        id: "prevention",
        heading: "How to cut flies off at the source",
        list: [
          "Use bins with tight lids, line them, and empty and wash them regularly.",
          "Keep food covered and clean up spills and scraps right away.",
          "Clean drains, sinks and floor traps to remove the slime drain flies breed in.",
          "Store fruit in the fridge or covered, and rinse bottles and cans before storing them.",
          "Fit screens on windows and doors, and keep doors closed in food areas.",
          "Keep garbage areas and animal pens away from doors and kitchens, and clean them often.",
        ],
      },
      {
        id: "food-businesses",
        heading: "Flies in food businesses and markets",
        paragraphs: [
          "Eateries, market stalls and food processing areas produce more waste than homes, and customers notice flies straight away. The most common sources are grease traps, floor drains, waste bins kept near cooking areas and spilled food under counters and equipment.",
        ],
        list: [
          "Empty and wash bins at the end of every shift, and keep them away from food preparation.",
          "Clean grease traps and floor drains on a regular schedule.",
          "Cover cooked food and display items.",
          "Keep doors closed or screened, and receive deliveries away from open food.",
          "Clean under equipment and counters, where spilled food is easy to miss.",
        ],
      },
      {
        id: "how-dmsa-treats",
        heading: "How DMSA helps with flies",
        paragraphs: [
          "Fly control is part of DMSA's general pest control. The free ocular inspection looks for where flies are breeding, such as garbage areas, drains, waste storage and organic debris, as well as how they are getting into the building.",
          "DMSA then recommends a treatment for the site and confirms the areas, schedule and price before work begins. Because flies keep coming back while a breeding site remains, the technician also gives practical guidance on waste handling, cleaning and closing entry points.",
        ],
      },
      {
        id: "when-to-call",
        heading: "When to call a professional",
        paragraphs: [
          "Call if flies keep returning after cleaning, you can't find where they are breeding, or you run a food business, market stall or warehouse. Request a quotation for general pest control; the ocular inspection is free and included.",
        ],
      },
    ],
    faqs: [
      { question: "Where do house flies come from?", answer: "They breed in moist, rotting material such as garbage, food waste, animal waste and clogged drains. Finding and removing that breeding site is the key to fewer flies." },
      { question: "How fast do flies multiply?", answer: "In warm weather, a fly can develop from egg to adult in about a week, so numbers can build up quickly when a breeding site is left alone." },
      { question: "What are the tiny flies around my sink?", answer: "They are often drain flies or fruit flies. Drain flies breed in the slime inside drains, and fruit flies breed in overripe fruit and fermenting liquids." },
      { question: "Are flies dangerous?", answer: "Flies move between garbage or waste and food, so they can carry germs onto food and surfaces. Keeping food covered and waste managed lowers the risk." },
      { question: "Do you treat flies in restaurants and markets?", answer: "Yes. Fly control is part of DMSA's general pest control for homes and businesses, and the visit is coordinated around your operations." },
    ],
  },
];
