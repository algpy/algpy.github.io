import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix14.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix14.js";

const patchStopText = (value) => {
  if (typeof value === "string") {
    return value
      .replaceAll("下车后预留20分平缓", "下车后预留20分上坡")
      .replaceAll("步行500米较陡平缓。", "步行约500米较陡上坡。");
  }
  if (Array.isArray(value)) return value.map(patchStopText);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, patchStopText(nested)]),
    );
  }
  return value;
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id === "core"
      ? {
          ...plan,
          days: plan.days.map((day) =>
            day?.id === "sep15" ? patchStopText(day) : day,
          ),
        }
      : plan,
  );
}
