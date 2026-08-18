# Ruleset Commons

**An open directory of adoptable, provenanced API-governance rulesets.**
[rulesets.apicommons.org](https://rulesets.apicommons.org)

Most API linting runs on nothing you own. In a study of **1,005 real-world Spectral
pipelines**, **63% ran the linter's implicit defaults** and only **8** extended a
shared, remote ruleset. The demand for governance is there — the *supply* of
adoptable, owned rulesets is not.

**Ruleset Commons is the supply side.** It is a curated registry of rulesets you can adopt **by reference** — a national government's ruleset, an industry standard, a security ruleset, or a company's public API standards — instead of
silently running Spectral's, Redocly's, or vacuum's defaults.

The tool is deliberately simple, in the spirit of the
[MCP Install](https://install.apicommons.org) client registry: **the core artifact
is a single, open, machine-readable data file — [`rulesets.json`](public/rulesets.json)**,
and the website is a browsable directory over it.

## What "adoptable" and "provenanced" mean

Every entry answers two questions the defaults never do:

- **Who owns this?** — a real, named `provenance.owner` and a URL where that
  ownership is documented. A ruleset without an owner is a config, not a standard.
- **How do I adopt it?** — a copy-paste `adoptVia` snippet: a remote `extends`
  URL, an npm package, or config to paste. Adopt by reference so you inherit
  updates instead of forking a frozen copy.

Each entry is also flagged **`governed: true|false`**:

- **Governed** — an owned, provenanced standard that carries naming, ownership,
  and domain rules (e.g. Italy's `api-oas-checker`, the NL API Design Rules,
  the OWASP security rulesets).
- **Default** — a tool's built-in config, honestly labeled. `spectral:oas`,
  Redocly `recommended`, and vacuum's defaults are here so teams can *see what
  they are actually running* — and swap it for something owned.

## The registry — `rulesets.json`

The whole commons is one file, served as open data at
[`/rulesets.json`](https://rulesets.apicommons.org/rulesets.json) and validated by
[`/rulesets.schema.json`](https://rulesets.apicommons.org/rulesets.schema.json).

Each entry:

| Field | Meaning |
| --- | --- |
| `id` | Stable, lowercase, hyphenated identifier. |
| `name` | Display name. |
| `publisher` | Organization or person that publishes it. |
| `category` | `national` \| `industry` \| `security` \| `vendor-default` \| `community` \| `company`. |
| `description` | What it enforces. |
| `provenance` | `{ owner, url }` — who owns/maintains it and where that's documented. |
| `sourceUrl` | Repo or raw source. |
| `adoptVia` | `{ method: extends\|npm\|copy, value, note }` — how to consume it. |
| `artifactTypes` | `openapi`, `asyncapi`, `arazzo`, `graphql`, `json-schema`, … |
| `governed` | `true` = owned standard; `false` = tool default / ad-hoc config. |
| `notes` | Context, provenance detail, adoption evidence. |

The seed set is mined from real ecosystem usage — including every
`remote/shared ruleset` observed in the
[Spectral pipelines research](https://github.com/api-evangelist) corpus (the
Italian and Dutch government rulesets, `connectedcircuits/devops-api-linter` —
the single most-referenced remote ruleset in the corpus at 74 pipelines — Baloise,
SailPoint, and more) alongside the OWASP security rulesets and the honestly-labeled
vendor defaults.

## Submit a ruleset

The commons grows by pull request against **[`public/rulesets.json`](public/rulesets.json)**:

1. Fork this repo.
2. Add an object to the `rulesets` array. Validate it against
   [`public/rulesets.schema.json`](public/rulesets.schema.json).
3. Prefer a real, resolvable `adoptVia.value` (a remote `extends` URL or an npm
   package) and an honest `governed` flag — owned standards are `true`; tool
   defaults are `false`.
4. Give it a genuine `provenance.owner` and `url`. Rulesets with no accountable
   owner are the problem this registry exists to fix.
5. Open a PR. CI type-checks and builds the site.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run build      # emits dist/ (what Pages publishes)
```

The site is a small Vite + TypeScript app. `src/main.ts` fetches `rulesets.json`
at runtime and renders the browsable directory (category / artifact-type /
governed-vs-default filters + search) and per-ruleset detail views with a
copy-paste "how to adopt" snippet.

## An API Commons tool

Ruleset Commons is free, open tooling maintained under
[API Commons](https://apicommons.org), a project of
[API Evangelist](https://apievangelist.com). The
open tools exist to make good governance the easy path; API Evangelist offers
expert [governance services](https://apievangelist.com/services/) — authoring
your own owned ruleset, developing the standards behind it, reviews, and pipelines
— when you want hands on the work.

Licensed under [Apache-2.0](LICENSE).

**Governance guidance** — the human *why* behind this tool: [Provenance](https://guidance.apievangelist.com/store/provenance/) at guidance.apievangelist.com.

## Part of API Commons

An open, browser-first tool from **[API Commons](https://apicommons.org)** — free, no backend, your data stays in your browser. Browse the full set at **[apicommons.org/tools](https://apicommons.org/tools/)**.

**Related tools**
- [Spectral Ruleset Studio](https://studio.apicommons.org) — turn a style guide into an owned ruleset
- [Spectral OWASP Ruleset](https://github.com/api-commons/spectral-owasp-ruleset) — OWASP API Security layer
- [Spectral Reporter](https://reporter.apicommons.org) — Spectral JSON → self-contained HTML report
- [API Validator](https://validator.apicommons.org) — lint OpenAPI/AsyncAPI/Arazzo/JSON Schema in-browser
- [Governance Coverage](https://coverage.apicommons.org) — how much of your API your rules actually check
- [Governance Pipeline](https://github.com/api-commons/governance-pipeline) — a forkable PR-gated governance pipeline

## License

**[Apache-2.0](LICENSE).**

API Commons licenses **code** under Apache-2.0 and **artifacts** — schemas, rulesets,
examples and API descriptions — under CC BY-NC-SA 4.0.
