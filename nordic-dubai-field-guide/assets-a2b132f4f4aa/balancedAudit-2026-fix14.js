import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix13.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix13.js";

const vatnahalsenMap =
  "https://www.google.com/maps/search/?api=1&query=Vatnahalsen%20H%C3%B8yfjellshotell";

const textReplacements = [
  ["从E16停靠点平缓约500米", "从E16停靠点上坡约500米"],
  ["12:10开始平缓；预留25分", "12:10开始下坡；预留25分"],
  ["平缓、午餐、签到均有明确缓冲", "下坡返程、午餐、签到均有明确缓冲"],
  ["12:10开始平缓。", "12:10开始下坡。"],
  ["Otternes平缓→12:35上车", "Otternes下坡返程→12:35上车"],
  ["12:10开始平缓；13:55到Aurland Stop F。", "12:10开始下坡；13:55到Aurland Stop F。"],
  ["含上平缓", "含上下坡"],
  [
    "14:30到观景台、15:00返程、15:35回Flåm",
    "14:30到观景台、14:50返程、15:35回Flåm",
  ],
];

const patchText = (value) =>
  textReplacements.reduce(
    (result, [before, after]) => result.replaceAll(before, after),
    value,
  );

const patchDeep = (value) => {
  if (typeof value === "string") return patchText(value);
  if (Array.isArray(value)) return value.map(patchDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, patchDeep(nested)]),
    );
  }
  return value;
};

const patchSep15 = (day) => {
  const patched = patchDeep(day);
  return {
    ...patched,
    foods: (patched.foods || []).map((food) =>
      food.name === "Vatnahalsen酒店三道式晚餐"
        ? { ...food, map: vatnahalsenMap }
        : food,
    ),
  };
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id === "core"
      ? {
          ...plan,
          days: plan.days.map((day) =>
            day?.id === "sep15" ? patchSep15(day) : day,
          ),
        }
      : plan,
  );
}
