import {
  a as baseA,
  c as baseC,
  i as baseI,
  l as baseL,
  n as baseN,
  o as baseO,
  r as baseR,
  s as baseS,
  t as useBaseTripPlan,
} from "./useTripPlan-nMYvdBeA-fix11.js";

export {
  baseA as a,
  baseC as c,
  baseI as i,
  baseL as l,
  baseN as n,
  baseO as o,
  baseR as r,
  baseS as s,
};

const hotelName = "Vatnahalsen Høyfjellshotell";
const hotelAddress = "Vatnahalsen, 5718 Myrdal";
const hotelUrl = "https://www.vatnahalsen.no/en";
const railUrl =
  "https://www.norwaysbest.com/en/flam/things-to-do/the-flam-railway-round-trip";
const stationUrl =
  "https://www.banenor.no/en/traffic-and-travel/railway-stations/-v-/vatnahalsen/";

const unique = (items = []) => [...new Set(items.filter(Boolean))];

const hotelStop = () => ({
  time: "到站后",
  title: hotelName,
  local: hotelAddress,
  address: hotelAddress,
  arriveBy: "walk",
  leg: "Vatnahalsen Station → 酒店短步行",
  dwell: "入住并用晚餐",
  task: "凭已确认订单办理入住；酒店无公路连接，不安排出租车或巴士。",
  ticket: "确认号只保存在个人离线订单。",
  official: hotelUrl,
});

const patchSep15 = (day) => {
  if (day?.id !== "sep15") return day;
  return {
    ...day,
    city: "Flåm / Aurland → Vatnahalsen",
    phase: "峡湾纵深＋Flåmsbana上山入住",
    stay: `${hotelName} · ${hotelAddress} · 已确认1晚`,
    title: "15:35回Flåm取行李，16:00乘Flåmsbana入住Vatnahalsen",
    summary:
      "白天保留Otternes、Aurland与Stegastein；早晨退掉Flåm住宿并把大件放在Flåm Station旁官方储物柜。15:35回Flåm后取件，搭16:00始发的Flåmsbana，在Vatnahalsen中途下车并入住已确认酒店。",
    route:
      "Flåm 09:30 → Otternes 09:35 → Aurland 12:44 → Stegastein → Flåm 15:35 / 16:00 → Vatnahalsen",
    verified:
      "Norway’s Best公布2026年9月15日16:00 Flåm始发、16:57终到Myrdal；酒店官网与Bane NOR确认酒店/车站无公路连接、需乘Flåmsbana抵达。Vatnahalsen中途站时仍只认实际Vy票面、站屏与广播。",
    main: [
      {
        time: "07:45–08:30",
        title: "Flåm退房并把大件移到车站旁储物柜",
        detail:
          "贵重物品随身；保存柜号与取件凭证。不要把大件留在酒店，以免15:35回镇后赶16:00列车发生折返。",
      },
      {
        time: "09:15–09:30",
        title: "到Flåm接驳站签到",
        detail: "只带日包；16:00 Flåmsbana车票与Vatnahalsen酒店订单离线保存。",
      },
      {
        time: "09:30–09:35",
        title: "Flåm → Otternes停靠点",
        detail: "按9月官方表；下车后仍有约500米较陡步行。",
      },
      {
        time: "09:35–09:55",
        title: "步行上坡到Otternes",
        detail: "防滑慢走；09:55前到导览集合点。",
      },
      {
        time: "09:55–11:50",
        title: "Otternes农庄外部与峡湾视角",
        detail: "按现场标识走获准区域；只有实际买到导览票才进入对应建筑。",
      },
      {
        time: "11:50–12:35",
        title: "收口、下坡并候车",
        detail: "12:10开始下坡，12:35在Otternes停靠点上车；不要卡点。",
      },
      {
        time: "12:35–12:44",
        title: "Otternes → Aurland",
        detail: "按9月官方接驳表。",
      },
      {
        time: "12:45–14:15",
        title: "Aurland午餐、滨水短走并到Stop F签到",
        detail: "只选顺路热食；13:55前去Stop F，低云或无票就删除Stegastein。",
      },
      {
        time: "14:15–15:35",
        title: "Aurland → Stegastein → Flåm",
        detail: "14:30到观景台、14:50离开，约15:35回Flåm；只乘官方巴士。",
      },
      {
        time: "15:35–15:50",
        title: "Flåm Station取寄存行李并转站台",
        detail: "取净行李后不回酒店；直接核对16:00列车和Vatnahalsen停靠。",
      },
      {
        time: "16:00–到站",
        title: "Flåmsbana：Flåm → Vatnahalsen",
        detail:
          "搭16:00从Flåm始发、16:57终到Myrdal的班次，在Vatnahalsen中途下车；具体中途站时只认实际Vy票面、站屏与广播。",
      },
      {
        time: "到站后",
        title: "步行入住Vatnahalsen Høyfjellshotell",
        detail:
          "酒店位于Vatnahalsen站旁且无公路连接；凭已确认订单入住。晚餐、早餐与供应时段按实际订单/酒店确认。",
      },
    ],
    transit: [
      ...(day.transit || []),
      {
        mode: "Flåm Railway R45",
        route: "Flåm → Vatnahalsen",
        time: "16:00从Flåm始发；中途站时以票面为准",
        duration: "终到Myrdal 16:57；Vatnahalsen为前一站",
        buffer: "15:35回Flåm后在车站旁取件，15:50前到站台",
        ticket: "实际Vy单程票",
        official: railUrl,
        map: "https://www.google.com/maps/dir/?api=1&origin=Fl%C3%A5m%20Station&destination=Vatnahalsen%20Station&travelmode=transit",
      },
    ],
    transport: unique([
      ...(day.transport || []).filter(
        (item) => !/大件留住宿|Flåm Railway Museum|连住/.test(String(item)),
      ),
      "早晨退Flåm住宿并把大件放到Flåm Station旁官方储物柜；15:35回镇后取件",
      "16:00从Flåm搭Flåmsbana，在Vatnahalsen中途下车；具体站时只认实际Vy票面、站屏与广播",
      "Vatnahalsen酒店无公路连接；铁路取消时按Vy安排恢复，不自行叫车上山",
    ]),
    safety: unique([
      ...(day.safety || []),
      "Vatnahalsen站无公路替代接驳；若Flåmsbana停运，立即联系Vy与酒店，不拖箱沿Rallarvegen步行。",
    ]),
    sources: [
      ...(day.sources || []),
      { label: hotelName, type: "住宿官网", url: hotelUrl },
      { label: "Flåm Railway 2026时刻", type: "运营方", url: railUrl },
      { label: "Vatnahalsen Station", type: "铁路设施", url: stationUrl },
    ],
    timeCheck: {
      status: "15:35回Flåm与16:00上山列车已对齐",
      note:
        "早晨先退房并把大件放车站旁；15:35回镇后不折返酒店。中途站时以实际Vy票面为准。",
    },
    execution: {
      ...(day.execution || {}),
      grade: "A−｜25分钟取件转车；车站旁寄存消除酒店折返",
      tone: "caution",
      basis:
        "白天接驳按原锚点执行；15:35回Flåm后只在站区取件并转16:00列车。",
      hardCutoff:
        "早晨把大件存入Flåm Station旁；13:55到Aurland Stop F；15:50前到Flåmsbana站台。",
      prep: [
        "下载接驳、Stegastein、Flåm→Vatnahalsen车票与酒店订单",
        "保存Flåm储物柜柜号和取件凭证",
        "向酒店确认晚餐与次日早餐安排",
      ],
      dropOrder: ["Flåm Railway Museum", "Flåm镇内晚餐", "Stegastein低云即删"],
      recovery:
        "错过12:35接驳就删除Aurland/Stegastein并提前回Flåm；铁路异常只通过Vy和酒店处理。",
    },
    routeData: day.routeData
      ? {
          ...day.routeData,
          scope:
            "Flåm寄存 → Otternes → Aurland → Stegastein → Flåm取件 → Vatnahalsen",
          hardStop: "15:35回Flåm取件，15:50前到站台，16:00上车",
          stops: [
            ...(day.routeData.stops || []),
            {
              time: "16:00发车",
              title: "Flåm Railway：Flåm → Vatnahalsen",
              address: hotelAddress,
              arriveBy: "train",
              leg: "在Vatnahalsen中途下车",
              task: "中途站时只认票面、站屏与广播。",
              official: railUrl,
            },
            hotelStop(),
          ],
        }
      : day.routeData,
  };
};

const patchSep16 = (day) => {
  if (day?.id !== "sep16") return day;
  const later = (day.main || []).filter((item) =>
    /Myrdal同票联程|F4 Myrdal|Oslo S转机场|Oslo S → Oslo|步行入住OSL|晚餐、值机/.test(
      String(item.title || ""),
    ),
  );
  return {
    ...day,
    city: "Vatnahalsen → Myrdal → Oslo Airport",
    phase: "Vatnahalsen短段＋Bergen Line东行",
    title: "Vatnahalsen上车接10:02 Bergen Line，15:49到OSL",
    summary:
      "退房后步行到酒店旁的Vatnahalsen站，搭乘由Flåm 08:20始发、09:17到Myrdal的R45中途段；09:17–10:02保留45分钟换乘，后续F4与机场快线锚点不变。",
    route:
      "Vatnahalsen（09:05前到站；乘Flåm 08:20始发班次）→ Myrdal 09:17 / 10:02 → Oslo S 15:05 / 15:30 → OSL 15:49",
    verified:
      "Norway’s Best公布08:20从Flåm始发、09:17终到Myrdal；Bane NOR确认Vatnahalsen为R45中途站并通往Myrdal、Oslo S。精确上车分钟只认实际Vy票面与站屏。",
    main: [
      {
        time: "07:30–08:30",
        title: "早餐、整理行李并退房",
        detail:
          "早餐是否包含与供应时段按实际订单；时间不合适就前一晚向酒店确认打包方案。",
      },
      {
        time: "08:30–09:05",
        title: "步行到Vatnahalsen站并看站屏",
        detail: "酒店位于车站旁；09:05前到站，确认Myrdal方向和实际中途站时。",
      },
      {
        time: "09:05前–09:17",
        title: "Flåmsbana：Vatnahalsen → Myrdal",
        detail:
          "搭乘由Flåm 08:20始发、09:17终到Myrdal的班次；精确上车分钟只认实际Vy票面、站屏和广播。",
      },
      ...later,
    ],
    transit: (day.transit || []).map((item) =>
      /Flåm Railway/.test(String(item.mode || ""))
        ? {
            ...item,
            route: "Vatnahalsen → Myrdal",
            time: "09:05前到站；搭乘Flåm 08:20始发班次，09:17到Myrdal",
            duration: "中途短段；精确上车时刻以实际Vy票面为准",
            buffer: "酒店在车站旁；Myrdal仍保留45分钟换乘",
            ticket: "Vatnahalsen→Oslo同一Vy联程",
          }
        : item,
    ),
    transport: [
      "Vatnahalsen酒店就在R45车站旁；09:05前到站，精确上车时刻只认实际Vy票面",
      "09:17到Myrdal后，10:02 F4接续保留45分钟；Vatnahalsen→Oslo优先同一Vy联程",
      "Oslo S参考15:30–15:49到OSL，错过就乘下一班",
    ],
    sources: [
      ...(day.sources || []),
      { label: hotelName, type: "住宿官网", url: hotelUrl },
      { label: "Vatnahalsen Station", type: "铁路设施", url: stationUrl },
    ],
    timeCheck: {
      status: "Vatnahalsen中途上车与09:17–10:02换乘已对齐",
      note:
        "09:05前到Vatnahalsen站；搭乘Flåm 08:20始发班次，09:17到Myrdal。精确上车分钟与站台在前48小时按Vy票面复核。",
    },
    execution: {
      ...(day.execution || {}),
      grade: "A｜酒店在车站旁；Myrdal保留45分钟",
      tone: "good",
      basis:
        "改从Vatnahalsen中途上车后，不必下山到Flåm；后续Myrdal、Oslo S与OSL锚点不变。",
      anchors: [
        { time: "09:05前", title: "到Vatnahalsen站", detail: "确认Myrdal方向与实际站时。" },
        { time: "09:17–10:02", title: "Myrdal换乘", detail: "同一Vy联程，45分钟。" },
        { time: "10:02–15:05", title: "F4到Oslo S", detail: "不在中途下车。" },
        { time: "15:30–15:49", title: "去OSL", detail: "错过乘下一班。" },
      ],
      prep: ["下载Vatnahalsen→Oslo联程", "向酒店确认早餐/打包早餐", "准备全天路餐"],
      buffers: [
        { math: "09:17到→10:02开", result: "45分钟" },
        { math: "15:05到→15:30开", result: "25分钟" },
      ],
      hardCutoff: "09:05前到Vatnahalsen站；Myrdal和Oslo S都不离站加点。",
      recovery: "R45晚点时由同一联程处理；Oslo S错过机场车就乘下一班。",
    },
  };
};

const patchPlan = (plan) => {
  if (!plan || plan.id !== "core") return plan;
  return {
    ...plan,
    days: (plan.days || []).map(patchSep15).map(patchSep16),
    decision: {
      ...plan.decision,
      lodging:
        "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚＋Scandic Voss 1晚（均已确认）＋Flåm 1晚＋Vatnahalsen Høyfjellshotell 1晚（已确认）＋OSL机场1晚。",
      transfer:
        "高：9月12日13:30离会接SK2872 17:55；9月14日巴士＋峡湾船；9月15日15:35回Flåm取件接16:00铁路到Vatnahalsen；9月16日从Vatnahalsen中途站上车接10:02铁路。",
      booking:
        "已确认Moxy Bergen、Scandic Voss、9月12日SK2872与9月15–16日Vatnahalsen住宿；补9月14–15日Flåm一晚与OSL机场住宿。",
    },
  };
};

export function t(defaultPlanId) {
  const [planId, setPlanId, plan, strategyId, setStrategyId] =
    useBaseTripPlan(defaultPlanId);
  return [planId, setPlanId, patchPlan(plan), strategyId, setStrategyId];
}
