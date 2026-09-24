import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/*
  Product data + reusable functions:
  - formatPrice()      -> formats the rupee price
  - getProductImage()  -> returns the selected image
  - getNextSize()      -> finds the next size for keyboard/demo interaction
  - selectProduct()    -> changes the current product
*/
const PRODUCTS = [
  {
    id: "cloudwalk",
    name: "CLOUDWALK ELITE",
    description: "Precision-built everyday runners with responsive foam and an airy engineered upper.",
    price: 20999,
    color: "Mineral White",
    accent: "#111111",
    images: [
      "/shoes/cloudwalk-main-4k.png",
      "/shoes/cloudwalk-side-left-4k.png",
      "/shoes/cloudwalk-side-right-4k.png",
    ],
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "shadow",
    name: "SHADOW STRIKE X",
    description: "A street-ready silhouette with layered protection, bold traction and all-day comfort.",
    price: 26999,
    color: "Midnight Black",
    accent: "#111111",
    images: [
      "/shoes/shadow-main-4k.png",
      "/shoes/shadow-side-left-4k.png",
      "/shoes/shadow-side-right-4k.png",
    ],
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "aeroflow",
    name: "AEROFLOW PRO",
    description: "Lightweight performance mesh paired with a springy sole for fast daily movement.",
    price: 24499,
    color: "Electric Blue",
    accent: "#1264ff",
    images: [
      "/shoes/aeroflow-main-4k.png",
      "/shoes/aeroflow-side-left-4k.png",
      "/shoes/aeroflow-side-right-4k.png",
    ],
    sizes: [7, 8, 9, 10, 11, 12],
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

const getProductImage = (product, index) =>
  product.images[index] ?? product.images[0];

const getNextSize = (sizes, current) => {
  const index = sizes.indexOf(current);
  return sizes[(index + 1) % sizes.length];
};

function App() {
  const [productIndex, setProductIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(9);
  const [direction, setDirection] = useState("next");
  const [animationKey, setAnimationKey] = useState(0);
  const [bagCount, setBagCount] = useState(0);
  const [message, setMessage] = useState("");

  const product = PRODUCTS[productIndex];

  const chooseProduct = (index) => {
    if (index === productIndex) return;
    setDirection(index > productIndex ? "next" : "prev");
    setProductIndex(index);
    setImageIndex(0);
    setSize(9);
    setAnimationKey((v) => v + 1);
  };

  const chooseImage = (index) => {
    if (index === imageIndex) return;
    setDirection(index > imageIndex ? "next" : "prev");
    setImageIndex(index);
    setAnimationKey((v) => v + 1);
  };

  const chooseSize = (value) => setSize(value);

  const addToBag = () => {
    setBagCount((v) => v + 1);
    setMessage(`${product.name} · size ${size} added to bag`);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const nextProduct = () => chooseProduct((productIndex + 1) % PRODUCTS.length);
  const prevProduct = () => chooseProduct((productIndex - 1 + PRODUCTS.length) % PRODUCTS.length);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") nextProduct();
      if (event.key === "ArrowLeft") prevProduct();
      if (event.key === "Enter") addToBag();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const nextSize = useMemo(() => getNextSize(product.sizes, size), [product.sizes, size]);

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">NOVA<span>/</span>STEP</div>
        <div className="topbar-center">PRODUCT 01 / 03</div>
        <div className="bag">BAG <b>{String(bagCount).padStart(2, "0")}</b></div>
      </header>

      <section className="product-shell">
        <div className="info-panel">
          <div className="eyebrow">NEW RELEASE · 2026</div>
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>

          <div className="price-row">
            <span className="price">{formatPrice(product.price)}</span>
            <span className="tax">INCL. OF ALL TAXES</span>
          </div>

          <div className="meta-row">
            <span className="swatch" style={{ background: product.accent }}></span>
            <span>Colour — <b>{product.color}</b></span>
          </div>

          <div className="control-block">
            <div className="control-title">
              <span>SIZE</span>
              <button className="size-helper" onClick={() => chooseSize(nextSize)}>
                SELECT
              </button>
            </div>
            <div className="sizes">
              {product.sizes.map((value) => (
                <button
                  key={value}
                  className={`size ${size === value ? "selected" : ""}`}
                  onClick={() => chooseSize(value)}
                  aria-label={`Size ${value}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <button className="add-button" onClick={addToBag}>
            <span>ADD TO BAG</span>
            <span>+</span>
          </button>

          {message && <div className="toast">{message}</div>}
        </div>

        <div className="visual-panel">
          <div className="stage">
            <div className="stage-label left">01 — 03</div>
            <div className="stage-label right">DRAG / CLICK</div>

            <button className="nav-arrow left-arrow" onClick={prevProduct} aria-label="Previous product">←</button>
            <button className="nav-arrow right-arrow" onClick={nextProduct} aria-label="Next product">→</button>

            <div className={`shoe-scene ${direction}`} key={`${product.id}-${animationKey}`}>
              <div className="ground-shadow"></div>
              <img
                className="shoe-image"
                src={getProductImage(product, imageIndex)}
                alt={product.name}
              />
            </div>
          </div>

          <div className="image-controls">
            <div className="thumb-label">VIEW / ANGLE</div>
            <div className="thumbs">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  className={`thumb ${index === imageIndex ? "active" : ""}`}
                  onClick={() => chooseImage(index)}
                  aria-label={`View angle ${index + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="available">
        <div className="available-heading">
          <span>ALSO AVAILABLE</span>
          <div className="line"></div>
        </div>

        <div className="product-strip">
          {PRODUCTS.map((item, index) => (
            <button
              key={item.id}
              className={`product-mini ${index === productIndex ? "current" : ""}`}
              onClick={() => chooseProduct(index)}
            >
              <span className="mini-number">0{index + 1}</span>
              <img src={item.images[0]} alt={item.name} />
              <span className="mini-name">{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>USE ← → TO CHANGE PRODUCT</span>
        <span>INTERACTIVE PRODUCT STUDY / REACT + JAVASCRIPT</span>
        <span>SELECTED SIZE {size}</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
