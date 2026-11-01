
/* =========================================================
   1. DOCUMENTATION PAGES
   =========================================================

   This is where you add, remove, or edit documentation.

   Each page contains:
   - id: Unique identifier for the page
   - group: Sidebar category
   - title: Page heading
   - description: Short page description
   - sections: Page content (heading + paragraph)
*/

const pages = [

    // -----------------------------------------------------
    // GETTING STARTED
    // -----------------------------------------------------

    {
        id: 'introduction',
        group: 'Getting Started',
        title: 'Introduction',
        description: 'Purpose, scope and how to use this documentation',

        sections: [
            [
                'Purpose',
                'This documentation is a central reference for the Cascadia Motion CM200DX motor controller used in the NUS Formula SAE R27e electric vehicle. It is intended to make configuration, diagnosis and knowledge transfer more repeatable.'
            ],
            [
                'System Overview',
                'The tractive battery supplies high-voltage DC to the inverter. The inverter converts DC to controlled three-phase AC for the EMRAX 228 MV motor. The MoTeC M150 ECU sends torque requests over CAN.'
            ],
            [
                'Scope and Limitations',
                'This website is a documentation template. It does not contain approved inverter settings, verified fault codes or validated test results. Insert the team-approved records before operational use.'
            ],
            [
                'How to Use',
                'Begin with the system interfaces, then review configuration and communication. For a fault, consult the troubleshooting checklist and record the outcome.'
            ]
        ]
    },

    {
        id: 'system-architecture',
        group: 'Getting Started',
        title: 'System Architecture',
        description: 'Power flow, signals and interlocks',

        sections: [
            [
                'Power Path',
                'Tractive battery → accumulator isolation relays and pre-charge → CM200DX DC bus → three-phase output → EMRAX 228 MV.'
            ],
            [
                'Control Path',
                'MoTeC M150 → vehicle CAN → CM200DX. Motor feedback and thermal inputs must be connected and configured according to the approved wiring and inverter documentation.'
            ],
            [
                'Safety Interfaces',
                'Document the shutdown circuit, interlocks, pre-charge status, HV isolation and emergency-stop behaviour with the actual R27e wiring diagram. Never use this page as a substitute for approved HV safety procedures.'
            ]
        ]
    },


    // -----------------------------------------------------
    // CONFIGURATION
    // -----------------------------------------------------

    {
        id: 'configuration',
        group: 'Configuration',
        title: 'Configuration Guide',
        description: 'Controlled settings and change management',

        sections: [
            [
                'Before Configuration',
                'Record the inverter serial number, firmware/software version, approved baseline configuration, motor model and test authorisation. Confirm HV is isolated before any physical wiring changes.'
            ],
            [
                'Parameter Groups',
                'Maintain a verified table of motor data, resolver/feedback settings, current and torque limits, voltage limits, temperature limits, CAN identifiers and fault handling.'
            ],
            [
                'Approved Settings Register',
                'Replace the placeholders below with settings exported from the team-approved RMS GUI configuration.'
            ],
            [
                'Change Control',
                'For every modification, record the old value, new value, reason, approver, date and test outcome. Keep a restorable copy of the last validated configuration.'
            ]
        ]
    },

    {
        id: 'can',
        group: 'Configuration',
        title: 'CAN Communication',
        description: 'ECU commands and inverter feedback',

        sections: [
            [
                'Communication Overview',
                'Document CAN bit rate, message identifiers, byte layouts, scaling, update rates, timeouts and bus termination from the verified vehicle CAN database and inverter documentation.'
            ],
            [
                'Command Messages',
                'Record which ECU messages request torque, enable operation or reset faults, as applicable to the approved integration.'
            ],
            [
                'Feedback Messages',
                'Record measured DC voltage/current, motor speed, inverter temperature, operating state and fault status if available in the configured broadcast set.'
            ],
            [
                'Validation',
                'Compare live bus captures against the documented message definitions and confirm that communication timeouts result in the intended safe behaviour.'
            ]
        ]
    },


    // -----------------------------------------------------
    // DIAGNOSTICS
    // -----------------------------------------------------

    {
        id: 'troubleshooting',
        group: 'Diagnostics',
        title: 'Troubleshooting',
        description: 'Repeatable fault isolation and evidence collection',

        sections: [
            [
                'Initial Triage',
                'Record the exact displayed fault, timestamp, operating state, software version, recent changes and relevant logs. Do not clear a fault before capturing the evidence.'
            ],
            [
                'Fault Categories',
                'Group issues by low-voltage supply, HV bus/pre-charge, CAN communication, motor feedback, thermal conditions and interlock/safety status.'
            ],
            [
                'Diagnostic Workflow',
                '1. Identify the fault and context. 2. Consult the official CM documentation. 3. Check the relevant approved signals and configuration records. 4. Escalate electrical tests to authorised personnel. 5. Document the confirmed cause and corrective action.'
            ],
            [
                'Fault Log Template',
                'Record: date • vehicle state • fault text/code • relevant signals • suspected cause • verified cause • corrective action • retest result • reviewer.'
            ]
        ]
    },

    {
        id: 'testing',
        group: 'Diagnostics',
        title: 'Testing Procedures',
        description: 'Bench and vehicle verification checklists',

        sections: [
            [
                'Pre-test Review',
                'Confirm test authorisation, approved test plan, required PPE, trained personnel, interlocks, instrumentation and emergency-stop readiness.'
            ],
            [
                'Functional Checks',
                'Use the team-approved procedures to verify low-voltage communications, status messages, feedback signals, interlocks and fault reporting before any authorised energised testing.'
            ],
            [
                'Acceptance Evidence',
                'Record expected outcome, observed outcome, pass/fail, measurement screenshot, date and responsible reviewer for each test.'
            ],
            [
                'Post-test Review',
                'Save logs and configuration snapshots, document deviations, and obtain review before promoting any settings to the approved baseline.'
            ]
        ]
    },


    // -----------------------------------------------------
    // RESOURCES
    // -----------------------------------------------------

    {
        id: 'reference',
        group: 'Resources',
        title: 'Reference Materials',
        description: 'Manuals, records and revision history',

        sections: [
            [
                'Official Documentation',
                'Link the applicable Cascadia Motion / BorgWarner CM200DX hardware and software manuals and record their revision numbers.'
            ],
            [
                'Team Records',
                'Link the R27e wiring diagram, CAN database, approved RMS configuration export, test procedures and fault log. Use internal access controls for restricted documents.'
            ],
            [
                'Revision History',
                'Maintain a table of document revisions, authors, reviewers, dates and major changes.'
            ]
        ]
    }

];


/* =========================================================
   2. HTML ELEMENT REFERENCES
   ========================================================= */

const nav = document.getElementById('nav');
const content = document.getElementById('content');
const toc = document.getElementById('toc');
const search = document.getElementById('search');
const results = document.getElementById('results');


/* =========================================================
   3. SIDEBAR NAVIGATION
   =========================================================

   Automatically generates the sidebar using the pages array.

   Pages with the same group are displayed together.
*/

let lastGroup = '';

pages.forEach(p => {

    // Create a new category heading when group changes
    if (p.group !== lastGroup) {

        let d = document.createElement('div');

        d.className = 'navgroup';
        d.textContent = p.group;

        nav.append(d);

        lastGroup = p.group;
    }

    // Create navigation link
    let a = document.createElement('a');

    a.href = '#' + p.id;
    a.className = 'navlink';
    a.dataset.id = p.id;
    a.textContent = '▤  ' + p.title;

    nav.append(a);

});


/* =========================================================
   4. HTML ESCAPING
   =========================================================

   Prevents special characters in documentation text
   from being interpreted as HTML code.
*/

function escapeHTML(s) {

    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));

}


/* =========================================================
   5. PAGE RENDERING
   =========================================================

   Displays the selected documentation page.

   Also updates:
   - Browser tab title
   - Active sidebar link
   - Right-hand table of contents
*/

function render() {

    // Get page ID from URL
    let id = decodeURIComponent(location.hash.slice(1))
        .split('/')[0] || 'introduction';

    // Find matching page
    let p = pages.find(x => x.id === id) || pages[0];

    // Update browser tab title
    document.title = p.title + ' | NUS Formula SAE';

    // Highlight active sidebar link
    document.querySelectorAll('.navlink').forEach(a => {

        a.classList.toggle(
            'active',
            a.dataset.id === p.id
        );

    });


    // -----------------------------------------------------
    // PAGE HEADER
    // -----------------------------------------------------

    let html = `
        <div class="breadcrumb">
            Docs　›　<b>${escapeHTML(p.title)}</b>
        </div>

        <h1>${escapeHTML(p.title)}</h1>

        <p class="lede">
            ${escapeHTML(p.description)}.
        </p>
    `;


    // -----------------------------------------------------
    // INTRODUCTION PAGE CARDS
    // -----------------------------------------------------

    if (p.id === 'introduction') {

        html += `
            <div class="callout">
                <strong>Documentation deliverable</strong>
                R27e Cascadia CM200DX configuration,
                troubleshooting and verification reference.
                Confirm all values against approved team
                records before use.
            </div>

            <div class="cards">

                ${pages.slice(2, 6).map(x => `
                    <a class="card" href="#${x.id}">

                        <strong>
                            ${escapeHTML(x.title)} →
                        </strong>

                        <span>
                            ${escapeHTML(x.description)}
                        </span>

                    </a>
                `).join('')}

            </div>
        `;

    }


    // -----------------------------------------------------
    // DOCUMENTATION SECTIONS
    // -----------------------------------------------------

    p.sections.forEach((s, i) => {

        // Section heading and paragraph
        html += `
            <h2 id="section-${i}">
                ${escapeHTML(s[0])}
            </h2>

            <p>${escapeHTML(s[1])}</p>
        `;


        // -------------------------------------------------
        // CONFIGURATION PARAMETER TABLE
        // -------------------------------------------------

        if (p.id === 'configuration' && i === 2) {

            html += `
                <div class="tablewrap">

                    <table>

                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Approved value</th>
                                <th>Source / revision</th>
                            </tr>
                        </thead>

                        <tbody>

                            ${[
                                'DC voltage limits',
                                'Motor current limit',
                                'Torque limit',
                                'CAN bitrate',
                                'Resolver settings'
                            ].map(x => `
                                <tr>
                                    <td>${x}</td>
                                    <td>To be verified</td>
                                    <td>Team-approved configuration</td>
                                </tr>
                            `).join('')}

                        </tbody>

                    </table>

                </div>
            `;

        }


        // -------------------------------------------------
        // REVISION HISTORY TABLE
        // -------------------------------------------------

        if (p.id === 'reference' && i === 2) {

            html += `
                <table>

                    <tr>
                        <th>Revision</th>
                        <th>Change</th>
                        <th>Status</th>
                    </tr>

                    <tr>
                        <td>0.1</td>
                        <td>Initial documentation template</td>
                        <td>Draft</td>
                    </tr>

                </table>
            `;

        }

    });


    // -----------------------------------------------------
    // PAGE FOOTER
    // -----------------------------------------------------

    html += `
        <div class="footer-note">
            NUS Formula SAE · R27e · Cascadia CM200DX
            reference template.

            Verify all technical information against
            current official documentation and
            team-approved procedures.
        </div>
    `;


    // Display generated HTML
    content.innerHTML = html;


    // -----------------------------------------------------
    // RIGHT TABLE OF CONTENTS
    // -----------------------------------------------------

    toc.innerHTML = p.sections.map((s, i) => `
        <a href="#section-${i}">
            ${escapeHTML(s[0])}
        </a>
    `).join('');


    // Scroll to top when switching pages
    if (!location.hash.includes('/')) {
        window.scrollTo(0, 0);
    }

    // Close mobile sidebar
    document.getElementById('sidebar')
        .classList.remove('open');

}


// Render when URL changes
window.addEventListener('hashchange', render);

// Render initial page
render();


/* =========================================================
   6. SEARCH FUNCTIONALITY
   =========================================================

   Searches page titles, descriptions and section content.
*/

function showResults() {

    let q = search.value.trim().toLowerCase();

    // Hide results when search is empty
    if (!q) {
        results.hidden = true;
        return;
    }

    // Find matching documentation pages
    let matches = pages.flatMap(p => {

        let hits = [
            p.title,
            p.description,
            ...p.sections.flat()
        ].join(' ').toLowerCase();

        return hits.includes(q) ? [p] : [];

    });


    // Generate search results
    results.innerHTML = matches.length

        ? matches.map(p => `
            <button
                class="result"
                data-target="${p.id}"
            >
                ${escapeHTML(p.title)}

                <small>
                    ${escapeHTML(p.description)}
                </small>

            </button>
        `).join('')

        : '<div style="padding:12px">No matching pages</div>';


    // Show search results
    results.hidden = false;


    // Handle result selection
    results.querySelectorAll('button').forEach(b => {

        b.onclick = () => {

            location.hash = b.dataset.target;

            search.value = '';
            results.hidden = true;

        };

    });

}


// Update results while typing
search.addEventListener('input', showResults);


/* =========================================================
   7. KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener('keydown', e => {

    // Ctrl + K (Windows) or Cmd + K (Mac)
    if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === 'k'
    ) {

        e.preventDefault();
        search.focus();

    }

    // Escape closes search results
    if (e.key === 'Escape') {
        results.hidden = true;
    }

});


// Close search when clicking outside
document.addEventListener('click', e => {

    if (!e.target.closest('.search-wrap')) {
        results.hidden = true;
    }

});


/* =========================================================
   8. MOBILE NAVIGATION
   ========================================================= */

document.getElementById('menu').onclick = () => {

    document.getElementById('sidebar')
        .classList.toggle('open');

};


/* =========================================================
   9. LIGHT / DARK MODE
   ========================================================= */

document.getElementById('theme').onclick = () => {

    // Toggle light mode
    document.body.classList.toggle('light');

    // Change theme icon
    document.getElementById('theme').textContent =
        document.body.classList.contains('light')
            ? '☾'
            : '☀';

};
