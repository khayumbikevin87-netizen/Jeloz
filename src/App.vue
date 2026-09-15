<template>
<div class="app">
  <header class="header">
    <div>
      <div class="logo">JELOZ</div>
      <div class="subtitle">Football Match Intelligence</div>
    </div>

    <div class="status">
      <span class="dot"></span>
      SYSTEM READY
    </div>
  </header>

  <main>
    <section class="hero">
      <div>
        <p class="eyebrow">AI MATCH SCANNER</p>
        <h1>Find the strongest football opportunities.</h1>
        <p class="description">
          JELOZ combines fixtures, team form, squad information,
          odds and other match factors to identify stronger opportunities.
        </p>
      </div>

      <button class="scan-btn" @click="scanMatches">
        SCAN MATCHES
      </button>
    </section>

    <section class="stats">
      <div class="stat-card">
        <span>Matches</span>
        <strong>{{ matches.length }}</strong>
      </div>

      <div class="stat-card">
        <span>Strong Signals</span>
        <strong>{{ strongSignals }}</strong>
      </div>

      <div class="stat-card">
        <span>Positive EV</span>
        <strong>{{ positiveEV }}</strong>
      </div>
    </section>

    <section class="controls">
      <button
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        All Matches
      </button>

      <button
        :class="{ active: filter === 'strong' }"
        @click="filter = 'strong'"
      >
        Strong Only
      </button>

      <button
        :class="{ active: filter === 'ev' }"
        @click="filter = 'ev'"
      >
        Positive EV
      </button>
    </section>

    <section class="matches">
      <div v-if="filteredMatches.length === 0" class="empty">
        <div class="empty-icon">⚽</div>
        <h2>Waiting for real fixtures</h2>
        <p>
          Connect the API-Football data source to begin scanning
          today's matches.
        </p>
      </div>

      <article
        v-for="match in filteredMatches"
        :key="match.id"
        class="match-card"
      >
        <div class="match-top">
          <span>{{ match.league }}</span>
          <span>{{ match.time }}</span>
        </div>

        <div class="teams">
          <strong>{{ match.home }}</strong>
          <span>VS</span>
          <strong>{{ match.away }}</strong>
        </div>

        <div class="prediction">
          <div>
            <small>PREDICTION</small>
            <strong>{{ match.prediction }}</strong>
          </div>

          <div>
            <small>CONFIDENCE</small>
            <strong>{{ match.confidence }}%</strong>
          </div>

          <div>
            <small>EV</small>
            <strong>{{ match.ev }}%</strong>
          </div>
        </div>

        <div class="factors">
          <span>Form ✓</span>
          <span>Squad —</span>
          <span>Travel —</span>
          <span>Weather —</span>
        </div>
      </article>
    </section>

    <div class="notice">
      <strong>JELOZ Intelligence</strong>
      <p>
        Real football data will be connected next. The prediction engine
        will then analyze fixtures instead of using placeholder matches.
      </p>
    </div>
  </main>
</div>
</template>

<script setup>
import { computed, ref } from "vue";

const filter = ref("all");

const matches = ref([
{
  id: 1,
  league: "Waiting for API-Football",
  time: "--:--",
  home: "Real Fixtures",
  away: "Loading...",
  prediction: "Pending",
  confidence: 0,
  ev: 0
}
]);

const strongSignals = computed(() => {
return matches.value.filter(match => match.confidence >= 75).length;
});

const positiveEV = computed(() => {
return matches.value.filter(match => match.ev > 0).length;
});

const filteredMatches = computed(() => {
if (filter.value === "strong") {
  return matches.value.filter(match => match.confidence >= 75);
}

if (filter.value === "ev") {
  return matches.value.filter(match => match.ev > 0);
}

return matches.value;
});

function scanMatches() {
console.log("JELOZ scanner started");
}
</script>

<style>
* {
box-sizing: border-box;
}

body {
margin: 0;
font-family: Inter, Arial, sans-serif;
background: #07111f;
color: #f4f7fb;
}

button {
font: inherit;
}

.app {
min-height: 100vh;
background:
  radial-gradient(circle at top right, #12345a 0, transparent 35%),
  #07111f;
}

.header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 24px 6%;
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
font-size: 30px;
font-weight: 900;
letter-spacing: 3px;
}

.subtitle {
color: #8fa2b8;
font-size: 13px;
margin-top: 3px;
}

.status {
color: #8fa2b8;
font-size: 12px;
display: flex;
align-items: center;
gap: 8px;
}

.dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: #43e59b;
}

main {
width: min(1100px, 90%);
margin: auto;
padding: 45px 0;
}

.hero {
display: flex;
justify-content: space-between;
align-items: center;
gap: 30px;
padding: 45px;
border-radius: 24px;
background: rgba(16, 32, 53, 0.8);
border: 1px solid rgba(255, 255, 255, 0.08);
}

.eyebrow {
color: #43e59b;
font-size: 12px;
font-weight: 800;
letter-spacing: 2px;
}

h1 {
max-width: 650px;
font-size: clamp(32px, 5vw, 58px);
line-height: 1;
margin: 15px 0;
}

.description {
color: #9fb0c4;
max-width: 650px;
line-height: 1.7;
}

.scan-btn {
border: 0;
border-radius: 12px;
padding: 16px 24px;
background: #43e59b;
color: #06131e;
font-weight: 900;
cursor: pointer;
white-space: nowrap;
}

.stats {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 15px;
margin: 25px 0;
}

.stat-card {
background: #0d1b2d;
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 16px;
padding: 22px;
}

.stat-card span {
display: block;
color: #879bb1;
font-size: 13px;
}

.stat-card strong {
display: block;
font-size: 30px;
margin-top: 8px;
}

.controls {
display: flex;
gap: 10px;
margin-bottom: 20px;
}

.controls button {
border: 1px solid rgba(255, 255, 255, 0.1);
background: #0d1b2d;
color: #aebed0;
border-radius: 10px;
padding: 10px 15px;
cursor: pointer;
}

.controls button.active {
background: #43e59b;
color: #06131e;
font-weight: 800;
}

.empty {
text-align: center;
padding: 70px 20px;
background: #0d1b2d;
border-radius: 20px;
border: 1px solid rgba(255, 255, 255, 0.07);
}

.empty-icon {
font-size: 45px;
}

.empty h2 {
margin-bottom: 8px;
}

.empty p {
color: #879bb1;
}

.match-card {
background: #0d1b2d;
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 20px;
padding: 25px;
margin-bottom: 15px;
}

.match-top {
display: flex;
justify-content: space-between;
color: #8296ad;
font-size: 13px;
}

.teams {
display: grid;
grid-template-columns: 1fr auto 1fr;
gap: 15px;
align-items: center;
text-align: center;
margin: 30px 0;
}

.teams strong {
font-size: 20px;
}

.teams span {
color: #43e59b;
font-weight: 900;
}

.prediction {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 15px;
padding: 18px;
background: #081522;
border-radius: 14px;
}

.prediction small {
display: block;
color: #73869d;
font-size: 10px;
margin-bottom: 5px;
}

.prediction strong {
font-size: 18px;
}

.factors {
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-top: 15px;
}

.factors span {
background: #14263b;
color: #9db0c5;
padding: 7px 10px;
border-radius: 8px;
font-size: 12px;
}

.notice {
margin-top: 25px;
padding: 20px;
border-left: 3px solid #43e59b;
background: #0d1b2d;
border-radius: 10px;
}

.notice strong {
color: #43e59b;
}

.notice p {
color: #8fa2b8;
line-height: 1.6;
margin-bottom: 0;
}

@media (max-width: 700px) {
.header {
  padding: 18px 5%;
}

main {
  width: 92%;
  padding: 25px 0;
}

.hero {
  padding: 28px;
  display: block;
}

.scan-btn {
  margin-top: 20px;
  width: 100%;
}

.stats {
  grid-template-columns: 1fr;
}

.prediction {
  grid-template-columns: 1fr;
}

.teams {
  grid-template-columns: 1fr;
}

.controls {
  overflow-x: auto;
}
}
</style>