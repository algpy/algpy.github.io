import {
  applyBalancedAuditDay as applyBalancedAuditDayBase,
  applyBalancedHotels as applyBalancedHotelsBase,
  applyBalancedBookings as applyBalancedBookingsBase,
  applyBalancedSources as applyBalancedSourcesBase,
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
  balancedAuditOverrides as balancedAuditOverridesBase,
} from "./balancedAudit-2026-fix5.js";

const moxyUrl = "https://www.marriott.com/en-us/hotels/bgoox-moxy-bergen/overview/";
const moxyAddress = "Solheimsgaten 3, 5058 Bergen";
const moxyCheckIn =
  "到Bar Moxy/前台报姓名，并从个人离线订单出示右上角确认号，现场付款办理入住；如问预订来源，回答“公司行政预订”。酒店当地15:00后办理入住；提前到可先寄存行李。确认号只保存在个人离线订单，不写入本公开网页。";

const replaceDeep = (value, replacements) => {
  if (typeof value === "string") {
    return replacements.reduce((text, [from, to]) => text.split(from).join(to), value);
  }
  if (Array.isArray(value)) return value.map((item) => replaceDeep(item, replacements));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceDeep(item, replacements)]),
    );
  }
  return value;
};

const moxyArrivalStop = (stop = {}) => ({
  ...stop,
  time: "落地+1:25–1:50",
  title: "Moxy Bergen",
  lat: 60.378971,
  lng: 5.3331,
  local: "Moxy Bergen · Bar Moxy / Front Desk",
  address: moxyAddress,
  arriveBy: "tram",
  leg: "BGO→Florida乘Bybanen Line 1约35–45分；Florida站步行约5分",
  dwell: "办理入住后结束",
  task: moxyCheckIn + " 本日为晚间到达，入住后不再夜游。",
  ticket: "使用已激活Skyss票与实际Moxy订单；确认号只从离线订单出示。",
  official: moxyUrl,
});

const moxyDepartureStop = (stop = {}) => ({
  ...stop,
  time: "07:30",
  title: "Moxy Bergen",
  lat: 60.378971,
  lng: 5.3331,
  local: "Moxy Bergen · Solheimsgaten 3",
  address: moxyAddress,
  arriveBy: "walk",
  leg: "住宿内完成补给和退房；随后Florida→Nonneseter/Bergen Station",
  dwell: "约50分含退房、轻轨和车站寄存",
  task:
    "是否含早餐以订单为准；退房后步行约5分到Florida，乘Line 1到Nonneseter，再到Bergen Station寄存大件。贵重物、防风层、水和路餐随身。",
  ticket:
    "使用实际Moxy订单与有效Skyss票；车站寄存按现场柜体、尺寸和支付规则执行。",
  official: moxyUrl,
});

const patchRouteData = (routeData, dayId) => {
  if (!routeData?.stops) return routeData;
  return {
    ...routeData,
    accuracy:
      dayId === "sep12"
        ? "Bergen端已落到Moxy Bergen正门/Bar Moxy；机场乘Bybanen Line 1至Florida，再步行约5分钟。"
        : dayId === "sep13"
          ? "从Moxy Bergen退房，经Florida轻轨到Bergen Station寄存后开始市中心主线。"
          : routeData.accuracy,
    stops: routeData.stops.map((item, index, stops) =>
      dayId === "sep12" &&
      (item.title === "Bergen Station步行圈住宿" ||
        item.title === "Moxy Bergen" ||
        index === stops.length - 1)
        ? moxyArrivalStop(item)
        : dayId === "sep13" &&
            (item.title === "Bergen Station步行圈住宿" ||
              item.title === "Moxy Bergen" ||
              index === 0)
          ? moxyDepartureStop(item)
          : item,
    ),
  };
};

const patchBackup = (backup) => {
  if (!backup) return backup;
  return {
    ...backup,
    route: backup.route?.map((item) =>
      item.label === "Bergen住宿" ||
      item.label === "住宿" ||
      item.query === "Bergen Station"
        ? {
            ...item,
            label: "Moxy Bergen",
            query: "Moxy Bergen Solheimsgaten 3",
            url:
              "https://www.google.com/maps/search/?api=1&query=Moxy%20Bergen%20Solheimsgaten%203",
            note: item.note || "已确认住宿",
          }
        : item,
    ),
  };
};

const patchMoxyDay = (day) => {
  if (!day || !day.id) return day;
  if (day.id === "sep12") {
    const corrected = replaceDeep(day, [
      ["BGO → Nonneseter / Bergen Station", "BGO → Florida"],
      ["Nonneseter / Bergen Station", "Florida / Moxy Bergen"],
      ["Bergen Station步行圈酒店", "Moxy Bergen"],
      ["Bergen Station步行圈住宿", "Moxy Bergen"],
      ["Bergen住宿", "Moxy Bergen"],
    ]);
    return {
      ...corrected,
      stay: "Moxy Bergen · Solheimsgaten 3 · 已确认1晚",
      route:
        "Sky Hotel退房 → Malmö C官方储物柜 → ECCV最终日 → 取件 → CPH 17:50直飞 → BGO → Florida → Moxy Bergen",
      verified:
        (corrected.verified || "") +
        "；Moxy Bergen官方地址、15:00入住、24小时前台与行李寄存已核对；具体代订入住话术按个人订单执行。",
      main: corrected.main?.map((item) =>
        item.title === "BGO → Nonneseter / Bergen Station"
          ? {
              ...item,
              title: "BGO → Florida",
              detail:
                "乘Bybanen Line 1直达Florida，通常约35–45分钟；下车后步行约5分钟到Moxy Bergen。",
            }
          : item.title === "步行入住Moxy Bergen" ||
              item.title === "步行入住Bergen Station步行圈酒店"
            ? {
                ...item,
                title: "步行入住Moxy Bergen",
                detail: moxyCheckIn + " 入住后只做简餐、洗漱和休息，不去Bryggen夜游。",
              }
            : item,
      ),
      backup: patchBackup(corrected.backup),
      routeData: patchRouteData(corrected.routeData, "sep12"),
    };
  }
  if (day.id === "sep13") {
    const corrected = replaceDeep(day, [
      ["昨晚已住Bergen Station步行圈", "昨晚已入住Moxy Bergen（Solheimsgaten 3）"],
      ["Bergen住宿 →", "Moxy Bergen → Bergen Station寄存 →"],
      ["Bergen Station步行圈住宿", "Moxy Bergen"],
      ["Bergen住宿", "Moxy Bergen"],
      ["早餐、退房与Bergen Station正规寄存", "Moxy补给、退房 → Bergen Station寄存"],
    ]);
    return {
      ...corrected,
      summary:
        corrected.summary ||
        "昨晚已入住Moxy Bergen；今天先到Bergen Station寄存行李，再执行Bryggen、Bryggens Museum、条件式Ulriken和18:29去Voss。",
      main: corrected.main?.map((item, index) =>
        index === 0
          ? {
              ...item,
              title: "Moxy补给、退房 → Bergen Station寄存",
              detail:
                "是否含早餐以订单为准；退房后步行约5分到Florida，乘Line 1到Nonneseter，再到Bergen Station寄存大件。",
            }
          : item,
      ),
      backup: patchBackup(corrected.backup),
      routeData: patchRouteData(corrected.routeData, "sep13"),
    };
  }
  return day;
};

export function applyBalancedAuditDay(day) {
  return patchMoxyDay(applyBalancedAuditDayBase(day));
}

export function applyBalancedHotels(hotels) {
  return applyBalancedHotelsBase(hotels).map((hotel) =>
    hotel.city === "Bergen" ||
    hotel.city === "卑尔根" ||
    (hotel.checkIn === "2026-09-12" && hotel.checkOut === "2026-09-13")
      ? {
          ...hotel,
          city: "Moxy Bergen",
          area: "Moxy Bergen · Solheimsgaten 3 · 已确认",
          why:
            "承接9月12日17:50 CPH→BGO；从BGO乘Bybanen Line 1直达Florida，步行约5分钟到酒店。",
          return:
            "9月13日退房后从Florida乘Line 1到Nonneseter/Bergen Station寄存大件，再开始Bryggen主线。",
          avoid:
            "前台设在Bar Moxy。报姓名并从离线订单出示确认号；如问来源答“公司行政预订”。15:00后入住，提前到可寄存。确认号不写公开网页。",
          examples: "Moxy Bergen（已确认）",
          actionUrl: moxyUrl,
        }
      : hotel,
  );
}

export function applyBalancedBookings(bookings) {
  return applyBalancedBookingsBase(bookings).map((item) =>
    item.id === "hotels"
      ? {
          ...item,
          title: "核对已订Bob W、Sky Hotel与Moxy Bergen；补Voss/Flåm/OSL住宿",
          note:
            "9.03–07 Bob W、9.07–12 Sky Hotel、9.12–13 Moxy Bergen均已确认；Moxy现场报姓名＋离线确认号，预订来源答“公司行政预订”，15:00后入住。另订Voss 1晚、Flåm 2晚与OSL机场1晚。",
        }
      : item,
  );
}

export function applyBalancedSources(sources) {
  return applyBalancedSourcesBase(sources);
}

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id !== "core"
      ? plan
      : {
          ...plan,
          days: plan.days.map(patchMoxyDay),
          decision: {
            ...plan.decision,
            lodging:
              "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚（已确认）＋Voss 1晚＋Flåm 2晚＋OSL机场1晚。",
            booking:
              "已确认Bob W、Sky Hotel、Moxy Bergen与9月12日17:50航班；补Voss、Flåm两晚与OSL机场住宿。Moxy现场按离线订单办理入住，不在公开网页保存确认号。",
          },
        },
  );
}

export const balancedAuditOverrides = {
  ...balancedAuditOverridesBase,
  sep12: patchMoxyDay({ ...balancedAuditOverridesBase.sep12, id: "sep12" }),
  sep13: patchMoxyDay({ ...balancedAuditOverridesBase.sep13, id: "sep13" }),
};
