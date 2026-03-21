const STORAGE_KEY = "states-visited.v1";

const STATES = [
  { code: "AL", name: "Alabama", region: "South", row: 5, col: 8 },
  { code: "AK", name: "Alaska", region: "West", row: 7, col: 1 },
  { code: "AZ", name: "Arizona", region: "West", row: 4, col: 2 },
  { code: "AR", name: "Arkansas", region: "South", row: 4, col: 6 },
  { code: "CA", name: "California", region: "West", row: 3, col: 1 },
  { code: "CO", name: "Colorado", region: "West", row: 3, col: 4 },
  { code: "CT", name: "Connecticut", region: "Northeast", row: 2, col: 12 },
  { code: "DE", name: "Delaware", region: "South", row: 3, col: 12 },
  { code: "FL", name: "Florida", region: "South", row: 6, col: 10 },
  { code: "GA", name: "Georgia", region: "South", row: 5, col: 9 },
  { code: "HI", name: "Hawaii", region: "West", row: 7, col: 2 },
  { code: "ID", name: "Idaho", region: "West", row: 2, col: 2 },
  { code: "IL", name: "Illinois", region: "Midwest", row: 2, col: 6 },
  { code: "IN", name: "Indiana", region: "Midwest", row: 2, col: 7 },
  { code: "IA", name: "Iowa", region: "Midwest", row: 2, col: 5 },
  { code: "KS", name: "Kansas", region: "Midwest", row: 4, col: 4 },
  { code: "KY", name: "Kentucky", region: "South", row: 3, col: 7 },
  { code: "LA", name: "Louisiana", region: "South", row: 5, col: 6 },
  { code: "ME", name: "Maine", region: "Northeast", row: 1, col: 13 },
  { code: "MD", name: "Maryland", region: "South", row: 3, col: 10 },
  { code: "MA", name: "Massachusetts", region: "Northeast", row: 2, col: 11 },
  { code: "MI", name: "Michigan", region: "Midwest", row: 1, col: 8 },
  { code: "MN", name: "Minnesota", region: "Midwest", row: 1, col: 6 },
  { code: "MS", name: "Mississippi", region: "South", row: 5, col: 7 },
  { code: "MO", name: "Missouri", region: "Midwest", row: 3, col: 6 },
  { code: "MT", name: "Montana", region: "West", row: 1, col: 3 },
  { code: "NE", name: "Nebraska", region: "Midwest", row: 3, col: 5 },
  { code: "NV", name: "Nevada", region: "West", row: 3, col: 2 },
  { code: "NH", name: "New Hampshire", region: "Northeast", row: 1, col: 12 },
  { code: "NJ", name: "New Jersey", region: "Northeast", row: 3, col: 11 },
  { code: "NM", name: "New Mexico", region: "West", row: 4, col: 3 },
  { code: "NY", name: "New York", region: "Northeast", row: 2, col: 10 },
  { code: "NC", name: "North Carolina", region: "South", row: 4, col: 9 },
  { code: "ND", name: "North Dakota", region: "Midwest", row: 1, col: 5 },
  { code: "OH", name: "Ohio", region: "Midwest", row: 2, col: 8 },
  { code: "OK", name: "Oklahoma", region: "South", row: 5, col: 5 },
  { code: "OR", name: "Oregon", region: "West", row: 2, col: 1 },
  { code: "PA", name: "Pennsylvania", region: "Northeast", row: 2, col: 9 },
  { code: "RI", name: "Rhode Island", region: "Northeast", row: 2, col: 13 },
  { code: "SC", name: "South Carolina", region: "South", row: 5, col: 10 },
  { code: "SD", name: "South Dakota", region: "Midwest", row: 2, col: 4 },
  { code: "TN", name: "Tennessee", region: "South", row: 4, col: 7 },
  { code: "TX", name: "Texas", region: "South", row: 6, col: 5 },
  { code: "UT", name: "Utah", region: "West", row: 3, col: 3 },
  { code: "VT", name: "Vermont", region: "Northeast", row: 1, col: 11 },
  { code: "VA", name: "Virginia", region: "South", row: 3, col: 9 },
  { code: "WA", name: "Washington", region: "West", row: 1, col: 1 },
  { code: "WV", name: "West Virginia", region: "South", row: 3, col: 8 },
  { code: "WI", name: "Wisconsin", region: "Midwest", row: 1, col: 7 },
  { code: "WY", name: "Wyoming", region: "West", row: 2, col: 3 },
];

const STATE_CODES = new Set(STATES.map((state) => state.code));

const elements = {
  visitedCount: document.querySelector("#visited-count"),
  progressFill: document.querySelector("#progress-fill"),
  progressNote: document.querySelector("#progress-note"),
  visitedTotal: document.querySelector("#visited-total"),
  remainingTotal: document.querySelector("#remaining-total"),
  focusLabel: document.querySelector("#focus-label"),
  searchInput: document.querySelector("#search-input"),
  regionSelect: document.querySelector("#region-select"),
  statusSelect: document.querySelector("#status-select"),
  actionMessage: document.querySelector("#action-message"),
  listSummary: document.querySelector("#list-summary"),
  stateList: document.querySelector("#state-list"),
  tileMap: document.querySelector("#tile-map"),
  clearButton: document.querySelector("#clear-button"),
  copyButton: document.querySelector("#copy-button"),
  listPanel: document.querySelector("#list-panel"),
  mapPanel: document.querySelector("#map-panel"),
  viewButtons: document.querySelectorAll("[data-view]"),
};

const appState = {
  visited: loadVisitedStates(),
  search: "",
  region: "all",
  status: "all",
  currentView: "list",
};

function loadVisitedStates() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((code) => STATE_CODES.has(code)));
  } catch {
    return new Set();
  }
}

function persistVisitedStates() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...appState.visited]));
  } catch {
    setActionMessage("Could not save changes in local storage.");
  }
}

function getFilteredStates() {
  const search = appState.search.trim().toLowerCase();

  return STATES.filter((state) => {
    const matchesSearch =
      search === "" ||
      state.name.toLowerCase().includes(search) ||
      state.code.toLowerCase().includes(search);
    const matchesRegion = appState.region === "all" || state.region === appState.region;
    const isVisited = appState.visited.has(state.code);
    const matchesStatus =
      appState.status === "all" ||
      (appState.status === "visited" && isVisited) ||
      (appState.status === "unvisited" && !isVisited);

    return matchesSearch && matchesRegion && matchesStatus;
  }).sort((left, right) => left.name.localeCompare(right.name));
}

function getFocusLabel(filteredStates) {
  if (appState.search.trim()) {
    return `Search: ${appState.search.trim()}`;
  }

  if (appState.region !== "all") {
    return appState.region;
  }

  if (appState.status === "visited") {
    return "Visited";
  }

  if (appState.status === "unvisited") {
    return "Not visited";
  }

  if (filteredStates.length !== STATES.length) {
    return "Filtered";
  }

  return "All states";
}

function renderStats(filteredStates) {
  const visitedCount = appState.visited.size;
  const remainingCount = STATES.length - visitedCount;
  const progress = Math.round((visitedCount / STATES.length) * 100);

  elements.visitedCount.textContent = String(visitedCount);
  elements.progressFill.style.width = `${progress}%`;
  elements.progressNote.textContent = `${progress}% complete`;
  elements.visitedTotal.textContent = String(visitedCount);
  elements.remainingTotal.textContent = String(remainingCount);
  elements.focusLabel.textContent = getFocusLabel(filteredStates);
  elements.listSummary.textContent = `Showing ${filteredStates.length} of ${STATES.length} states`;
}

function renderList(filteredStates) {
  if (filteredStates.length === 0) {
    elements.stateList.innerHTML =
      '<li><p class="empty-state">No states match the current filters.</p></li>';
    return;
  }

  elements.stateList.innerHTML = filteredStates
    .map((state) => {
      const isVisited = appState.visited.has(state.code);
      return `
        <li class="state-row">
          <button
            class="state-toggle ${isVisited ? "is-visited" : ""}"
            type="button"
            data-state-code="${state.code}"
            aria-pressed="${isVisited}"
          >
            <span class="state-check" aria-hidden="true"></span>
            <span>
              <span class="state-name">${state.name}</span>
              <span class="state-meta">${state.code} | ${state.region}</span>
            </span>
            <span class="state-status">${isVisited ? "Visited" : "Open"}</span>
          </button>
        </li>
      `;
    })
    .join("");
}

function renderMap(filteredStates) {
  const visibleCodes = new Set(filteredStates.map((state) => state.code));

  elements.tileMap.innerHTML = STATES.map((state) => {
    const isVisited = appState.visited.has(state.code);
    const isVisible = visibleCodes.has(state.code);
    const label = `${state.name}: ${isVisited ? "visited" : "not visited"}`;
    return `
      <button
        class="map-tile ${isVisited ? "is-visited" : ""} ${isVisible ? "" : "is-filtered-out"}"
        type="button"
        data-state-code="${state.code}"
        style="--col:${state.col}; --row:${state.row};"
        aria-label="${label}"
        title="${state.name}"
        aria-pressed="${isVisited}"
      >
        ${state.code}
      </button>
    `;
  }).join("");
}

function renderView() {
  const showList = appState.currentView === "list";

  elements.listPanel.classList.toggle("is-hidden", !showList);
  elements.mapPanel.classList.toggle("is-hidden", showList);
  elements.listPanel.hidden = !showList;
  elements.mapPanel.hidden = showList;

  elements.viewButtons.forEach((button) => {
    const isActive = button.dataset.view === appState.currentView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function render() {
  const filteredStates = getFilteredStates();
  renderStats(filteredStates);
  renderList(filteredStates);
  renderMap(filteredStates);
  renderView();
}

function toggleState(code) {
  if (appState.visited.has(code)) {
    appState.visited.delete(code);
  } else {
    appState.visited.add(code);
  }

  persistVisitedStates();
  render();
}

function setActionMessage(message) {
  elements.actionMessage.textContent = message;
}

function attachEventListeners() {
  elements.searchInput.addEventListener("input", (event) => {
    appState.search = event.target.value;
    render();
  });

  elements.regionSelect.addEventListener("change", (event) => {
    appState.region = event.target.value;
    render();
  });

  elements.statusSelect.addEventListener("change", (event) => {
    appState.status = event.target.value;
    render();
  });

  elements.stateList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-state-code]");
    if (!button) {
      return;
    }

    toggleState(button.dataset.stateCode);
    setActionMessage(`${button.dataset.stateCode} updated from the list view.`);
  });

  elements.tileMap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-state-code]");
    if (!button) {
      return;
    }

    toggleState(button.dataset.stateCode);
    setActionMessage(`${button.dataset.stateCode} updated from the map view.`);
  });

  elements.viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appState.currentView = button.dataset.view;
      renderView();
    });
  });

  elements.clearButton.addEventListener("click", () => {
    if (appState.visited.size === 0) {
      setActionMessage("No visited states to clear.");
      return;
    }

    const confirmed = window.confirm("Clear all visited states?");
    if (!confirmed) {
      return;
    }

    appState.visited.clear();
    persistVisitedStates();
    render();
    setActionMessage("Visited states reset.");
  });

  elements.copyButton.addEventListener("click", async () => {
    const visitedStates = STATES.filter((state) => appState.visited.has(state.code))
      .map((state) => state.name)
      .sort((left, right) => left.localeCompare(right))
      .join(", ");

    if (!visitedStates) {
      setActionMessage("Visit at least one state before copying.");
      return;
    }

    try {
      await navigator.clipboard.writeText(visitedStates);
      setActionMessage("Visited states copied to the clipboard.");
    } catch {
      setActionMessage("Clipboard access failed. Your browser may block it.");
    }
  });
}

attachEventListeners();
render();
