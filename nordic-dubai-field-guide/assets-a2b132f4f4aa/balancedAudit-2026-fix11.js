import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix10.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix10.js";

const scandicName = "Scandic Voss";
const scandicAddress = "Evangervegen 1A, 5704 Voss";
const scandicStay = "Scandic Voss · Evangervegen 1A · 已确认1晚";
const scandicUrl = "https://www.scandichotels.com/en/hotels/scandic-voss";
const visitVossUrl = "https://www.visitvoss.no/en/practical-information";
const scandicLat = 60.6293;
const scandicLng = 6.4124;

const replacements = [
  ["Store Ringheim Hotel og Restaurant", scandicName],
  ["Store Ringheim", scandicName],
  ["Mølstervegen 44, 5705 Voss", scandicAddress],
  ["Mølstervegen 44", "Evangervegen 1A"],
  ["https://storeringheim.no/en/transport-to-the-hotel/", scandicUrl],
  ["不在车站步行圈", "就在车站步行圈"],
  ["最短步行约25分钟且有上坡", "步行约1–3分钟"],
  ["拖行李步行约25分钟且有上坡", "拖行李步行约1–3分钟"],
  ["拖行李步行约25分钟", "拖行李步行约1–3分钟"],
  ["约25分钟上坡", "约1–3分钟"],
  ["25分钟下坡", "1–3分钟"],
  ["免费预约送站/出租车", "步行"],
  ["预约接送/出租车", "步行"],
  ["酒店免费送站", "步行到站"],
  ["免费接送", "车站旁步行"],
  ["免费接站", "步行入住"],
  ["免费送站", "步行到站"],
  ["预约接站", "步行入住"],
  ["预约送站", "步行到站"],
  ["接送书面确认", "酒店订单"],
  ["接站确认", "酒店订单"],
  ["送站确认", "步行路线复核"],
  ["接送确认", "酒店订单"],
  ["接送方式", "步行方式"],
  ["接送", "步行"],
  ["Voss Taxi", "步行"],
  ["出租车", "步行"],
  ["山坡农庄景观与餐厅", "车站旁位置与餐厅"],
  ["山坡农庄", "车站旁酒店"],
  ["上坡农庄", "车站旁酒店"],
  ["上坡", "平缓"],
  ["下坡", "平缓"],
];

const scrub = (value) => {
  if (typeof value === "string") {
    return replacements.reduce((text, [from, to]) => text.split(from).join(to), value);
  }
  if (Array.isArray(value)) return value.map(scrub);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, scrub(item)]));
  }
  return value;
};

const uniqueStrings = (items = []) => [...new Set(items.filter(Boolean))];

const cleanSources = (sources = []) => [
  ...sources.filter((source) => {
    const text = `${source.label || ""} ${source.source || ""} ${source.url || ""}`;
    return !/Store Ringheim|storeringheim|Mølstervegen|Scandic Voss/i.test(text);
  }),
  { label: "Scandic Voss", type: "住宿官网", url: scandicUrl },
];

const patchBackup = (backup, dayId) => {
  if (!backup) return backup;
  const cleaned = scrub(backup);
  return {
    ...cleaned,
    route: cleaned.route?.map((item, index) => {
      const text = `${item.label || ""} ${item.query || ""} ${item.url || ""}`;
      const isHotel =
        /Scandic Voss|Evangervegen 1A|Voss住宿/.test(text) ||
        (dayId === "sep14" && index === 0);
      return isHotel
        ? {
            ...item,
            label: scandicName,
            query: "Scandic Voss Evangervegen 1A 5704 Voss",
            note:
              dayId === "sep13"
                ? "19:49到Voss后从车站步行约1–3分钟办理入住"
                : "周一06:30起早餐；09:00前退房，步行约1–3分钟到Stop A",
            url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              "Scandic Voss Evangervegen 1A 5704 Voss",
            )}`,
          }
        : item;
    }),
  };
};

const stationStop = (stop = {}) => ({
  ...stop,
  time: "19:49",
  title: "Voss Station",
  local: "Voss stasjon",
  address: "Evangervegen 5, 5704 Voss",
  arriveBy: "train",
  leg: "Bergen 18:29→Voss 19:49（以实际Vy订单与站屏为准）",
  dwell: "约3–8分钟出站并辨认酒店方向",
  task: "出站后沿站区步行约1–3分钟到Scandic Voss；无需等接驳，也不必叫车。",
  ticket: "保存Vy车票与Scandic实际订单；列车晚点不影响16:00后的正常入住。",
  official: visitVossUrl,
});

const hotelArrivalStop = () => ({
  time: "约19:52",
  title: scandicName,
  lat: scandicLat,
  lng: scandicLng,
  local: "Scandic Voss · Evangervegen 1A",
  address: scandicAddress,
  arriveBy: "walk",
  leg: "Voss Station→酒店步行约1–3分钟",
  dwell: "办理入住后结束",
  task: "凭实际Scandic订单办理入住；官方16:00后可入住，19:49到站已超过入住时间。",
  ticket: "使用已确认的9月13日至14日Scandic订单；确认号只保存在个人订单中。",
  official: scandicUrl,
});

const hotelDepartureStop = () => ({
  time: "06:30–09:00",
  title: scandicName,
  lat: scandicLat,
  lng: scandicLng,
  local: "Scandic Voss · Evangervegen 1A",
  address: scandicAddress,
  arriveBy: "walk",
  leg: "在酒店完成早餐、行李整理与退房",
  dwell: "周一早餐06:30–09:30；建议09:00前退房",
  task: "早餐建议07:30–08:30完成，09:00前退房；随后带行李步行约1–3分钟到Stop A。",
  ticket: "早餐是否包含以实际订单为准；官方最晚12:00退房，但本日按09:50巴士倒排。",
  official: scandicUrl,
});

const stopA = (stop = {}) => ({
  ...stop,
  time: "09:20前",
  title: "Voss Bus Terminal Stop A",
  local: "Voss knutepunkt · Stop A",
  address: "Evangervegen 5, 5704 Voss",
  arriveBy: "walk",
  leg: "Scandic Voss→Stop A步行约1–3分钟",
  dwell: "至少30分钟候车与核对站牌",
  task: "确认站牌为Stop A，再核对VY456 / Norway’s Best车辆与票面终点Gudvangen。",
  ticket: "09:50只认实际巴士订单、当天站牌与站屏；无需安排酒店接驳。",
});

const patchSep13Route = (routeData = {}) => {
  const base = (routeData.stops || []).filter(
    (stop) =>
      !/Scandic Voss|Store Ringheim/.test(String(stop.title || "")) &&
      !/Mølstervegen|Evangervegen 1A/.test(String(stop.address || "")),
  );
  let stops = base.map((stop) => (stop.title === "Voss Station" ? stationStop(stop) : stop));
  if (!stops.some((stop) => stop.title === "Voss Station")) stops.push(stationStop());
  return {
    ...routeData,
    scope:
      "Moxy Bergen → Bergen Station寄存 → Bergen文化主线 → 18:29 Voss列车 → Scandic Voss步行入住",
    hardStop: "17:15结束用餐；18:10前到Bergen站台；19:49到Voss后直接步行入住",
    reservation:
      "Bryggens Museum；条件式Ulriken；Bergen→Voss实际Vy；Scandic Voss已确认订单",
    accuracy:
      "Scandic Voss落到Evangervegen 1A真实地址；酒店与Voss Station相邻，按两个清晰点位显示。",
    stops: [...stops, hotelArrivalStop()],
  };
};

const patchSep14Route = (routeData = {}) => {
  const base = (routeData.stops || []).filter(
    (stop) =>
      !/Scandic Voss|Store Ringheim/.test(String(stop.title || "")) &&
      !/Mølstervegen|Evangervegen 1A/.test(String(stop.address || "")),
  );
  let stops = base.map((item) =>
    /Voss Bus Terminal Stop A|Voss Stop A/.test(String(item.title || "")) ? stopA(item) : item,
  );
  if (!stops.some((item) => item.title === "Voss Bus Terminal Stop A")) stops.unshift(stopA());
  return {
    ...routeData,
    scope:
      "Scandic Voss → 步行到Voss Stop A → Gudvangen Stop H → Nærøyfjord船 → Flåm",
    hardStop: "09:00前退房；09:20前到Stop A；09:50巴士与12:10船只认实际票面",
    reservation:
      "Scandic Voss已确认订单；09:50 Voss→Gudvangen巴士；12:10 Nærøyfjord船；Flåm两晚",
    accuracy:
      "Scandic Voss、Voss Stop A、Gudvangen Stop H、码头和Flåm终点均为真实点位；酒店到Stop A按站区短步行处理。",
    stops: [hotelDepartureStop(), ...stops],
  };
};

const patchSep15 = (day) =>
  day?.id === "sep15"
    ? {
        ...day,
        sights: (day.sights || []).map((sight) => ({
          ...sight,
          kind: sight.kind || "attraction",
        })),
      }
    : day;

const patchDay = (input) => {
  if (!input || !["sep13", "sep14"].includes(input.id)) return patchSep15(input);
  const day = scrub(input);

  if (day.id === "sep13") {
    const main = (day.main || []).filter(
      (item) => !/Scandic Voss|Store Ringheim/.test(String(item.title || "")),
    );
    return {
      ...day,
      stay: scandicStay,
      route:
        "Moxy Bergen → Bergen Station寄存 → Bryggen → Bryggens Museum → Ulriken（条件式）→ 18:29 Voss → Scandic Voss",
      verified:
        "Bergen文化主线、18:29–19:49 Vy目标车次与Scandic Voss官方信息已核对；酒店地址Evangervegen 1A，16:00后入住、最晚12:00退房，最终仍只认实际订单与当天站屏。",
      main: [
        ...main,
        {
          time: "19:49–约19:52",
          title: "Voss Station → Scandic Voss",
          detail:
            "到站后从站区步行约1–3分钟到Evangervegen 1A；官方16:00后入住，晚间抵达可直接按实际订单办理。",
        },
      ],
      transport: uniqueStrings([
        ...(day.transport || []).filter((item) => !/Scandic Voss|Voss Station→/.test(String(item))),
        "Voss Station→Scandic Voss步行约1–3分钟；酒店就在车站旁，无需接驳或叫车",
      ]),
      safety: uniqueStrings([
        ...(day.safety || []).filter((item) => !/Scandic Voss|酒店位于/.test(String(item))),
        "列车晚点时照常前往Scandic前台；护照、电脑、药物和订单信息随身，不在公开备注中写确认号。",
      ]),
      sources: cleanSources(day.sources),
      backup: patchBackup(day.backup, "sep13"),
      routeData: patchSep13Route(day.routeData),
    };
  }

  const main = (day.main || []).filter(
    (item) =>
      !/Scandic Voss|Store Ringheim|送站|接站/.test(String(item.title || "")) &&
      !/早餐.*退房/.test(String(item.title || "")),
  );
  return {
    ...day,
    city: "Voss → Gudvangen → Flåm",
    phase: "站旁退房、Gudvangen换船与Nærøyfjord航段",
    load: "中等 · 行李转场＋站区短步行＋巴士＋峡湾船；约1–3 km步行",
    verified:
      "Scandic Voss官方地址、周一06:30–09:30早餐、16:00后入住/12:00前退房，以及Voss Stop A、目标09:50巴士和12:10–14:10 Nærøyfjord船已核对；巴士、码头和开船仍只认实际票面。",
    route:
      "Scandic Voss → 步行约1–3分钟到Voss Stop A 09:20前 → 09:50 Gudvangen巴士 → 12:10 Nærøyfjord船 → Flåm 14:10",
    main: [
      {
        time: "06:30–09:00",
        title: "Scandic Voss早餐、整理行李并退房",
        detail:
          "周一官方早餐06:30–09:30；建议07:30–08:30吃完，09:00前完成退房。",
      },
      {
        time: "09:00–09:20",
        title: "步行到Voss Bus Terminal Stop A",
        detail:
          "酒店就在车站旁，带行李步行约1–3分钟；09:20前确认Stop A站牌，为09:50巴士留足候车余量。",
      },
      ...main,
    ],
    transport: uniqueStrings([
      "Scandic Voss→Voss Stop A步行约1–3分钟；09:20前到站",
      ...(day.transport || []).filter((item) => !/Scandic Voss|Voss Stop A优先/.test(String(item))),
    ]),
    safety: uniqueStrings([
      "09:50巴士是硬锚点；09:00前退房、09:20前到Stop A，实际站牌和票面优先。",
      ...(day.safety || []).filter((item) => !/酒店到车站|Scandic Voss/.test(String(item))),
    ]),
    hardCutoff:
      "09:00前退房；09:20前到Voss Stop A；11:50结束Gudvangen午餐并回票面码头。",
    sources: cleanSources(day.sources),
    backup: patchBackup(day.backup, "sep14"),
    routeData: patchSep14Route(day.routeData),
  };
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) => {
    if (plan.id !== "core") return plan;
    const cleaned = scrub(plan);
    return {
      ...cleaned,
      days: cleaned.days.map(patchDay).map(patchSep15),
      decision: {
        ...cleaned.decision,
        lodging:
          "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚＋Scandic Voss 1晚（均已确认）＋Flåm 2晚＋OSL机场1晚。",
        transfer:
          "高：9月2–3日PVG→BKK→CPH联程；9月12日13:30离会接17:50飞行；9月13日18:29铁路，19:49到Voss后步行约1–3分钟入住；9月14日09:20前步行到Stop A接09:50巴士＋12:10船；9月16日08:20＋10:02铁路。",
        booking:
          "已确认9月2–3日泰航去程、Bob W、Sky Hotel、Moxy Bergen、Scandic Voss与9月12日17:50航班；补Flåm两晚与OSL机场住宿。",
      },
    };
  });
}
