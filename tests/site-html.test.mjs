import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio work page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Raghav Ojha/);
  assert.match(html, /Lagoon/);
  assert.match(html, /StreamCI/);
  assert.match(html, /Agent Studio/);
  assert.match(html, /Hermes Agent/);
  assert.match(html, /hermes-banner\.jpg/);
  assert.doesNotMatch(html, /MonkFish|Enigma Machine/);
  assert.match(html, /1AVfjaOexCgNw2YNR-j9wEER8JvL_SQYQ/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the portfolio about page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /who even is this guy anyway/i);
  assert.match(html, /alive5/i);
  assert.match(html, /quackhacks/i);
  assert.match(html, /github contributions/i);
  assert.match(html, /volcano\.mp4/i);
  assert.match(html, /pika-lumen\.mp4/i);
  assert.match(html, /BERKELEY AI HACKATHON/i);
  assert.match(html, /txst-datathon-team\.jpg/i);
  assert.match(html, /raghav\.ojha\.14122@gmail\.com/i);
  assert.match(html, /t3-code\.svg/i);
  assert.match(html, /hermes-agent\.png/i);
  assert.match(html, /software engineering intern/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});
