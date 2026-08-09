import Reveal from "reveal.js";
import "reveal.js/reveal.css";
import deckData from "../content/deck.json";
import "./styles.css";

type Item = {
  number?: string;
  date?: string;
  title: string;
  body?: string;
};

type Slide = {
  id: string;
  type: string;
  eyebrow?: string;
  title: string;
  takeaway?: string;
  status: "confirmed" | "draft" | "blocked";
  asset?: string;
  items?: Item[];
  notes?: string;
};

const escapeHtml = (value = "") =>
  value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[char] ?? char);

function renderItems(items: Item[] = []) {
  return `<div class="card-grid">${items.map((item) => `
    <article class="card">
      <span class="card-number">${escapeHtml(item.number || item.date || "")}</span>
      <h3>${escapeHtml(item.title)}</h3>
      ${item.body ? `<p>${escapeHtml(item.body)}</p>` : ""}
    </article>`).join("")}</div>`;
}

function renderSlide(slide: Slide) {
  const media = slide.asset
    ? `<img class="hero-art" src="${escapeHtml(slide.asset)}" alt="" />`
    : "";
  const body = slide.type === "cards" || slide.type === "timeline"
    ? renderItems(slide.items)
    : slide.takeaway
      ? `<p class="takeaway">${escapeHtml(slide.takeaway)}</p>`
      : "";

  return `
    <section class="slide slide-${escapeHtml(slide.type)}" data-page="${escapeHtml(slide.id)}" data-status="${slide.status}">
      ${media}
      <div class="slide-content">
        ${slide.eyebrow ? `<p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>` : ""}
        <h1>${escapeHtml(slide.title)}</h1>
        ${body}
      </div>
      <span class="page-number">${escapeHtml(slide.id)}</span>
      ${slide.notes ? `<aside class="notes">${escapeHtml(slide.notes)}</aside>` : ""}
    </section>`;
}

const root = document.querySelector<HTMLElement>(".slides");
if (!root) throw new Error("Missing .slides root");

const theme = deckData.theme;
for (const [key, value] of Object.entries(theme)) {
  document.documentElement.style.setProperty(`--${key}`, value);
}
document.title = deckData.meta.title;
root.innerHTML = (deckData.slides as Slide[]).map(renderSlide).join("");

const reveal = new Reveal({
  width: deckData.meta.viewport.width,
  height: deckData.meta.viewport.height,
  margin: 0,
  controls: true,
  progress: true,
  hash: true,
  center: false,
  transition: "fade",
  backgroundTransition: "fade",
});

type RevealRuntime = {
  slide: (index: number) => void;
};

declare global {
  interface Window {
    Reveal: RevealRuntime;
    __deckReady: boolean;
  }
}

window.Reveal = reveal as RevealRuntime;
window.__deckReady = false;
reveal.initialize().then(() => {
  window.__deckReady = true;
});
