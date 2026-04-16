const { test, expect } = require("../../fixtures");

test.describe("TV guide and channels", () => {
  test.describe.configure({ timeout: 60000 });

  test("TV guide entry points are visible", async ({ tvPage }) => {
    await expect(tvPage.tvGuideHeading).toBeVisible();
    await expect(tvPage.tvGuideLink).toBeVisible();
    await expect(tvPage.channelsLink).toBeVisible();
  });

  test("TV guide and channels links target expected destinations", async ({
    tvPage,
  }) => {
    await expect(tvPage.tvGuideLink).toHaveAttribute("href", /tvtid\.tv2\.dk/);
    await expect(tvPage.channelsLink).toHaveAttribute(
      "href",
      /omtv2\.tv2\.dk\/tv-2s-medier\/kanaler/i,
    );
  });

  test("Channel guide section contains multiple channel links", async ({
    tvPage,
  }) => {
    await expect
      .poll(async () => tvPage.channelGuideLinks.count(), {
        timeout: 20000,
      })
      .toBeGreaterThan(2);

    const firstChannelLink = tvPage.channelGuideLinks.first();
    await expect(firstChannelLink).toHaveAttribute(
      "href",
      /tvtid\.tv2\.dk\/kanal\//,
    );
  });
});
