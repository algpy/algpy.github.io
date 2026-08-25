import { balancedRouteAudit as balancedRouteAuditBase } from "./balancedRouteAudit-2026-fix5.js";

const moxyUrl = "https://www.marriott.com/en-us/hotels/bgoox-moxy-bergen/overview/";
const moxyCheckIn =
  "到Bar Moxy/前台报姓名，并从个人离线订单出示右上角确认号，现场付款办理入住；如问预订来源，回答“公司行政预订”。酒店当地15:00后办理入住；提前到可先寄存行李。确认号不写入本公开网页。";

const arrivalStop = (stop = {}) => ({
  ...stop,
  time: "落地+1:25–1:50",
  title: "Moxy Bergen",
  lat: 60.378971,
  lng: 5.3331,
  local: "Moxy Bergen · Bar Moxy / Front Desk",
  address: "Solheimsgaten 3, 5058 Bergen",
  arriveBy: "tram",
  leg: "BGO→Florida乘Bybanen Line 1约35–45分；Florida站步行约5分",
  dwell: "办理入住后结束",
  task: moxyCheckIn + " 本日为晚间到达，入住后不再夜游。",
  ticket: "使用已激活Skyss票与实际Moxy订单；确认号只从离线订单出示。",
  official: moxyUrl,
});

const departureStop = (stop = {}) => ({
  ...stop,
  time: "07:30",
  title: "Moxy Bergen",
  lat: 60.378971,
  lng: 5.3331,
  local: "Moxy Bergen · Solheimsgaten 3",
  address: "Solheimsgaten 3, 5058 Bergen",
  arriveBy: "walk",
  leg: "住宿内完成补给和退房；随后Florida→Nonneseter/Bergen Station",
  dwell: "约50分含退房、轻轨和车站寄存",
  task:
    "是否含早餐以订单为准；退房后步行约5分到Florida，乘Line 1到Nonneseter，再到Bergen Station寄存大件。贵重物、防风层、水和路餐随身。",
  ticket:
    "使用实际Moxy订单与有效Skyss票；车站寄存按现场柜体、尺寸和支付规则执行。",
  official: moxyUrl,
});

const sep12Base = balancedRouteAuditBase.sep12;
const sep13Base = balancedRouteAuditBase.sep13;

export const balancedRouteAudit = {
  ...balancedRouteAuditBase,
  sep12: {
    ...sep12Base,
    scope:
      "Sky退房 → Malmö C官方储物柜 → ECCV最终日 → 取件 → CPH 17:50直飞 → BGO → Florida → Moxy Bergen",
    reservation:
      "17:50实际航班；Malmö C储物柜费用；Moxy Bergen已确认订单；跨境列车票",
    accuracy:
      "Bergen端落到Moxy Bergen正门/Bar Moxy：BGO乘Bybanen Line 1至Florida，再步行约5分钟。",
    stops: sep12Base.stops.map((item, index, stops) =>
      item.title === "Bergen Station步行圈住宿" ||
      item.title === "Moxy Bergen" ||
      index === stops.length - 1
        ? arrivalStop(item)
        : item,
    ),
  },
  sep13: {
    ...sep13Base,
    scope: "Moxy Bergen → Bergen Station寄存 → Bergen文化主线 → 18:29 Voss列车",
    accuracy:
      "Moxy Bergen、Florida轻轨站、Bergen Station、Bryggen、Bryggens Museum、Ulriken与Voss车站均为真实锚点。",
    stops: sep13Base.stops.map((item, index) =>
      item.title === "Bergen Station步行圈住宿" ||
      item.title === "Moxy Bergen" ||
      index === 0
        ? departureStop(item)
        : item,
    ),
  },
};
