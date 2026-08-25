import {
  applyBalancedAuditDay as applyBalancedAuditDayBase,
  applyBalancedHotels as applyBalancedHotelsBase,
  applyBalancedBookings as applyBalancedBookingsBase,
  applyBalancedSources as applyBalancedSourcesBase,
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
  balancedAuditOverrides as balancedAuditOverridesBase,
} from "./balancedAudit-2026-fix6.js";

const thaiScheduleUrl = "https://www.thaiairways.com/en-us/plan-trip/flight-schedule/";
const cphArrivalUrl = "https://www.cph.dk/en/flight-information/arrivals/TG950";
const storeRingheimUrl = "https://storeringheim.no/en/transport-to-the-hotel/";
const storeRingheimAddress = "Mølstervegen 44, 5705 Voss";
const storeRingheimName = "Store Ringheim Hotel og Restaurant";
const storeRingheimStay = `${storeRingheimName} · Mølstervegen 44 · 已确认1晚`;
const flightVerified =
  "去程已按个人订单锁定：9月2日17:25从PVG T2出发，经BKK同场转机，9月3日07:40抵达CPH T3；航班号、登机口、行李直挂与实际到达仍只认航司订单。";
const ringheimVerified =
  "Store Ringheim官方地址与车站接送方式已核对：酒店不在车站步行圈，最短步行约25分钟且有上坡；免费接送必须提前约定。";

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

const addSourceOnce = (sources = [], source) =>
  sources.some((item) => item.url === source.url) ? sources : [...sources, source];

const patchFlightRoute = (routeData) => {
  if (!routeData?.stops?.length) return routeData;
  const stops = routeData.stops.map((stop, index) =>
    index === 0
      ? {
          ...stop,
          time: "9.03 07:40",
          title: "CPH Terminal 3 · TG950到达",
          local: "Københavns Lufthavn T3 · Arrivals",
          address: "Lufthavnsboulevarden 6, 2770 Kastrup",
          arriveBy: "flight",
          leg: "9.02 17:25 PVG T2→BKK转机→9.03 07:40 CPH T3",
          dwell: "入境、取行李约60–90分",
          task:
            "按申根入境标识办理边检并取行李；若行李未直挂CPH，按实际订单在BKK处理。到达后先补水、整理网络与交通票，再前往Bob W。",
          ticket:
            "PVG值机时确认两段登机牌与行李直挂标签；BKK只按International Transfer标识和航司指引换乘。",
          official: cphArrivalUrl,
        }
      : stop,
  );
  return {
    ...routeData,
    scope:
      "9.02 PVG T2 17:25 → BKK国际转机 → 9.03 CPH T3 07:40 → Bob W → Cisternerne（条件式）→ Absalon",
    hardStop:
      "9.02 14:25前到PVG T2；BKK跟随International Transfer；9.03 15:20仍不能进Cisternerne就删除",
    reservation:
      "已确认泰航PVG→BKK→CPH联程；Bob W订单；Absalon晚餐；Cisternerne仅条件式购买",
    accuracy:
      "去程机场与航站楼已按订单锁定；BKK登机口、行李直挂和实际到达只认航司App、登机牌与机场屏幕。",
    stops,
  };
};

const vossStationStop = (stop = {}) => ({
  ...stop,
  time: "19:49",
  title: "Voss Station",
  local: "Voss stasjon",
  address: "Evangervegen 5, 5704 Voss",
  arriveBy: "train",
  leg: "Bergen 18:29→Voss 19:49（以实际Vy订单为准）",
  dwell: "约10–20分衔接接送",
  task:
    "下车后在事先与酒店约定的集合点等免费接送；若酒店未确认，立即改乘Voss Taxi，不拖行李步行上坡。",
  ticket:
    "保存Vy车票、酒店接送书面确认与Voss Taxi电话；列车晚点时主动通知酒店。",
  official: storeRingheimUrl,
});

const storeRingheimArrivalStop = () => ({
  time: "预计20:00–20:15",
  title: storeRingheimName,
  lat: 60.6380552,
  lng: 6.4275138,
  local: `${storeRingheimName} · Mølstervegen 44`,
  address: storeRingheimAddress,
  arriveBy: "bus",
  leg: "Voss Station→酒店免费预约接送约5分；无确认则出租车",
  dwell: "入住后结束",
  task:
    "提前把19:49计划到站时间发给酒店并获得接送确认；入住时再次确认次晨送到Voss Bus Terminal Stop A的时间。",
  ticket:
    "免费接送必须在预订时或提前邮件约定；未收到明确确认就使用Voss Taxi，不把临时步行当作主方案。",
  official: storeRingheimUrl,
});

const storeRingheimDepartureStop = (stop = {}) => ({
  ...stop,
  time: "08:35–08:50",
  title: storeRingheimName,
  lat: 60.6380552,
  lng: 6.4275138,
  local: `${storeRingheimName} · Mølstervegen 44`,
  address: storeRingheimAddress,
  arriveBy: "walk",
  leg: "在酒店完成早餐/退房；预约接送或出租车去Voss Bus Terminal Stop A",
  dwell: "约15分退房与上车",
  task:
    "早餐时间只认订单或酒店确认；如不能在08:30前完成，前一晚申请打包早餐。08:50前离店，目标09:00左右到Stop A。",
  ticket:
    "前一晚再次确认酒店免费送站；没有书面确认就在08:40前叫Voss Taxi，不依赖上坡酒店外的临时公交。",
  official: storeRingheimUrl,
});

const patchVossArrivalRoute = (routeData) => {
  if (!routeData?.stops?.length) return routeData;
  const baseStops = routeData.stops;
  const alreadyPatched = baseStops.some((stop) => stop.title === storeRingheimName);
  const stops = alreadyPatched
    ? baseStops
    : [
        ...baseStops.slice(0, -1),
        vossStationStop(baseStops.at(-1)),
        storeRingheimArrivalStop(),
      ];
  return {
    ...routeData,
    scope:
      "Moxy Bergen → Bergen Station寄存 → Bergen文化主线 → 18:29 Voss列车 → Store Ringheim预约接送",
    reservation:
      "Bryggens Museum；条件式Ulriken；Bergen→Voss实际Vy；Store Ringheim已确认订单与免费接送确认",
    accuracy:
      "Store Ringheim落到Mølstervegen 44真实坐标；Voss Station与酒店分为两个点，不再误写成车站步行圈。",
    stops,
  };
};

const patchVossDepartureRoute = (routeData) => {
  if (!routeData?.stops?.length) return routeData;
  return {
    ...routeData,
    scope:
      "Store Ringheim → 预约接送/出租车 → Voss Bus Terminal Stop A → Gudvangen Stop H → Nærøyfjord船 → Flåm",
    hardStop:
      "08:50前离开Store Ringheim；09:10前到Voss Stop A；09:50巴士与12:10船只认票面",
    reservation:
      "Store Ringheim送站确认；09:50 Voss→Gudvangen巴士；12:10 Nærøyfjord船；Flåm两晚",
    accuracy:
      "酒店、Voss Stop A、Gudvangen Stop H、码头和Flåm终点均为真实点位；酒店到Stop A不再按步行圈处理。",
    stops: routeData.stops.map((stop, index) =>
      index === 0 ? storeRingheimDepartureStop(stop) : stop,
    ),
  };
};

const patchBackupVoss = (backup, dayId) => {
  if (!backup) return backup;
  return {
    ...backup,
    route: backup.route?.map((item, index) => {
      const isVossStay =
        item.label === "Voss住宿" ||
        item.label === "住宿" ||
        item.query === "Voss Station" ||
        item.query?.includes("Voss hotel");
      if (!isVossStay && !(dayId === "sep14" && index === 0)) return item;
      return {
        ...item,
        label: storeRingheimName,
        query: `${storeRingheimName} Mølstervegen 44`,
        note:
          dayId === "sep13"
            ? "已确认住宿；到站优先预约免费接送"
            : "08:50前预约送到Voss Stop A",
        url:
          "https://www.google.com/maps/search/?api=1&query=Store%20Ringheim%20Hotel%20M%C3%B8lstervegen%2044",
      };
    }),
  };
};

const patchTripDay = (day) => {
  if (!day?.id) return day;
  if (day.id === "sep03") {
    const prelude = [
      {
        time: "9.02 14:25前",
        title: "抵达PVG Terminal 2办理泰航联程值机",
        detail:
          "按17:25起飞倒推至少提前3小时到T2。托运行李时确认目的地标签为CPH，并领取/确认两段登机牌；护照、签证、药物、电脑和充电宝随身。",
      },
      {
        time: "9.02 17:25–21:00",
        title: "TG665 · PVG T2 → Bangkok Suvarnabhumi",
        detail:
          "日期与时刻按你的实际订单；21:00为BKK当地计划到达。落地后不跟随Arrival/Immigration，优先找International Transfer与下一段航班屏幕。",
      },
      {
        time: "9.02 21:00–9.03 01:10",
        title: "BKK国际转机 · 约4小时10分",
        detail:
          "先确认TG950登机口与登机时间，再补水、充电和用餐。若PVG值机未能直挂行李或未给第二段登机牌，立即按航司Transfer Desk指引处理。",
      },
      {
        time: "9.03 01:10–07:40",
        title: "TG950 · BKK → CPH Terminal 3",
        detail:
          "07:40为CPH当地计划到达；实际到达、入境通道、行李转盘与延误只认泰航App、CPH到达屏和现场广播。",
      },
    ];
    let sources = addSourceOnce(day.sources, {
      label: "Thai Airways flight schedule",
      type: "航司官网",
      url: thaiScheduleUrl,
    });
    sources = addSourceOnce(sources, {
      label: "CPH TG950 arrivals",
      type: "机场官网",
      url: cphArrivalUrl,
    });
    return {
      ...day,
      summary:
        "已确认去程：9月2日17:25从上海浦东T2乘泰航出发，经曼谷BKK同场国际转机，9月3日07:40抵达哥本哈根T3。到达日保留Bob W入住和18:00 Absalon；Cisternerne仍只在入境、行李和体力都顺利时执行。",
      route:
        "9.02 PVG T2 17:25 → BKK国际转机 → 9.03 CPH T3 07:40 → Bob W → 条件式Cisternerne → Absalon",
      verified: (day.verified || "").includes(flightVerified)
        ? day.verified
        : `${day.verified || ""}；${flightVerified}`,
      main: day.main?.some((item) => item.title?.includes("TG665"))
        ? day.main
        : [...prelude, ...(day.main || [])],
      transport: [
        "9.02 17:25 PVG T2→BKK；9.03 01:10 BKK→07:40 CPH T3（时间按个人订单）",
        "BKK计划转机约4小时10分；同一联程仍须在PVG确认两段登机牌和行李直挂",
        ...(day.transport || []).filter((item) => !item.includes("落地时间")),
      ],
      safety: [
        "PVG托运行李时拍下行李标签；确认目的地为CPH。BKK只按International Transfer和泰航Transfer Desk指引行动。",
        "两段航班、登机口、行李直挂和实际到达以个人订单/登机牌为准；公开班表只做一致性核对。",
        ...(day.safety || []),
      ],
      timeCheck: {
        status: "去程已确认；07:40到达为D1固定锚点",
        note:
          "按计划07:40到CPH T3，通常预留60–90分钟入境取行李；10:00前后可到Bob W。若长途飞行疲劳或15:20仍不能进Cisternerne，删除地下水库，只保留18:00 Absalon或住宿附近晚餐。",
      },
      sources,
      routeData: patchFlightRoute(day.routeData),
    };
  }

  if (day.id === "sep13") {
    const corrected = replaceDeep(day, [
      ["Voss Station / Bus Terminal步行圈 · 1晚", storeRingheimStay],
      ["Voss Station / Bus Terminal步行圈", `${storeRingheimName} · Mølstervegen 44`],
      ["Voss Station住宿", storeRingheimName],
      ["Voss住宿", storeRingheimName],
    ]);
    const transferItem = {
      time: "19:49–预计20:15",
      title: `Voss Station → ${storeRingheimName}`,
      detail:
        "酒店不在车站步行圈。提前邮件约定免费接站并把19:49计划到站时间发给酒店；无明确确认则乘Voss Taxi，约5分钟。拖行李步行约25分钟且有上坡，只作白天无压力备选。",
    };
    let sources = addSourceOnce(corrected.sources, {
      label: "Store Ringheim transport",
      type: "住宿官网",
      url: storeRingheimUrl,
    });
    return {
      ...corrected,
      stay: storeRingheimStay,
      route:
        "Moxy Bergen → Bergen Station寄存 → Bryggen → Bryggens Museum → Ulriken（条件式）→ 18:29 Voss → Store Ringheim预约接送",
      verified: (corrected.verified || "").includes(ringheimVerified)
        ? corrected.verified
        : `${corrected.verified || ""}；${ringheimVerified}`,
      main: corrected.main?.some((item) => item.title?.includes(storeRingheimName))
        ? corrected.main
        : [...(corrected.main || []), transferItem],
      transport: [
        ...(corrected.transport || []),
        "Voss Station→Store Ringheim优先提前预约酒店免费接送；无确认则Voss Taxi约5分",
      ],
      safety: [
        ...(corrected.safety || []),
        "Store Ringheim位于上坡农庄，不拖行李夜间步行；列车晚点时主动通知酒店并确认接站是否仍有效。",
      ],
      sources,
      backup: patchBackupVoss(corrected.backup, "sep13"),
      routeData: patchVossArrivalRoute(corrected.routeData),
    };
  }

  if (day.id === "sep14") {
    const corrected = replaceDeep(day, [
      ["Voss Station / Bus Terminal步行圈", `${storeRingheimName} · Mølstervegen 44`],
      ["Voss住宿", storeRingheimName],
      ["Voss Station住宿", storeRingheimName],
    ]);
    const departureItem = {
      time: "08:35–09:10",
      title: `${storeRingheimName} → Voss Bus Terminal Stop A`,
      detail:
        "前一晚确认酒店免费送站；没有明确确认就08:40前叫出租车。08:50前离店，目标09:00左右到Stop A，为09:50巴士保留约40–50分钟。早餐太晚则申请打包早餐。",
    };
    let sources = addSourceOnce(corrected.sources, {
      label: "Store Ringheim transport",
      type: "住宿官网",
      url: storeRingheimUrl,
    });
    return {
      ...corrected,
      route:
        "Store Ringheim → 预约送站/出租车 → Voss Stop A 09:50 → Gudvangen Stop H → 12:10 Nærøyfjord船 → Flåm 14:10",
      main: corrected.main?.some((item) => item.title?.includes(storeRingheimName))
        ? corrected.main
        : [departureItem, ...(corrected.main || [])],
      transport: [
        "Store Ringheim→Voss Stop A优先提前预约免费送站；无确认则出租车，08:50前离店",
        ...(corrected.transport || []),
      ],
      safety: [
        "09:50巴士是硬锚点；不把酒店到车站的25分钟下坡步行当作行李日主方案。",
        ...(corrected.safety || []),
      ],
      sources,
      backup: patchBackupVoss(corrected.backup, "sep14"),
      routeData: patchVossDepartureRoute(corrected.routeData),
    };
  }
  return day;
};

export function applyBalancedAuditDay(day) {
  return patchTripDay(applyBalancedAuditDayBase(day));
}

export function applyBalancedHotels(hotels) {
  return applyBalancedHotelsBase(hotels).map((hotel) =>
    (hotel.checkIn === "2026-09-13" && hotel.checkOut === "2026-09-14") ||
    hotel.city === "Voss"
      ? {
          ...hotel,
          city: storeRingheimName,
          area: `${storeRingheimName} · Mølstervegen 44 · 已确认`,
          why:
            "承接9月13日19:49到Voss；山坡农庄景观与餐厅是住宿优势，但不在车站步行圈。",
          return:
            "9月14日提前预约酒店免费送到Voss Station/Bus Terminal；无确认则出租车，08:50前离店。",
          avoid:
            "免费接送必须提前约定；不要在夜间或携大件时把约25分钟上坡步行当作主方案。早餐时间若晚于08:30，前一晚申请打包。",
          examples: `${storeRingheimName}（已确认）`,
          actionUrl: storeRingheimUrl,
        }
      : hotel,
  );
}

export function applyBalancedBookings(bookings) {
  const patched = replaceDeep(applyBalancedBookingsBase(bookings), [
    ["补Voss/Flåm/OSL住宿", "补Flåm/OSL住宿"],
    ["补Voss、Flåm两晚与OSL机场住宿", "补Flåm两晚与OSL机场住宿"],
    ["Voss Station住宿", storeRingheimName],
    ["Voss Station / Bus Terminal步行圈", `${storeRingheimName} · Mølstervegen 44`],
  ]);
  return patched.map((item) =>
    item.id === "hotels"
      ? {
          ...item,
          title:
            "核对已订Bob W、Sky Hotel、Moxy Bergen与Store Ringheim；补Flåm/OSL住宿",
          note:
            "9.03–07 Bob W、9.07–12 Sky Hotel、9.12–13 Moxy Bergen、9.13–14 Store Ringheim均已确认；提前向Store Ringheim预约19:49接站和次晨送到Voss Stop A。另订Flåm 2晚与OSL机场1晚。",
        }
      : item,
  );
}

export function applyBalancedSources(sources) {
  let patched = applyBalancedSourcesBase(sources);
  patched = addSourceOnce(patched, {
    category: "国际航班",
    scope: "PVG→BKK→CPH去程班表与临行状态",
    source: "Thai Airways / Copenhagen Airport",
    url: thaiScheduleUrl,
    status: "订单已确认；动态信息临行复核",
  });
  return addSourceOnce(patched, {
    category: "住宿交通",
    scope: "Store Ringheim地址、免费车站接送与步行条件",
    source: "Store Ringheim Hotel og Restaurant",
    url: storeRingheimUrl,
    status: "已核验",
  });
}

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id !== "core"
      ? plan
      : {
          ...plan,
          gateway:
            "去程已确认：9.02 17:25 PVG T2→BKK转机→9.03 07:40 CPH T3 · 西挪威终点从OSL开口程返沪",
          days: plan.days.map(patchTripDay),
          decision: {
            ...plan.decision,
            lodging:
              "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚＋Store Ringheim Hotel og Restaurant 1晚（均已确认）＋Flåm 2晚＋OSL机场1晚。",
            transfer:
              "高：9月2–3日PVG→BKK→CPH联程；9月12日13:30离会接17:50飞行；9月13日18:29铁路并预约Store Ringheim接站；9月14日08:50前预约送站接09:50巴士＋12:10船；9月16日08:20＋10:02铁路。",
            booking:
              "已确认9月2–3日泰航去程、Bob W、Sky Hotel、Moxy Bergen、Store Ringheim与9月12日17:50航班；补Flåm两晚与OSL机场住宿。Store Ringheim接送需提前获得书面确认。",
          },
        },
  );
}

export const balancedAuditOverrides = {
  ...balancedAuditOverridesBase,
  sep03: patchTripDay({ ...balancedAuditOverridesBase.sep03, id: "sep03" }),
  sep13: patchTripDay({ ...balancedAuditOverridesBase.sep13, id: "sep13" }),
  sep14: patchTripDay({ ...balancedAuditOverridesBase.sep14, id: "sep14" }),
};
