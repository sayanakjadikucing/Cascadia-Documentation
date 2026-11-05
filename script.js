
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
                'The RMS GUI ZIP contains several EEPROM screenshots with different parameter values. The values below are transcribed from the repeated RUN 21 / RUN 28 captures (RMS GUI 1.4.8, SW 6533, HW ID G2, HW Ver 37789) as a documented configuration snapshot. Because the archive also contains other differing snapshots and does not identify a signed-off master export or approval record, these are recorded as observed values and must be confirmed by the team before being treated as the approved operating baseline.'
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
                'Past Troubleshooting Cases — Overview',
                'These historical support discussions concern distinct incidents, even where the same email subject was reused on different dates. The motor no-spin investigation and regenerative-braking overvoltage investigation are recorded separately. These records are not approved inverter settings or instructions for unsupervised repair.'
            ],
            [
                'Case 1 — Motor Not Spinning / Torque and Resolver Investigation (8–9 June 2026)',
                'Symptoms: The motor did not spin despite inverter enable; a whirring noise occurred with a torque request, and requested torque fluctuated between full torque and zero at maximum throttle. Investigation: The team reviewed MoTeC and inverter CAN logs, motor temperature, Motor Type 65 configuration, resolver feedback, gamma adjustment EEPROM settings, ECU torque transmission, throttle calibration and sampling behaviour. Outcome: The team reported that changing throttle sensor and VCU sampling frequencies resolved the issue. Source: Re: Troubleshooting Cascadia Hardware overcurrent fault email conversation.'
            ],
            [
                'Case 2 — Regenerative Braking DC Bus Overvoltage (separate occasion in reused thread)',
                'Symptoms: Overvoltage faults occurred during regenerative braking, less frequently with regenerative torque limited to approximately 20 Nm, but sometimes still after longer driving sessions. Investigation: Inverter DC bus voltage was compared with BMS pack voltage; MoTeC/inverter diagnostics and possible DC-link disconnection or voltage rise during regen were discussed. Suggested follow-up: Capture voltage, current, motor speed, torque and fault snapshots, and review regen configuration with Cascadia support. Outcome: The correspondence does not establish a confirmed final resolution. Source: Re: Troubleshooting Cascadia Hardware overcurrent fault email conversation (separate discussion).'
            ],
            [
                'Case 3 — CM200DX Remote Recovery / Suspected EEPROM Corruption (July–August 2025)',
                'Inverter: Part 28-0098, serial 2623. Symptoms: After a CAN parameter-write operation, communication baud rate changed from 1 Mbps to 250 kbps. Following restoration of the baud rate and a power cycle, module temperatures read -273.1 °C, DC bus voltage read 0 V despite voltage being present at the terminals, and the motor could not be enabled; no active or stored faults were reported. Cascadia support discussed recovery using firmware version 6533, the defsyms_HW_version_mod.txt hardware definition symbols file, and EEPROM hardware/calibration parameter review through RMS GUI. Outcome: The emails contain recovery guidance and follow-ups but do not independently confirm successful recovery. These steps are historical context, not a generic firmware flashing procedure. Source: RE: Urgent CM200DX Remote Recovery Request email conversation.'
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

            const parameterRows = [
                ['DC voltage limit', '340.0 V', 'DC_Volt_Limit_EEPROM (×0.1 V)'],
                ['DC voltage hysteresis', '30.0 V', 'DC_Volt_Hyst_EEPROM (×0.1 V)'],
                ['DC undervoltage threshold', '0.0 V (stored value)', 'DC_UnderVolt_Thresh_EEPROM (×0.1 V)'],
                ['Inverter overtemperature limit', '95.0 °C', 'Inv_OverTemp_Limit_EEPROM (×0.1 °C)'],
                ['Motor overtemperature limit', '95.0 °C', 'Mtr_OverTemp_Limit_EEPROM (×0.1 °C)'],
                ['Zero-torque temperature', '95.0 °C', 'Zero_Torque_Temp_EEPROM (×0.1 °C)'],
                ['Full-torque temperature', '60.0 °C', 'Full_Torque_Temp_EEPROM (×0.1 °C)'],
                ['IQ current limit', '700.0 A', 'IQ_Limit_EEPROM (×0.1 A)'],
                ['ID current limit', '700.0 A', 'ID_Limit_EEPROM (×0.1 A)'],
                ['Motor torque limit', '140.0 Nm', 'Motor_Torque_Limit_EEPROM (×0.1 Nm)'],
                ['Regenerative torque limit', '0.0 Nm', 'Regen_Torque_Limit_EEPROM (×0.1 Nm)'],
                ['Braking torque limit', '15.0 Nm', 'Braking_Torque_Limit_EEPROM (×0.1 Nm)'],
                ['Torque rate limit', '0.8 Nm (stored scale: ×0.1)', 'Torque_Rate_Limit_EEPROM (×0.1 Nm)'],
                ['Motor overspeed limit', '6500 RPM', 'Motor_Overspeed_EEPROM'],
                ['Maximum speed', '5000 RPM', 'Max_Speed_EEPROM'],
                ['Valet mode speed', '10000 RPM', 'Valet_Mode_Speed_EEPROM'],
                ['Regen fade speed', '200 RPM', 'Regen_Fade_Speed_EEPROM'],
                ['Brake speed', '3000 RPM (RUN 28 snapshot; RUN 21 varies)', 'Break_Speed_EEPROM'],
                ['PWM nominal frequency', '10 kHz (RUN 28 snapshot; other captures vary)', 'PWM_Nominal_Freq_EEPROM'],
                ['PWM minimum variable frequency', '6 kHz', 'PWM_Minimum_Variable_Freq_EEPROM'],
                ['PWM maximum variable frequency', '12 kHz', 'PWM_Maximum_Variable_Freq_EEPROM'],
                ['PWM stall frequency', '2 kHz', 'PWM_Stall_Freq_EEPROM'],
                ['Motor type', '128 (raw EEPROM enumeration)', 'Motor_Type_EEPROM'],
                ['Vehicle flux', '3.4 Wb', 'Veh_Flux_EEPROM (×0.001 Wb)'],
                ['Gamma adjustment', '3.2°', 'Gamma_Adjust_EEPROM (×0.1°)'],
                ['CAN command bit rate', '1000 kbps', 'CAN_Bit_Rate_EEPROM'],
                ['CAN fast message rate', '10 ms', 'CAN_Fast_Msg_Rate_EEPROM'],
                ['CAN command message active', '1 (enabled)', 'CAN_Command_Message_Active_EEPROM']
            ];

            html += `
                <div class="tablewrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Recorded value</th>
                                <th>RMS GUI EEPROM symbol / notes</th>
                                <th>Capture date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${parameterRows.map(row => `
                                <tr>
                                    <td>${escapeHTML(row[0])}</td>
                                    <td>${escapeHTML(row[1])}</td>
                                    <td>${escapeHTML(row[2])}</td>
                                    <td>10 December 2025</td>
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
