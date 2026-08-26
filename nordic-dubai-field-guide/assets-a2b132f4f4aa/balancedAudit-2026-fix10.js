import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix9.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix9.js";

const otternesUrl = "https://www.norwaysbest.com/en/flam/things-to-do/historical-farm-tour-at-otternes";
const shuttleUrl = "https://www.norwaysbest.com/en/flam/things-to-do/shuttlebus-flam-aurland";
const stegasteinUrl = "https://www.norwaysbest.com/en/flam/things-to-do/stegastein-viewpoint";
const marianneUrl = "https://www.aurland-fjordhytter.no/aurland/marianne-bakeri";
const otternesImage = "https://cdn.sanity.io/images/ycnqsi1u/production/4bcae291fe1e6ed42604a3b79e76a71fdcf0cebe-5568x3712.jpg?auto=format&fit=clip&q=80&w=1600";
const stegasteinImage = "/nordic-dubai-field-guide/images/localized/Aurlandsfjord_from_Stegastein_original.jpg";
const marianneImage = "https://www.aurland-fjordhytter.no/images/thirdparty/mariannes-bakeri.webp";
const mapSearch = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const addSourceOnce = (sources, source) =>
  sources.some((item) => item.url === source.url) ? sources : [...sources, source];

const patchSep15 = (day) => {
  if (day?.id !== "sep15") return day;

  const sources = (day.sources || []).filter((item) => {
    const url = String(item.url || "");
    return !url.includes("bus-voss-gudvangen") &&
      !url.includes("fjord-cruise-naeroyfjord") &&
      !url.includes("flam-railway-museum");
  });
  const withOtternes = addSourceOnce(sources, {
    label: "Otternes历史农庄",
    type: "景点与导览官网",
    url: otternesUrl,
  });

  const existingFoods = (day.foods || []).filter((item) => item.name !== "Gudvangen Fjordtell");

  return {
    ...day,
    city: "Flåm → Otternes → Aurland → Stegastein",
    phase: "Aurlandsfjord村落与观景台",
    verified:
      "Norway’s Best官网已切换到2026年8月31日—9月29日时段核对：9月15日Flåm 09:30→Otternes 09:35、Otternes 12:35→Aurland 12:44，以及Aurland Stop F 14:15→Stegastein→Flåm 15:35；最终仍只认实际订单、当天站牌与天气公告。",
    sights: [
      {
        name: "Otternes历史农庄 · 外部主线 / 导览条件式",
        image: otternesImage,
        imageSource: otternesUrl,
        imageLabel: "Norway’s Best官方Otternes农庄实景",
        fallbackImage: otternesImage,
        fallbackImageSource: otternesUrl,
        why:
          "26座历史建筑把Aurlandsfjord农庄生活、木构与山坡地形放在同一现场；停靠点到农庄约500米且较陡。主线只走现场明确开放的外部区域，只有实际买到导览票才进入建筑。",
        ticket:
          "外部活动按现场标识执行；45–60分钟英文导览必须从官网买到目标日实际票，不把示例场次视为已预订。",
        url: otternesUrl,
        map: mapSearch("Otternes Bygdetun"),
        tour:
          "导览为条件项；有票时提前5分钟到农庄接待处，无票不闯封闭建筑。",
        duration: "约2小时（含上下坡；导览45–60分钟仅在有票时加入）",
        effort: "中（停靠点往返约1公里较陡步行）",
        gear: "防滑鞋、防风防雨层和水；只背日包",
        photoTip: "先拍农庄与Aurlandsfjord的高差关系，不越过围挡、私域或导览边界。",
      },
      {
        name: "Stegastein Viewpoint · 14:15官方巴士",
        image: stegasteinImage,
        imageSource: stegasteinUrl,
        imageLabel: "Stegastein与Aurlandsfjord官方资料实景",
        fallbackImage: stegasteinImage,
        fallbackImageSource: stegasteinUrl,
        why:
          "观景台位于Aurlandsfjord上方约650米，30米长的松木包覆钢结构本身也是挪威国家景观路线建筑；这一天用低风险官方接驳获得峡湾纵深视角。",
        ticket:
          "购买目标日Aurland Stop F 14:15出发的官方往返票；14:30到、14:50离开、15:35回Flåm以2026年9月时段为核对值，最终只认票面。",
        url: stegasteinUrl,
        map: mapSearch("Stegastein Viewpoint"),
        tour:
          "乘Norway’s Best官方巴士即可，不自驾、不临时包车；低云、道路调整或无票直接删除。",
        duration: "1小时20分（Aurland 14:15 → Flåm 15:35）",
        effort: "低（山路乘车＋观景台短走）",
        gear: "防风层、防滑鞋；晕车者提前准备",
        photoTip: "始终留在护栏内，先拍平台建筑，再拍Aurlandsfjord纵深；低云时不为照片硬上山。",
      },
    ],
    foods: [
      {
        name: "Marianne Bakeri & Kafe",
        type: "Aurland有机烘焙 · 省钱/适中",
        order: "手作面包、三明治或本地肉类/奶酪轻食；再选肉桂或豆蔻面包",
        note:
          "12:44抵达Aurland后只在村中心顺路用餐，13:40前结账、13:55前到Stop F；营业与当日菜单在出发前48小时复核。",
        price: "约120–250 NOK",
        tier: "€€",
        near: "Aurland村中心 · 距Stop F/教堂步行数分钟",
        meal: "12:45–13:40午餐",
        booking: "通常现场；若未营业即改超市/自带路餐，不跨区找店",
        url: marianneUrl,
        map: mapSearch("Marianne Bakeri Aurland"),
        image: marianneImage,
        imageSource: marianneUrl,
        imageLabel: "Marianne Bakery & Café门店实景",
        fallbackImage: marianneImage,
        fallbackImageSource: marianneUrl,
        flavor: "烘烤香、谷物香与奶酪/肉类咸香为主，适合短时段稳妥补能。",
        suitableFor: "需要在91分钟缓冲内吃完、又想尝Aurland本地烘焙的人。",
      },
      ...existingFoods,
    ],
    sources: addSourceOnce(
      addSourceOnce(withOtternes, {
        label: "Flåm—Otternes—Aurland九月接驳",
        type: "交通官网",
        url: shuttleUrl,
      }),
      {
        label: "Aurland—Stegastein九月接驳",
        type: "交通与景点官网",
        url: stegasteinUrl,
      },
    ),
  };
};

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id === "core" ? { ...plan, days: plan.days.map(patchSep15) } : plan,
  );
}
