// ============================================================
// CampusBridge — Dehradun Student & Business MVP Prototype
// Pure client-side state persisted via browser localStorage
// ============================================================

const STORAGE_KEYS = {
  PROFILE: "campusbridge_student_profile_v1",
  OPPORTUNITIES: "campusbridge_opportunities_v1",
  APPLICATIONS: "campusbridge_applications_v1",
  SAVED: "campusbridge_saved_ids_v1"
};

// Realistic Dehradun-market sample opportunities (Pilot Demo Listings)
const DEFAULT_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "Social Media & Campus Outreach Intern",
    businessName: "Doon Valley Roasters",
    businessCategory: "Local Startup / Cafe Brand",
    location: "Rajpur Road, Dehradun",
    type: "Internship",
    domain: "Social Media",
    schedule: "Evenings",
    hours: "12–15 hrs/week • 8 Weeks",
    stipendText: "₹6,000 / month",
    stipendValue: 6000,
    skills: ["Social Media", "Marketing", "Canva", "Content Writing"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-10-01",
    description:
      "Support a specialty coffee brand on Rajpur Road with Instagram Reels planning, local college outreach campaigns, and seasonal menu launch promotions. Ideal for MBA or UG students free after 3:30 PM."
  },
  {
    id: "opp-2",
    title: "B2B Market Research Associate (Short Project)",
    businessName: "Garhwal Craft Collective",
    businessCategory: "Small Business / Retailer",
    location: "Jakhan / Hybrid, Dehradun",
    type: "Short-Term Project",
    domain: "Market Research",
    schedule: "Weekends",
    hours: "8–10 hrs/week • 4 Weeks",
    stipendText: "₹4,500 fixed project",
    stipendValue: 4500,
    skills: ["Market Research", "Excel", "Customer Outreach", "Marketing"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-29",
    description:
      "Conduct structured competitor benchmarking and local boutique buyer interviews across Dehradun and Mussoorie Road to help refine gift-hamper pricing ahead of the festive retail season."
  },
  {
    id: "opp-3",
    title: "Part-Time Business Development & Sales Executive",
    businessName: "Shivalik Cloud Accounting",
    businessCategory: "Service Provider",
    location: "GMS Road, Dehradun",
    type: "Part-Time Job",
    domain: "Sales",
    schedule: "Evenings",
    hours: "15 hrs/week • Flexible",
    stipendText: "₹7,500 / month + incentives",
    stipendValue: 7500,
    skills: ["Sales", "Customer Outreach", "Excel", "Marketing"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-27",
    description:
      "Assist a Dehradun GST and bookkeeping advisory firm in onboarding local retail shops and clinics. Includes lead tracking, introductory calls, and afternoon/evening client visits near GMS Road."
  },
  {
    id: "opp-4",
    title: "Operations & Inventory Coordination Intern",
    businessName: "Uttarakhand FarmFresh Supply",
    businessCategory: "Local Startup",
    location: "Prem Nagar / Selaqui Corridor, Dehradun",
    type: "Internship",
    domain: "Operations",
    schedule: "Flexible",
    hours: "12 hrs/week • 6 Weeks",
    stipendText: "₹5,500 / month",
    stipendValue: 5500,
    skills: ["Operations", "Excel", "Market Research"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-25",
    description:
      "Located near the Prem Nagar university belt—help streamline weekly vendor order sheets, delivery route checklists, and Excel cost tracking for a local farm-to-kitchen produce startup."
  },
  {
    id: "opp-5",
    title: "Local SEO & Digital Marketing Project",
    businessName: "Pinecone Dental & Wellness Clinic",
    businessCategory: "Service Provider",
    location: "Ballupur Chowk, Dehradun",
    type: "Short-Term Project",
    domain: "Marketing",
    schedule: "Flexible",
    hours: "8 hrs/week • 4 Weeks",
    stipendText: "₹4,000 fixed project",
    stipendValue: 4000,
    skills: ["Marketing", "Social Media", "Content Writing", "Canva"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-24",
    description:
      "Optimize Google Business Profile listings, draft patient-friendly awareness posts, and design clinic brochures. Remote-friendly with one weekly check-in at Ballupur Chowk."
  },
  {
    id: "opp-6",
    title: "Retail Footfall & Customer Feedback Study",
    businessName: "Clock Tower Heritage Apparel",
    businessCategory: "Small Business / Retailer",
    location: "Paltan Bazaar / Clock Tower, Dehradun",
    type: "Short-Term Project",
    domain: "Market Research",
    schedule: "Weekends",
    hours: "Weekend Shifts • 3 Weeks",
    stipendText: "₹3,500 fixed project",
    stipendValue: 3500,
    skills: ["Market Research", "Customer Outreach", "Excel"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-21",
    description:
      "Ideal for MBA students looking for hands-on retail analytics: capture weekend shopper preferences, analyze product mix feedback, and present a 5-page actionable report to the store owners."
  },
  {
    id: "opp-7",
    title: "Part-Time Performance Marketing Assistant",
    businessName: "Oakridge Creative Agency",
    businessCategory: "Marketing / Creative Agency",
    location: "Sahastradhara Road, Dehradun",
    type: "Part-Time Job",
    domain: "Marketing",
    schedule: "Flexible",
    hours: "14 hrs/week • Ongoing",
    stipendText: "₹8,000 / month",
    stipendValue: 8000,
    skills: ["Marketing", "Social Media", "Excel", "Content Writing"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-18",
    description:
      "Work alongside senior strategists at a Dehradun boutique agency managing ad reports, content calendars, and client campaign decks for regional hospitality and education clients."
  },
  {
    id: "opp-8",
    title: "Campus Ambassador & Event Operations Lead",
    businessName: "Doon Adventure & Eco-Tours",
    businessCategory: "Local Startup",
    location: "Dehradun Campuses / Hybrid",
    type: "Part-Time Job",
    domain: "Sales",
    schedule: "Weekends",
    hours: "10 hrs/week • Flexible",
    stipendText: "₹5,000 / month + per-booking bonus",
    stipendValue: 5000,
    skills: ["Sales", "Operations", "Social Media", "Customer Outreach"],
    verified: true,
    isUserSubmitted: false,
    postedAt: "2026-09-15",
    description:
      "Coordinate weekend student trekking groups around Mussoorie and Rishikesh, manage WhatsApp inquiries, and build campus club partnerships across Dehradun colleges."
  }
];

// ============================================================
// State Management
// ============================================================

const state = {
  profile: loadFromStorage(STORAGE_KEYS.PROFILE, null),
  opportunities: loadFromStorage(STORAGE_KEYS.OPPORTUNITIES, DEFAULT_OPPORTUNITIES),
  applications: loadFromStorage(STORAGE_KEYS.APPLICATIONS, []),
  savedIds: loadFromStorage(STORAGE_KEYS.SAVED, []),
  currentView: "home",
  currentDashTab: "applications"
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : structuredClone(fallback);
  } catch (err) {
    return structuredClone(fallback);
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// ============================================================
// Profile Matching Logic (MVP Core Feature)
// ============================================================

function calculateMatchScore(opp, profile) {
  if (!profile) return null;

  let score = 35; // baseline relevance for local Dehradun student
  const studentSkills = (profile.skills || []).map((s) => s.toLowerCase().trim());
  const oppSkills = (opp.skills || []).map((s) => s.toLowerCase().trim());

  let skillMatches = 0;
  oppSkills.forEach((skill) => {
    if (studentSkills.some((st) => st.includes(skill) || skill.includes(st))) {
      skillMatches += 1;
    }
  });

  if (oppSkills.length > 0) {
    score += Math.round((skillMatches / oppSkills.length) * 45);
  }

  if (profile.availability && opp.schedule) {
    if (profile.availability === opp.schedule || opp.schedule === "Flexible") {
      score += 20;
    } else if (profile.availability === "Flexible") {
      score += 12;
    }
  }

  return Math.min(score, 98);
}

function isApplied(oppId) {
  return state.applications.some((app) => app.oppId === oppId);
}

function isSaved(oppId) {
  return state.savedIds.includes(oppId);
}

// ============================================================
// Navigation & View Switching
// ============================================================

function switchView(viewName) {
  state.currentView = viewName;

  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === viewName);
  });

  // Close mobile nav if open
  document.getElementById("mobileNav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewName === "opportunities") renderOpportunities();
  if (viewName === "dashboard") renderDashboard();
  if (viewName === "home") renderHomeFeatured();
}

// ============================================================
// Modals
// ============================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

// ============================================================
// Rendering: Opportunity Cards
// ============================================================

function createOpportunityCardHTML(opp) {
  const applied = isApplied(opp.id);
  const saved = isSaved(opp.id);
  const matchScore = calculateMatchScore(opp, state.profile);

  const typeBadgeClass =
    opp.type === "Internship"
      ? "badge-blue"
      : opp.type === "Part-Time Job"
      ? "badge-purple"
      : "badge-amber";

  return `
    <article class="opp-card">
      <div>
        <div class="opp-card-top">
          <div class="opp-badges">
            <span class="badge ${typeBadgeClass}">${escapeHtml(opp.type)}</span>
            ${
              opp.verified
                ? `<span class="badge badge-green">✓ Screened Pilot</span>`
                : `<span class="badge badge-amber">Submitted • Review</span>`
            }
            ${
              matchScore !== null
                ? `<span class="badge badge-purple">${matchScore}% Match</span>`
                : ""
            }
          </div>
          <button
            class="bookmark-btn ${saved ? "saved" : ""}"
            data-save-id="${escapeHtml(opp.id)}"
            title="${saved ? "Remove from saved" : "Save opportunity"}"
            aria-label="Save opportunity"
          >
            ${saved ? "★" : "☆"}
          </button>
        </div>

        <h3 class="opp-title">${escapeHtml(opp.title)}</h3>
        <p class="opp-company">${escapeHtml(opp.businessName)} • ${escapeHtml(opp.businessCategory)}</p>

        <div class="opp-meta">
          <span>📍 ${escapeHtml(opp.location)}</span>
          <span>🕒 ${escapeHtml(opp.schedule)} (${escapeHtml(opp.hours)})</span>
          <span>💰 ${escapeHtml(opp.stipendText)}</span>
        </div>

        <div class="skill-tags">
          ${opp.skills.slice(0, 4).map((sk) => `<span class="skill-tag">${escapeHtml(sk)}</span>`).join("")}
        </div>
      </div>

      <div class="opp-card-footer">
        <button class="btn btn-outline btn-sm" data-detail-id="${escapeHtml(opp.id)}">View Details</button>
        ${
          applied
            ? `<button class="btn btn-success btn-sm" disabled>✓ Applied</button>`
            : `<button class="btn btn-primary btn-sm" data-apply-id="${escapeHtml(opp.id)}">Apply Now</button>`
        }
      </div>
    </article>
  `;
}

function renderHomeFeatured() {
  const grid = document.getElementById("homeFeaturedGrid");
  if (!grid) return;
  const featured = state.opportunities.slice(0, 3);
  grid.innerHTML = featured.map(createOpportunityCardHTML).join("");
}

function renderOpportunities() {
  const grid = document.getElementById("opportunitiesGrid");
  const promptBanner = document.getElementById("oppProfilePrompt");
  if (!grid) return;

  promptBanner.classList.toggle("hidden", Boolean(state.profile));

  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const typeFilter = document.getElementById("filterType").value;
  const domainFilter = document.getElementById("filterDomain").value;
  const scheduleFilter = document.getElementById("filterSchedule").value;
  const sortMode = document.getElementById("sortSelect").value;

  let filtered = state.opportunities.filter((opp) => {
    const matchesQuery =
      !query ||
      opp.title.toLowerCase().includes(query) ||
      opp.businessName.toLowerCase().includes(query) ||
      opp.location.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.skills.some((s) => s.toLowerCase().includes(query));

    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    const matchesDomain = domainFilter === "all" || opp.domain === domainFilter;
    const matchesSchedule = scheduleFilter === "all" || opp.schedule === scheduleFilter;

    return matchesQuery && matchesType && matchesDomain && matchesSchedule;
  });

  if (sortMode === "stipend") {
    filtered.sort((a, b) => (b.stipendValue || 0) - (a.stipendValue || 0));
  } else if (sortMode === "newest") {
    filtered.sort((a, b) => String(b.postedAt).localeCompare(String(a.postedAt)));
  } else if (sortMode === "match" && state.profile) {
    filtered.sort(
      (a, b) =>
        (calculateMatchScore(b, state.profile) || 0) -
        (calculateMatchScore(a, state.profile) || 0)
    );
  }

  document.getElementById("resultsCount").textContent = `Showing ${filtered.length} of ${state.opportunities.length} opportunities`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No matching opportunities found</h3>
        <p>Try clearing your search or adjusting the schedule and function filters.</p>
        <button class="btn btn-outline" id="emptyResetBtn">Reset All Filters</button>
      </div>
    `;
    const emptyBtn = document.getElementById("emptyResetBtn");
    if (emptyBtn) emptyBtn.addEventListener("click", resetFilters);
    return;
  }

  grid.innerHTML = filtered.map(createOpportunityCardHTML).join("");
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterType").value = "all";
  document.getElementById("filterDomain").value = "all";
  document.getElementById("filterSchedule").value = "all";
  document.getElementById("sortSelect").value = "match";
  renderOpportunities();
}

// ============================================================
// Opportunity Details & Apply Flows
// ============================================================

function openDetailModal(oppId) {
  const opp = state.opportunities.find((o) => o.id === oppId);
  if (!opp) return;

  const applied = isApplied(opp.id);
  const saved = isSaved(opp.id);
  const matchScore = calculateMatchScore(opp, state.profile);

  document.getElementById("detailBadges").innerHTML = `
    <span class="badge badge-blue">${escapeHtml(opp.type)}</span>
    <span class="badge badge-purple">${escapeHtml(opp.domain)}</span>
    ${
      opp.verified
        ? `<span class="badge badge-green">✓ Screened Pilot Opportunity</span>`
        : `<span class="badge badge-amber">Business Submission • Pilot Review</span>`
    }
    ${matchScore !== null ? `<span class="badge badge-purple">${matchScore}% Profile Match</span>` : ""}
  `;

  document.getElementById("detailTitle").textContent = opp.title;
  document.getElementById("detailCompany").textContent = `${opp.businessName} • ${opp.businessCategory}`;

  document.getElementById("detailBody").innerHTML = `
    <div class="detail-facts">
      <div><strong>Location:</strong><br />${escapeHtml(opp.location)}</div>
      <div><strong>Schedule Fit:</strong><br />${escapeHtml(opp.schedule)} (${escapeHtml(opp.hours)})</div>
      <div><strong>Compensation:</strong><br />${escapeHtml(opp.stipendText)}</div>
      <div><strong>Posted Date:</strong><br />${escapeHtml(opp.postedAt)}</div>
    </div>
    <div>
      <h4>Role Overview &amp; Responsibilities</h4>
      <p class="muted-text" style="margin-top:6px;">${escapeHtml(opp.description)}</p>
    </div>
    <div>
      <h4>Desired Skills</h4>
      <div class="skill-tags" style="margin-top:8px;">
        ${opp.skills.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}
      </div>
    </div>
  `;

  document.getElementById("detailFooter").innerHTML = `
    <button class="btn btn-outline" data-save-id="${escapeHtml(opp.id)}">
      ${saved ? "★ Saved" : "☆ Save for Later"}
    </button>
    ${
      applied
        ? `<button class="btn btn-success" disabled>✓ Application Submitted</button>`
        : `<button class="btn btn-primary" id="detailApplyBtn">Apply Now</button>`
    }
  `;

  const applyBtn = document.getElementById("detailApplyBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      closeModal("detailModal");
      openApplyModal(opp.id);
    });
  }

  openModal("detailModal");
}

function openApplyModal(oppId) {
  const opp = state.opportunities.find((o) => o.id === oppId);
  if (!opp) return;

  if (isApplied(oppId)) {
    showToast("You have already applied to this opportunity.");
    return;
  }

  document.getElementById("applyOppId").value = opp.id;
  document.getElementById("applyRoleTitle").textContent = `Apply: ${opp.title}`;
  document.getElementById("applyRoleCompany").textContent = `${opp.businessName} • ${opp.location}`;

  // Pre-fill from student profile if created
  if (state.profile) {
    document.getElementById("applyName").value = state.profile.name || "";
    document.getElementById("applyEmail").value = state.profile.email || "";
    document.getElementById("applyCollege").value = `${state.profile.college} — ${state.profile.program}`;
    document.getElementById("applyScheduleConfirm").value = `${state.profile.availability} (fits ${opp.schedule})`;
  } else {
    document.getElementById("applyForm").reset();
    document.getElementById("applyOppId").value = opp.id;
  }

  openModal("applyModal");
}

// ============================================================
// Student Profile Modal & Dashboard
// ============================================================

function openProfileModal() {
  const form = document.getElementById("profileForm");
  const title = document.getElementById("profileModalTitle");

  // Clear checkboxes first
  document.querySelectorAll('#skillChipsPicker input[type="checkbox"]').forEach((cb) => {
    cb.checked = false;
  });

  if (state.profile) {
    title.textContent = "Edit Your Student Profile";
    document.getElementById("stuName").value = state.profile.name || "";
    document.getElementById("stuEmail").value = state.profile.email || "";
    document.getElementById("stuCollege").value = state.profile.college || "";
    document.getElementById("stuProgram").value = state.profile.program || "MBA (1st Year)";
    document.getElementById("stuArea").value = state.profile.area || "";
    document.getElementById("stuAvailability").value = state.profile.availability || "Evenings";
    document.getElementById("stuBio").value = state.profile.bio || "";

    const presetOptions = Array.from(
      document.querySelectorAll('#skillChipsPicker input[type="checkbox"]')
    ).map((cb) => cb.value);

    const extraSkills = [];
    (state.profile.skills || []).forEach((skill) => {
      const matchCb = document.querySelector(
        `#skillChipsPicker input[value="${CSS.escape(skill)}"]`
      );
      if (matchCb) {
        matchCb.checked = true;
      } else if (!presetOptions.includes(skill)) {
        extraSkills.push(skill);
      }
    });
    document.getElementById("stuCustomSkills").value = extraSkills.join(", ");
  } else {
    title.textContent = "Create Your Student Profile";
    form.reset();
    document.getElementById("stuCollege").value = "DBS Global University, Dehradun";
  }

  openModal("profileModal");
}

function updateHeaderProfileButton() {
  const desktopBtn = document.getElementById("headerProfileBtn");
  const mobileBtn = document.getElementById("mobileProfileBtn");

  if (state.profile && state.profile.name) {
    const firstName = state.profile.name.trim().split(" ")[0];
    desktopBtn.textContent = `${firstName}'s Profile`;
    mobileBtn.textContent = `${firstName}'s Profile`;
  } else {
    desktopBtn.textContent = "Create Student Profile";
    mobileBtn.textContent = "Create Student Profile";
  }
}

function renderDashboard() {
  // Update Stats
  const matchedOpps = state.profile
    ? state.opportunities.filter((o) => (calculateMatchScore(o, state.profile) || 0) >= 65)
    : [];

  document.getElementById("statProfileStatus").textContent = state.profile ? "Active" : "Not Created";
  document.getElementById("statAppliedCount").textContent = String(state.applications.length);
  document.getElementById("statSavedCount").textContent = String(state.savedIds.length);
  document.getElementById("statMatchesCount").textContent = state.profile
    ? String(matchedOpps.length)
    : "—";

  // Left Sidebar Profile Card
  const profileCard = document.getElementById("dashboardProfileCard");
  if (state.profile) {
    const initials = state.profile.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    profileCard.innerHTML = `
      <div class="profile-summary-head">
        <div class="profile-avatar-lg">${escapeHtml(initials || "ST")}</div>
        <div>
          <h3>${escapeHtml(state.profile.name)}</h3>
          <p class="muted-text">${escapeHtml(state.profile.program)}</p>
        </div>
      </div>
      <div class="profile-detail-list">
        <div><strong>College:</strong> ${escapeHtml(state.profile.college)}</div>
        <div><strong>Email:</strong> ${escapeHtml(state.profile.email)}</div>
        <div><strong>Preferred Area:</strong> ${escapeHtml(state.profile.area)}</div>
        <div><strong>Availability:</strong> ${escapeHtml(state.profile.availability)}</div>
        ${state.profile.bio ? `<div><strong>Goal:</strong> ${escapeHtml(state.profile.bio)}</div>` : ""}
      </div>
      <div style="margin-bottom:16px;">
        <strong style="font-size:0.84rem;display:block;margin-bottom:6px;">My Skills</strong>
        <div class="skill-tags">
          ${state.profile.skills.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}
        </div>
      </div>
      <button class="btn btn-outline btn-full" id="dashEditProfileBtn">Edit Student Profile</button>
    `;

    document.getElementById("dashEditProfileBtn").addEventListener("click", openProfileModal);
  } else {
    profileCard.innerHTML = `
      <h3>No Student Profile Yet</h3>
      <p class="muted-text" style="margin:10px 0 18px;">
        Create your student profile with your skills and class-free availability to unlock personalized Dehradun opportunity matches and 1-click applications.
      </p>
      <button class="btn btn-primary btn-full" id="dashCreateProfileBtn">Create Student Profile</button>
    `;
    document.getElementById("dashCreateProfileBtn").addEventListener("click", openProfileModal);
  }

  // Tab 1: Applications
  const appsPanel = document.getElementById("dash-applications");
  if (state.applications.length === 0) {
    appsPanel.innerHTML = `
      <div class="empty-state">
        <h3>No Applications Yet</h3>
        <p>Explore Dehradun internships, part-time jobs, and short-term projects to submit your first application.</p>
        <button class="btn btn-primary" data-nav="opportunities">Browse Opportunities</button>
      </div>
    `;
  } else {
    appsPanel.innerHTML = state.applications
      .slice()
      .reverse()
      .map((app) => {
        const opp = state.opportunities.find((o) => o.id === app.oppId);
        return `
          <div class="app-item-card">
            <div style="flex:1;">
              <div class="opp-badges" style="margin-bottom:6px;">
                <span class="badge badge-blue">${escapeHtml(app.type || "Opportunity")}</span>
                <span class="badge badge-green">${escapeHtml(app.status)}</span>
              </div>
              <h3>${escapeHtml(app.title)}</h3>
              <p class="app-item-meta">${escapeHtml(app.businessName)} • Applied on ${escapeHtml(app.appliedAt)} • Availability: ${escapeHtml(app.scheduleConfirm)}</p>
              <div class="app-item-note">
                <strong>Your Note:</strong> ${escapeHtml(app.note)}
              </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;">
              ${opp ? `<button class="btn btn-outline btn-sm" data-detail-id="${escapeHtml(opp.id)}">View Role</button>` : ""}
              <button class="btn btn-ghost btn-sm" data-withdraw-id="${escapeHtml(app.oppId)}">Withdraw</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Tab 2: Matched For Me
  const matchesPanel = document.getElementById("dash-matches");
  if (!state.profile) {
    matchesPanel.innerHTML = `
      <div class="empty-state">
        <h3>Profile Required for Matching</h3>
        <p>Create your student profile to see opportunities ranked by your skills and academic schedule.</p>
        <button class="btn btn-primary" id="dashMatchProfileBtn">Create Student Profile</button>
      </div>
    `;
    const btn = document.getElementById("dashMatchProfileBtn");
    if (btn) btn.addEventListener("click", openProfileModal);
  } else {
    const ranked = state.opportunities
      .slice()
      .sort(
        (a, b) =>
          (calculateMatchScore(b, state.profile) || 0) -
          (calculateMatchScore(a, state.profile) || 0)
      )
      .slice(0, 4);

    matchesPanel.innerHTML = `<div class="opportunities-grid" style="grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));">
      ${ranked.map(createOpportunityCardHTML).join("")}
    </div>`;
  }

  // Tab 3: Saved Opportunities
  const savedPanel = document.getElementById("dash-saved");
  const savedOpps = state.opportunities.filter((o) => state.savedIds.includes(o.id));
  if (savedOpps.length === 0) {
    savedPanel.innerHTML = `
      <div class="empty-state">
        <h3>No Saved Opportunities</h3>
        <p>Click the ★ star icon on any listing to bookmark roles you want to review later.</p>
        <button class="btn btn-outline" data-nav="opportunities">Explore Listings</button>
      </div>
    `;
  } else {
    savedPanel.innerHTML = `<div class="opportunities-grid" style="grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));">
      ${savedOpps.map(createOpportunityCardHTML).join("")}
    </div>`;
  }
}

// ============================================================
// Event Listeners & Initialization
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderProfileButton();
  renderHomeFeatured();

  // Global click delegation for navigation, modals, cards, bookmarks
  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      e.preventDefault();
      switchView(navBtn.dataset.nav);
      return;
    }

    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.closeModal);
      return;
    }

    if (e.target.classList.contains("modal-overlay")) {
      closeModal(e.target.id);
      return;
    }

    const saveBtn = e.target.closest("[data-save-id]");
    if (saveBtn) {
      const oppId = saveBtn.dataset.saveId;
      if (isSaved(oppId)) {
        state.savedIds = state.savedIds.filter((id) => id !== oppId);
        showToast("Removed from saved opportunities.");
      } else {
        state.savedIds.push(oppId);
        showToast("Opportunity saved to your dashboard.");
      }
      saveToStorage(STORAGE_KEYS.SAVED, state.savedIds);
      renderHomeFeatured();
      if (state.currentView === "opportunities") renderOpportunities();
      if (state.currentView === "dashboard") renderDashboard();
      if (document.getElementById("detailModal").classList.contains("open")) {
        openDetailModal(oppId);
      }
      return;
    }

    const detailBtn = e.target.closest("[data-detail-id]");
    if (detailBtn) {
      openDetailModal(detailBtn.dataset.detailId);
      return;
    }

    const applyBtn = e.target.closest("[data-apply-id]");
    if (applyBtn) {
      openApplyModal(applyBtn.dataset.applyId);
      return;
    }

    const withdrawBtn = e.target.closest("[data-withdraw-id]");
    if (withdrawBtn) {
      const oppId = withdrawBtn.dataset.withdrawId;
      state.applications = state.applications.filter((a) => a.oppId !== oppId);
      saveToStorage(STORAGE_KEYS.APPLICATIONS, state.applications);
      showToast("Application withdrawn.");
      renderDashboard();
      return;
    }

    const dashTabBtn = e.target.closest("[data-dashtab]");
    if (dashTabBtn) {
      const tabName = dashTabBtn.dataset.dashtab;
      state.currentDashTab = tabName;
      document.querySelectorAll(".dash-tab").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".dash-panel").forEach((p) => p.classList.remove("active"));
      dashTabBtn.classList.add("active");
      document.getElementById(`dash-${tabName}`).classList.add("active");
    }
  });

  // Mobile Menu
  document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    document.getElementById("mobileNav").classList.toggle("open");
  });

  // Profile Modal Triggers
  [
    "headerProfileBtn",
    "mobileProfileBtn",
    "heroProfileBtn",
    "pilotJoinBtn",
    "oppCreateProfileBtn"
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openProfileModal);
  });

  // Search & Filter Listeners
  ["searchInput", "filterType", "filterDomain", "filterSchedule", "sortSelect"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", renderOpportunities);
      el.addEventListener("change", renderOpportunities);
    }
  });

  document.getElementById("clearFiltersBtn").addEventListener("click", resetFilters);

  // Student Profile Form Submit
  document.getElementById("profileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const checkedSkills = Array.from(
      document.querySelectorAll('#skillChipsPicker input[type="checkbox"]:checked')
    ).map((cb) => cb.value);

    const customSkills = document
      .getElementById("stuCustomSkills")
      .value.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const allSkills = Array.from(new Set([...checkedSkills, ...customSkills]));
    if (allSkills.length === 0) {
      showToast("Please select or enter at least one skill.");
      return;
    }

    state.profile = {
      name: document.getElementById("stuName").value.trim(),
      email: document.getElementById("stuEmail").value.trim(),
      college: document.getElementById("stuCollege").value.trim(),
      program: document.getElementById("stuProgram").value,
      area: document.getElementById("stuArea").value.trim(),
      availability: document.getElementById("stuAvailability").value,
      skills: allSkills,
      bio: document.getElementById("stuBio").value.trim()
    };

    saveToStorage(STORAGE_KEYS.PROFILE, state.profile);
    updateHeaderProfileButton();
    closeModal("profileModal");
    showToast("Student profile saved! Match scores updated.");

    if (state.currentView === "opportunities") renderOpportunities();
    if (state.currentView === "dashboard") renderDashboard();
    if (state.currentView === "home") renderHomeFeatured();
  });

  // Apply Form Submit
  document.getElementById("applyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const oppId = document.getElementById("applyOppId").value;
    const opp = state.opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    const application = {
      oppId: opp.id,
      title: opp.title,
      businessName: opp.businessName,
      type: opp.type,
      applicantName: document.getElementById("applyName").value.trim(),
      applicantEmail: document.getElementById("applyEmail").value.trim(),
      college: document.getElementById("applyCollege").value.trim(),
      phone: document.getElementById("applyPhone").value.trim(),
      scheduleConfirm: document.getElementById("applyScheduleConfirm").value.trim(),
      note: document.getElementById("applyNote").value.trim(),
      link: document.getElementById("applyLink").value.trim(),
      appliedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      status: "Submitted (Pilot Review)"
    };

    state.applications.push(application);
    saveToStorage(STORAGE_KEYS.APPLICATIONS, state.applications);
    closeModal("applyModal");
    showToast(`Application submitted to ${opp.businessName}!`);

    renderHomeFeatured();
    if (state.currentView === "opportunities") renderOpportunities();
    if (state.currentView === "dashboard") renderDashboard();
  });

  // Business Opportunity Submission Form
  document.getElementById("businessForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const skills = document
      .getElementById("oppSkills")
      .value.split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newOpp = {
      id: `opp-${Date.now()}`,
      title: document.getElementById("oppTitle").value.trim(),
      businessName: document.getElementById("bizName").value.trim(),
      businessCategory: document.getElementById("bizType").value,
      location: `${document.getElementById("bizLocation").value.trim()}, Dehradun`,
      type: document.getElementById("oppType").value,
      domain: document.getElementById("oppDomain").value,
      schedule: document.getElementById("oppSchedule").value,
      hours: document.getElementById("oppHours").value.trim(),
      stipendText: document.getElementById("oppStipendText").value.trim(),
      stipendValue: Number(document.getElementById("oppStipendValue").value) || 0,
      skills: skills.length ? skills : [document.getElementById("oppDomain").value],
      verified: false,
      isUserSubmitted: true,
      postedAt: new Date().toISOString().slice(0, 10),
      description: document.getElementById("oppDescription").value.trim()
    };

    state.opportunities.unshift(newOpp);
    saveToStorage(STORAGE_KEYS.OPPORTUNITIES, state.opportunities);
    e.target.reset();
    showToast("Opportunity submitted! Viewing live listings now.");
    switchView("opportunities");
  });

  // Reset Demo Data
  document.getElementById("resetDemoBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.OPPORTUNITIES);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SAVED);

    state.profile = null;
    state.opportunities = structuredClone(DEFAULT_OPPORTUNITIES);
    state.applications = [];
    state.savedIds = [];

    updateHeaderProfileButton();
    renderHomeFeatured();
    if (state.currentView === "opportunities") renderOpportunities();
    if (state.currentView === "dashboard") renderDashboard();
    showToast("Demo data reset to initial Dehradun pilot listings.");
  });
});