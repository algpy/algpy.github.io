import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix12.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix12.js";

const hotelName = "Vatnahalsen Høyfjellshotell";
const hotelUrl = "https://www.vatnahalsen.no/en";
const hotelFoodUrl = "https://www.vatnahalsen.no/en/food";
const hotelFoodImage =
  "https://www.vatnahalsen.no/sites/cb_vatnahalsen/files/styles/article_slide_large/public/mat.jpg.webp?itok=tXhFBF3G";
const marianneUrl = "https://www.mariannebakeri.com/";
const flamBakeryUrl =
  "https://www.norwaysbest.com/en/flam/food-and-drinks/flam-bakery";
const flamRailUrl =
  "https://www.norwaysbest.com/en/flam/things-to-do/the-flam-railway-round-trip";
const bergenLineUrl = "https://www.vy.no/en/train/routes/the-bergen-line";
const vyStatusUrl =
  "https://www.vy.no/en/customer-service/frequently-asked-questions/train-traffic-status-and-routes";
const oslTransportUrl =
  "https://www.avinor.no/en/airport/oslo/info/public-transportation/";

const uniqueStrings = (items = []) => [...new Set(items.filter(Boolean))];

const patchSep14 = (day) => ({
  ...day,
  stay: "Flåm车站—码头步行圈 · 1晚（9/14–9/15，待订）",
  routeData: {
    ...day.routeData,
    reservation:
      "Scandic Voss已确认；09:50 Voss→Gudvangen巴士与12:10 Nærøyfjord船按实际订单；Flåm住宿仅订9月14–15日1晚",
  },
  transport: uniqueStrings(
    (day.transport || []).map((item) =>
      String(item)
        .replaceAll("Flåm两晚", "Flåm 9月14–15日1晚")
        .replaceAll("Flåm连住", "Flåm住1晚"),
    ),
  ),
  safety: uniqueStrings(
    (day.safety || []).map((item) =>
      String(item)
        .replaceAll("Flåm两晚", "Flåm 9月14–15日1晚")
        .replaceAll("Flåm连住", "Flåm住1晚"),
    ),
  ),
});

const patchSep15Foods = (foods = []) => {
  const [marianne = {}, flamBakery = {}, hotelDinner = {}] = foods;
  return [
    {
      ...marianne,
      name: "Marianne Bakery & Café",
      type: "Aurland快捷午餐",
      tier: "€€",
      near: "Aurland Stop F步行圈 · Odden 2",
      url: marianneUrl,
      price: "以当日菜单为准",
      meal: "12:44到Aurland后；14:05前回Stop F",
      booking: "通常无需订位；排队过长就改外带",
      order: "汤、沙拉、三明治或当日烘焙；另补水",
      note: "先确认14:15 Stegastein车辆位置，再用餐；14:05无条件结束。",
      flavor: "现烤面包的谷物香配汤、沙拉或咸口夹馅，适合中午稳定补能。",
      suitableFor: "想在Aurland吃一顿轻午餐、又不牺牲14:15接驳的人。",
    },
    {
      ...flamBakery,
      name: "Flåm Bakery可携带路餐",
      type: "火车路餐",
      tier: "€",
      near: "Flåm Station旁",
      url: flamBakeryUrl,
      price: "以当日菜单为准",
      meal: "15:35回镇后取行李时顺路购买；16:25前结束",
      booking: "不订位；只选可立即带走的成品",
      order: "酸面包三明治、面包、水果、水或果汁",
      note: "17:10已购火车优先；排队过长就使用上午预买的路餐。",
      flavor: "酸面包的谷物香配咸口夹馅，便于携带，也不会拖慢换乘。",
      suitableFor: "需要在50分钟取件窗口内完成补给的人。",
    },
    {
      ...hotelDinner,
      name: "Vatnahalsen酒店三道式晚餐",
      type: "山地酒店晚餐",
      tier: "€€€",
      near: hotelName,
      url: hotelFoodUrl,
      price: "是否含餐以住宿订单为准",
      meal: "约18:10入住后；按酒店书面确认时段",
      booking: "提前确认晚到接待、用餐时间、是否含餐及忌口",
      order: "酒店当晚三道式菜单；过敏与忌口提前告知",
      note: "酒店周边没有可依赖的替代餐厅；未获晚餐确认时必须在Flåm带足食物。",
      flavor: "菜单随季节和当日供应变化，通常以本地肉类、鱼、根茎与蔬菜组成完整热餐。",
      suitableFor: "18:06左右到站、希望入住后直接吃热餐的人。",
      image: hotelFoodImage,
      imageSource: hotelFoodUrl,
      imageLabel: "Vatnahalsen官方晚餐实景；具体菜品以当晚菜单为准",
      fallbackImage: undefined,
      fallbackImageSource: undefined,
    },
  ];
};

const patchSep15 = (day) => ({
  ...day,
  foods: patchSep15Foods(day.foods || []),
  safety: uniqueStrings([
    ...(day.safety || []).filter(
      (item) => !/甲板|船舱|外层甲板|船上风冷/.test(String(item)),
    ),
    "山地铁路途中只在座位或安全站区整理物品；Vatnahalsen下车前提前收好行李，不在车门处停留拍照。",
  ]),
});

const patchSep16Foods = (foods = []) =>
  (foods || []).map((food, index) => {
    if (index === 0) {
      return {
        ...food,
        image: hotelFoodImage,
        imageSource: hotelFoodUrl,
        imageLabel: "Vatnahalsen官方餐饮实景；早餐内容以住宿当日安排为准",
        flavor: "面包、冷切、水果与热饮以清爽、易携带为主，适合长途铁路日前补能。",
        suitableFor: "需要在08:30前完成早餐并准备午间路餐的人。",
        fallbackImage: undefined,
        fallbackImageSource: undefined,
      };
    }
    if (index === 1) {
      return {
        ...food,
        flavor: "车上冷热餐食随班次变化；优先选标明食材的三明治、汤或热饮。",
        suitableFor: "已自带主路餐、只把餐车当补充的人。",
      };
    }
    if (index === 2) {
      return {
        ...food,
        flavor: "披萨、意面或简餐以热、咸、易恢复体力为主，具体品类看当日菜单。",
        suitableFor: "抵达OSL并完成酒店确认后，需要一顿稳定热食的人。",
      };
    }
    return {
      ...food,
      flavor: "面包、水果与瓶装饮品以便携为主，适合作为次日国际航班的应急补给。",
      suitableFor: "想快速补水、补早餐且不安排正式晚餐的人。",
    };
  });

const patchSep16 = (day) => ({
  ...day,
  timeCheck: {
    status: "两张已购车票已对齐；动态运行出发前48小时复核",
    note:
      "09:13 Vatnahalsen→09:17 Myrdal已购；计划10:02续乘并于15:05到Oslo S。站台、施工与最终到发只认Vy票面、推送和当天站屏。",
  },
  execution: {
    grade: "A｜已购联程与45分钟换乘缓冲明确",
    tone: "ready",
    basis:
      "本日从Vatnahalsen直接上车，不返回Flåm；09:13短段与10:02 Bergen Line按同一张已购Vy行程执行，Myrdal有约45分钟换乘。",
    anchors: [
      {
        time: "08:50",
        title: "到Vatnahalsen Station",
        detail: "酒店步行约100米；提前23分钟到小站候车。",
      },
      {
        time: "09:13–09:17",
        title: "Vatnahalsen → Myrdal",
        detail: "已购R45；下车先确认Oslo方向站台。",
      },
      {
        time: "10:02–计划15:05",
        title: "Myrdal → Oslo S",
        detail: "同一已购Vy行程；不离开Myrdal站区。",
      },
      {
        time: "抵达Oslo S后",
        title: "直接转OSL",
        detail: "不进市区补景点；错过目标机场车就乘下一班。",
      },
    ],
    prep: [
      "前一晚下载两段车票、查看Vy推送，并把手机充满电",
      "早餐、饮水和午间路餐在酒店一次备齐；Vatnahalsen小站不承担补给",
      "08:30前完成退房；保暖层、药物、证件和充电线放随身包",
    ],
    buffers: [
      { math: "08:50到站 → 09:13发车", result: "23分钟小站候车缓冲" },
      { math: "09:17到Myrdal → 10:02续乘", result: "约45分钟受保护换乘" },
      { math: "15:05到Oslo S → 机场列车", result: "另留20–30分钟找站台" },
    ],
    dropOrder: [
      "删除Oslo市区全部停留",
      "删除指定餐厅，改站内或OSL简餐",
      "不删除OSL前置住宿和次日返沪复核",
    ],
    recheck: [
      { label: "Vy实时状态", note: "核对两段车次、站台、施工与替代交通", url: vyStatusUrl },
      { label: "Flåmsbana时刻表", note: "复核Vatnahalsen短段运行", url: flamRailUrl },
      { label: "Bergen Line", note: "复核Myrdal→Oslo S长途段", url: bergenLineUrl },
      { label: "OSL机场交通", note: "复核Oslo S→OSL当日选项", url: oslTransportUrl },
    ],
    hardCutoff:
      "08:45离开酒店；08:50到Vatnahalsen Station；09:13已购列车不等待；Myrdal按同一Vy订单换乘。",
    recovery:
      "任一铁路段取消或晚点时留在安全站区，只接受Vy的受保护改签或替代交通；抵达Oslo S后删除市区活动并直接去OSL。",
  },
  sights: (day.sights || []).map((sight, index) =>
    index === 0
      ? {
          ...sight,
          duration: "约5小时52分（09:13至计划15:05，含Myrdal换乘）",
          effort: "低（长时间乘车＋两次站内换乘）",
          gear: "保暖层、抓地鞋；水、路餐、药物和充电线放随身包",
          photoTip:
            "列车稳定行驶且不影响他人时隔窗拍摄；站台换乘先看站屏，不为拍照耽误上车。",
          imageLabel:
            "Flåmsbana列车与峡湾线路实景；9月16日实际从Vatnahalsen上车",
        }
      : sight,
  ),
  foods: patchSep16Foods(day.foods || []),
});

const patchDay = (day) => {
  if (day?.id === "sep14") return patchSep14(day);
  if (day?.id === "sep15") return patchSep15(day);
  if (day?.id === "sep16") return patchSep16(day);
  return day;
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id === "core"
      ? {
          ...plan,
          days: plan.days.map(patchDay),
        }
      : plan,
  );
}
