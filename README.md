# CampusBridge — Dehradun Student & Local Business MVP

**CampusBridge** is a digital platform MVP built for the *Entrepreneurship & Innovation* venture assignment at **DBS Global University, Dehradun**. It connects college and MBA students in Dehradun with local startups, small businesses, retailers, agencies, and service providers for schedule-friendly internships, part-time jobs, and short-term skill-based projects.

## Key Features Implemented
- **Homepage:** Value proposition for both students and local Dehradun businesses, 3-step workflow, sample Dehradun opportunities, and transparent campus pilot pricing note.
- **Student Registration & Profile Creation:** Captures college, program (MBA/UG/PG), preferred Dehradun area, academic schedule availability, and skills.
- **Opportunity Discovery, Search & Filters:** Live search across roles, skills, and Dehradun locations; filters for opportunity type, business function (Sales, Marketing, Social Media, Market Research, Operations), and schedule compatibility.
- **Profile-Based Match Score:** Automatically calculates a percentage match against each listing using the student's skills and class-free schedule.
- **Detailed Opportunity View & Apply Now Form:** Pre-fills student profile info, confirms schedule availability, and tracks submissions.
- **Student Dashboard:** Displays profile summary, submitted applications (with withdraw option), matched roles, and bookmarked listings.
- **Local Business Opportunity Submission:** Allows local businesses to post roles directly to the live board (persisted via browser `localStorage`).

## Preview Locally
No dependencies, paid APIs, or backend setup required:
1. Download or clone this folder.
2. Double-click `index.html` to open it in Chrome/Edge/Safari (or run `npx serve .` in the folder).

## Deploy to GitHub & Vercel
1. Create a new repository on GitHub and upload `index.html`, `styles.css`, `app.js`, `vercel.json`, and `README.md`.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click **Add New → Project**, and select your repository.
3. Leave Framework Preset as **Other** (static site) and click **Deploy**. Your live URL will be ready in ~30 seconds.
