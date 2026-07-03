import './style.css';
import { initEngage } from './engage';
import type { Registry, Ruleset, Category, ArtifactType } from './types';

const app = document.getElementById('app')!;

const CATEGORY_LABELS: Record<Category, string> = {
  national: 'National',
  industry: 'Industry',
  security: 'Security',
  company: 'Company',
  community: 'Community',
  'vendor-default': 'Vendor default',
};

const ADOPT_LABELS: Record<string, string> = {
  extends: 'Remote extends URL',
  npm: 'npm package',
  copy: 'Config to copy',
};

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// ---- state ----
let registry: Registry;
const state = {
  q: '',
  category: 'all' as 'all' | Category,
  artifact: 'all' as 'all' | ArtifactType,
  governance: 'all' as 'all' | 'governed' | 'default',
};

// ---- filtering ----
function matches(r: Ruleset): boolean {
  if (state.category !== 'all' && r.category !== state.category) return false;
  if (state.artifact !== 'all' && !r.artifactTypes.includes(state.artifact)) return false;
  if (state.governance === 'governed' && !r.governed) return false;
  if (state.governance === 'default' && r.governed) return false;
  if (state.q) {
    const hay = `${r.name} ${r.publisher} ${r.description} ${r.provenance.owner} ${r.notes ?? ''} ${r.category}`.toLowerCase();
    if (!hay.includes(state.q.toLowerCase())) return false;
  }
  return true;
}

// ---- adopt snippet ----
function adoptSnippet(r: Ruleset): string {
  const v = r.adoptVia.value;
  switch (r.adoptVia.method) {
    case 'extends':
      return `# .spectral.yml — adopt ${r.name} by reference\nextends:\n  - "${v}"`;
    case 'npm':
      return `npm install --save-dev ${v}\n\n# then, in .spectral.yml:\nextends:\n  - "${v}"`;
    case 'copy':
    default:
      return v;
  }
}

// ---- cards ----
function badge(r: Ruleset): string {
  return r.governed
    ? '<span class="pill pill-gov" title="An owned, provenanced standard">Governed</span>'
    : '<span class="pill pill-def" title="A tool default — config, not a standard">Default</span>';
}

function card(r: Ruleset): string {
  const arts = r.artifactTypes.map((a) => `<span class="art">${esc(a)}</span>`).join('');
  return `
    <a class="rs-card" href="#ruleset/${esc(r.id)}">
      <div class="rs-card-top">
        <span class="cat cat-${r.category}">${CATEGORY_LABELS[r.category]}</span>
        ${badge(r)}
      </div>
      <h3>${esc(r.name)}</h3>
      <p class="rs-pub">${esc(r.publisher)}</p>
      <p class="rs-desc">${esc(r.description)}</p>
      <div class="rs-arts">${arts}</div>
    </a>`;
}

// ---- directory ----
function renderDirectory(): void {
  const cats = Object.keys(CATEGORY_LABELS) as Category[];
  const arts: ArtifactType[] = ['openapi', 'asyncapi', 'arazzo', 'graphql', 'json-schema'];
  const total = registry.rulesets.length;
  const governedCount = registry.rulesets.filter((r) => r.governed).length;

  app.innerHTML = `
    <section class="hero">
      <div class="hero-inner">
        <h1>Adopt a governed ruleset — don't run the defaults.</h1>
        <p class="lede">
          <strong>Ruleset Commons</strong> is an open directory of <strong>adoptable, provenanced</strong>
          API-governance rulesets. The research is stark: of 1,005 real Spectral pipelines, <strong>63% run the
          linter's implicit defaults</strong> and only <strong>8</strong> extend a shared, remote ruleset. This is
          the supply side — find a real owned ruleset (national, industry, security, or company) and adopt it
          <strong>by reference</strong> instead.
        </p>
        <div class="hero-stats">
          <div class="stat"><strong>${total}</strong><span>rulesets</span></div>
          <div class="stat"><strong>${governedCount}</strong><span>governed</span></div>
          <div class="stat"><strong>${total - governedCount}</strong><span>tool defaults</span></div>
        </div>
      </div>
    </section>

    <section class="directory">
      <div class="filters">
        <input id="f-q" type="search" placeholder="Search rulesets, publishers, standards…" aria-label="Search" />
        <div class="filter-row">
          <label>Category
            <select id="f-cat">
              <option value="all">All</option>
              ${cats.map((c) => `<option value="${c}">${CATEGORY_LABELS[c]}</option>`).join('')}
            </select>
          </label>
          <label>Artifact
            <select id="f-art">
              <option value="all">All</option>
              ${arts.map((a) => `<option value="${a}">${esc(a)}</option>`).join('')}
            </select>
          </label>
          <label>Type
            <select id="f-gov">
              <option value="all">All</option>
              <option value="governed">Governed (owned standards)</option>
              <option value="default">Tool defaults</option>
            </select>
          </label>
        </div>
      </div>
      <p id="rs-count" class="rs-count"></p>
      <div id="rs-grid" class="rs-grid"></div>
    </section>`;

  const q = document.getElementById('f-q') as HTMLInputElement;
  const cat = document.getElementById('f-cat') as HTMLSelectElement;
  const art = document.getElementById('f-art') as HTMLSelectElement;
  const gov = document.getElementById('f-gov') as HTMLSelectElement;
  q.value = state.q;
  cat.value = state.category;
  art.value = state.artifact;
  gov.value = state.governance;

  q.addEventListener('input', () => { state.q = q.value; renderGrid(); });
  cat.addEventListener('change', () => { state.category = cat.value as typeof state.category; renderGrid(); });
  art.addEventListener('change', () => { state.artifact = art.value as typeof state.artifact; renderGrid(); });
  gov.addEventListener('change', () => { state.governance = gov.value as typeof state.governance; renderGrid(); });

  renderGrid();
}

function renderGrid(): void {
  const grid = document.getElementById('rs-grid');
  const count = document.getElementById('rs-count');
  if (!grid || !count) return;
  const list = registry.rulesets.filter(matches);
  count.textContent = `${list.length} of ${registry.rulesets.length} ruleset${registry.rulesets.length === 1 ? '' : 's'}`;
  grid.innerHTML = list.length
    ? list.map(card).join('')
    : '<p class="empty">No rulesets match those filters. Know one that belongs here? <a href="https://github.com/api-commons/ruleset-commons" target="_blank" rel="noopener">Add it via PR</a>.</p>';
}

// ---- detail ----
function renderDetail(r: Ruleset): void {
  const snippet = adoptSnippet(r);
  const arts = r.artifactTypes.map((a) => `<span class="art">${esc(a)}</span>`).join('');
  app.innerHTML = `
    <section class="detail">
      <a class="back" href="#">← All rulesets</a>
      <div class="detail-head">
        <div class="detail-top">
          <span class="cat cat-${r.category}">${CATEGORY_LABELS[r.category]}</span>
          ${badge(r)}
        </div>
        <h1>${esc(r.name)}</h1>
        <p class="detail-pub">${esc(r.publisher)}</p>
        <p class="detail-desc">${esc(r.description)}</p>
        <div class="rs-arts">${arts}</div>
      </div>

      <div class="detail-grid">
        <div class="detail-main">
          <h2>How to adopt</h2>
          <p class="adopt-method">Method: <strong>${ADOPT_LABELS[r.adoptVia.method] ?? r.adoptVia.method}</strong></p>
          <div class="snippet">
            <button class="copy-btn" type="button" data-copy>Copy</button>
            <pre><code>${esc(snippet)}</code></pre>
          </div>
          ${r.adoptVia.note ? `<p class="adopt-note">${esc(r.adoptVia.note)}</p>` : ''}
          ${r.notes ? `<h2>Notes</h2><p class="detail-notes">${esc(r.notes)}</p>` : ''}
        </div>

        <aside class="detail-side">
          <h2>Provenance</h2>
          <dl>
            <dt>Owner / maintainer</dt>
            <dd>${esc(r.provenance.owner)}</dd>
            <dt>Ownership</dt>
            <dd><a href="${esc(r.provenance.url)}" target="_blank" rel="noopener">${esc(r.provenance.url)}</a></dd>
            <dt>Source</dt>
            <dd><a href="${esc(r.sourceUrl)}" target="_blank" rel="noopener">${esc(r.sourceUrl)}</a></dd>
            <dt>Category</dt>
            <dd>${CATEGORY_LABELS[r.category]}${registry.categories?.[r.category] ? ` — ${esc(registry.categories[r.category])}` : ''}</dd>
            <dt>Governed</dt>
            <dd>${r.governed ? 'Yes — an owned, provenanced standard.' : 'No — a tool default. Config, not a standard.'}</dd>
          </dl>
          <p class="side-cta"><button id="engage-inline" class="linkish" type="button">Want a ruleset like this of your own?</button></p>
        </aside>
      </div>
    </section>`;

  const copyBtn = app.querySelector('[data-copy]') as HTMLButtonElement;
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1600);
    } catch {
      copyBtn.textContent = 'Copy failed';
    }
  });
  const inline = document.getElementById('engage-inline');
  inline?.addEventListener('click', () => document.getElementById('engage-ae')?.click());

  window.scrollTo(0, 0);
}

// ---- routing ----
function route(): void {
  const hash = location.hash.replace(/^#/, '');
  const m = hash.match(/^ruleset\/(.+)$/);
  if (m) {
    const r = registry.rulesets.find((x) => x.id === decodeURIComponent(m[1]));
    if (r) { renderDetail(r); return; }
  }
  renderDirectory();
}

// context for the engage modal — reflects what the user is looking at
function engageContext(): string {
  const m = location.hash.match(/^#ruleset\/(.+)$/);
  if (m) {
    const r = registry.rulesets.find((x) => x.id === decodeURIComponent(m[1]));
    if (r) return `Looking at the "${r.name}" ruleset (${r.category}) in Ruleset Commons.`;
  }
  return 'Browsing the Ruleset Commons directory of adoptable API-governance rulesets.';
}

// ---- boot ----
async function boot(): Promise<void> {
  initEngage(engageContext);
  try {
    const res = await fetch(new URL('rulesets.json', document.baseURI));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    registry = (await res.json()) as Registry;
  } catch (e) {
    app.innerHTML = `<section class="hero"><div class="hero-inner"><h1>Registry failed to load</h1><p class="lede">${esc((e as Error).message)}</p></div></section>`;
    return;
  }
  window.addEventListener('hashchange', route);
  route();
}

void boot();
