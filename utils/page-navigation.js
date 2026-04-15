/**
 * Shared navigation helpers for page objects.
 */

function isRetryableNavigationError(error) {
  const message = String(error?.message || "");
  return (
    message.includes("ERR_CONNECTION_TIMED_OUT") ||
    message.includes("ERR_ABORTED") ||
    message.includes("Test timeout") ||
    message.includes("Timeout")
  );
}

async function gotoWithOptions(
  page,
  url,
  { waitUntil = "domcontentloaded", timeout = 45000 } = {},
) {
  await page.goto(url, { waitUntil, timeout });
}

async function gotoWithRetry(
  page,
  url,
  { maxAttempts = 2, waitUntil = "domcontentloaded", timeout = 45000 } = {},
) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await gotoWithOptions(page, url, { waitUntil, timeout });
      return;
    } catch (error) {
      lastError = error;
      if (!isRetryableNavigationError(error) || attempt === maxAttempts) {
        throw error;
      }
    }
  }

  throw lastError;
}

module.exports = {
  gotoWithOptions,
  gotoWithRetry,
};
