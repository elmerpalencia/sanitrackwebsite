import { useState } from "react";
import { LinePath, Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { curveMonotoneX } from "@visx/curve";
import { chartStyles } from "./styles";



const MARGIN = { top: 20, right: 20, bottom: 40, left: 45 };
const HEIGHT = 220;

// ─── Admin Chart: multiple departments, actual vs target ───────────────────
export function AdminChart({ data, width = 560 }) {
  const departments = Object.keys(data);
  const [activeDept, setActiveDept] = useState(departments[0]);
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop, tooltipOpen } = useTooltip();

  const chartData = data[activeDept] || [];
  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const xScale = scaleBand({ domain: chartData.map((d) => d.day), range: [0, innerWidth], padding: 0.3 });
  const maxVal = Math.max(...chartData.map((d) => Math.max(d.actual, d.target))) * 1.15;
  const yScale = scaleLinear({ domain: [0, maxVal], range: [innerHeight, 0], nice: true });
  const xMid = (d) => (xScale(d.day) ?? 0) + xScale.bandwidth() / 2;

  const handleMouseMove = (event) => {
    const point = localPoint(event);
    if (!point) return;
    const index = Math.floor((point.x - MARGIN.left) / xScale.step());
    const d = chartData[Math.max(0, Math.min(index, chartData.length - 1))];
    if (!d) return;
    showTooltip({
      tooltipData: d,
      tooltipLeft: event.clientX + 12,
      tooltipTop: event.clientY - 12,
    });
  };

  const compliance = (d) => Math.round((d.actual / d.target) * 100);
  const weeklyAvg = Math.round(chartData.reduce((s, d) => s + compliance(d), 0) / chartData.length);

  return (
    <>
      <style>{chartStyles}</style>
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <p className="chart-title">Weekly Hand Wash Performance</p>
            <p className="chart-subtitle">Actual vs target · {weeklyAvg}% avg compliance this week</p>
          </div>
          <div className="dept-tabs">
            {departments.map((dept) => (
              <button key={dept} className={`dept-tab ${activeDept === dept ? "active" : ""}`} onClick={() => setActiveDept(dept)}>
                {dept}
              </button>
            ))}
          </div>
        </div>

        <svg width="100%" viewBox={`0 0 ${width} ${HEIGHT}`} onMouseMove={handleMouseMove} onMouseLeave={hideTooltip}>
          <LinearGradient id="actualGradient" from="#0ea5e9" to="#0ea5e9" fromOpacity={0.15} toOpacity={0} vertical />
          <Group left={MARGIN.left} top={MARGIN.top}>
            <GridRows scale={yScale} width={innerWidth} stroke="#f1f5f9" strokeDasharray="4,4" numTicks={4} />
            <path
              d={`M ${xMid(chartData[0])} ${yScale(chartData[0].actual)} ${chartData.map((d) => `L ${xMid(d)} ${yScale(d.actual)}`).join(" ")} L ${xMid(chartData[chartData.length - 1])} ${innerHeight} L ${xMid(chartData[0])} ${innerHeight} Z`}
              fill="url(#actualGradient)"
            />
            <LinePath data={chartData} x={xMid} y={(d) => yScale(d.target)} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5,4" curve={curveMonotoneX} />
            <LinePath data={chartData} x={xMid} y={(d) => yScale(d.actual)} stroke="#0ea5e9" strokeWidth={2.5} curve={curveMonotoneX} />
            {chartData.map((d) => (
              <circle key={d.day} cx={xMid(d)} cy={yScale(d.actual)} r={4} fill="#fff" stroke="#0ea5e9" strokeWidth={2} />
            ))}
            {chartData.map((d) => (
              <Bar key={`bar-${d.day}`} x={xScale(d.day) ?? 0} y={0} width={xScale.bandwidth()} height={innerHeight} fill="transparent" />
            ))}
            <AxisBottom top={innerHeight} scale={xScale} stroke="transparent" tickStroke="transparent"
              tickLabelProps={() => ({ fill: "#94a3b8", fontSize: 11, textAnchor: "middle", fontFamily: "DM Sans, sans-serif" })} />
            <AxisLeft scale={yScale} stroke="transparent" tickStroke="transparent" numTicks={4}
              tickLabelProps={() => ({ fill: "#94a3b8", fontSize: 11, textAnchor: "end", dx: -4, fontFamily: "DM Mono, monospace" })} />
          </Group>
        </svg>

        <div className="chart-legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: "#0ea5e9" }} />Actual Washes</div>
          <div className="legend-item"><div className="legend-line" style={{ borderColor: "#94a3b8" }} />Target</div>
        </div>

        {tooltipOpen && tooltipData && (
          <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={{ ...defaultStyles, background: "transparent", boxShadow: "none", padding: 0 }}>
            <div className="tooltip-box">
              <div className="tooltip-day">{tooltipData.day}</div>
              <div className="tooltip-row"><span className="tooltip-label">Actual</span><span className="tooltip-value tooltip-actual">{tooltipData.actual}</span></div>
              <div className="tooltip-row"><span className="tooltip-label">Target</span><span className="tooltip-value tooltip-target">{tooltipData.target}</span></div>
              <div className="tooltip-row">
                <span className="tooltip-label">Compliance</span>
                <span className="tooltip-value" style={{ color: compliance(tooltipData) >= 100 ? "#4ade80" : "#fb923c" }}>{compliance(tooltipData)}%</span>
              </div>
            </div>
          </TooltipWithBounds>
        )}
      </div>
    </>
  );
}