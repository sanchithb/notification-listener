# When Google Maps Outsmarts You: A Scraping Story

[![Article](https://img.shields.io/badge/Medium-Read%20Article-black?logo=medium)](https://medium.com/@sanchithbanand/when-google-maps-outsmarts-you-a-scraping-story-1406c19fe5c1)
[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android)](https://developer.android.com/)

> **Or: How I Learned That Not Everything Is Scrapable.** > This repository contains the post-mortem and technical findings of an attempt to intercept Google Maps navigation data for non-WearOS devices.

---

## 📌 Project Overview

The goal was simple: Intercept Google Maps navigation notifications on Android and broadcast them as local notifications. This would allow non-WearOS smartwatches to receive turn-by-turn directions without official integration.

### The "Brilliant" Plan:
1. Access the notification payload via a `NotificationListenerService`.
2. Parse the text for street names, distances, and arrival times.
3. Extract the direction (Turn Left/Right/Straight).
4. Re-push the data as a custom local notification.

---

## 🛠️ The Technical "Gotcha"

While street names and distances were easily accessible as standard strings, the project hit a brick wall with **navigation icons**.

### Findings:
* **The Image Trap:** Unlike standard notifications, the direction arrows in Google Maps are rendered as dynamic images within the notification layout. 
* **RemoteViews:** Google Maps utilizes `RemoteViews` to inflate custom XML layouts in the notification shade, making the most critical data (the direction arrow) inaccessible to standard text scrapers.
* **Process Isolation:** Due to Android's security model, these dynamically rendered views are containerized, preventing third-party apps from easily "peeking" into the image data without root or high-level accessibility hacks.

---

## 📉 Project Status: Post-Mortem 🪦

**Result:** Failed (But educational).

This project is currently archived as a "Scraping Story." It serves as a reminder that:
1. **UX Design ≠ Scraper Friendly:** Using images for icons is great for localization and resolution scaling, but a nightmare for automation.
2. **Accessibility Layer Limits:** Screen readers don't always expose the same data that a visual UI does.
3. **API First:** Always check for an official API (like the Google Maps SDK) before attempting to scrape system-level UI components.

---

## 🧠 Lessons Learned

* Deep-dive into **Android Notification Structure**.
* Understanding the limitations of `RemoteViews`.
* The importance of testing technical assumptions (like data types) before building full parsing systems.

---

## ✍️ Author

**Sanchith B Anand**
* Medium: [@sanchithbanand](https://medium.com/@sanchithbanand)
* LinkedIn: [Sanchith B Anand](https://www.linkedin.com/in/sanchithbanand/)

---

### License
This project is for educational purposes. Feel free to use the findings for your own (hopefully more successful) projects!
