import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix11.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix11.js";

const hotelName = "Vatnahalsen Høyfjellshotell";
const hotelUrl = "https://www.vatnahalsen.no/en";
const hotelFoodUrl = "https://www.vatnahalsen.no/en/food";
const flamRailUrl = "https://www.norwaysbest.com/en/flam/things-to-do/the-flam-railway-round-trip";
const vyUrl = "https://www.vy.no/en";
const vyStatusUrl = "https://www.vy.no/en/customer-service/frequently-asked-questions/train-traffic-status-and-routes";
const oslTransportUrl = "https://www.avinor.no/en/airport/oslo/info/public-transportation/";
const stationLat = 60.74381;
const stationLng = 7.12965;
const hotelLat = 60.7438;
const hotelLng = 7.1316;

const uniqueStrings = (items = []) => [...new Set(items.filter(Boolean))];

const googleMap = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const transit = (mode, route, time, duration, official, buffer, ticket) => ({
  mode,
  route,
  time,
  duration,
  official,
  map: googleMap(route),
  buffer,
  ticket,
});

const source = (label, type, url) => ({ label, type, url });

const stationStop = () => ({
  time: "16:40",
  title: "Flåm Station · Track 4",
  lat: 60.86283,
  lng: 7.1139,
  local: "Flåm stasjon",
  address: "5743 Flåm",
  arriveBy: "walk",
  leg: "15:35接驳回镇后取行李，步行到站",
  dwell: "至少30分钟核对车票、站屏和实际站台",
  task: "当前Vy票卡显示Track 4；站台可能调整，当天只认站屏和工作人员指引。",
  ticket: "已购：9月15日17:10 Flåm → Vatnahalsen，1成人。",
  official: flamRailUrl,
});

const vatnahalsenStationStop = (time = "预计18:06") => ({
  time,
  title: "Vatnahalsen Station",
  lat: stationLat,
  lng: stationLng,
  local: "Vatnahalsen stasjon",
  address: "Vatnahalsen, 5718 Myrdal",
  arriveBy: "train",
  leg: "Flåm 17:10直达；全程约56分钟，以Vy票面与当天运行信息为准",
  dwell: "下车后先确认行李齐全",
  task: "这是小型山地站；不要坐到Myrdal。下车后沿约100米碎石路步行到酒店。",
  ticket: "已购Vy车票；截图显示9月15日17:10从Flåm出发。",
  official: flamRailUrl,
});

const hotelArrivalStop = () => ({
  time: "约18:10",
  title: hotelName,
  lat: hotelLat,
  lng: hotelLng,
  local: "Vatnahalsen Hotell",
  address: "Vatnahalsen, 5718 Myrdal",
  arriveBy: "walk",
  leg: "Vatnahalsen Station→酒店约100米碎石路",
  dwell: "办理入住、晚餐与次日早餐确认",
  task: "酒店只能乘火车抵达；无电梯且入口有台阶。提前书面告知约18:06到站，并确认晚到接待、晚餐时段及是否含餐。",
  ticket: "住宿已确认：9月15日至16日1晚；确认号不写入公开攻略。",
  official: hotelUrl,
});

const hotelDepartureStop = () => ({
  time: "06:45–08:45",
  title: hotelName,
  lat: hotelLat,
  lng: hotelLng,
  local: "Vatnahalsen Hotell",
  address: "Vatnahalsen, 5718 Myrdal",
  arriveBy: "walk",
  leg: "在酒店完成早餐、路餐、行李整理与退房",
  dwell: "08:30前完成退房手续",
  task: "前一晚确认早餐开始时间；若赶不上早餐，请酒店安排可带走早餐或自备路餐。",
  ticket: "住宿已确认；09:13火车是本日硬锚点。",
  official: hotelUrl,
});

const patchSep15Route = (routeData = {}) => {
  const base = (routeData.stops || []).filter(
    (stop) => !/Vatnahalsen|Track 4/.test(String(stop.title || "")),
  );
  return {
    ...routeData,
    scope:
      "Flåm退房寄存 → Otternes → Aurland → Stegastein → Flåm取行李 → 17:10 Vatnahalsen → 山地酒店",
    walking: "低处景点步行约2–4 km；另有车站至酒店约100米碎石路",
    hardStop:
      "15:35必须随官方车回到Flåm；16:25前取完行李和路餐；16:40到站；17:10已购火车不等待",
    reservation:
      "9月15日17:10 Flåm→Vatnahalsen已购；Vatnahalsen Høyfjellshotell 9月15–16日已确认；景点接驳另按实际订单",
    accuracy:
      "Flåm、Otternes、Aurland、Stegastein、Vatnahalsen Station与酒店均落到真实节点；彩线只表示顺序，火车站台以当天站屏为准。",
    stops: [...base, stationStop(), vatnahalsenStationStop(), hotelArrivalStop()],
  };
};

const patchSep16Route = (routeData = {}) => ({
  ...routeData,
  scope:
    "Vatnahalsen Høyfjellshotell → Vatnahalsen Station 09:13 → Myrdal 09:17 → Oslo S 15:05 → OSL机场酒店",
  walking: "酒店至站约100米碎石路；Oslo S与OSL机场酒店按实际站台/连廊短步行",
  hardStop: "08:45离开酒店；08:50到站；09:13已购Vy行程不等待；Myrdal只按同一订单换乘",
  reservation:
    "Vatnahalsen→Oslo S已购；计划时刻为09:13→09:17、10:02→15:05，最终只认Vy票面与当天站屏",
  accuracy:
    "路线从真实Vatnahalsen站起步，不再错误返回Flåm；Myrdal、Hardangervidda、Oslo S和OSL按真实铁路顺序显示。",
  stops: [
    hotelDepartureStop(),
    {
      ...vatnahalsenStationStop("08:50"),
      leg: "酒店→车站约100米碎石路",
      dwell: "提前约23分钟候车",
      task: "站点较小且没有城市站级服务；提前下载票、看实时信息，不在最后几分钟拖箱赶站。",
      ticket: "已购：9月16日09:13 Vatnahalsen → Oslo S，1位旅客。",
    },
    {
      time: "09:17–10:02",
      title: "Myrdal Station",
      lat: 60.7352,
      lng: 7.1221,
      local: "Myrdal stasjon",
      address: "Bergensbanen, 5718 Myrdal",
      arriveBy: "train",
      leg: "R45 Vatnahalsen 09:13→Myrdal 09:17",
      dwell: "约45分钟受保护换乘",
      task: "先确认10:02 Oslo方向的实际站台，再考虑卫生间、热饮或补给；不离开站区。",
      ticket: "按同一张Vy行程继续，不把短途与长途拆成互不保护的票。",
      official: vyUrl,
    },
    {
      time: "白天",
      title: "Hardangervidda / Finse线路点",
      lat: 60.60165,
      lng: 7.50318,
      local: "Finse stasjon",
      address: "Finse, 5719 Finse",
      arriveBy: "train",
      leg: "Bergen Line列车内经过",
      dwell: "不下车",
      task: "从车内看高原地貌；保暖层、水、路餐和充电线放随身包。",
      ticket: "列车内观景，不另购景点票。",
      official: vyUrl,
    },
    {
      time: "计划15:05",
      title: "Oslo S",
      lat: 59.91103,
      lng: 10.75314,
      local: "Oslo sentralstasjon",
      address: "Jernbanetorget 1, 0154 Oslo",
      arriveBy: "train",
      leg: "Myrdal 10:02→Oslo S 15:05；最终以票面为准",
      dwell: "预留20–30分钟转机场列车",
      task: "直接跟随Airport/Oslo lufthavn标识换乘，不安排Bjørvika补景点。",
      ticket: "Oslo S→OSL按当天Vy/Flytoget实际班次另行执行。",
      official: oslTransportUrl,
    },
    {
      time: "约15:30–16:00",
      title: "Oslo Airport Station",
      lat: 60.19315,
      lng: 11.09682,
      local: "Oslo lufthavn stasjon",
      address: "Edvard Munchs veg, 2061 Gardermoen",
      arriveBy: "train",
      leg: "Oslo S→OSL约20–25分钟；错过即乘下一班",
      dwell: "出站后直去机场酒店",
      task: "完成入住、热食并复核次日国际航班；不再返回Oslo市区。",
      ticket: "Vy/Flytoget当天实际票与站屏。",
      official: oslTransportUrl,
    },
  ],
});

const patchFood = (day, kind) => {
  const foods = [...(day.foods || [])];
  if (!foods.length) return foods;
  if (kind === "sep15") {
    return foods.map((food, index) =>
      index === 0
        ? {
            ...food,
            name: "Flåm冷食与火车路餐",
            type: "可携带简餐",
            tier: "€",
            near: "Flåm Station步行圈",
            url: "https://www.norwaysbest.com/en/flam/food-and-drinks/flam-bakery",
            price: "€ · 以当日菜单为准",
            meal: "15:35回镇后迅速取餐；16:25前结束",
            booking: "不订位；避免坐下等待",
            order: "面包、三明治、水和水果",
            note: "17:10火车优先；排队过长就用上午预买的路餐。",
          }
        : index === 1
          ? {
              ...food,
              name: "Vatnahalsen酒店三道式晚餐",
              type: "山地酒店晚餐",
              tier: "€€€",
              near: hotelName,
              url: hotelFoodUrl,
              price: "€€€ · 是否含餐以住宿订单为准",
              meal: "约18:10入住后，按酒店确认时段",
              booking: "必须提前确认晚到接待、用餐时间和是否含餐",
              order: "酒店当晚3道式菜单；过敏与忌口提前告知",
              note: "酒店周边没有可依赖的替代餐厅，不要把晚餐留到现场碰运气。",
            }
          : food,
    );
  }
  return foods.map((food, index) =>
    index === 0
      ? {
          ...food,
          name: "Vatnahalsen早餐 / 可带走路餐",
          type: "酒店早餐与铁路补给",
          tier: "€€",
          near: hotelName,
          url: hotelFoodUrl,
          price: "是否包含以实际住宿订单为准",
          meal: "前一晚确认开始时间；08:30前结束",
          booking: "早餐若晚于计划，请提前申请外带或自备",
          order: "面包、冷切、水果、热饮；另带水和午间路餐",
          note: "Vatnahalsen小站不适合临时采购，出发前一次备齐。",
        }
      : food,
  );
};

const patchSep15 = (day) => ({
  ...day,
  city: "Flåm → Otternes → Aurland → Stegastein → Vatnahalsen",
  phase: "峡湾纵深＋已购Flåmsbana入住",
  title: "Otternes、Aurland与Stegastein之后，17:10上山住Vatnahalsen",
  summary:
    "15:35回到Flåm后有95分钟衔接已购火车，足够取行李与买路餐，但不再安排坐下晚餐。16:40到站，17:10乘Flåmsbana到Vatnahalsen；酒店只能乘火车抵达。",
  route:
    "Flåm退房寄存 → 09:30 Otternes → 12:35 Aurland → 14:15 Stegastein → 15:35 Flåm → 17:10 Vatnahalsen → 酒店",
  load: "中等 · 约2–4 km步行＋接驳巴士＋56分钟山地火车＋100米碎石路",
  stay: "Vatnahalsen Høyfjellshotell · Vatnahalsen Station旁约100米 · 已确认1晚（9/15–9/16）",
  verified:
    "用户已确认Vatnahalsen Høyfjellshotell并已购9月15日17:10 Flåm→Vatnahalsen车票；2026官方Flåmsbana时刻表确认17:10班次，当前票卡显示Track 4，最终以Vy票面、站屏和运行通知为准。",
  main: [
    {
      time: "07:30–08:45",
      title: "Flåm住宿退房并寄存行李",
      detail:
        "只带日用小包出发；与住宿书面确认15:35后取行李地点、开放时间和最迟取件时间。贵重物、药物、证件与17:10车票随身。",
    },
    {
      time: "09:10",
      title: "到Flåm官方接驳上车点",
      detail: "提前20分钟核对订单、车辆与Otternes方向；接驳未确认时不自行包车追行程。",
    },
    {
      time: "09:30–09:35",
      title: "Flåm → Otternes",
      detail: "按Norway's Best官方接驳计划执行；到站先确认12:35续程上车点。",
    },
    {
      time: "09:35–12:35",
      title: "Otternes历史农庄",
      detail: "预留导览、步行和简餐；12:20开始收口，12:30回到票面候车点。",
    },
    {
      time: "12:35–12:44",
      title: "Otternes → Aurland",
      detail: "到Aurland后先辨认Stop F和14:15 Stegastein车辆位置，再安排午餐与短走。",
    },
    {
      time: "12:44–14:05",
      title: "Aurland午餐与低处短走",
      detail: "14:05前回Stop F；餐厅排队过长就改面包/超市补给，不牺牲14:15接驳。",
    },
    {
      time: "14:15–15:35",
      title: "Stegastein官方往返",
      detail: "14:30到观景台、15:00返程、15:35回Flåm；低云、强风或运营调整时直接删除高处线。",
    },
    {
      time: "15:35–16:25",
      title: "取行李、卫生间与路餐",
      detail: "95分钟换乘窗口只用于取行李和快速补给；16:25仍未完成就放弃购物，直接去车站。",
    },
    {
      time: "16:40",
      title: "到Flåm Station候车",
      detail: "当前票卡显示Track 4；当天看站屏与工作人员指引，下载车票并确认下车站是Vatnahalsen。",
    },
    {
      time: "17:10–预计18:06",
      title: "已购Vy：Flåm → Vatnahalsen",
      detail: "约56分钟山地铁路；Vatnahalsen在Myrdal之前，提前收好随身物品，不要坐过站。",
    },
    {
      time: "约18:10后",
      title: "步行入住Vatnahalsen Høyfjellshotell",
      detail: "车站到酒店约100米碎石路；无电梯且有入口台阶。提前告知约18:06到站，并确认晚到接待、晚餐时间与是否含餐。",
    },
  ],
  transit: [
    transit("官方接驳", "Flåm → Otternes", "09:30–09:35", "约5分", "https://www.norwaysbest.com/en/flam/things-to-do/historical-farm-tour-at-otternes", "提前20分", "以实际接驳订单为准"),
    transit("官方接驳", "Otternes → Aurland", "12:35–12:44", "约9分", "https://www.norwaysbest.com/en/flam/things-to-do/shuttlebus-flam-aurland", "提前10分回候车点", "以实际接驳订单为准"),
    transit("Stegastein往返", "Aurland Stop F → Stegastein → Flåm", "14:15–15:35", "约80分", "https://www.norwaysbest.com/en/flam/things-to-do/stegastein-viewpoint", "14:05前回Stop F", "低云或停运即删除"),
    transit("Vy R45 / Flåmsbana", "Flåm → Vatnahalsen", "17:10–预计18:06", "约56分", flamRailUrl, "16:40到站；当前票卡显示Track 4", "已购，1成人；票面与站屏优先"),
  ],
  foods: patchFood(day, "sep15"),
  transport: uniqueStrings([
    "9月15日17:10 Flåm→Vatnahalsen已购；当前票卡显示Track 4，当天站屏优先。",
    "Vatnahalsen只能乘火车抵达；车站到酒店约100米碎石路，不存在出租车/巴士兜底。",
    ...(day.transport || []).filter((item) => !/Flåm连住|次日08:20|Flåm住宿/.test(String(item))),
  ]),
  safety: uniqueStrings([
    "15:35回Flåm后不安排坐下晚餐；16:25后只向车站移动，17:10已购火车不可牺牲。",
    "酒店无电梯且入口有台阶；只带一晚所需物品在易取位置，拖箱走100米碎石路时放慢。",
    "提前联系酒店确认约18:06到站的晚到接待、三道式晚餐时段、是否含餐及过敏信息。",
    ...(day.safety || []).filter((item) => !/08:20|Flåm连住/.test(String(item))),
  ]),
  hardCutoff: "15:35回Flåm；16:25停止一切补给；16:40到站；17:10已购火车出发。",
  sources: [
    ...(day.sources || []).filter((item) => !/Vatnahalsen|Flåmsbana|Vy/.test(`${item.label || ""} ${item.url || ""}`)),
    source("Flåmsbana 2026官方时刻表", "铁路官网", flamRailUrl),
    source("Vatnahalsen Høyfjellshotell", "住宿官网", hotelUrl),
    source("Vatnahalsen酒店餐饮", "餐饮官网", hotelFoodUrl),
    source("Vy行程与实时状态", "交通官网", vyStatusUrl),
  ],
  rain: {
    trigger: "低云、强风、Stegastein接驳取消或预计15:35后才能回Flåm",
    title: "删高处观景，守住17:10已购火车",
    detail: "保留Flåm/Aurland低处短线，提前回镇取行李；不临时包车去无公路的Vatnahalsen。",
  },
  backup: {
    title: "17:10火车保护方案",
    trigger: "Stegastein停运、道路调整、接驳延误或行李取件出现问题",
    verdict: "整段高处线可删；已购火车和山地酒店不可删",
    exit: "16:25仍未完成补给时立刻去站台；预计赶不上17:10则先联系Vy与酒店，不冒险追车。",
    route: [
      { label: "Flåm住宿/寄存", query: "Flåm luggage storage", url: googleMap("Flåm luggage storage"), note: "先取行李" },
      { label: "Flåm Station", query: "Flåm stasjon", url: googleMap("Flåm stasjon"), note: "16:40到站" },
      { label: hotelName, query: hotelName, url: hotelUrl, note: "只能乘火车抵达" },
    ],
    timeline: [
      ["13:45", "复核天气与接驳", "若高处线不稳，留在Aurland低处或提前回Flåm。"],
      ["15:35", "回Flåm并取行李", "先完成最不能替代的取件。"],
      ["16:25", "停止补给", "直接步行去车站。"],
      ["16:40", "核对Track 4与站屏", "站台变更以现场为准。"],
      ["17:10", "乘已购Vy火车", "Vatnahalsen下车，不坐到Myrdal。"],
    ],
    transport: "只接受Norway's Best/Vy书面调整；Vatnahalsen无公路，不把出租车写成兜底。",
    meal: "上午预买路餐；到酒店后按已确认晚餐时段用餐。",
    booking: [
      { label: "Vy实时状态", url: vyStatusUrl, note: "查延误、取消与站台" },
      { label: "Vatnahalsen酒店", url: hotelUrl, note: "提前确认晚到与晚餐" },
    ],
  },
  routeData: patchSep15Route(day.routeData),
  mapUrl: googleMap("Flåm to Vatnahalsen Station"),
  bookingUrl: hotelUrl,
});

const patchSep16 = (day) => ({
  ...day,
  city: "Vatnahalsen → Myrdal → Oslo S → OSL",
  phase: "已购景观铁路＋机场缓冲",
  title: "09:13已购Vy联程：从Vatnahalsen经Myrdal到Oslo S，当晚住OSL",
  summary:
    "不用返回Flåm。08:50步行到Vatnahalsen小站，09:13乘R45到Myrdal，按同一张已购Vy行程换乘10:02 Bergen Line，计划15:05到Oslo S，再直接转OSL。",
  route:
    "Vatnahalsen Høyfjellshotell → 09:13 Vatnahalsen Station → 09:17 Myrdal / 10:02 → 15:05 Oslo S → OSL机场酒店",
  load: "长铁路观景日 · 100米碎石路＋45分钟Myrdal换乘＋Oslo S机场转乘",
  verified:
    "用户已购9月16日09:13 Vatnahalsen→Oslo S的Vy行程；计划结构为09:13→09:17 Myrdal、10:02→15:05 Oslo S。所有到发与站台最终只认Vy App票面、推送与当天站屏。",
  main: [
    {
      time: "06:45–07:30",
      title: "Vatnahalsen酒店早餐与路餐",
      detail: "前一晚确认早餐开始时间；若赶不上，申请可带走早餐或使用自备食物。另备白天饮水和路餐。",
    },
    {
      time: "07:30–08:30",
      title: "整理行李并退房",
      detail: "把车票、充电线、保暖层、药物和午餐放随身包；08:30前办完手续。",
    },
    {
      time: "08:45–08:50",
      title: "步行到Vatnahalsen Station",
      detail: "酒店到站约100米碎石路；小站服务有限，提前23分钟候车，不在最后时刻拖箱冲站。",
    },
    {
      time: "09:13–09:17",
      title: "已购R45：Vatnahalsen → Myrdal",
      detail: "4分钟到Myrdal；下车先看10:02 Oslo方向实际站台。",
    },
    {
      time: "09:17–10:02",
      title: "Myrdal受保护换乘",
      detail: "约45分钟；先定位站台，再用卫生间或买热饮，不离开站区、不手拼另一张票。",
    },
    {
      time: "10:02–计划15:05",
      title: "Bergen Line：Myrdal → Oslo S",
      detail: "从高原向东穿越Hardangervidda；路餐、饮水、充电和保暖层放在座位可取位置。",
    },
    {
      time: "计划15:05–约16:00",
      title: "Oslo S → OSL",
      detail: "预留20–30分钟找机场列车；错过目标班次就乘下一班，不进Bjørvika、不补市区景点。",
    },
    {
      time: "到达后",
      title: "入住OSL机场酒店并复核返沪联程",
      detail: "热食、充电、洗衣与睡眠优先；确认次日OSL出发、中转、行李直挂和最终PVG航段。",
    },
  ],
  transit: [
    transit("Vy R45 / Flåmsbana", "Vatnahalsen → Myrdal", "09:13–09:17", "约4分", flamRailUrl, "08:50到站", "已购；以Vy票面和站屏为准"),
    transit("Vy F4 / Bergen Line", "Myrdal → Oslo S", "计划10:02–15:05", "约5小时03分", "https://www.vy.no/en/train/routes/the-bergen-line", "约45分钟受保护换乘", "与09:13行程同一已购订单"),
    transit("机场列车", "Oslo S → OSL", "15:30前后起滚动", "约20–25分", oslTransportUrl, "另留20–30分钟找站台", "当天实际Vy/Flytoget票"),
  ],
  sights: (day.sights || []).map((sight, index) =>
    index === 0
      ? {
          ...sight,
          name: "Vatnahalsen→Myrdal＋Bergen Line eastbound",
          why: "9月15日晚已经完成Flåm→Vatnahalsen，今天用最后4分钟爬到Myrdal，再向东横穿Hardangervidda；完整体验Flåmsbana而不走回头路。",
          ticket: "Vatnahalsen→Oslo S已购；Myrdal接续只按同一Vy行程执行，票面或运营调整优先于网页计划分钟。",
          tour: "不跟团、不在中途下车追拍；把注意力放在峡湾山谷、隧道、高原和东挪威地貌连续变化。",
          url: "https://www.vy.no/en/train/routes/the-bergen-line",
          map: googleMap("Vatnahalsen Myrdal Oslo S train"),
        }
      : sight,
  ),
  foods: patchFood(day, "sep16"),
  transport: uniqueStrings([
    "09:13 Vatnahalsen→Oslo S已购；09:17到Myrdal后按同一订单换乘，不返回Flåm。",
    "Oslo S→OSL是独立高频机场段；预留20–30分钟找站台，错过就乘下一班。",
    ...(day.transport || []).filter((item) => !/08:20|Flåm→Myrdal|Flåm Railway/.test(String(item))),
  ]),
  safety: uniqueStrings([
    "08:45离开酒店、08:50到站；Vatnahalsen小站服务有限，不把购餐、打印或大件行李处理留到站内。",
    "Myrdal先找10:02 Oslo方向站台再补给；运营调整时只服从Vy，不自行拼分离票。",
    ...(day.safety || []).filter((item) => !/08:20|Flåm站/.test(String(item))),
  ]),
  hardCutoff: "08:45离开酒店；08:50到Vatnahalsen Station；09:13出发；Myrdal按同一Vy订单换乘。",
  sources: [
    ...(day.sources || []).filter((item) => !/Flåm Railway|Vy|Vatnahalsen/.test(`${item.label || ""} ${item.url || ""}`)),
    source("Vy已购行程与实时状态", "交通官网", vyStatusUrl),
    source("Flåmsbana 2026官方时刻表", "铁路官网", flamRailUrl),
    source("Bergen Line", "铁路官网", "https://www.vy.no/en/train/routes/the-bergen-line"),
    source("Vatnahalsen Høyfjellshotell", "住宿官网", hotelUrl),
    source("Oslo Airport公共交通", "机场官网", oslTransportUrl),
  ],
  rain: {
    trigger: "普通风雨、铁路晚点或线路中断",
    title: "普通天气主线不变；中断只接受Vy替代",
    detail: "删除Oslo市区停留和指定餐厅；Vy宣布替代巴士/后续车时全程按同一订单处理，抵达后直接去OSL。",
  },
  backup: {
    title: "Vy替代交通＋OSL直达",
    trigger: "R45或Bergen Line取消、晚点超过90分钟或预计无法在当晚到OSL",
    verdict: "只接受Vy给出的受保护改签或替代交通；不另买拼车追进度",
    exit: "预计18:00后仍无法到OSL时，同时通知机场酒店与次日国际承运航司并保存延误凭证。",
    route: [
      { label: "Vatnahalsen Station", query: "Vatnahalsen stasjon", url: googleMap("Vatnahalsen stasjon"), note: "留在安全站点等官方安排" },
      { label: "Myrdal Station", query: "Myrdal stasjon", url: googleMap("Myrdal stasjon"), note: "只按Vy接续" },
      { label: "Oslo S", query: "Oslo S", url: googleMap("Oslo S"), note: "到站后直转OSL" },
      { label: "OSL", query: "Oslo Airport", url: oslTransportUrl, note: "入住机场区域" },
    ],
    timeline: [
      ["06:45", "查Vy App与推送", "发现中断立即联系Vy，不等到09:13。"],
      ["08:50", "到Vatnahalsen站", "保存客服与替代交通记录。"],
      ["白天", "执行Vy安排", "带足水、路餐、电量和保暖层。"],
      ["抵达Oslo S", "直接转OSL", "不进市区补景点。"],
      ["抵达OSL", "入住并处理次日航班", "必要时保留延误和支出凭证。"],
    ],
    transport: "Vy铁路订单不自动保护次日国际航班；预计不能当晚到OSL时要同时处理铁路、酒店和航司。",
    meal: "全日以酒店早餐、随身路餐、站内热饮和OSL简餐为主。",
    booking: [
      { label: "Vy交通状态", url: vyStatusUrl, note: "查取消、延误和替代" },
      { label: "OSL出发信息", url: "https://www.avinor.no/en/airport/oslo/flight-times/#departure", note: "同步复核次日航班" },
    ],
  },
  routeData: patchSep16Route(day.routeData),
  mapUrl: googleMap("Vatnahalsen Station to Oslo Airport via Myrdal Oslo S"),
  bookingUrl: vyUrl,
});

const patchDay = (day) => {
  if (day?.id === "sep15") return patchSep15(day);
  if (day?.id === "sep16") return patchSep16(day);
  return day;
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) => {
    if (plan.id !== "core") return plan;
    return {
      ...plan,
      days: plan.days.map(patchDay),
      decision: {
        ...plan.decision,
        lodging:
          "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚＋Scandic Voss 1晚＋Flåm 1晚＋Vatnahalsen Høyfjellshotell 1晚（前述均已确认）＋OSL机场1晚。",
        transfer:
          "高：9月2–3日PVG→BKK→CPH；9月12日17:50飞BGO；9月13日18:29铁路；9月14日09:50巴士＋12:10船；9月15日15:35回Flåm后接已购17:10火车；9月16日已购09:13 Vatnahalsen→Oslo S并直转OSL。",
        booking:
          "已确认泰航去程、Bob W、Sky Hotel、Moxy Bergen、Scandic Voss、9月12日航班、Vatnahalsen Høyfjellshotell，以及9月15日17:10和9月16日09:13两张Vy行程；仅补核Flåm 9月14–15日与OSL机场住宿。",
      },
    };
  });
}
