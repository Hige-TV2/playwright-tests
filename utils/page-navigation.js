/**
 * Shared navigation helpers for page objects.
 */

function isRetryableNavigationError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("err_connection_timed_out") ||
    message.includes("err_timed_out") ||
    message.includes("err_aborted") ||
    message.includes("chrome-error") ||
    message.includes("interrupted") ||
    message.includes("test timeout") ||
    message.includes("timeout")
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
  { maxAttempts = 3, waitUntil = "domcontentloaded", timeout = 45000 } = {},
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
  gotoWithRetry,
};
