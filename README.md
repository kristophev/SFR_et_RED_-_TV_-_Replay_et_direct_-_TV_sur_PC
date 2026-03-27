# SFR_et_RED_-_TV_-_Replay_et_direct_-_TV_sur_PC
Tampermonkey userscripts for TV on PC experience enhancement on tv.sfr.fr


# TV on PC – Tampermonkey Userscripts  
Enhancing the TV experience on tv.sfr.fr through custom automation, SPA‑aware event handling, and UI improvements.

## 🎯 Overview
This repository contains a set of **Tampermonkey userscripts** designed to improve the TV experience on **tv.sfr.fr**, both for *live TV* and *replay*.  
The project started as a simple enhancement idea and quickly evolved into a deep exploration of **Single Page Applications (SPA)**, DOM mutations, event interception, and browser automation.

These scripts were built and refined through several days of testing, debugging, and learning about the internal mechanics of SPA navigation.

---

## 🚀 Features

### ✔ Live TV enhancements
- Automatic channel switching (zapping)
- Persistent volume control
- Stable event listeners despite DOM regeneration

### ✔ Replay enhancements
- Consistent player detection
- Volume and control synchronization
- SPA‑safe event handling

### ✔ Authentication helper
- Automatic login sequence
- Detection of login state
- Resilience to SPA navigation changes

---

## 🧠 Technical Highlights

### 🔄 SPA Navigation Handling
tv.sfr.fr is a **Single Page Application**, meaning:
- No full page reloads  
- URL changes without navigation  
- DOM rebuilt dynamically  

To handle this, the scripts rely on:
- Intercepting click events  
- Monitoring `history.pushState` and `popstate`  
- Observing DOM mutations  
- Re‑attaching listeners safely  

### 🕳 Shadow DOM Awareness
Some UI components use Shadow DOM.  
The scripts include:
- Safe querying inside shadow roots  
- Protected event listeners  
- Fallback strategies when elements are re‑created

### 🧹 Memory & Stability
During development, issues such as:
- Duplicate listeners  
- Memory leaks  
- Player errors after navigation  

…were identified and fixed through:
- Listener deduplication  
- Cleanup routines  
- URL‑change synchronization logic  

---

## 📁 Repository Structure

/scripts
├── direct.user.js
├── replay.user.js
└── auth.user.js

/docs
├── spa-navigation.md
├── event-handling-strategies.md
└── tampermonkey-internals.md

README.md
LICENSE


---

## 📦 Installation

1. Install **Tampermonkey** (Chrome, Firefox, Edge, etc.)
2. Open the extension dashboard
3. Click **“Create a new script”**
4. Paste the content of one of the `.user.js` files from this repository  
   *or*  
   Use **“Import”** to load the file directly
5. Save and refresh tv.sfr.fr

---

## 🧪 Testing & Validation
These scripts were tested extensively:
- Multiple hours of live TV usage  
- Replay navigation stress tests  
- Rapid channel switching  
- Repeated SPA navigation cycles  

All issues identified during testing were fixed, including:
- Player initialization errors  
- Event listeners lost after navigation  
- Memory accumulation over time  

---

## 📚 Learning Journey
This project was also an opportunity to explore and understand:
- How SPA frameworks manage navigation  
- How to intercept and react to URL changes  
- How to work with Shadow DOM  
- How Tampermonkey injects scripts and interacts with pages  
- How to build resilient automation in dynamic environments  

The `/docs` folder contains detailed notes and explanations for anyone wanting to learn from this experience.

---

## 🛣 Roadmap (optional)
- Add UI overlays for easier control  
- Add keyboard shortcuts  
- Add automatic quality selection  
- Add error‑recovery routines for the player  
- Publish a small “SPA Toolkit for Tampermonkey”  

---

## 📜 License
This project is released under the **MIT License**.  
You are free to use, modify, and distribute it.

---

## 🤝 Contributions
Contributions, suggestions, and improvements are welcome.  
Feel free to open issues or submit pull requests.

Certified 100% IA content @Christophe VERON and @Copilot
