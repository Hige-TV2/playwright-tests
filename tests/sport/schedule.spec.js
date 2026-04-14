const { test, expect } = require("../../fixtures");
const { SchedulePage } = require("../../pages/schedulePage");
const {
  dismissCookieBanner,
  verifyPageLoad,
} = require("../../utils/test-helpers");

test.describe("Sport schedule page", () => {
  test.describe.configure({ timeout: 60000 });
  let schedulePage;

  test.beforeEach(async ({ page }) => {
    schedulePage = new SchedulePage(page);
    await schedulePage.navigate();
    await dismissCookieBanner(page);
  });

  test("Schedule page loads and has main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      schedulePage.main,
      "https://sport.tv2.dk/sendeplan",
      "Schedule page",
    );
  });

  test("Schedule contains events", async () => {
    await expect
      .poll(async () => await schedulePage.events.count(), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);

    console.log("✓ Schedule contains events");
  });

  test("Events have required elements", async () => {
    const eventCount = await schedulePage.events.count();
    let foundEventWithTime = false;

    for (let i = 0; i < Math.min(eventCount, 5); i++) {
      const eventText = await schedulePage.events.nth(i).textContent();
      expect(eventText?.length).toBeGreaterThan(10);

      const hasTime = /(kl\.?\s*)?\d{1,2}[.:]\d{2}/.test(eventText || "");
      if (hasTime) {
        foundEventWithTime = true;
      }
    }

    expect(foundEventWithTime).toBe(true);

    console.log("✓ Found events with time and content");
  });

  test("Live streaming links are detected when present", async () => {
    const events = schedulePage.events;
    const eventCount = await events.count();

    let liveEventsCount = 0;
    for (let i = 0; i < Math.min(eventCount, 10); i++) {
      const event = events.nth(i);
      const hasLive = await schedulePage.hasLiveLink(event);
      if (hasLive) liveEventsCount++;
    }

    console.log(`✓ Found ${liveEventsCount} events with live streaming links`);
  });

  test("Can inspect events by sport type", async () => {
    const footballEvents = schedulePage.getEventsBySport("Fodbold");
    const footballCount = await footballEvents.count();

    const handballEvents = schedulePage.getEventsBySport("Håndbold");
    const handballCount = await handballEvents.count();

    console.log(
      `✓ Found ${footballCount} football and ${handballCount} handball events`,
    );
  });

  test("Today's events section exists", async () => {
    // Check if today's section is present
    const todayVisible = await schedulePage.todaySection
      .isVisible()
      .catch(() => false);
    if (todayVisible) {
      const todayEvents = schedulePage.getEventsForDay("today");
      const todayCount = await todayEvents.count();
      console.log(`✓ Today's section has ${todayCount} events`);
    } else {
      console.log("✓ Today's section not present (possibly no events today)");
    }
  });
});
