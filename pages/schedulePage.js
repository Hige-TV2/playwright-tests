class SchedulePage {
  constructor(page) {
    this.page = page;
    this.url = "https://sport.tv2.dk/sendeplan";

    // Main content
    this.main = page.locator("main");

    // Events - all schedule items
    this.events = page.locator(
      "article, [class*='event'], [class*='tc_event']",
    );

    // Day sections - find by text content since h3 selectors didn't work
    this.todaySection = page.locator("text=I dag").locator("..").locator("..");
    this.tomorrowSection = page
      .locator("text=I morgen")
      .locator("..")
      .locator("..");

    // Filter functionality (if present)
    this.filterButton = page.locator("text=Filtrér sendeplanen");
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
  }

  /**
   * Get all events for a specific day
   * @param {string} day - "today", "tomorrow", or specific day name
   */
  getEventsForDay(day) {
    switch (day) {
      case "today":
        return this.todaySection
          .locator("..")
          .locator("article, [class*='event']");
      case "tomorrow":
        return this.tomorrowSection
          .locator("..")
          .locator("article, [class*='event']");
      default:
        return this.page
          .locator(`text=${day}`)
          .locator("..")
          .locator("..")
          .locator("article, [class*='event']");
    }
  }

  /**
   * Get events by sport type
   * @param {string} sport - e.g., "Fodbold", "Håndbold", "Tennis"
   */
  getEventsBySport(sport) {
    return this.events.filter({ hasText: sport });
  }

  /**
   * Check if an event has a "Se live" link
   * @param {import('@playwright/test').Locator} event
   */
  async hasLiveLink(event) {
    const liveLink = event.locator("text=Se live");
    return (await liveLink.count()) > 0;
  }
}

module.exports = { SchedulePage };
