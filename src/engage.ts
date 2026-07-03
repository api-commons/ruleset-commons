// Weave API Evangelist governance services into the app. Every action routes to
// info@apievangelist.com over a mailto link, with the current context pre-filled
// — so engagement works even in a forked or fully local copy, with no backend.
// Ruleset Commons is free, open tooling; API Evangelist sells the expert
// services around it, and this is the always-present front door to them.
const EMAIL = 'info@apievangelist.com';
const APP = 'Ruleset Commons';
const SERVICES_URL = 'https://apievangelist.com/services/';

interface Service {
  title: string;
  blurb: string;
  cta: string;
  subject: string;
  url: string; // API Evangelist service detail page
  body: (ctx: string) => string;
}

// People arrive here to adopt (or author) a governed ruleset — so rules,
// standards, and reviews lead.
const SERVICES: Service[] = [
  {
    title: 'Rules',
    blurb: 'Encode your organization’s standards as a portable, owned Spectral ruleset — the kind teams adopt by reference — that runs in CI, the editor, and the browser.',
    cta: 'Author my ruleset',
    url: `${SERVICES_URL}governance/rules/`,
    subject: 'Custom ruleset engagement',
    body: (ctx) => `Hi API Evangelist,\n\nWe’d like an owned, governed Spectral ruleset that encodes our API standards — one we can adopt by reference across our repos.\n\n${ctx}\n\nThanks,`,
  },
  {
    title: 'Standards',
    blurb: 'Identify and develop the standards your API operations need, then turn them into machine-readable, provenanced rulesets others can consume.',
    cta: 'Develop standards',
    url: `${SERVICES_URL}discovery/standards/`,
    subject: 'API standards engagement',
    body: (ctx) => `Hi API Evangelist,\n\nWe’d like help identifying and developing the API standards behind an adoptable ruleset.\n\n${ctx}\n\nThanks,`,
  },
  {
    title: 'Reviews',
    blurb: 'Formal reviews of your API artifacts, and of the rules, pipelines, and skills that govern them — against best practices, OWASP, and your own standards.',
    cta: 'Request a review',
    url: `${SERVICES_URL}governance/reviews/`,
    subject: 'API governance review request',
    body: (ctx) => `Hi API Evangelist,\n\nWe’d like a governance review of our APIs and the rulesets we run against them.\n\n${ctx}\n\nWhat does an engagement look like?\n\nThanks,`,
  },
  {
    title: 'Pipelines',
    blurb: 'Stand up the CI/CD pipelines that run your ruleset as a governance gate — so a real owned standard, not the linter default, is enforced on every change.',
    cta: 'Automate governance',
    url: `${SERVICES_URL}governance/pipelines/`,
    subject: 'API governance pipelines engagement',
    body: (ctx) => `Hi API Evangelist,\n\nWe’d like to automate API governance in CI/CD — running our owned ruleset as a gate instead of default rules.\n\n${ctx}\n\nThanks,`,
  },
];

function mailto(s: Service, ctx: string): string {
  const body = `${s.body(ctx)}\n\n— sent from ${APP} (rulesets.apicommons.org)`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(body)}`;
}

// context: () => a short, plain-text summary of what the user is looking at, woven
// into the email so the engagement starts with real detail.
export function initEngage(context: () => string): void {
  const btn = document.getElementById('engage-ae');
  if (!btn) return;

  const modal = document.createElement('div');
  modal.className = 'modal engage-modal';
  modal.hidden = true;
  modal.innerHTML = `
    <div class="modal-card engage-card">
      <div class="modal-head">
        <span id="modal-title">Work with API Evangelist</span>
        <button type="button" class="engage-close" aria-label="Close">×</button>
      </div>
      <div class="engage-body">
        <p class="engage-intro">Ruleset Commons is open and free to use yourself. When you want experts in the loop,
          <a href="https://apievangelist.com" target="_blank" rel="noopener">API Evangelist</a> offers governance
          services — every option below opens an email to
          <a id="engage-email" href="mailto:${EMAIL}">${EMAIL}</a> with your current context filled in.</p>
        <div class="engage-services"></div>
        <p class="engage-foot"><a href="${SERVICES_URL}" target="_blank" rel="noopener">See all governance services →</a></p>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const listEl = modal.querySelector('.engage-services') as HTMLElement;
  const emailEl = modal.querySelector('#engage-email') as HTMLAnchorElement;
  const close = () => { modal.hidden = true; };

  function render(): void {
    const ctx = context();
    listEl.innerHTML = SERVICES.map((s, i) => `
      <div class="engage-service">
        <div class="engage-service-text"><strong>${s.title}</strong><span>${s.blurb}</span>
          <a class="engage-details" href="${s.url}" target="_blank" rel="noopener">details ↗</a></div>
        <a class="engage-cta" href="${mailto(s, ctx)}" data-i="${i}">${s.cta}</a>
      </div>`).join('');
    emailEl.href = mailto(SERVICES[0], ctx);
  }

  btn.addEventListener('click', () => { render(); modal.hidden = false; });
  modal.querySelector('.engage-close')!.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
