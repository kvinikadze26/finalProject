import {
  getElement,
  getElements,
  setHTML,
  addEvent,
  removeClass,
  addClass,
} from "../utils/dom.js";

export function initDestinations() {
  const destinationsGrid = getElement("destinations-grid");
  const filterBtns = getElements(".filter-btn");

  if (!destinationsGrid || filterBtns.length === 0) return;

  const destinations = [
    {
      id: 1,
      name: "Tbilisi, Georgia",
      description:
        "The capital of Georgia offers a fascinating blend of ancient history, Soviet architecture, and modern culture with stunning mountain views.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&fit=crop",
      category: "europe",
      tag: "Europe",
    },
    {
      id: 2,
      name: "Paris, France",
      description:
        "The City of Light offers iconic landmarks, world-class museums, and romantic atmosphere.",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&fit=crop",
      category: "europe",
      tag: "Europe",
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      description:
        "A fascinating blend of ultramodern and traditional, offering unique cultural experiences.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&fit=crop",
      category: "asia",
      tag: "Asia",
    },
    {
      id: 4,
      name: "New York, USA",
      description:
        "The Big Apple is a global center of culture, finance, and entertainment.",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&fit=crop",
      category: "americas",
      tag: "Americas",
    },
    {
      id: 5,
      name: "Rome, Italy",
      description:
        "Ancient history meets modern life in this eternal city of art and culture.",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&fit=crop",
      category: "europe",
      tag: "Europe",
    },
    {
      id: 6,
      name: "Bangkok, Thailand",
      description:
        "A vibrant city with rich culture, delicious food, and beautiful temples.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&fit=crop",
      category: "asia",
      tag: "Asia",
    },
    {
      id: 7,
      name: "Buenos Aires, Argentina",
      description:
        "The Paris of South America with tango, great food, and European architecture.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&fit=crop",
      category: "americas",
      tag: "Americas",
    },
  ];

  function renderDestinations(filteredDestinations = destinations) {
    const html = filteredDestinations
      .map(
        (dest) => `
          <div class="destination-card" data-category="${dest.category}">
            <img src="${dest.image}" alt="${dest.name}">
            <div class="destination-info">
              <h3>${dest.name}</h3>
              <p>${dest.description}</p>
              <span class="destination-tag">${dest.tag}</span>
            </div>
          </div>
        `
      )
      .join("");

    setHTML(destinationsGrid, html);
  }

  function filterDestinations(category) {
    const filtered =
      category === "all"
        ? destinations
        : destinations.filter((dest) => dest.category === category);
    renderDestinations(filtered);
  }

  filterBtns.forEach((btn) => {
    addEvent(btn, "click", () => {
      filterBtns.forEach((b) => removeClass(b, "active"));
      addClass(btn, "active");

      const category = btn.dataset.filter;
      filterDestinations(category);
    });
  });

  renderDestinations();
}
