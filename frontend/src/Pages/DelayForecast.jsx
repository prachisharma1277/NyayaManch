import React from "react";
import Footer from "../components/Footer";
import "./DelayForecast.css";

import {
  simulatedMapData,
  getDelayColor,
  topDelayData,
} from "./delayForecastData";

/* 🔥 HEATMAP GRID COMPONENT */
const JudicialHeatmapGrid = () => (
  <div className="heatmap-grid">
    {simulatedMapData.map((region) => (
      <div
        key={region.name}
        className="heatmap-region"
        style={{
          backgroundColor: getDelayColor(region.delay),
          border: `1px solid ${region.delay >= 30 ? "white" : "#161b22"}`,
          color: region.delay >= 25 ? "#0d1117" : "#c9d1d9",
          boxShadow: `0 0 8px ${getDelayColor(region.delay)}30`,
          gridArea: region.position.gridArea,
        }}
        title={`${region.name}: ${region.delay} months delay`}
      >
        {region.name}
      </div>
    ))}
  </div>
);

/* 🔥 MAIN COMPONENT */
const DelayForecast = () => {
  return (
    <div>
      <div className="main-content">
        <h1 className="dashboard-header">
          ⚖️ State-wise Judicial Bottleneck Analysis
        </h1>

        {/* TOP GRID */}
        <div className="top-grid">
          {/* MAP PANEL */}
          <div className="map-panel">
            <h3>Judicial Delay Heatmap (Simulated)</h3>
            <JudicialHeatmapGrid />
          </div>

          {/* FORECAST CARD */}
          <div className="forecast-card">
            <div className="forecast-header">
              <h2 className="forecast-title">Adjournment Forecast</h2>
              <button className="close-btn">&times;</button>
            </div>

            <p className="forecast-placeholder">
              ML-based delay prediction coming soon…
            </p>
          </div>
        </div>

        {/* TABLE */}
        <h3 className="table-header">
          📍 Top 5 States & Case Types with Longest Delays
        </h3>

        <table className="data-table">
          <thead>
            <tr>
              <th className="rank"></th>
              <th>Top States & Case Types</th>
              <th>Avg Delay (Months)</th>
              <th>Pending Cases</th>
            </tr>
          </thead>
          <tbody>
            {topDelayData.map((data, index) => (
              <tr key={data.rank}>
                <td className="rank">{data.rank}</td>
                <td>
                  <div className="state-name">{data.state}</div>
                  <div className="case-type">
                    {data.caseType} ({data.subType})
                  </div>
                </td>
                <td className={index === 0 ? "delay-critical" : ""}>
                  {data.avgDelay}
                </td>
                <td>{data.pendingCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default DelayForecast;

