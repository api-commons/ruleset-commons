(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const h="info@apievangelist.com",E="Ruleset Commons",g="https://apievangelist.com/services/",m=[{title:"Rules",blurb:"Encode your organization’s standards as a portable, owned Spectral ruleset — the kind teams adopt by reference — that runs in CI, the editor, and the browser.",cta:"Author my ruleset",url:`${g}governance/rules/`,subject:"Custom ruleset engagement",body:e=>`Hi API Evangelist,

We’d like an owned, governed Spectral ruleset that encodes our API standards — one we can adopt by reference across our repos.

${e}

Thanks,`},{title:"Standards",blurb:"Identify and develop the standards your API operations need, then turn them into machine-readable, provenanced rulesets others can consume.",cta:"Develop standards",url:`${g}discovery/standards/`,subject:"API standards engagement",body:e=>`Hi API Evangelist,

We’d like help identifying and developing the API standards behind an adoptable ruleset.

${e}

Thanks,`},{title:"Reviews",blurb:"Formal reviews of your API artifacts, and of the rules, pipelines, and skills that govern them — against best practices, OWASP, and your own standards.",cta:"Request a review",url:`${g}governance/reviews/`,subject:"API governance review request",body:e=>`Hi API Evangelist,

We’d like a governance review of our APIs and the rulesets we run against them.

${e}

What does an engagement look like?

Thanks,`},{title:"Pipelines",blurb:"Stand up the CI/CD pipelines that run your ruleset as a governance gate — so a real owned standard, not the linter default, is enforced on every change.",cta:"Automate governance",url:`${g}governance/pipelines/`,subject:"API governance pipelines engagement",body:e=>`Hi API Evangelist,

We’d like to automate API governance in CI/CD — running our owned ruleset as a gate instead of default rules.

${e}

Thanks,`}];function y(e,t){const n=`${e.body(t)}

— sent from ${E} (rulesets.apicommons.org)`;return`mailto:${h}?subject=${encodeURIComponent(e.subject)}&body=${encodeURIComponent(n)}`}function I(e){const t=document.getElementById("engage-ae");if(!t)return;const n=document.createElement("div");n.className="modal engage-modal",n.hidden=!0,n.innerHTML=`
    <div class="modal-card engage-card">
      <div class="modal-head">
        <span id="modal-title">Work with API Evangelist</span>
        <button type="button" class="engage-close" aria-label="Close">×</button>
      </div>
      <div class="engage-body">
        <p class="engage-intro">Ruleset Commons is open and free to use yourself. When you want experts in the loop,
          <a href="https://apievangelist.com" target="_blank" rel="noopener">API Evangelist</a> offers governance
          services — every option below opens an email to
          <a id="engage-email" href="mailto:${h}">${h}</a> with your current context filled in.</p>
        <div class="engage-services"></div>
        <p class="engage-foot"><a href="${g}" target="_blank" rel="noopener">See all governance services →</a></p>
      </div>
    </div>`,document.body.appendChild(n);const i=n.querySelector(".engage-services"),a=n.querySelector("#engage-email"),s=()=>{n.hidden=!0};function u(){const d=e();i.innerHTML=m.map((l,w)=>`
      <div class="engage-service">
        <div class="engage-service-text"><strong>${l.title}</strong><span>${l.blurb}</span>
          <a class="engage-details" href="${l.url}" target="_blank" rel="noopener">details ↗</a></div>
        <a class="engage-cta" href="${y(l,d)}" data-i="${w}">${l.cta}</a>
      </div>`).join(""),a.href=y(m[0],d)}t.addEventListener("click",()=>{u(),n.hidden=!1}),n.querySelector(".engage-close").addEventListener("click",s),n.addEventListener("click",d=>{d.target===n&&s()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&s()})}const f=document.getElementById("app"),v={national:"National",industry:"Industry",security:"Security",company:"Company",community:"Community","vendor-default":"Vendor default"},C={extends:"Remote extends URL",npm:"npm package",copy:"Config to copy"};function o(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}let c;const r={q:"",category:"all",artifact:"all",governance:"all"};function A(e){return!(r.category!=="all"&&e.category!==r.category||r.artifact!=="all"&&!e.artifactTypes.includes(r.artifact)||r.governance==="governed"&&!e.governed||r.governance==="default"&&e.governed||r.q&&!`${e.name} ${e.publisher} ${e.description} ${e.provenance.owner} ${e.notes??""} ${e.category}`.toLowerCase().includes(r.q.toLowerCase()))}function L(e){const t=e.adoptVia.value;switch(e.adoptVia.method){case"extends":return`# .spectral.yml — adopt ${e.name} by reference
extends:
  - "${t}"`;case"npm":return`npm install --save-dev ${t}

# then, in .spectral.yml:
extends:
  - "${t}"`;case"copy":default:return t}}function b(e){return e.governed?'<span class="pill pill-gov" title="An owned, provenanced standard">Governed</span>':'<span class="pill pill-def" title="A tool default — config, not a standard">Default</span>'}function k(e){const t=e.artifactTypes.map(n=>`<span class="art">${o(n)}</span>`).join("");return`
    <a class="rs-card" href="#ruleset/${o(e.id)}">
      <div class="rs-card-top">
        <span class="cat cat-${e.category}">${v[e.category]}</span>
        ${b(e)}
      </div>
      <h3>${o(e.name)}</h3>
      <p class="rs-pub">${o(e.publisher)}</p>
      <p class="rs-desc">${o(e.description)}</p>
      <div class="rs-arts">${t}</div>
    </a>`}function P(){const e=Object.keys(v),t=["openapi","asyncapi","arazzo","graphql","json-schema"],n=c.rulesets.length,i=c.rulesets.filter(l=>l.governed).length;f.innerHTML=`
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
          <div class="stat"><strong>${n}</strong><span>rulesets</span></div>
          <div class="stat"><strong>${i}</strong><span>governed</span></div>
          <div class="stat"><strong>${n-i}</strong><span>tool defaults</span></div>
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
              ${e.map(l=>`<option value="${l}">${v[l]}</option>`).join("")}
            </select>
          </label>
          <label>Artifact
            <select id="f-art">
              <option value="all">All</option>
              ${t.map(l=>`<option value="${l}">${o(l)}</option>`).join("")}
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
    </section>`;const a=document.getElementById("f-q"),s=document.getElementById("f-cat"),u=document.getElementById("f-art"),d=document.getElementById("f-gov");a.value=r.q,s.value=r.category,u.value=r.artifact,d.value=r.governance,a.addEventListener("input",()=>{r.q=a.value,p()}),s.addEventListener("change",()=>{r.category=s.value,p()}),u.addEventListener("change",()=>{r.artifact=u.value,p()}),d.addEventListener("change",()=>{r.governance=d.value,p()}),p()}function p(){const e=document.getElementById("rs-grid"),t=document.getElementById("rs-count");if(!e||!t)return;const n=c.rulesets.filter(A);t.textContent=`${n.length} of ${c.rulesets.length} ruleset${c.rulesets.length===1?"":"s"}`,e.innerHTML=n.length?n.map(k).join(""):'<p class="empty">No rulesets match those filters. Know one that belongs here? <a href="https://github.com/api-commons/ruleset-commons" target="_blank" rel="noopener">Add it via PR</a>.</p>'}function T(e){const t=L(e),n=e.artifactTypes.map(s=>`<span class="art">${o(s)}</span>`).join("");f.innerHTML=`
    <section class="detail">
      <a class="back" href="#">← All rulesets</a>
      <div class="detail-head">
        <div class="detail-top">
          <span class="cat cat-${e.category}">${v[e.category]}</span>
          ${b(e)}
        </div>
        <h1>${o(e.name)}</h1>
        <p class="detail-pub">${o(e.publisher)}</p>
        <p class="detail-desc">${o(e.description)}</p>
        <div class="rs-arts">${n}</div>
      </div>

      <div class="detail-grid">
        <div class="detail-main">
          <h2>How to adopt</h2>
          <p class="adopt-method">Method: <strong>${C[e.adoptVia.method]??e.adoptVia.method}</strong></p>
          <div class="snippet">
            <button class="copy-btn" type="button" data-copy>Copy</button>
            <pre><code>${o(t)}</code></pre>
          </div>
          ${e.adoptVia.note?`<p class="adopt-note">${o(e.adoptVia.note)}</p>`:""}
          ${e.notes?`<h2>Notes</h2><p class="detail-notes">${o(e.notes)}</p>`:""}
        </div>

        <aside class="detail-side">
          <h2>Provenance</h2>
          <dl>
            <dt>Owner / maintainer</dt>
            <dd>${o(e.provenance.owner)}</dd>
            <dt>Ownership</dt>
            <dd><a href="${o(e.provenance.url)}" target="_blank" rel="noopener">${o(e.provenance.url)}</a></dd>
            <dt>Source</dt>
            <dd><a href="${o(e.sourceUrl)}" target="_blank" rel="noopener">${o(e.sourceUrl)}</a></dd>
            <dt>Category</dt>
            <dd>${v[e.category]}${c.categories?.[e.category]?` — ${o(c.categories[e.category])}`:""}</dd>
            <dt>Governed</dt>
            <dd>${e.governed?"Yes — an owned, provenanced standard.":"No — a tool default. Config, not a standard."}</dd>
          </dl>
          <p class="side-cta"><button id="engage-inline" class="linkish" type="button">Want a ruleset like this of your own?</button></p>
        </aside>
      </div>
    </section>`;const i=f.querySelector("[data-copy]");i?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t),i.textContent="Copied ✓",setTimeout(()=>i.textContent="Copy",1600)}catch{i.textContent="Copy failed"}}),document.getElementById("engage-inline")?.addEventListener("click",()=>document.getElementById("engage-ae")?.click()),window.scrollTo(0,0)}function $(){const t=location.hash.replace(/^#/,"").match(/^ruleset\/(.+)$/);if(t){const n=c.rulesets.find(i=>i.id===decodeURIComponent(t[1]));if(n){T(n);return}}P()}function S(){const e=location.hash.match(/^#ruleset\/(.+)$/);if(e){const t=c.rulesets.find(n=>n.id===decodeURIComponent(e[1]));if(t)return`Looking at the "${t.name}" ruleset (${t.category}) in Ruleset Commons.`}return"Browsing the Ruleset Commons directory of adoptable API-governance rulesets."}async function R(){I(S);try{const e=await fetch(new URL("rulesets.json",document.baseURI));if(!e.ok)throw new Error(`HTTP ${e.status}`);c=await e.json()}catch(e){f.innerHTML=`<section class="hero"><div class="hero-inner"><h1>Registry failed to load</h1><p class="lede">${o(e.message)}</p></div></section>`;return}window.addEventListener("hashchange",$),$()}R();
