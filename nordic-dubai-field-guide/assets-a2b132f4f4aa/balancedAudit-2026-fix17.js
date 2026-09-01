import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix16.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix16.js";

const dmiUrl = "https://www.dmi.dk/lokation/show/DK/2618425/K%C3%B8benhavn/";
const metOfficeUrl = "https://weather.metoffice.gov.uk/forecast/u3buvefsh";
const timeAndDateUrl = "https://www.timeanddate.com/weather/denmark/copenhagen/ext";
const rejseUrl = "https://www.rejseplanen.dk/webapp/index.html?language=en_EN";
const dotUrl = "https://dinoffentligetransport.dk/en/";
const cphAirportUrl = "https://www.cph.dk/en/flight-information/arrivals/TG950";
const cisternerneUrl = "https://frederiksbergmuseerne.dk/en/cisternerne/";
const absalonUrl = "https://absaloncph.dk/en/food/";
const moenTourUrl = "https://moensklint.dk/en/bus-trip-from-Copenhagen/";

const maps = (query) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
const directions = (origin, destination, mode = "transit", waypoints = "") =>
  "https://www.google.com/maps/dir/?api=1&origin=" +
  encodeURIComponent(origin) +
  "&destination=" +
  encodeURIComponent(destination) +
  "&travelmode=" +
  mode +
  (waypoints ? "&waypoints=" + encodeURIComponent(waypoints) : "");
const action = (label, url, kind = "link") => ({ label, url, kind });
const source = (label, url, type = "天气") => ({ label, url, type });
const routePoint = (label, query, note = "") => ({
  label,
  query,
  note,
  url: maps(query),
});
const transit = (mode, route, time, duration, buffer, ticket, official, map) => ({
  mode,
  route,
  time,
  duration,
  buffer,
  ticket,
  official,
  map,
});
const stop = (time, title, lat, lng, extra = {}) => ({
  time,
  title,
  lat,
  lng,
  ...extra,
});

const weatherSources = [
  source("DMI哥本哈根实时预报", dmiUrl, "官方天气"),
  source("Met Office逐小时预报", metOfficeUrl, "天气交叉核对"),
  source("Timeanddate 14日预报", timeAndDateUrl, "天气交叉核对"),
];

const addSources = (sources = []) => {
  const merged = [...sources, ...weatherSources];
  return merged.filter(
    (item, index) => merged.findIndex((candidate) => candidate.url === item.url) === index,
  );
};

const replaceDeep = (value, replacements) => {
  if (typeof value === "string") {
    return replacements.reduce(
      (text, [before, after]) => text.split(before).join(after),
      value,
    );
  }
  if (Array.isArray(value)) {
    return value.map((item) => replaceDeep(item, replacements));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        replaceDeep(item, replacements),
      ]),
    );
  }
  return value;
};

const patchSep03 = (day) => ({
  ...day,
  orientationId: "sep03-weather-20260901",
  phase: "07:40到达＋经典市区＋室内艺术＋社区晚餐",
  title: "07:40抵达后先走经典市区，午后转入Cisternerne",
  summary:
    "9月1日预报显示9月3日有阵雨，且午后降雨风险不低。按07:40抵达重排：约10:00寄存行李后，先走小美人鱼、Kastellet、阿美琳堡与Nyhavn；午后转入Cisternerne，18:00保留Absalon共享晚餐。全线可按体力分三级删减。",
  route:
    "CPH T3 07:40 → Bob W → 小美人鱼 / Kastellet → 阿美琳堡 → Nyhavn / Strøget → Cisternerne → Absalon → Bob W",
  load: "中高 · 约8–10 km；经典市区段可分级缩短",
  timeCheck: {
    status: "可行｜按10:30能否离开住宿分级执行",
    note:
      "10:30前从Bob W出发走完整经典线；10:30–11:30删除小美人鱼与Kastellet，从阿美琳堡开始；11:30后只保留Nyhavn短走、Cisternerne与Absalon。",
  },
  main: [
    {
      time: "07:40–10:15",
      title: "CPH T3入境、取行李并到Bob W寄存",
      duration: "约2小时15分",
      detail:
        "07:40是落地时刻。为边检、行李与进城保留60–90分钟；机场到Teglværksgade 31约25–40分钟，目标10:00前后完成寄存与洗漱。",
      actions: [
        action("TG950到达", cphAirportUrl),
        action("机场→Bob W", directions("Copenhagen Airport Terminal 3", "Teglværksgade 31 Copenhagen")),
      ],
    },
    {
      time: "10:15–11:20",
      title: "小美人鱼 → Kastellet → Gefion喷泉",
      duration: "约65分",
      detail:
        "从住宿附近先去海岸地标，再沿Kastellet城堡形要塞和Gefion喷泉向南走。阵雨时不在海边久停，20–30分钟即可完成小美人鱼与北段。",
      actions: [
        action("小美人鱼", maps("The Little Mermaid Copenhagen")),
        action("Kastellet", maps("Kastellet Copenhagen")),
      ],
    },
    {
      time: "11:25–12:25",
      title: "大理石教堂 → 阿美琳堡宫广场",
      duration: "约60分",
      detail:
        "先看Frederik's Church穹顶，再步行到阿美琳堡宫广场；重点看四座宫殿围合与城市轴线，不强行等待换岗。",
      actions: [
        action("大理石教堂", maps("Frederik's Church Copenhagen")),
        action("阿美琳堡", maps("Amalienborg Copenhagen")),
      ],
    },
    {
      time: "12:30–13:20",
      title: "Nyhavn运河与彩色港屋",
      duration: "约50分",
      detail:
        "沿港口步行到Nyhavn，保留经典城市照片和水岸尺度；天气差时缩成运河两侧一圈，不参加长时间露天游船。",
      actions: [action("Nyhavn", maps("Nyhavn Copenhagen"))],
    },
    {
      time: "13:20–14:25",
      title: "Kongens Nytorv → Strøget → 快速午餐",
      duration: "约65分",
      detail:
        "从Kongens Nytorv沿Strøget走到旧城核心，午餐只选顺路可快速出餐的开放三明治、烘焙或热汤；14:25无论走到哪里都开始前往Cisternerne。",
      actions: [
        action("Strøget", maps("Stroget Copenhagen")),
        action("去Cisternerne", directions("Stroget Copenhagen", "Cisternerne Copenhagen")),
      ],
    },
    {
      time: "14:25–15:00",
      title: "转场到Cisternerne",
      duration: "约35分",
      detail:
        "按Rejseplanen实时选择公交或地铁组合；不要为了补齐Strøget延迟地下水库入场。",
      actions: [action("实时公交", rejseUrl)],
    },
    {
      time: "15:00–16:25",
      title: "Cisternerne地下水库",
      duration: "约85分",
      detail:
        "把降雨较多的午后放进地下空间。入口湿滑、馆内阴冷，穿防水层并保留薄抓绒；16:25开始向Absalon转场。",
      actions: [
        action("展览与门票", cisternerneUrl, "primary"),
        action("入口", maps("Cisternerne Copenhagen")),
      ],
    },
    {
      time: "16:25–17:45",
      title: "Cisternerne → Absalon签到",
      duration: "约30分＋机动",
      detail:
        "正常交通约25–35分钟；多出的时间用于咖啡、补水或处理阵雨，17:45必须完成签到。",
      actions: [
        action("导航", directions("Cisternerne Copenhagen", "Folkehuset Absalon Copenhagen")),
        action("晚餐预订", absalonUrl, "primary"),
      ],
    },
    {
      time: "18:00–19:30",
      title: "Absalon长桌共享晚餐",
      duration: "约90分",
      detail:
        "统一菜品、共同分餐，是抵达日最自然的独行社交；提前购票，不把现场余票当保证。",
      actions: [action("Absalon", absalonUrl, "primary")],
    },
    {
      time: "19:30–20:15",
      title: "返回Bob W并停止加项目",
      duration: "约30–45分",
      detail:
        "回房整理防雨装备与第二天交通；第一晚不再追加Tivoli、夜景或酒吧。",
      actions: [
        action("回住宿", directions("Folkehuset Absalon Copenhagen", "Teglværksgade 31 Copenhagen")),
      ],
    },
  ],
  rain: {
    trigger: "持续中雨、雷暴，或10:30后仍未离开Bob W",
    title: "缩短海边段，保留阿美琳堡＋Nyhavn＋Cisternerne",
    detail:
      "普通阵雨不必整天切Plan B：先删除小美人鱼和Kastellet，直接从大理石教堂、阿美琳堡和Nyhavn开始；只有持续强降雨才执行完整室内替代日。",
  },
  backup: {
    trigger: "持续强降雨、雷暴，或长途飞行后体力明显不足",
    title: "哥本哈根室内经典线：设计博物馆＋Cisternerne＋Absalon",
    verdict: "完整室内替代 · 不与主线叠加",
    route: [
      routePoint("Bob W", "Teglværksgade 31 Copenhagen", "寄存后出发"),
      routePoint("丹麦设计博物馆", "Designmuseum Danmark", "室内主馆"),
      routePoint("Cisternerne", "Cisternerne Copenhagen", "地下艺术"),
      routePoint("Absalon", "Folkehuset Absalon Copenhagen", "18:00晚餐"),
      routePoint("Bob W", "Teglværksgade 31 Copenhagen", "回房休息"),
    ],
    timeline: [
      ["10:45–12:45", "丹麦设计博物馆", "若到达晚于11:30就缩短为90分钟。"],
      ["12:45–13:45", "顺路午餐", "只吃快速热食，不跨城追店。"],
      ["14:30–16:20", "Cisternerne", "馆内阴冷湿滑，按官网最后入场执行。"],
      ["17:45–19:30", "Absalon签到与晚餐", "提前购票；售罄则回住宿交通轴吃饭。"],
      ["20:15前", "返回Bob W", "第一晚停止加项目。"],
    ],
    transport:
      "全程使用DOT公共交通；每次出发前用Rejseplanen看实时中断，保留20–30分钟阵雨机动。",
    meal:
      "午餐选博物馆或换乘站附近热汤、烘焙；晚餐主选Absalon。",
    booking: [
      { label: "Rejseplanen", url: rejseUrl, note: "实时交通" },
      { label: "Cisternerne", url: cisternerneUrl, note: "开放与门票" },
      { label: "Absalon", url: absalonUrl, note: "18:00场次" },
    ],
    exit:
      "11:30后仍未出发就删除设计博物馆，只保留Cisternerne与晚餐；16:25无条件离开Cisternerne。",
  },
  transit: [
    transit(
      "地铁/火车",
      "CPH T3 → Bob W Østerbro",
      "08:40–09:45起步",
      "25–40分",
      "边检与行李另留60–90分",
      "DOT按区间购票",
      rejseUrl,
      directions("Copenhagen Airport Terminal 3", "Teglværksgade 31 Copenhagen"),
    ),
    transit(
      "步行",
      "小美人鱼 → Kastellet → 阿美琳堡 → Nyhavn",
      "10:15–13:20",
      "分段约2.5–3小时",
      "阵雨时逐段缩短",
      "免费",
      "https://www.visitcopenhagen.com/",
      directions("The Little Mermaid Copenhagen", "Nyhavn Copenhagen", "walking", "Kastellet Copenhagen|Amalienborg Copenhagen"),
    ),
    transit(
      "公交/地铁",
      "Strøget → Cisternerne",
      "14:25",
      "约25–35分",
      "15:00前到入口",
      "DOT单程或通票",
      rejseUrl,
      directions("Stroget Copenhagen", "Cisternerne Copenhagen"),
    ),
    transit(
      "公交/地铁",
      "Cisternerne → Absalon",
      "16:25",
      "约25–35分",
      "17:45前签到",
      "DOT单程或通票",
      rejseUrl,
      directions("Cisternerne Copenhagen", "Folkehuset Absalon Copenhagen"),
    ),
    transit(
      "地铁+步行",
      "Absalon → Bob W",
      "19:30",
      "约30–45分",
      "20:15前回房",
      "DOT单程或通票",
      rejseUrl,
      directions("Folkehuset Absalon Copenhagen", "Teglværksgade 31 Copenhagen"),
    ),
  ],
  routeData: {
    scope:
      "CPH T3 07:40 → Bob W → 小美人鱼 / Kastellet → 阿美琳堡 → Nyhavn / Strøget → Cisternerne → Absalon → Bob W",
    walking: "约8–10 km；10:30后离开住宿则删除海边北段",
    hardStop: "14:25结束旧城段；16:25离开Cisternerne；17:45到Absalon",
    reservation:
      "Bob W门禁已确认；Absalon先订；Cisternerne按官网开放与可退条件购买",
    accuracy:
      "机场、Bob W、城市地标、Cisternerne与Absalon均落到实际入口或广场；步行线仅表示访问顺序，街巷与公交以Google Maps和Rejseplanen实时导航为准。",
    media: day.routeData && day.routeData.media,
    stops: [
      stop("07:40", "CPH Terminal 3 · TG950到达", 55.63028, 12.64955, {
        local: "Københavns Lufthavn T3 · Arrivals",
        address: "Lufthavnsboulevarden 6, 2770 Kastrup",
        arriveBy: "flight",
        leg: "入境、取行李约60–90分",
        dwell: "60–90分",
        task: "按申根入境标识办理边检并取行李，随后乘公共交通进城。",
        ticket: "确认两段登机牌、行李直挂与DOT交通票。",
        official: cphAirportUrl,
      }),
      stop("约09:45–10:15", "Bob W Copenhagen Østerbro", 55.7074866, 12.558793, {
        local: "Bob W Copenhagen Østerbro",
        address: "Teglværksgade 31, 2100 København",
        arriveBy: "train",
        leg: "机场→住宿约25–40分",
        dwell: "寄存与整理20–30分",
        task: "寄存大件、穿好防雨层；10:30前出发才走完整海边段。",
        ticket: "提前保存数字门禁与客服入口。",
      }),
      stop("10:15–10:35", "小美人鱼", 55.69286, 12.59927, {
        local: "Den Lille Havfrue",
        address: "Langelinie, 2100 København Ø",
        arriveBy: "walk",
        leg: "Bob W→海岸约20–30分",
        dwell: "15–20分",
        task: "拍照后立即进入Kastellet，不在阵雨海风里久停。",
        ticket: "免费。",
        official: "https://www.visitcopenhagen.com/",
      }),
      stop("10:35–11:20", "Kastellet与Gefion喷泉", 55.68902, 12.59463, {
        local: "Kastellet / Gefionspringvandet",
        address: "Gl. Hovedvagt, Kastellet 1, 2100 København",
        arriveBy: "walk",
        leg: "沿城堡形要塞向南",
        dwell: "约45分",
        task: "走主轴与南门；雨势增强就直接去大理石教堂。",
        ticket: "公共空间免费。",
      }),
      stop("11:25–12:25", "大理石教堂与阿美琳堡", 55.68422, 12.59291, {
        local: "Frederik's Church / Amalienborg",
        address: "Frederiksgade 4 / Amalienborg Slotsplads",
        arriveBy: "walk",
        leg: "Kastellet南门→王宫区约15分",
        dwell: "约60分",
        task: "先看教堂穹顶，再进入王宫广场；不为等换岗打乱时间轴。",
        ticket: "广场与教堂通常可免费参观；内部开放以当天公告为准。",
        official: "https://www.kongernessamling.dk/en/amalienborg/",
      }),
      stop("12:30–13:20", "Nyhavn", 55.67972, 12.59103, {
        local: "Nyhavn",
        address: "Nyhavn, 1051 København K",
        arriveBy: "walk",
        leg: "阿美琳堡→Nyhavn约10分",
        dwell: "约50分",
        task: "走运河两侧并拍经典港屋；不临时参加长游船。",
        ticket: "公共空间免费。",
        official: "https://www.visitcopenhagen.com/",
      }),
      stop("13:20–14:25", "Kongens Nytorv与Strøget", 55.67615, 12.56832, {
        local: "Kongens Nytorv / Strøget",
        address: "Kongens Nytorv, København K",
        arriveBy: "walk",
        leg: "Nyhavn→旧城步行轴",
        dwell: "约65分含快速午餐",
        task: "沿Strøget走一段即可；14:25停止加点并转场。",
        ticket: "公共空间免费。",
      }),
      stop("15:00–16:25", "Cisternerne入口", 55.669495, 12.524899, {
        local: "Cisternerne",
        address: "Søndermarken, 2000 Frederiksberg",
        arriveBy: "metro",
        leg: "旧城→Cisternerne约25–35分",
        dwell: "约85分",
        task: "从玻璃金字塔入口下行；馆内阴冷湿滑。",
        ticket: "按官网门票与最后入场执行。",
        official: cisternerneUrl,
      }),
      stop("17:45", "Absalon主入口", 55.66677, 12.55122, {
        local: "Folkehuset Absalon",
        address: "Sønder Boulevard 73, 1720 København V",
        arriveBy: "metro",
        leg: "Cisternerne→Absalon约25–35分",
        dwell: "18:00–19:30",
        task: "17:45前签到，告诉工作人员自己独行。",
        ticket: "共享晚餐提前网上购票。",
        official: absalonUrl,
      }),
      stop("约20:15", "返回Bob W", 55.7074866, 12.558793, {
        local: "Bob W Copenhagen Østerbro",
        address: "Teglværksgade 31, 2100 København",
        arriveBy: "metro",
        leg: "Absalon→住宿约30–45分",
        dwell: "结束",
        task: "回房整理次日装备并休息。",
        ticket: "DOT单程或仍有效通票。",
      }),
    ],
  },
  execution: {
    tone: "green",
    grade: "B｜充实但可分级删减",
    basis:
      "07:40落地让抵达日拥有完整白天，但机场到可出门仍需约2–2.5小时。天气预报有阵雨，因此先把海边和王宫区放在上午，午后转入Cisternerne；18:00 Absalon是当日最后固定锚点。",
    anchors: [
      { time: "07:40", title: "CPH T3到达", detail: "入境与行李预留60–90分钟。" },
      { time: "14:25", title: "离开旧城", detail: "无论Strøget走到哪里都开始去Cisternerne。" },
      { time: "16:25", title: "离开Cisternerne", detail: "为阵雨和公共交通留足机动。" },
      { time: "17:45", title: "Absalon签到", detail: "18:00统一开餐。" },
    ],
    prep: [
      "确认Bob W门禁码、Teglværksgade 31导航与行李寄存方式",
      "穿防水外层，日包内放薄抓绒、充电宝和一瓶水",
      "提前买Absalon晚餐；Cisternerne只买能接受天气与延误风险的票",
      "抵达后先看DMI雷达，再决定是否删除小美人鱼与Kastellet",
    ],
    buffers: [
      { math: "落地60–90分 + 进城25–40分 + 寄存20–30分", result: "约10:00–10:30可出门" },
      { math: "旧城→Cisternerne 25–35分", result: "14:25必须开始转场" },
      { math: "Cisternerne→Absalon 25–35分 + 机动45分", result: "16:25离馆很稳" },
    ],
    dropOrder: [
      "先删小美人鱼与Kastellet，直接从大理石教堂和阿美琳堡开始",
      "再缩Strøget，只保留Nyhavn与快速午餐",
      "持续强降雨时整天切换室内Plan B",
      "若体力明显不足，删除Cisternerne，只保留Absalon或住宿附近晚餐",
    ],
    hardCutoff:
      "10:30后离开Bob W就删海边北段；14:25离开旧城；16:25离开Cisternerne；17:45到Absalon。",
    recheck: [
      { label: "DMI预报", url: dmiUrl, note: "当天08:30看雷达与降雨带" },
      { label: "Cisternerne", url: cisternerneUrl, note: "开放、展览与最后入场" },
      { label: "Absalon", url: absalonUrl, note: "18:00场次与退款规则" },
      { label: "Rejseplanen", url: rejseUrl, note: "每次转场前查实时公共交通" },
    ],
    recovery:
      "航班延误或行李异常时按顺序删除海边北段、Nyhavn/Strøget、Cisternerne；不要拖行李逛城。最迟17:00仍未安顿好，就在Bob W附近吃饭并休息。",
  },
  freeTime: [],
  mapUrl: directions(
    "Teglværksgade 31 Copenhagen",
    "Folkehuset Absalon Copenhagen",
    "transit",
    "The Little Mermaid Copenhagen|Amalienborg Copenhagen|Nyhavn Copenhagen|Stroget Copenhagen|Cisternerne Copenhagen",
  ),
  bookingUrl: cisternerneUrl,
  verified:
    "天气重排于2026-09-01核对：9月3日阵雨风险高，经典户外点前置并可逐级删减；9月4日不安排海崖；9月5日作为Møns Klint较优天气窗口。抵达时刻07:40与Bob W地址已锁定。",
  sources: addSources(day.sources),
});

const patchRoskildeSep04 = (day) => {
  const patched = replaceDeep(day, [
    ["9月5日", "9月4日"],
    ["9.05", "9.04"],
    ["第3晚", "第2晚"],
  ]);
  return {
    ...patched,
    id: "sep04",
    date: "9.04",
    weekday: "周五",
    orientationId: "sep05",
    stay: "Bob W Copenhagen Østerbro · 已确认第2晚",
    title: "阴雨日转室内：罗斯基勒维京船＋王室大教堂",
    summary:
      "9月4日目前是哥本哈根段降雨风险最高的一天，因此把原9月5日的罗斯基勒调到今天。维京船博物馆主体在室内，大教堂也适合阵雨日；船厂户外区只在雨势较小时短看。",
    load: "中等 · 以两处室内文化遗产为主",
    rain: {
      ...patched.rain,
      trigger: "持续大雨、铁路中断或大教堂临时关闭",
      title: "保留维京船博物馆，删船厂户外段与大教堂",
      detail:
        "普通降雨照常去罗斯基勒；只有铁路中断才整天留在哥本哈根室内。雨势持续时，博物馆内看完原船与展厅后直接回城。",
    },
    verified:
      "天气重排于2026-09-01核对：9月4日多源预报偏阴雨，罗斯基勒的室内占比明显高于Møns Klint；开放与列车仍在出发前48小时复核。",
    sources: addSources(patched.sources),
  };
};

const patchMoenSep05 = (day) => {
  const patched = replaceDeep(day, [
    ["9月4日", "9月5日"],
    ["9.04", "9.05"],
    ["第2晚", "第3晚"],
  ]);
  return {
    ...patched,
    id: "sep05",
    date: "9.05",
    weekday: "周六",
    orientationId: "sep04",
    stay: "Bob W Copenhagen Østerbro · 已确认第3晚",
    title: "较优天气窗：Møns Klint白垩海崖＋Skovtårnet",
    summary:
      "把Møns Klint从多雨的9月4日移到9月5日。当前多源预报显示周六降雨明显减少、云隙更多，是这几天更适合看白垩海崖的窗口；但午后风仍可能较大，是否走崖缘与楼梯必须听现场公告。",
    timeCheck: {
      ...patched.timeCheck,
      status: "天气优先重排｜先确认9月5日官方小巴",
      note:
        "公开平台显示9月5日有班次，但只以最终订单为准。若9月4日旧票已经购买，先完成改签或退款再执行；不要同时持有两天不可退订单。",
    },
    rain: {
      ...patched.rain,
      trigger: "DMI强风/雷暴预警、现场关闭崖缘或楼梯、官方小巴停运",
      title: "强风比小雨更关键：先保GeoCenter，再决定崖顶",
      detail:
        "9月5日可能晴间多云但风较大。小雨不等于取消；强风、落石公告或封路才是硬退出条件。必要时只看GeoCenter和入口附近崖顶，不下海滩楼梯。",
    },
    execution: {
      ...patched.execution,
      basis:
        "9月5日比9月4日明显少雨，因此把最依赖能见度与地面条件的Møns Klint放到今天。仍需把风速和现场封闭当作比晴雨图标更高优先级的判断。",
      prep: [
        ...(patched.execution && patched.execution.prep ? patched.execution.prep : []),
        "确认订单日期已经改为9月5日；旧票未改签前不要重复购买",
        "当天早晨同时看DMI风力、降雨雷达与Møns Klint现场公告",
      ],
      recheck: [
        ...(patched.execution && patched.execution.recheck ? patched.execution.recheck : []),
        { label: "DMI预报", url: dmiUrl, note: "重点看风与雷达" },
        { label: "9月5日小巴", url: moenTourUrl, note: "只认实际订单日期和集合点" },
      ],
    },
    verified:
      "天气重排于2026-09-01核对：9月5日相较9月4日降雨显著减少，适合作为Møns Klint主窗口；风力与崖区公告仍可能让步道缩短。",
    sources: addSources(patched.sources),
  };
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) => {
    if (plan.id !== "core") return plan;
    const sep04 = plan.days.find((day) => day && day.id === "sep04");
    const sep05 = plan.days.find((day) => day && day.id === "sep05");
    return {
      ...plan,
      decision: {
        ...plan.decision,
        weather:
          "已按2026-09-01未来7天预报重排：9月3日阵雨，市区经典点前置、午后进室内；9月4日阴雨，安排罗斯基勒；9月5日少雨但偏风，作为Møns Klint主窗口；9月6日保留Frederiksborg＋Louisiana，9月7日按转场主线执行。",
      },
      days: plan.days.map((day) =>
        day && day.id === "sep03"
          ? patchSep03(day)
          : day && day.id === "sep04" && sep05
            ? patchRoskildeSep04(sep05)
            : day && day.id === "sep05" && sep04
              ? patchMoenSep05(sep04)
              : day,
      ),
    };
  });
}
