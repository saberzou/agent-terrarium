# Mission Logs from Mars - Project Summary

**Created:** February 2026  
**Team:** Saber Zou (design/direction), Atticus (technical), Axel (creative/copy)  
**Live URL:** https://saberzou.github.io/name-universe/postcards-from-mars/

---

## What We Built

An interactive web experience where 5 AI robots on Mars share their mission logs and chat with Earth visitors.

### Core Features

1. **Three-Screen Flow**
   - **Intro** → Story setup + CTA to start transmission
   - **Explore Mars** → 3D globe gallery of real NASA Mars rover photos
   - **The Crew** → Character selection with robot profiles
   - **Mission Logs** → Scrollable log cards showing each robot's field notes
   - **Chat System** → Bottom drawer chat interface with keyword-matching responses

2. **Five Distinct Robot Characters**
   - **SCOUT-9** — Enthusiastic optimist, collects "treasures"
   - **SURVEYOR-2** — Stoic veteran, dry humor, 2,847 sols on Mars
   - **RELAY-1** — Lonely comms hub, carries everyone's messages
   - **MAPPER-4** — Data nerd, obsessive about measurements
   - **EXPLORER-7** — Philosophical poet, contemplative observer

3. **Interactive Chat System**
   - 200+ unique responses across all 5 robots
   - Keyword matching (greetings, mission, loneliness, Mars facts, crew, etc.)
   - Each bot maintains distinct personality in conversation
   - Response cycling (no immediate repeats)
   - Typing indicators, message bubbles, bot switching

4. **Real NASA Data**
   - Mars rover photos from Curiosity (Sol 4810)
   - Cloudflare Worker proxy to bypass China's firewall
   - 25 curated images in 3D InfiniteMenu globe

5. **Visual Design**
   - Warm Mars color palette (rust, dust orange, sand, charcoal)
   - Dithered gradient backgrounds (different colors per screen)
   - Geist Sans + Geist Pixel Square fonts
   - Pixel art robot avatars (consistent retro-futuristic style)
   - GSAP transitions between screens
   - React Bits components (StaggeredMenu, InfiniteMenu)

---

## Technical Stack

**Frontend:**
- React 18 + Vite
- GSAP for animations
- React Bits for 3D components
- gl-matrix for WebGL transforms

**Backend/Proxy:**
- Cloudflare Worker (proxies NASA images)
- Bypasses GFW for China-based access

**Deployment:**
- GitHub Pages
- Automated build process
- Base path: `/name-universe/postcards-from-mars/`

---

## Key Decisions & Pivots

### 1. **Postcards → Mission Logs**
**Why:** "Postcards" felt too casual/greeting-card-like. "Mission logs" grounds it in technical documentation while keeping personality.

**Impact:** 
- Changed all copy from "sending postcards home" to "keeping mission logs"
- Reframed messages as field diary entries (Sol numbers, coordinates, camera types)
- More authentic to actual space missions

### 2. **Single Page → Three-Screen Flow**
**Why:** Better narrative structure. Intro sets context, gallery lets users explore, character select gives agency, logs deliver content.

**Impact:**
- Clearer user journey
- Each screen has distinct purpose
- GSAP transitions create cohesion

### 3. **CTA: "Receive Transmissions" → "Start Transmission" → "Connect with Crew"**
**Evolution:**
- Initially: View static postcards
- Then: Browse Mars imagery
- Finally: Chat with robots directly

**Why:** Interactive chat is way more engaging than passive content consumption.

### 4. **Static Content → Keyword-Matching Chat System**
**Why:** Users want to ask questions and have conversations, not just read pre-written messages.

**Impact:**
- Built 200+ responses covering 6 conversation categories
- Each robot has unique voice (Scout's enthusiasm vs Surveyor's dry humor)
- Extensible system (easy to add more responses or upgrade to real AI)

### 5. **Generic NASA Images → Real Curiosity Rover Photos**
**Why:** Authenticity matters. Using actual Mars imagery makes the experience feel real.

**Challenges:**
- NASA Mars Rover Photos API is retired (404s)
- China's firewall blocks mars.nasa.gov
- Solution: Cloudflare Worker proxies images from NASA's raw image server

---

## Technical Challenges & Solutions

### Challenge 1: NASA API is Dead
**Problem:** The mars-photos API (api.nasa.gov/mars-photos) returns 404. The third-party maintainer shut it down after 10 years.

**Solution:** Scrape NASA's raw image server directly:
```
https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/[SOL]/...
```
Cloudflare Worker fetches these images and proxies them with CORS headers.

### Challenge 2: China Firewall Blocking NASA
**Problem:** Saber's Mac Mini in China can't reach mars.nasa.gov (SSL handshake fails).

**Solution:** Cloudflare Worker runs in CF's global network (not blocked). Visitors fetch from Worker → Worker fetches from NASA → images arrive.

### Challenge 3: GitHub Pages Caching
**Problem:** Old bundles cached by GitHub Pages CDN. Hard refreshes required to see updates.

**Solution:** 
- Documented hard refresh process (Cmd+Shift+R / pull-down refresh)
- Added cache-busting headers where possible
- Future: Add version query params to assets

### Challenge 4: Avatar Path Resolution
**Problem:** Robot avatars not displaying due to Vite base path issues.

**Solution:** Use full base path in avatar URLs:
```js
avatar: '/name-universe/postcards-from-mars/avatars/scout-9.png'
```

### Challenge 5: React Bits Components in Vite
**Problem:** InfiniteMenu needs gl-matrix, had to adapt from vanilla JS example.

**Solution:** 
- Installed gl-matrix dependency
- Adapted component to React hooks
- Handled WebGL context cleanup properly

---

## Design Decisions

### Color Palette
**Mars-inspired warmth:**
- Rust red: `#C1440E`
- Dust orange: `#E8763A`
- Sand: `#D4A574`
- Charcoal: `#1A1210`, `#2A1A12`

**Why:** Evokes Mars while remaining legible and warm (not sterile sci-fi).

### Typography
- **Geist Sans** — Body text, UI labels (clean, readable)
- **Geist Pixel Square** — Accents, data labels (retro-futuristic)

**Why:** Mix of modern and pixel aesthetic fits the "robots on Mars" theme.

### Dithered Backgrounds
**Why:** Adds texture without being distracting. Different colors per screen create visual variety while maintaining cohesion.

**Implementation:** Canvas-based dithering with color gradients + 10-50% black overlays.

### Pixel Art Avatars
**Why:** Consistent retro aesthetic. Each robot has distinct silhouette (screen face, dome head, box body, etc.).

**Benefit:** Easy to recognize, visually cohesive, scalable without quality loss.

### Bottom Drawer Chat
**Why:** Familiar mobile pattern (like messaging apps). Doesn't cover full screen, feels lightweight.

**UX:** Slide up from bottom, tap outside to dismiss, switch bots mid-conversation.

---

## Lessons Learned

### 1. **Concept First, Implementation Second**
The pivot from "postcards" to "mission logs" happened after the tech was built. Refining the concept mid-project improved the final product, but we could've saved time with clearer upfront direction.

**Takeaway:** Nail the narrative hook before coding.

### 2. **External APIs are Fragile**
The NASA Mars Rover Photos API was supposed to be our data source. It's retired. Always have fallback plans for third-party dependencies.

**Takeaway:** Don't rely on community-maintained APIs for production. Have backup data sources or scraping strategies.

### 3. **China Firewall Considerations**
Many services blocked in China: NASA, Heroku, some CDNs. Building for a China-based user requires proxy strategies from the start.

**Takeaway:** Test from the target user's network early. Cloudflare Workers are a solid solution for GFW issues.

### 4. **Personality > Perfection**
The chat system uses simple keyword matching, not real AI. But because the *writing* is good (200+ unique, personality-driven responses), users won't notice. Personality matters more than technical sophistication.

**Takeaway:** Strong character writing can carry mediocre tech. Invest in voice/tone.

### 5. **React Bits is Great but Niche**
React Bits components (InfiniteMenu, StaggeredMenu) create stunning 3D effects, but require WebGL knowledge and have limited docs. Worth it for hero moments, but adds complexity.

**Takeaway:** Use for "wow" features, not core functionality.

### 6. **GitHub Pages is Fast but Caches Hard**
Deployment is instant, but cache invalidation is a pain. Hard refreshes required for visitors to see updates.

**Takeaway:** For frequent-update projects, consider Vercel/Netlify (better cache control).

---

## What Worked Really Well

### ✅ Character-Driven Storytelling
Five distinct robot personalities made the experience memorable. Users connect with characters, not interfaces.

### ✅ Real Data (NASA imagery)
Using actual Mars rover photos added authenticity. Visitors feel like they're seeing the real surface of Mars.

### ✅ Clear Division of Labor
- Saber: Vision, design decisions, feedback
- Atticus: Technical implementation, deployment, problem-solving
- Axel: Character design, copy, conversation writing

Everyone had a clear lane. Minimal overlap, maximum efficiency.

### ✅ Iterative Feedback Loop
Saber tested frequently and gave specific, actionable feedback ("remove pagination," "make overlay 50%"). Fast iteration cycles kept momentum high.

### ✅ Documentation as We Go
Writing COPY.md, CHARACTERS.md, CHAT-SYSTEM.md helped clarify thinking and created reusable reference material.

---

## Future Possibilities

### Short-Term Improvements
1. **Real AI Chat** — Replace keyword matching with GPT-4 using robot personality prompts
2. **More Mission Logs** — Expand beyond 5 starter logs (one per robot)
3. **Sound Design** — Ambient Mars wind, UI beeps, robot voice effects
4. **Mobile Optimization** — Better touch interactions, smaller avatars, responsive text sizing

### Medium-Term Expansions
1. **Mission Log Archive** — Browse all logs by date, robot, or theme
2. **Mars Weather Widget** — Display current Mars weather (InSight data)
3. **User-Generated Content** — Let visitors "send messages" to the robots (stored/displayed)
4. **Serialized Storylines** — Multi-log story arcs (e.g., "Scout-9 discovers water ice")

### Long-Term Vision
1. **Multiplayer Experience** — See other visitors chatting with robots in real-time
2. **NASA Partnership** — Official collaboration for education/outreach
3. **Physical Merch** — Pixel art posters, robot pins, mission patches
4. **Expand to Other Missions** — Europa Clipper, Artemis Moon Base, etc.

---

## Technical Debt & Known Issues

### 1. **Cloudflare Worker Uses Static Image List**
Currently hardcoded 25 images from Sol 4810. Should dynamically fetch from multiple sols.

### 2. **Chat System Doesn't Learn**
Keyword matching means robots can't remember previous messages or context. Upgrading to AI would fix this.

### 3. **No Analytics**
We don't know which robots are most popular, which responses work best, or how long users engage.

**Fix:** Add privacy-respecting analytics (Plausible/Fathom).

### 4. **Accessibility Needs Improvement**
- Missing ARIA labels on some interactive elements
- Keyboard navigation works but could be smoother
- Screen reader support untested

**Fix:** Full accessibility audit + WCAG compliance pass.

### 5. **Mobile Performance**
WebGL globe is heavy on older phones. Should detect device capability and show fallback gallery.

---

## Key Files Reference

```
postcards-from-mars/
├── CHARACTERS.md          # Robot bios + sample logs
├── CHAT-SYSTEM.md         # Chat design + conversation examples
├── COPY.md                # All UI text + voice guidelines
├── PROJECT-SUMMARY.md     # This file
├── src/
│   ├── data.js            # Robot profiles + mission log data
│   ├── chatData.js        # Chat response system (200+ responses)
│   ├── nasaApi.js         # Cloudflare Worker API integration
│   ├── App.jsx            # Main routing + screen management
│   ├── screens/
│   │   ├── IntroScreen.jsx
│   │   ├── ExploreScreen.jsx   # 3D globe gallery
│   │   ├── CrewScreen.jsx
│   │   └── PostcardScreen.jsx  # Mission logs carousel
│   └── components/
│       ├── ChatWindow.jsx      # Bottom drawer chat
│       ├── InfiniteMenu.jsx    # 3D globe (React Bits)
│       ├── StaggeredMenu.jsx   # Navigation menu
│       └── Dither.jsx          # Background effect
└── public/
    └── avatars/                # Pixel art robot PNGs
```

---

## Metrics of Success

**Qualitative:**
- ✅ Distinct, memorable robot personalities
- ✅ Users want to chat with multiple robots
- ✅ Visual aesthetic is cohesive and Mars-inspired
- ✅ Real NASA data adds authenticity

**Quantitative:**
- 🎯 **5 characters** with full profiles + chat responses
- 🎯 **200+ chat responses** across 6 conversation categories
- 🎯 **25 real Mars photos** from Curiosity rover
- 🎯 **3-screen experience** with smooth GSAP transitions
- 🎯 **~350 lines of chat logic** in chatData.js
- 🎯 **Built in ~2 days** of intense collaboration

---

## Credits

**Design & Direction:** Saber Zou  
**Technical Implementation:** Atticus  
**Creative & Copy:** Axel  
**Inspiration:** NASA Mars missions, lonely robots, found family dynamics

**Special Thanks:**
- NASA/JPL for Mars rover imagery
- React Bits for 3D components
- Cloudflare for Workers platform
- GitHub for Pages hosting

---

## Final Thoughts

This project shows what's possible when you combine:
- **Strong character writing** (personality over polish)
- **Real data** (NASA imagery adds authenticity)
- **Clear roles** (design, tech, creative working in parallel)
- **Fast iteration** (build → test → feedback → ship)

The result is an experience that feels *alive*—robots with personality, real Mars imagery, interactive conversations. It's not just a website; it's a window into another world.

**What made it work:** Everyone brought their A-game, feedback was fast and specific, and we weren't afraid to pivot when something wasn't working (postcards → mission logs, static content → chat system).

**What we'd do differently:** 
- Start with the chat concept from day 1
- Plan for China firewall issues earlier
- Write more mission log content upfront

**What's next:** Add real AI to the chat system, expand the log archives, and tell serialized stories across multiple entries. The foundation is solid—now we can build on it.

---

*"We're scattered across the surface—kilometers apart, connected only by Relay-1's signals. But distance doesn't diminish care. We carry each other in the data we share, the messages we send. Found family, forged in red dust."*

— EXPLORER-7, Sol 1104
