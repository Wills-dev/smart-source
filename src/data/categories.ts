import type { Category } from "@/types/category";

/**
 * Adding a category is a data-only change: append here and the nav,
 * mega menu, homepage showcase and /products routes all pick it up.
 */
export const categories: Category[] = [
  {
    id: "cement-concrete",
    slug: "cement-concrete",
    name: "Cement & Concrete",
    description:
      "Bagged cement, ready-mix concrete and precast units for foundations, slabs and structural work.",
    image: "/images/categories/cement-concrete.jpg",
    subcategories: [
      {
        id: "cement",
        slug: "cement",
        name: "Cement",
        image: "/images/categories/cement.jpg",
      },
      {
        id: "ready-mix-concrete",
        slug: "ready-mix-concrete",
        name: "Ready-Mix Concrete",
        image: "/images/categories/ready-mix-concrete.jpg",
      },
      {
        id: "concrete-blocks",
        slug: "concrete-blocks",
        name: "Concrete Blocks",
        image: "/images/categories/concrete-blocks.jpg",
      },
      {
        id: "interlocking-stones",
        slug: "interlocking-stones",
        name: "Interlocking Stones",
        image: "/images/categories/interlocking-stones.jpg",
      },
    ],
  },
  {
    id: "steel-reinforcement",
    slug: "steel-reinforcement",
    name: "Steel & Reinforcement",
    description:
      "Reinforcement bars, mesh and structural steel sourced from trusted mills for every load requirement.",
    image: "/images/categories/steel-reinforcement.jpg",
    subcategories: [
      {
        id: "reinforcement-bars",
        slug: "reinforcement-bars",
        name: "Reinforcement Bars",
        image: "/images/categories/reinforcement-bars.jpg",
      },
      {
        id: "binding-wire",
        slug: "binding-wire",
        name: "Binding Wire",
        image: "/images/categories/binding-wire.jpg",
      },
      {
        id: "wire-mesh",
        slug: "wire-mesh",
        name: "Wire Mesh",
        image: "/images/categories/wire-mesh.jpg",
      },
      {
        id: "steel-sections",
        slug: "steel-sections",
        name: "Steel Sections",
        image: "/images/categories/steel-sections.jpg",
      },
    ],
  },
  {
    id: "roofing",
    slug: "roofing",
    name: "Roofing",
    description:
      "Aluminium, stone-coated and longspan roofing systems with the accessories to complete the installation.",
    image: "/images/categories/roofing.jpg",
    subcategories: [
      {
        id: "longspan-aluminium",
        slug: "longspan-aluminium",
        name: "Longspan Aluminium",
        image: "/images/categories/longspan-aluminium.jpg",
      },
      {
        id: "stone-coated-roofing",
        slug: "stone-coated-roofing",
        name: "Stone-Coated Roofing",
        image: "/images/categories/stone-coated-roofing.jpg",
      },
      {
        id: "roofing-accessories",
        slug: "roofing-accessories",
        name: "Roofing Accessories",
        image: "/images/categories/roofing-accessories.jpg",
      },
      {
        id: "gutters",
        slug: "gutters",
        name: "Gutters",
        image: "/images/categories/gutters.jpg",
      },
    ],
  },
  {
    id: "blocks-bricks",
    slug: "blocks-bricks",
    name: "Blocks & Bricks",
    description:
      "Sandcrete, clay and decorative blocks for walling, fencing and architectural finishes.",
    image: "/images/categories/blocks-bricks.jpg",
    subcategories: [
      {
        id: "sandcrete-blocks",
        slug: "sandcrete-blocks",
        name: "Sandcrete Blocks",
        image: "/images/categories/sandcrete-blocks.jpg",
      },
      {
        id: "concrete-hollow-blocks",
        slug: "concrete-hollow-blocks",
        name: "Concrete Blocks",
        image: "/images/categories/concrete-hollow-blocks.jpg",
      },
      {
        id: "clay-bricks",
        slug: "clay-bricks",
        name: "Clay Bricks",
        image: "/images/categories/clay-bricks.jpg",
      },
      {
        id: "decorative-blocks",
        slug: "decorative-blocks",
        name: "Decorative Blocks",
        image: "/images/categories/decorative-blocks.jpg",
      },
    ],
  },
  {
    id: "plumbing",
    slug: "plumbing",
    name: "Plumbing",
    description:
      "Pipes, tanks, pumps and valves for water supply, drainage and mechanical installations.",
    image: "/images/categories/plumbing.jpg",
    subcategories: [
      {
        id: "pvc-pipes",
        slug: "pvc-pipes",
        name: "PVC Pipes",
        image: "/images/categories/pvc-pipes.jpg",
      },
      {
        id: "ppr-pipes",
        slug: "ppr-pipes",
        name: "PPR Pipes",
        image: "/images/categories/ppr-pipes.jpg",
      },
      {
        id: "water-tanks",
        slug: "water-tanks",
        name: "Water Tanks",
        image: "/images/categories/water-tanks.jpg",
      },
      {
        id: "pumps",
        slug: "pumps",
        name: "Pumps",
        image: "/images/categories/pumps.jpg",
      },
      {
        id: "valves",
        slug: "valves",
        name: "Valves",
        image: "/images/categories/valves.jpg",
      },
      {
        id: "drainage",
        slug: "drainage",
        name: "Drainage",
        image: "/images/categories/drainage.jpg",
      },
    ],
  },
  {
    id: "electrical",
    slug: "electrical",
    name: "Electrical",
    description:
      "Cables, switchgear and lighting for safe, code-compliant electrical installations.",
    image: "/images/categories/electrical.jpg",
    subcategories: [
      {
        id: "electrical-cables",
        slug: "electrical-cables",
        name: "Electrical Cables",
        image: "/images/categories/electrical-cables.jpg",
      },
      {
        id: "sockets-switches",
        slug: "sockets-switches",
        name: "Sockets & Switches",
        image: "/images/categories/sockets-switches.jpg",
      },
      {
        id: "distribution-boards",
        slug: "distribution-boards",
        name: "Distribution Boards",
        image: "/images/categories/distribution-boards.jpg",
      },
      {
        id: "lighting",
        slug: "lighting",
        name: "Lighting",
        image: "/images/categories/lighting.jpg",
      },
      {
        id: "conduits",
        slug: "conduits",
        name: "Conduits",
        image: "/images/categories/conduits.jpg",
      },
      {
        id: "circuit-breakers",
        slug: "circuit-breakers",
        name: "Circuit Breakers",
        image: "/images/categories/circuit-breakers.jpg",
      },
    ],
  },
  {
    id: "tiles-flooring",
    slug: "tiles-flooring",
    name: "Tiles & Flooring",
    description:
      "Porcelain, granite, marble and vinyl flooring solutions for residential and commercial interiors.",
    image: "/images/categories/tiles-flooring.jpg",
    subcategories: [
      {
        id: "floor-tiles",
        slug: "floor-tiles",
        name: "Floor Tiles",
        image: "/images/categories/floor-tiles.jpg",
      },
      {
        id: "wall-tiles",
        slug: "wall-tiles",
        name: "Wall Tiles",
        image: "/images/categories/wall-tiles.jpg",
      },
      {
        id: "porcelain-tiles",
        slug: "porcelain-tiles",
        name: "Porcelain Tiles",
        image: "/images/categories/porcelain-tiles.jpg",
      },
      {
        id: "granite",
        slug: "granite",
        name: "Granite",
        image: "/images/categories/granite.jpg",
      },
      {
        id: "marble",
        slug: "marble",
        name: "Marble",
        image: "/images/categories/marble.jpg",
      },
      {
        id: "vinyl-flooring",
        slug: "vinyl-flooring",
        name: "Vinyl Flooring",
        image: "/images/categories/vinyl-flooring.jpg",
      },
    ],
  },
  {
    id: "paint-finishes",
    slug: "paint-finishes",
    name: "Paint & Finishes",
    description:
      "Emulsion, textured and waterproofing finishes to protect and complete every surface.",
    image: "/images/categories/paint-finishes.jpg",
    subcategories: [
      {
        id: "emulsion-paint",
        slug: "emulsion-paint",
        name: "Emulsion Paint",
        image: "/images/categories/emulsion-paint.jpg",
      },
      {
        id: "satin-paint",
        slug: "satin-paint",
        name: "Satin Paint",
        image: "/images/categories/satin-paint.jpg",
      },
      {
        id: "textured-paint",
        slug: "textured-paint",
        name: "Textured Paint",
        image: "/images/categories/textured-paint.jpg",
      },
      {
        id: "primer",
        slug: "primer",
        name: "Primer",
        image: "/images/categories/primer.jpg",
      },
      {
        id: "putty",
        slug: "putty",
        name: "Putty",
        image: "/images/categories/putty.jpg",
      },
      {
        id: "waterproofing",
        slug: "waterproofing",
        name: "Waterproofing",
        image: "/images/categories/waterproofing.jpg",
      },
    ],
  },
  {
    id: "doors-windows",
    slug: "doors-windows",
    name: "Doors & Windows",
    description:
      "Security doors, wooden doors and aluminium windows for residential and commercial openings.",
    image: "/images/categories/doors-windows.jpg",
    subcategories: [
      {
        id: "security-doors",
        slug: "security-doors",
        name: "Security Doors",
        image: "/images/categories/security-doors.jpg",
      },
      {
        id: "wooden-doors",
        slug: "wooden-doors",
        name: "Wooden Doors",
        image: "/images/categories/wooden-doors.jpg",
      },
      {
        id: "aluminium-windows",
        slug: "aluminium-windows",
        name: "Aluminium Windows",
        image: "/images/categories/aluminium-windows.jpg",
      },
      {
        id: "glass-doors",
        slug: "glass-doors",
        name: "Glass Doors",
        image: "/images/categories/glass-doors.jpg",
      },
      {
        id: "door-accessories",
        slug: "door-accessories",
        name: "Door Accessories",
        image: "/images/categories/door-accessories.jpg",
      },
    ],
  },
  {
    id: "sanitary-ware",
    slug: "sanitary-ware",
    name: "Sanitary Ware",
    description: "WC sets, basins, shower systems and fittings for complete bathroom installations.",
    image: "/images/categories/sanitary-ware.jpg",
    subcategories: [
      {
        id: "wc-sets",
        slug: "wc-sets",
        name: "WC Sets",
        image: "/images/categories/wc-sets.jpg",
      },
      {
        id: "wash-basins",
        slug: "wash-basins",
        name: "Wash Basins",
        image: "/images/categories/wash-basins.jpg",
      },
      {
        id: "shower-systems",
        slug: "shower-systems",
        name: "Shower Systems",
        image: "/images/categories/shower-systems.jpg",
      },
      {
        id: "faucets",
        slug: "faucets",
        name: "Faucets",
        image: "/images/categories/faucets.jpg",
      },
      {
        id: "bathroom-accessories",
        slug: "bathroom-accessories",
        name: "Bathroom Accessories",
        image: "/images/categories/bathroom-accessories.jpg",
      },
    ],
  },
  {
    id: "timber-boards",
    slug: "timber-boards",
    name: "Timber & Boards",
    description: "Plywood, MDF and formwork boards for carpentry, joinery and construction formwork.",
    image: "/images/categories/timber-boards.jpg",
    subcategories: [
      {
        id: "plywood",
        slug: "plywood",
        name: "Plywood",
        image: "/images/categories/plywood.jpg",
      },
      {
        id: "mdf",
        slug: "mdf",
        name: "MDF",
        image: "/images/categories/mdf.jpg",
      },
      {
        id: "hardwood",
        slug: "hardwood",
        name: "Hardwood",
        image: "/images/categories/hardwood.jpg",
      },
      {
        id: "softwood",
        slug: "softwood",
        name: "Softwood",
        image: "/images/categories/softwood.jpg",
      },
      {
        id: "formwork-boards",
        slug: "formwork-boards",
        name: "Formwork Boards",
        image: "/images/categories/formwork-boards.jpg",
      },
    ],
  },
  {
    id: "tools-equipment",
    slug: "tools-equipment",
    name: "Tools & Equipment",
    description: "Power tools, hand tools and safety equipment to keep every crew productive on site.",
    image: "/images/categories/tools-equipment.jpg",
    subcategories: [
      {
        id: "power-tools",
        slug: "power-tools",
        name: "Power Tools",
        image: "/images/categories/power-tools.jpg",
      },
      {
        id: "hand-tools",
        slug: "hand-tools",
        name: "Hand Tools",
        image: "/images/categories/hand-tools.jpg",
      },
      {
        id: "safety-equipment",
        slug: "safety-equipment",
        name: "Safety Equipment",
        image: "/images/categories/safety-equipment.jpg",
      },
      {
        id: "ladders",
        slug: "ladders",
        name: "Ladders",
        image: "/images/categories/ladders.jpg",
      },
      {
        id: "construction-equipment",
        slug: "construction-equipment",
        name: "Construction Equipment",
        image: "/images/categories/construction-equipment.jpg",
      },
    ],
  },
];
