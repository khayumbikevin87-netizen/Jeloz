export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/fixtures") {
      if (!env.API_FOOTBALL_KEY) {
        return json({
          error: "API_FOOTBALL_KEY is not configured."
        }, 500);
      }

      const date =
        url.searchParams.get("date") ||
        new Date().toISOString().slice(0, 10);

      const api = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${encodeURIComponent(date)}`,
        {
          headers: {
            "x-apisports-key": env.API_FOOTBALL_KEY,
            "accept": "application/json"
          }
        }
      );

      const body = await api.text();

      return new Response(body, {
        status: api.status,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store"
        }
      });
    }

    return new Response("JELOZ Football API is running.");
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json"
    }
  });
}
