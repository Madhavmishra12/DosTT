"use client";

import { useMemo, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  detail: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  imageAlt: string;
  tone: string;
  featured?: boolean;
};

const foodImages = {
  samosa: "https://images.unsplash.com/photo-1732519970445-8f2d6998961f?auto=format&fit=crop&w=900&q=85",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  coffee: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
  shake: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
  cheese: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=85",
  mayoDip: "https://images.unsplash.com/photo-1645066804048-080d5fe87ae3?auto=format&fit=crop&w=900&q=85",
  paneer: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=900&q=85",
  mintDip: "https://images.unsplash.com/photo-1716947675463-1b3bbc1a1151?auto=format&fit=crop&w=900&q=85",
};

const menu: MenuItem[] = [
  {
    id: "samosa",
    name: "Malai Paneer Samosa",
    detail: "Crisp pastry, creamy paneer, sweet corn and a hint of malai.",
    price: 30,
    originalPrice: 40,
    category: "DOSTT signatures",
    image: foodImages.samosa,
    imageAlt: "Golden samosas served with green chutney and chai",
    tone: "saffron",
    featured: true,
  },
  {
    id: "cheese-sandwich",
    name: "Cheese Paneer Grilled Sandwich",
    detail: "Grilled golden with paneer, melted cheese and creamy signature sauce.",
    price: 139,
    originalPrice: 150,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A toasted sandwich filled with cheese and vegetables",
    tone: "pink",
  },
  {
    id: "cheese-paneer-burger",
    name: "Cheese Paneer Loaded Burger",
    detail: "Soft paneer, a melted cheese slice, crisp veg and a creamy finish.",
    price: 99,
    originalPrice: 110,
    category: "Burgers",
    image: foodImages.burger,
    imageAlt: "A loaded vegetarian burger with cheese and fresh lettuce",
    tone: "pink",
  },
  {
    id: "kulhad-pizza",
    name: "Cheese Kulhad Pizza",
    detail: "A cheesy, pizza-style favourite served in DOSTT’s kulhad style.",
    price: 100,
    originalPrice: 119,
    category: "Kulhad specials",
    image: foodImages.pizza,
    imageAlt: "Cheese pizza topped with fresh herbs",
    tone: "saffron",
    featured: true,
  },
  {
    id: "cold-coffee",
    name: "Classic Cold Coffee",
    detail: "Chilled coffee blended smooth for a refreshing café-style sip.",
    price: 59,
    originalPrice: 65,
    category: "Sips & slurps",
    image: foodImages.coffee,
    imageAlt: "A glass of iced coffee",
    tone: "blue",
    featured: true,
  },
  {
    id: "oreo-shake",
    name: "Oreo Shake",
    detail: "A cool, creamy cookie shake made for a little treat break.",
    price: 79,
    originalPrice: 89,
    category: "Sips & slurps",
    image: foodImages.shake,
    imageAlt: "A rich chocolate milkshake",
    tone: "pink",
    featured: true,
  },
  {
    id: "coco-lava-shake",
    name: "Coco Lava Shake",
    detail: "A decadent chocolate shake with a deep cocoa flavour.",
    price: 79,
    originalPrice: 89,
    category: "Sips & slurps",
    image: foodImages.shake,
    imageAlt: "A chocolate milkshake topped with chocolate",
    tone: "pink",
  },
  {
    id: "strawberry-shake",
    name: "Strawberry Shake",
    detail: "A creamy, fruity shake with the sweetness of ripe strawberries.",
    price: 79,
    originalPrice: 85,
    category: "Sips & slurps",
    image: foodImages.shake,
    imageAlt: "A pink strawberry milkshake",
    tone: "pink",
  },
  {
    id: "kitkat-shake",
    name: "KitKat Shake",
    detail: "Thick and creamy with a chocolatey crunch in every sip.",
    price: 90,
    originalPrice: 99,
    category: "Sips & slurps",
    image: foodImages.shake,
    imageAlt: "A chocolate milkshake with a creamy top",
    tone: "pink",
  },
  {
    id: "spring-potato",
    name: "Spring Potato",
    detail: "Spiral-cut potato, fried crisp and tossed in a special spice blend.",
    price: 45,
    originalPrice: 49,
    category: "Gupshup snacks & bites",
    image: foodImages.fries,
    imageAlt: "Crispy golden potato fries",
    tone: "green",
  },
  {
    id: "aloo-tikki-burger",
    name: "Aloo Tikki Burger",
    detail: "A crisp aloo tikki with fresh vegetables and signature sauces.",
    price: 50,
    originalPrice: 59,
    category: "Burgers",
    image: foodImages.burger,
    imageAlt: "A vegetarian burger with a golden patty",
    tone: "pink",
  },
  {
    id: "classic-veg-burger",
    name: "Classic Veg Burger",
    detail: "A flavourful veggie patty stacked with fresh vegetables and sauce.",
    price: 65,
    originalPrice: 69,
    category: "Burgers",
    image: foodImages.burger,
    imageAlt: "A classic vegetarian burger",
    tone: "pink",
  },
  {
    id: "paneer-burger",
    name: "Paneer Loaded Burger",
    detail: "Crispy aloo tikki and paneer with cheese, fresh veg and DOSTT sauce.",
    price: 80,
    originalPrice: 89,
    category: "Burgers",
    image: foodImages.burger,
    imageAlt: "A stacked paneer burger with fresh vegetables",
    tone: "pink",
    featured: true,
  },
  {
    id: "cheese-burst-burger",
    name: "Cheese Burst Burger",
    detail: "A crisp aloo tikki burger layered with extra creamy melted cheese.",
    price: 89,
    originalPrice: 99,
    category: "Burgers",
    image: foodImages.burger,
    imageAlt: "A cheesy vegetarian burger",
    tone: "pink",
  },
  {
    id: "kurkure-fries",
    name: "Kurkure Fries",
    detail: "Extra-crunchy fries coated in DOSTT’s signature seasoning.",
    price: 80,
    originalPrice: 89,
    category: "Loaded fries",
    image: foodImages.fries,
    imageAlt: "A generous serving of golden, crisp fries",
    tone: "green",
    featured: true,
  },
  {
    id: "jumbo-light-sandwich",
    name: "Jumbo Light Sandwich",
    detail: "A simple grilled sandwich packed with fresh vegetables and sauce.",
    price: 60,
    originalPrice: 65,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A grilled vegetable sandwich",
    tone: "blue",
  },
  {
    id: "jumbo-veg-sandwich",
    name: "Jumbo Veg Sandwich",
    detail: "Fresh vegetables, creamy spreads and signature sauces in four slices.",
    price: 79,
    originalPrice: 89,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A fresh vegetable sandwich cut into triangles",
    tone: "blue",
  },
  {
    id: "jumbo-aloo-sandwich",
    name: "Jumbo Aloo Tikki Sandwich",
    detail: "Grilled aloo tikki, crisp vegetables and creamy sauce between soft bread.",
    price: 79,
    originalPrice: 89,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A toasted sandwich filled with vegetables",
    tone: "blue",
  },
  {
    id: "jumbo-paneer-sandwich",
    name: "Jumbo Paneer Sandwich",
    detail: "Paneer, fresh vegetables, cheese and signature sauces in four slices.",
    price: 99,
    originalPrice: 110,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "Freshly made toasted sandwiches served on a board",
    tone: "blue",
    featured: true,
  },
  {
    id: "jumbo-cheese-sandwich",
    name: "Jumbo Cheese Sandwich",
    detail: "A grilled delight with melted cheese and creamy fillings.",
    price: 115,
    originalPrice: 129,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A cheese-filled grilled sandwich",
    tone: "blue",
  },
  {
    id: "tandoori-paneer-sandwich",
    name: "Tandoori Paneer Sandwich",
    detail: "Smoky tandoori paneer, sweet corn and vegetables, grilled to order.",
    price: 119,
    originalPrice: 129,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A grilled paneer sandwich",
    tone: "blue",
  },
  {
    id: "triple-layer-sandwich",
    name: "Triple Layer Cheese & Paneer Corn Sandwich",
    detail: "Three layers of grilled bread with paneer, sweet corn, cheese and sauce.",
    price: 149,
    originalPrice: 159,
    category: "Jumbo grilled sandwiches",
    image: foodImages.sandwich,
    imageAlt: "A multi-layer grilled sandwich with cheese and vegetables",
    tone: "blue",
  },
  {
    id: "hunger-fix-combo",
    name: "Hunger Fix Combo",
    detail: "Jumbo light sandwich paired with a classic cold coffee.",
    price: 109,
    originalPrice: 120,
    category: "Combos & meal deals",
    image: foodImages.sandwich,
    imageAlt: "A sandwich and iced coffee combo",
    tone: "saffron",
  },
  {
    id: "mini-kulhad-combo",
    name: "Mini Kulhad Combo",
    detail: "A trio of DOSTT favourites: mini kulhad momos, mini kulhad pizza and edible kulhad momos.",
    price: 129,
    originalPrice: 139,
    category: "Combos & meal deals",
    image: foodImages.pizza,
    imageAlt: "A small pizza with melted cheese",
    tone: "saffron",
  },
  {
    id: "cream-crunch-combo",
    name: "Cream & Crunch Combo",
    detail: "Classic veg burger, crispy spring potato and a refreshing cold coffee.",
    price: 150,
    originalPrice: 159,
    category: "Combos & meal deals",
    image: foodImages.burger,
    imageAlt: "A burger served with crisp fries",
    tone: "saffron",
  },
  {
    id: "student-combo",
    name: "Student Combo",
    detail: "Aloo tikki burger, Kurkure fries and cold coffee—made for a filling break.",
    price: 150,
    originalPrice: 169,
    category: "Combos & meal deals",
    image: foodImages.fries,
    imageAlt: "Crispy fries served alongside a filling meal",
    tone: "saffron",
    featured: true,
  },
  {
    id: "party-combo",
    name: "Party Combo",
    detail: "Two veg burgers, two jumbo sandwiches and two cold coffees to share.",
    price: 349,
    originalPrice: 360,
    category: "Party combos",
    image: foodImages.sandwich,
    imageAlt: "A shareable spread of sandwiches",
    tone: "saffron",
  },
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    detail: "Add an extra layer of melted cheese to your favourite bite.",
    price: 20,
    category: "Add extras",
    image: foodImages.cheese,
    imageAlt: "A wedge of cheese",
    tone: "cream",
  },
  {
    id: "extra-mayo",
    name: "Extra Mayo",
    detail: "A little extra creamy mayo on the side.",
    price: 10,
    category: "Add extras",
    image: foodImages.mayoDip,
    imageAlt: "Crisp snacks served beside a bowl of creamy dipping sauce",
    tone: "cream",
  },
  {
    id: "extra-tandoori-mayo",
    name: "Extra Tandoori Mayo",
    detail: "Smoky, creamy tandoori mayo to bring a little extra zing.",
    price: 15,
    category: "Add extras",
    image: foodImages.samosa,
    imageAlt: "Golden Indian snacks served with a variety of chutneys",
    tone: "cream",
  },
  {
    id: "extra-paneer",
    name: "Extra Paneer",
    detail: "Add a few more paneer cubes to your favourite sandwich or burger.",
    price: 20,
    category: "Add extras",
    image: foodImages.paneer,
    imageAlt: "Indian paneer with spices, served fresh",
    tone: "cream",
  },
  {
    id: "extra-mint-chutney",
    name: "Extra Mint Chutney",
    detail: "Fresh, herby chutney for a bright and tangy finish.",
    price: 10,
    category: "Add extras",
    image: foodImages.mintDip,
    imageAlt: "A fresh dipping sauce served alongside a snack",
    tone: "cream",
  },
];

const categories = [
  "Popular",
  "All menu",
  "DOSTT signatures",
  "Kulhad specials",
  "Sips & slurps",
  "Gupshup snacks & bites",
  "Burgers",
  "Loaded fries",
  "Jumbo grilled sandwiches",
  "Combos & meal deals",
  "Party combos",
  "Add extras",
];

function Mark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark${light ? " brand-mark-light" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 42 42" fill="none">
        <path d="M7 13h21v12.3A8.7 8.7 0 0 1 19.3 34h-3.6A8.7 8.7 0 0 1 7 25.3V13Z" fill="currentColor" />
        <path d="M28 17h2.7a5.3 5.3 0 0 1 0 10.6H28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M12 7c-1.8 1.6-1.8 3.2 0 4.8M19 6c-1.8 1.6-1.8 3.2 0 4.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8 37h25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={diagonal ? "arrow-icon diagonal" : "arrow-icon"}>
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 22 22" fill="none" className="bag-icon">
      <path d="M4.1 8.2h13.8l1 10.4H3.1l1-10.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.6 8V6.3a3.4 3.4 0 0 1 6.8 0V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Popular");
  const bagCount = Object.values(bag).reduce((total, quantity) => total + quantity, 0);
  const visibleMenu = activeCategory === "Popular"
    ? menu.filter((item) => item.featured)
    : activeCategory === "All menu"
      ? menu
      : menu.filter((item) => item.category === activeCategory);
  const bagTotal = useMemo(
    () => menu.reduce((total, item) => total + item.price * (bag[item.id] ?? 0), 0),
    [bag],
  );

  function addItem(id: string) {
    setBag((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  function changeQuantity(id: string, amount: number) {
    setBag((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) + amount;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DOSTT home">
          <Mark />
          <span className="brand-copy"><strong>DOSTT</strong><small>CHAI • BITES • ADDA</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#menu">The menu</a>
          <a href="#visit">Find us</a>
        </nav>
        <button className="header-order" onClick={() => setBagOpen(true)} aria-label={`Open your order list, ${bagCount} items`}>
          <span>Your order</span><span className="header-order-count">{bagCount}</span><BagIcon />
        </button>
      </header>

      <section className="hero section-wrap" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEIGHBOURHOOD ADDA · DADRI</div>
          <h1>A little chai.<br />A lot of <em>adda.</em></h1>
          <p className="hero-intro">Come for the kulhad chai. Stay for one more bite, one more story, one more laugh.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#menu">Find your favourite <Arrow /></a>
            <a className="text-link" href="#visit">Come say hello <Arrow diagonal /></a>
          </div>
          <div className="hero-note">
            <span className="note-rule" />
            <p>Made for quick breaks<br />and slow evenings.</p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1732519970445-8f2d6998961f?auto=format&fit=crop&w=1500&q=90"
              alt="Fresh samosas, chutney and chai ready to share"
            />
            <div className="image-shade" />
            <div className="hero-photo-caption"><span>THE PERFECT PAUSE</span><strong>Chai, then everything else.</strong></div>
          </div>
          <div className="round-stamp" aria-label="Made for good company">
            <svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="stamp-circle" d="M60,60m-43,0a43,43 0 1,1 86,0a43,43 0 1,1 -86,0" /></defs><text><textPath href="#stamp-circle">GOOD FOOD · BETTER COMPANY · DOSTT · </textPath></text><path d="M60 43c-7 0-12 5-12 12 0 5 3 9 8 13l4 3 4-3c5-4 8-8 8-13 0-7-5-12-12-12Zm0 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z" fill="currentColor" /></svg>
          </div>
          <div className="hero-side-label">FRESHLY MADE<br />JUST FOR YOU <span>↘</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="DOSTT menu highlights">
        <div className="ticker-track">
          {[0, 1].map((copy) => <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
            <span>KULHAD SPECIALS</span><b>✳</b><span>SIPS & SLURPS</span><b>✳</b><span>GUPSHUP SNACKS</span><b>✳</b><span>DOSTT SIGNATURES</span><b>✳</b>
          </div>)}
        </div>
      </section>

      <section className="menu-section section-wrap" id="menu">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> THE GOOD STUFF</div>
            <h2>The good stuff.<br /><em>All in one place.</em></h2>
          </div>
          <div className="menu-intro">
            <p>From kulhad favourites to loaded burgers, cold coffee and shareable combos—find the right thing for your kind of break.</p>
            <a className="text-link" href="#visit">See you at DOSTT <Arrow diagonal /></a>
          </div>
        </div>
        <div className="category-row" aria-label="Menu categories">
          {categories.map((category) => {
            const count = category === "Popular"
              ? menu.filter((item) => item.featured).length
              : category === "All menu"
                ? menu.length
                : menu.filter((item) => item.category === category).length;
            return <button
              type="button"
              className={activeCategory === category ? "category-chip active" : "category-chip"}
              key={category}
              aria-pressed={activeCategory === category}
              aria-label={`${category}, ${count} ${count === 1 ? "item" : "items"}`}
              onClick={() => setActiveCategory(category)}
            >{category}<span>{count}</span></button>;
          })}
        </div>
        <div className="menu-results" aria-live="polite">
          <span>{activeCategory === "Popular" ? "DOSTT favourites" : activeCategory}</span>
          <span>{visibleMenu.length} {visibleMenu.length === 1 ? "item" : "items"}</span>
        </div>
        <div className="menu-grid">
          {visibleMenu.map((item, index) => (
            <article
              className={`menu-card card-${item.tone}`}
              key={item.id}
              style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.style.setProperty("--card-rotate-x", `${(y * -8).toFixed(2)}deg`);
                event.currentTarget.style.setProperty("--card-rotate-y", `${(x * 9).toFixed(2)}deg`);
                event.currentTarget.style.setProperty("--image-shift-x", `${(x * -10).toFixed(2)}px`);
                event.currentTarget.style.setProperty("--image-shift-y", `${(y * -8).toFixed(2)}px`);
                event.currentTarget.style.setProperty("--image-tilt-x", `${(y * -2.5).toFixed(2)}deg`);
                event.currentTarget.style.setProperty("--image-tilt-y", `${(x * 2.5).toFixed(2)}deg`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
                event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
                event.currentTarget.style.setProperty("--image-shift-x", "0px");
                event.currentTarget.style.setProperty("--image-shift-y", "0px");
                event.currentTarget.style.setProperty("--image-tilt-x", "0deg");
                event.currentTarget.style.setProperty("--image-tilt-y", "0deg");
              }}
            >
              <div className="menu-image-wrap">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
                <span className="menu-number">0{index + 1}</span>
                {item.originalPrice && <span className="menu-discount">{Math.round((1 - item.price / item.originalPrice) * 100)}% off</span>}
                {item.featured && <span className="menu-popular">POPULAR</span>}
              </div>
              <div className="menu-card-body">
                <div className="menu-category">{item.category}</div>
                <div className="menu-title-row"><h3>{item.name}</h3><span className="veg-mark" aria-label="Vegetarian">●</span></div>
                <p>{item.detail}</p>
                <div className="menu-card-bottom">
                  <div className="menu-prices"><strong>₹{item.price}</strong>{item.originalPrice && <del>₹{item.originalPrice}</del>}</div>
                  <button className="add-button" onClick={() => addItem(item.id)} aria-label={`Add ${item.name} to your order`}>Add <span>+</span></button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="menu-footnote">Prices and offers shown are from the online menu and may change.</p>
      </section>

      <section className="story-section" id="story">
        <div className="story-photo">
          <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85" alt="A warm cup of tea set out for a quiet moment" loading="lazy" />
          <div className="story-photo-tag"><span>GOOD THINGS</span><strong>Take time.</strong></div>
        </div>
        <div className="story-copy">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> A PLACE TO PAUSE</div>
          <h2>Somewhere<br />between <em>chai</em><br />and hello.</h2>
          <p>DOSTT is your neighbourhood stop for comfort food and easy company. Drop in for a quick cup, share a plate with your people, or turn a small break into the best part of the day.</p>
          <a className="button button-light" href="#visit">A little more about us <Arrow /></a>
          <span className="story-doodle" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="visit-section section-wrap" id="visit">
        <div className="visit-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR TABLE IS WAITING</div>
          <h2>Find your<br /><em>way to DOSTT.</em></h2>
          <p>We’re right here in Dadri. Bring a friend, bring an appetite, and we’ll take it from there.</p>
          <a className="button button-primary" href="https://www.google.com/maps/search/?api=1&query=House+879%2C+Roopwas+Mord%2C+Near+Shashi+Kirana+Store%2C+Dadri%2C+203207+Greater+Noida" target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a>
        </div>
        <div className="visit-card">
          <div className="visit-card-top"><span className="pin-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6"/></svg></span><span>COME FIND US</span></div>
          <address>House 879, Roopwas Mord,<br />Near Shashi Kirana Store,<br />Dadri, Greater Noida 203207</address>
          <div className="visit-divider" />
          <div className="visit-options"><span>HOWEVER YOU LIKE IT</span><div><b>Delivery</b><i /> <b>Takeaway</b></div></div>
          <div className="visit-card-bottom"><span>DOSTT<br /><small>CHAI • BITES • ADDA</small></span><span className="sunburst">✳</span></div>
        </div>
      </section>

      <section className="last-call">
        <div className="last-call-inner">
          <span className="last-call-sun" aria-hidden="true">✳</span>
          <p>Good food brings us together.</p>
          <h2>See you at <em>DOSTT.</em></h2>
          <a href="#menu" className="button button-light">Explore the menu <Arrow /></a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#top"><Mark light /><span className="brand-copy"><strong>DOSTT</strong><small>CHAI • BITES • ADDA</small></span></a>
        <p>Good food. Better company.</p>
        <div className="footer-meta"><a href="#menu">Menu</a><a href="#visit">Find us</a><span>FSSAI Lic. 22726446001128</span><span>© DOSTT 2026</span></div>
      </footer>

      {bagCount > 0 && <button className="floating-bag" onClick={() => setBagOpen(true)}><BagIcon /><span>{bagCount} {bagCount === 1 ? "favourite" : "favourites"}</span><strong>₹{bagTotal}</strong></button>}

      {bagOpen && <div className="drawer-backdrop" onClick={() => setBagOpen(false)}>
        <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title" onClick={(event) => event.stopPropagation()}>
          <div className="drawer-heading"><div><span className="eyebrow"><span className="eyebrow-dot" /> YOUR DOSTT PICKS</span><h2 id="bag-title">Your order list</h2></div><button className="close-drawer" onClick={() => setBagOpen(false)} aria-label="Close order list">×</button></div>
          {bagCount === 0 ? <div className="empty-bag"><div className="empty-bag-icon"><BagIcon /></div><h3>Nothing here just yet.</h3><p>Find something delicious on the menu and add it to your list.</p><button className="button button-primary" onClick={() => setBagOpen(false)}>Explore the menu <Arrow /></button></div> : <>
            <div className="bag-items">{menu.filter((item) => bag[item.id]).map((item) => <div className="bag-item" key={item.id}><img src={item.image} alt="" /><div className="bag-item-info"><strong>{item.name}</strong><span>₹{item.price} each</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{bag[item.id]}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div><strong className="bag-item-price">₹{item.price * bag[item.id]}</strong></div>)}</div>
            <div className="bag-total"><span>Subtotal</span><strong>₹{bagTotal}</strong></div>
            <p className="bag-note">These are your picks. Visit DOSTT to place your order for delivery or takeaway.</p>
            <a className="button button-primary drawer-visit" href="#visit" onClick={() => setBagOpen(false)}>Find us to order <Arrow /></a>
          </>}
        </aside>
      </div>}
    </main>
  );
}
