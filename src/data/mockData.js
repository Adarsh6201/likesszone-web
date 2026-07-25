// High-quality mock data for Likesszon Storefront & Admin Panel

export const categories = [
  {
    id: 'cat-1',
    name: 'Computer Accessories and Components',
    slug: 'computer-accessories-and-components',
    description: 'Mechanical keyboards, ergonomic mice, GPUs, SSDs, and workspace gears.',
    image: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-2',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Smart power strips, test multimeters, cables, and home wiring supplies.',
    image: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-3',
    name: 'Camera',
    slug: 'camera',
    description: 'Professional DSLR & mirrorless cameras, prime lenses, and recording gear.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'cat-4',
    name: 'More Items',
    slug: 'more-items',
    description: 'Discover other unique lifestyle essentials, backpacks, and lamps.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
  }
];

export const products = [
  {
    id: 'prod-1',
    name: 'Likesszon RGB Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    description: 'A premium hot-swappable mechanical keyboard with custom linear switches, PBT keycaps, and custom sound-dampening foam. Engineered for typing performance and durability.',
    category: 'computer-accessories-and-components',
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Hot-swappable linear mechanical switches',
      'Double-shot PBT keycaps with translucent legends',
      'Fully customizable per-key RGB backlighting',
      'Integrated sound-dampening foam layers',
      'Detachable USB Type-C braided cable'
    ],
    stock: 14,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Logitech MX Master 3S Ergonomic Mouse',
    price: 99.99,
    originalPrice: 109.99,
    description: 'An advanced ergonomic mouse featuring quiet clicks, 8000 DPI track-on-glass sensor, and the MagSpeed magnetic scroll wheel. Perfectly designed for productivity and seamless multi-device workflows.',
    category: 'computer-accessories-and-components',
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625805510609-b695123985a1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      '8,000 DPI track-on-glass optical sensor',
      'Logitech Quiet Click technology (90% noise reduction)',
      'MagSpeed electromagnetic scroll wheel (1000 lines/sec)',
      'Easy-Switch connectivity for up to 3 devices',
      'USB-C quick charging (lasts up to 70 days)'
    ],
    stock: 25,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Sony Alpha 7 IV Mirrorless Camera',
    price: 2499.00,
    originalPrice: 2699.00,
    description: 'A groundbreaking hybrid camera with a 33MP Exmor R sensor, high-speed autofocus processing, and advanced 4K 60p video capabilities. Reframe your visual storytelling with precision autofocus.',
    category: 'camera',
    rating: 4.9,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610448721566-47369c768e70?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      '33 Megapixel Full-Frame Exmor R CMOS Sensor',
      'BIONZ XR image processing engine',
      'Real-time Eye AF for Humans, Animals, and Birds',
      '4K 60p 10-bit 4:2:2 movie recording',
      '5-axis in-body optical image stabilization'
    ],
    stock: 8,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'Smart Wi-Fi Surge Protector Strip',
    price: 39.95,
    originalPrice: 49.95,
    description: 'Independently control 4 smart outlets and charge devices with 3 USB ports. Compatible with Alexa and Google Assistant for smart home power management.',
    category: 'electrical',
    rating: 4.5,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601524909162-be87252be298?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      '4 smart sockets controllable individually via App',
      '3 USB fast charging ports (shared 3.1A)',
      'Built-in overload protection & ETL certified surge protection',
      'Schedule timers and scenarios via mobile phone app',
      'Sleek fire-resistant ABS shell case design'
    ],
    stock: 19,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Camera Prime Lens 50mm f/1.2',
    price: 1399.00,
    originalPrice: 1499.00,
    description: 'Ultra-fast prime lens designed to provide stunning bokeh, extreme sharpness, and reliable low-light performance. Built with custom fluoride coatings to minimize reflections.',
    category: 'camera',
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500643753655-323097b345ed?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Large f/1.2 aperture for shallow depth of field',
      'Fluoride glass elements for aberration correction',
      'Dust and moisture resistant outer construction',
      'De-clickable aperture ring for silent video control',
      'Nano AR Coating II reduces flare and ghosting'
    ],
    stock: 12,
    featured: false,
  },
  {
    id: 'prod-6',
    name: 'Digital Multimeter & Circuit Tester',
    price: 49.99,
    originalPrice: 59.99,
    description: 'A professional-grade auto-ranging multimeter for measuring AC/DC voltage, current, resistance, and checking circuit continuity safely with overload indicators.',
    category: 'electrical',
    rating: 4.6,
    reviewsCount: 72,
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1601524909162-be87252be298?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Double-fuse protection with anti-burn technology',
      'Large backlit LCD display screen indicators',
      'Supports NCV (Non-Contact Voltage) sensor testing',
      'Measures temperature, frequency, and capacitance',
      'Comes with standard test probes & protective rubber sleeve'
    ],
    stock: 15,
    featured: false,
  },
  {
    id: 'prod-7',
    name: 'Minimalist Leather Backpack',
    price: 180.00,
    originalPrice: 199.99,
    description: 'Weatherproof full-grain leather backpack featuring a 16-inch padded laptop sleeve, hidden security pocket, and ergonomic shoulder straps for style and comfort.',
    category: 'more-items',
    rating: 4.7,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Handcrafted from water-resistant top grain leather',
      'Dedicated padded sleeve for 16-inch notebooks',
      'Hidden passport and phone security pocket',
      'Heavy-duty YKK zippers and solid brass clips',
      'Breathable mesh backing with luggage trolley strap'
    ],
    stock: 12,
    featured: false,
  },
  {
    id: 'prod-8',
    name: 'Smart Ambient LED Desk Lamp',
    price: 89.99,
    originalPrice: 99.99,
    description: 'Fully customizable LED desk lamp with touch controls, smart home integration, wireless phone charging pad, and circadian rhythm mode.',
    category: 'more-items',
    rating: 4.7,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Integrated 10W wireless Qi fast charging pad',
      'Adjustable arm and rotating lamp head (up to 180 deg)',
      'Adjustable color temperatures (2700K - 6500K)',
      'Smart app control with Siri/Google sync integrations',
      'Timer modes and adaptive auto-brightness sensors'
    ],
    stock: 6,
    featured: false,
  },
  {
    id: 'prod-9',
    name: 'Samsung 990 PRO NVMe SSD 2TB',
    price: 169.99,
    originalPrice: 199.99,
    description: 'The ultimate PC storage upgrade. Reaches random read/write speeds up to 1400K/1550K IOPS. Designed for gaming, video rendering, and heavy data computations.',
    category: 'computer-accessories-and-components',
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1628546124707-160fa4e15073?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Incredible read speeds up to 7450 MB/s',
      'PCIe Gen 4.0 x4 NVMe controller technology',
      'Nickel-coated heat controller spreads thermal load',
      'Supports Samsung Magician calibration app tool',
      '5-Year Limited Manufacturer Warranty included'
    ],
    stock: 30,
    featured: true,
  },
  {
    id: 'prod-10',
    name: 'Carbon Fiber Tripod with Ball Head',
    price: 145.00,
    originalPrice: 175.00,
    description: 'A heavy-duty carbon fiber travel tripod that weighs only 3 lbs but supports rigs up to 26 lbs. Perfect for field landscapes and stable tracking.',
    category: 'camera',
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1603503254924-f77be1ee22c8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1603503254924-f77be1ee22c8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500642918583-7323f462f430?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Lightweight carbon fiber 8-layer leg tubes',
      '360-degree panoramic metal fluid ball head',
      'Converts into a full-height monopod quickly',
      'Quick-release Arca-Swiss plate system',
      'Folds down to 16.5 inches for backpack carry'
    ],
    stock: 10,
    featured: false,
  },
  {
    id: 'prod-11',
    name: 'Adjustable Cable Wire Stripper Tool',
    price: 18.50,
    originalPrice: 24.50,
    description: 'Professional cable crimper and wire cutting tool designed for stripping copper and aluminum wire conductors from 10-22 AWG effortlessly.',
    category: 'electrical',
    rating: 4.4,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1581092162384-8987c17b4c2c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092162384-8987c17b4c2c?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      'Self-adjusting stripping jaws hold wire firmly',
      'Handles multi-conductor flat and round cables',
      'Non-slip ergonomic rubber grip handles',
      'Built-in wire cutter cutter and terminal crimper',
      'Constructed from high-grade alloy steel'
    ],
    stock: 45,
    featured: false,
  },
  {
    id: 'prod-12',
    name: 'Portable 15W Qi Wireless Charger',
    price: 29.99,
    originalPrice: 34.99,
    description: 'An elegant aluminum alloy charging pad with temperature protection and anti-slip silicone rings. Charges smart devices through standard plastic cases.',
    category: 'more-items',
    rating: 4.6,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    features: [
      '15W peak output wireless fast charging',
      'Aircraft-grade sandblasted aluminum case',
      'Foreign Object Detection (FOD) auto-shutoff safety',
      'Comes with a 3.3 ft USB-C to USB-C cable',
      'Compatible with iPhones, Galaxy, and AirPods cases'
    ],
    stock: 50,
    featured: false,
  }
];

export const orders = [
  {
    id: 'ORD-1002',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    date: '2026-07-23T14:32:00Z',
    items: [
      { productId: 'prod-1', name: 'Likesszon RGB Mechanical Keyboard', quantity: 1, price: 129.99 },
      { productId: 'prod-5', name: 'Camera Prime Lens 50mm f/1.2', quantity: 1, price: 1399.00 }
    ],
    total: 1528.99,
    status: 'Processing',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-1001',
    customerName: 'Marcus Aurelius',
    customerEmail: 'marcus.a@example.com',
    date: '2026-07-22T09:15:00Z',
    items: [
      { productId: 'prod-2', name: 'Logitech MX Master 3S Ergonomic Mouse', quantity: 2, price: 99.99 }
    ],
    total: 199.98,
    status: 'Shipped',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-1000',
    customerName: 'Helena Carter',
    customerEmail: 'helena.c@example.com',
    date: '2026-07-20T17:45:00Z',
    items: [
      { productId: 'prod-4', name: 'Smart Wi-Fi Surge Protector Strip', quantity: 1, price: 39.95 }
    ],
    total: 39.95,
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-1003',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    date: '2026-07-24T10:05:00Z',
    items: [
      { productId: 'prod-3', name: 'Sony Alpha 7 IV Mirrorless Camera', quantity: 1, price: 2499.00 }
    ],
    total: 2499.00,
    status: 'Pending',
    paymentStatus: 'Unpaid',
  }
];
