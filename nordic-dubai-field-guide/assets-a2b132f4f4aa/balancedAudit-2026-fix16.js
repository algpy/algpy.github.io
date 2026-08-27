import {
  applyBalancedPlanAudit as applyBalancedPlanAuditBase,
} from "./balancedAudit-2026-fix13.js";

export {
  applyBalancedAuditDay,
  applyBalancedHotels,
  applyBalancedBookings,
  applyBalancedSources,
  balancedAuditOverrides,
} from "./balancedAudit-2026-fix13.js";

const vatnahalsenMap =
  "https://www.google.com/maps/search/?api=1&query=Vatnahalsen%20H%C3%B8yfjellshotell";
const mapSearch = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const oslTransportUrl =
  "https://www.avinor.no/en/airport/oslo/info/public-transportation/";
const munchUrl = "https://www.munch.no/en/visit-us/";
const operaUrl =
  "https://www.operaen.no/en/your-visit-at-oslo-operahouse/practical-information/";

const textReplacements = [
  ["从E16停靠点平缓约500米", "从E16停靠点上坡约500米"],
  ["12:10开始平缓；预留25分", "12:10开始下坡；预留25分"],
  ["平缓、午餐、签到均有明确缓冲", "下坡返程、午餐、签到均有明确缓冲"],
  ["12:10开始平缓。", "12:10开始下坡。"],
  ["Otternes平缓→12:35上车", "Otternes下坡返程→12:35上车"],
  ["12:10开始平缓；13:55到Aurland Stop F。", "12:10开始下坡；13:55到Aurland Stop F。"],
  ["含上平缓", "含上下坡"],
  ["下车后预留20分平缓", "下车后预留20分上坡"],
  ["步行500米较陡平缓。", "步行约500米较陡上坡。"],
  [
    "14:30到观景台、15:00返程、15:35回Flåm",
    "14:30到观景台、14:50返程、15:35回Flåm",
  ],
];

const patchText = (value) =>
  textReplacements.reduce(
    (result, [before, after]) => result.replaceAll(before, after),
    value,
  );

const patchDeep = (value) => {
  if (typeof value === "string") return patchText(value);
  if (Array.isArray(value)) return value.map(patchDeep);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, patchDeep(nested)]),
    );
  }
  return value;
};

const patchSep15 = (day) => {
  const patched = patchDeep(day);
  return {
    ...patched,
    food: [
      "Aurland午餐在14:05前结束；排队过长就改外带。",
      "15:35回Flåm后只取行李和路餐；入住后按酒店确认享用三道式晚餐。",
    ],
    social: [
      "Otternes或Stegastein接驳上可与同路旅客交流，但各自保管票证和行李。",
      "抵达山地酒店后再自然社交；17:10火车前不因聊天错过取件和候车。",
    ],
    safety: (patched.safety || []).filter(
      (item) => !item.includes("栏杆外") && !item.includes("换船"),
    ),
    visual: { ...patched.visual, label: "Aurlandsfjord高差与Flåmsbana · 路线意象图" },
    foods: (patched.foods || []).map((food) =>
      food.name === "Vatnahalsen酒店三道式晚餐"
        ? { ...food, map: vatnahalsenMap }
        : food,
    ),
    execution: {
      ...patched.execution,
      hardCutoff:
        "12:10开始下坡，12:35从Otternes出发，12:44到Aurland；14:05回Stop F，15:35回Flåm，16:40到站候车。",
    },
  };
};

const patchSep16 = (day) => ({
  ...day,
  city: "Vatnahalsen → Myrdal → Oslo S / Bjørvika",
  phase: "已购景观铁路＋Oslo市中心入住",
  title: "09:13已购Vy到Oslo S；傍晚入住市中心",
  summary:
    "08:50步行到Vatnahalsen小站，09:13到Myrdal，按同一张已购Vy行程换乘10:02 Bergen Line，计划15:05到Oslo S；随后步行入住Oslo S—Bjørvika一带，不再提前去机场。",
  main: [
    ...day.main.slice(0, 6),
    {
      time: "计划15:05–16:15",
      title: "抵达Oslo S，步行入住Bjørvika / Oslo S住宿",
      detail:
        "取齐行李后步行到市中心住宿；优先选择可在9月17日退房后寄存至15:15、且步行到Oslo S与MUNCH方便的酒店。",
    },
    {
      time: "17:00–18:15（可选）",
      title: "Opera House屋顶与Bjørvika短走",
      detail:
        "只做不预约的户外熟悉路线；铁路晚点或体力不足就直接吃饭休息，歌剧院与MUNCH主线留给次日上午。",
    },
    {
      time: "18:15后",
      title: "市中心晚餐并复核返程",
      detail:
        "确认9月17日20:00 OSL返沪航班、行李与值机要求；手机设15:15取行李、16:00离开Oslo S两个提醒。",
    },
  ],
  rain: {
    trigger: "普通风雨、铁路晚点或线路中断",
    title: "先守住已购Vy与市中心入住",
    detail:
      "铁路中断只接受Vy替代；抵达Oslo S后删除傍晚户外短走，直接入住。只有预计无法当晚到Oslo时才联系住宿与航司。",
  },
  transport: [
    "09:13 Vatnahalsen→Oslo S已购；09:17到Myrdal后按同一订单换乘，不返回Flåm。",
    "计划10:02从Myrdal出发、15:05到Oslo S；最终到发和站台只认Vy票面、推送与当天站屏。",
    "Oslo S到Bjørvika步行圈住宿通常约5–15分钟；订房前用实际地址核对拖箱路线。",
  ],
  food: [
    "早餐和午间路餐在Vatnahalsen酒店一次备齐；小站不承担补给。",
    "晚餐放在Oslo S / Bjørvika步行圈，不为指定餐厅制造硬截止。",
  ],
  transit: day.transit.slice(0, 2),
  sources: (day.sources || []).filter(
    (source) =>
      !source.label.includes("Oslo lufthavn") &&
      !source.label.includes("OSL机场") &&
      !source.label.includes("Oslo Airport"),
  ),
  sights: (day.sights || []).filter((sight) => !sight.name.includes("OSL")),
  foods: [
    ...day.foods.slice(0, 2),
    osloFood({
      name: "Oslo S / Bjørvika顺路晚餐",
      type: "抵达日晚餐",
      tier: "€€",
      near: "Oslo S—Bjørvika步行圈",
      meal: "18:15后",
      url: "https://www.visitoslo.com/en/activities-and-attractions/boroughs/city-centre/",
      map: mapSearch("Bjørvika dinner"),
      order: "鱼汤、热菜、开放三明治或当日简餐",
      note: "铁路晚点就选住宿附近简餐；不为指定餐厅制造不可取消的截止。",
    }),
  ],
  route:
    "Vatnahalsen Høyfjellshotell → 09:13 Vatnahalsen Station → 09:17 Myrdal / 10:02 → 15:05 Oslo S → Bjørvika住宿",
  load: "长铁路观景日 · 100米碎石路＋45分钟Myrdal换乘＋市中心短步行",
  timeCheck: {
    status: "9月16日已购Vy行程已对齐；动态运行出发前48小时复核",
    note:
      "09:13 Vatnahalsen→09:17 Myrdal已购；计划10:02续乘并于15:05到Oslo S。票面或当天站屏如有不同，以实际订单为准。",
  },
  stay: "Oslo S / Bjørvika步行圈 · 1晚（待订）",
  routeData: {
    ...day.routeData,
    scope:
      "Vatnahalsen Høyfjellshotell → Vatnahalsen Station 09:13 → Myrdal 09:17 → Oslo S 15:05 → Bjørvika住宿",
    walking:
      "酒店至Vatnahalsen站约100米碎石路；Oslo S至Bjørvika住宿按实际地址约5–15分钟",
    reservation:
      "Vatnahalsen→Oslo S已购；Oslo市中心住宿待订，优先可寄存退房后行李",
    accuracy:
      "路线从真实Vatnahalsen站经Myrdal到Oslo S；最终住宿点在订房后用实际地址替换Bjørvika锚点。",
    stops: [
      ...day.routeData.stops.slice(0, 4),
      {
        ...day.routeData.stops[4],
        dwell: "取齐行李后步行入住",
        task:
          "按实际住宿地址步行导航；铁路晚点就删除傍晚短走。",
        ticket: "长途Vy订单到此结束；住宿段步行，不另购机场票。",
        official:
          "https://www.visitoslo.com/en/activities-and-attractions/boroughs/city-centre/",
      },
      {
        time: "约16:00",
        title: "Oslo S / Bjørvika住宿锚点",
        lat: 59.9089,
        lng: 10.7587,
        local: "Bjørvika",
        address: "Oslo S—Bjørvika步行圈；订房后替换为实际地址",
        arriveBy: "walk",
        leg: "从Oslo S拖箱步行约5–15分钟",
        dwell: "入住1晚",
        task:
          "书面确认次日退房后可寄存至15:15，并保存取件凭证。",
        ticket: "住宿待订；安全、步行便利和行李寄存优先。",
        official: "https://www.visitoslo.com/en/activities-and-attractions/boroughs/city-centre/",
      },
    ],
  },
  backup: {
    ...day.backup,
    title: "Vy替代交通＋Oslo S市中心入住",
    verdict: "只接受Vy受保护改签或替代交通；抵达后按晚点程度删除傍晚活动",
    route: (day.backup.route || []).filter((stop) => stop.label !== "OSL"),
    timeline: (day.backup.timeline || []).map((row) =>
      row[0] === "抵达Oslo S"
        ? ["抵达Oslo S", "步行入住", "晚点就删除Bjørvika傍晚短走。"]
        : row[0] === "抵达OSL"
          ? ["入住后", "联系住宿并复核次日航班", "保存铁路延误与支出凭证。"]
          : row,
    ),
    transport:
      "Vy铁路订单不自动保护次日国际航班；预计无法当晚到Oslo时，同时处理铁路、住宿和航司。",
  },
  freeTime: [
    {
      window: "按时抵达、完成入住且体力正常",
      title: "Opera House屋顶与Bjørvika熟悉路线",
      detail:
        "从住宿步行到歌剧院外部与海滨，控制在75分钟内；不进收费馆、不跨城。",
      how: "只走住宿—Opera House—Bjørvika—住宿的步行环线。",
      cutoff: "18:15收口；晚点、下雨或疲劳就完全删除。",
    },
  ],
  execution: {
    ...day.execution,
    basis:
      "09:13短段与10:02 Bergen Line按同一张已购Vy行程执行；15:05抵达后只需步行入住市中心。",
    anchors: [
      ...day.execution.anchors.slice(0, 3),
      {
        time: "抵达Oslo S后",
        title: "步行入住Bjørvika / Oslo S住宿",
        detail: "不提前转OSL；傍晚短走仅在按时抵达时加入。",
      },
    ],
    buffers: [
      ...day.execution.buffers.slice(0, 2),
      {
        math: "15:05到Oslo S → 16:15前入住",
        result: "约70分钟取行李与步行缓冲",
      },
    ],
    dropOrder: [
      "先删除9月16日傍晚Opera House短走",
      "晚餐改住宿附近简餐",
      "不删除次日16:00前往OSL的机场缓冲",
    ],
    recovery:
      "铁路取消或晚点时留在安全站区，只接受Vy受保护改签或替代交通；抵达Oslo S后按晚点程度直接入住。",
    recheck: (day.execution.recheck || []).filter(
      (item) => !item.label.includes("OSL"),
    ),
  },
  mapUrl: mapSearch("Vatnahalsen Station Myrdal Oslo S Bjørvika"),
});

const osloFood = ({ name, type, tier, near, meal, url, map, order, note }) => ({
  name,
  type,
  tier,
  near,
  meal,
  url,
  map,
  order,
  note,
  price: "以当日菜单为准",
  booking: "现场决定；不预订不可取消时段",
  flavor: "以挪威烘焙、汤、鱼类或轻食为主，优先快速且不拖延机场转场。",
  suitableFor: "希望在市中心完成一顿顺路餐、又保留返程缓冲的人。",
  image: "/nordic-dubai-field-guide/images/regions/oslo-opera-house.jpg",
  imageSource: operaUrl,
  imageLabel: "Bjørvika与Oslo Opera House周边实景",
});

const patchSep17 = (day) => ({
  ...day,
  city: "Oslo S / Bjørvika → OSL → 上海",
  phase: "Oslo经典半日＋20:00国际返程",
  title: "Opera House与MUNCH收尾，16:00前往OSL",
  summary:
    "上午在Bjørvika步行完成Oslo Opera House与MUNCH，午餐后取行李；15:15回住宿取件，16:00前从Oslo S搭机场列车，目标16:30到OSL，为20:00返沪保留约3.5小时。",
  verified:
    "用户已确认9月17日20:00从OSL返沪；MUNCH周四10:00–21:00开放。Oslo S到OSL铁路通常约20分钟，最终以实际航班、Vy/Flytoget和Avinor为准。",
  main: [
    {
      time: "07:30–08:30",
      title: "早餐、退房并寄存行李",
      detail:
        "只背日包；书面确认寄存凭证和15:15前取件。证件、电脑、药物与返程订单随身。",
    },
    {
      time: "09:00–09:45",
      title: "Oslo Opera House外部与屋顶",
      detail:
        "从Bjørvika住宿步行前往；只走公共开放外部与屋顶，不依赖工作日英语导览。湿滑或大风时只看外观。",
    },
    {
      time: "10:00–12:30",
      title: "MUNCH",
      detail:
        "周四10:00开馆；优先《呐喊》相关陈列与高层城市视野。12:30无条件离馆，不追加临展拖延午餐。",
    },
    {
      time: "12:40–13:40",
      title: "Bjørvika午餐",
      detail: "只选MUNCH—Oslo S步行圈的快餐或简餐；排队过长就外带。",
    },
    {
      time: "13:45–14:45",
      title: "Bjørvika海滨与Deichman外部短走",
      detail:
        "作为可删的收尾段；下雨、排队、疲劳或航班状态异常时直接去取行李。",
    },
    {
      time: "15:15–15:45",
      title: "回住宿取行李并到Oslo S",
      detail: "15:15前开始取件；15:45应已进入Oslo S，不再购物或绕路。",
    },
    {
      time: "16:00前–目标16:30",
      title: "Oslo S → OSL",
      detail:
        "搭Vy或Flytoget实际可用班次；错过目标车立即乘下一班，不等待特定运营商。",
    },
    {
      time: "16:30–20:00",
      title: "值机、托运、安检与登机",
      detail:
        "按实际承运航司要求执行；确认中转、行李直挂与最终上海航段，起飞前45分钟到登机口附近。",
    },
  ],
  rain: {
    trigger: "强风、暴雨、航班异常、寄存不确定或前一日铁路严重晚点",
    title: "先删海滨短走，再删MUNCH",
    detail:
      "雨天仍可优先MUNCH；任何返程不确定都提前取行李并去OSL，16:00是最晚出发线而不是必须等到的时间。",
  },
  transport: [
    "市中心活动集中在Oslo S—Opera House—MUNCH步行圈，不乘额外市内交通。",
    "16:00前从Oslo S乘Vy或Flytoget去OSL，铁路通常约20分钟；实际票与站屏优先。",
  ],
  food: [
    "早餐在住宿或Oslo S周边；午餐只放在Bjørvika步行圈。",
    "16:00以后只在OSL安检后顺路补给，不为餐厅压缩返程缓冲。",
  ],
  social: ["返程日不主动结伴，行李和证件始终自己掌控。"],
  safety: [
    "证件、电脑、药物和返程订单不寄存，始终随身。",
    "15:15开始取件、16:00前离开Oslo S；航班异常时整表提前。",
    "歌剧院屋顶遇雨、结露或大风时放慢并缩短停留。",
  ],
  sources: [
    { label: "Oslo Opera House实用信息", type: "景点官网", url: operaUrl },
    { label: "MUNCH开放与票务", type: "景点官网", url: munchUrl },
    { label: "Oslo S → OSL", type: "机场交通官网", url: oslTransportUrl },
    { label: "OSL出发信息", type: "机场官网", url: "https://www.avinor.no/en/airport/oslo/flight-times/#departure" },
  ],
  visual: { slot: 7, label: "Oslo Opera House与MUNCH · 返程半日" },
  route:
    "Oslo S / Bjørvika住宿 → Opera House → MUNCH → 午餐 → 取行李 → 16:00前Oslo S → OSL → 上海",
  load: "经典半日 · 市中心约4–6 km步行＋约20分钟机场列车",
  timeCheck: {
    status: "20:00返沪按16:30到OSL倒排",
    note:
      "MUNCH周四10:00开馆；15:15取行李、16:00前离开Oslo S、目标16:30到OSL。实际航司若要求更早，整表提前。",
  },
  transit: [
    {
      mode: "步行",
      route: "Oslo S / Bjørvika住宿 → Opera House → MUNCH",
      time: "09:00–12:30",
      duration: "景点间约5–15分",
      official: operaUrl,
      map: mapSearch("Oslo Opera House to MUNCH"),
      buffer: "12:30离馆",
      ticket: "歌剧院外部免费；MUNCH门票按官网购买",
    },
    {
      mode: "机场列车",
      route: "Oslo S → OSL",
      time: "16:00前–目标16:30",
      duration: "通常约20分",
      official: oslTransportUrl,
      map: mapSearch("Oslo S to Oslo Airport"),
      buffer: "目标起飞前约3.5小时到机场",
      ticket: "当天按实际Vy/Flytoget班次购买",
    },
  ],
  sights: [
    {
      name: "Oslo Opera House · 外部与屋顶",
      kind: "attraction",
      image: "/nordic-dubai-field-guide/images/regions/oslo-opera-house.jpg",
      imageSource: operaUrl,
      imageLabel: "Oslo Opera House实景",
      why: "这是Bjørvika最经典的城市建筑体验，外部斜坡、屋顶与峡湾视野可以在开馆前完成。",
      ticket: "公共外部和屋顶无需门票；本方案不依赖工作日英语导览。",
      url: operaUrl,
      map: mapSearch("Oslo Opera House"),
      tour: "自行步行；只进入现场明确开放区域。",
      duration: "约45分钟",
      effort: "低–中（斜坡步行）",
      gear: "防滑鞋和防风层",
      photoTip: "湿滑或大风时不走屋顶高处，只在地面拍建筑与峡湾。",
    },
    {
      name: "MUNCH · 周四10:00入馆",
      kind: "attraction",
      image: "/nordic-dubai-field-guide/images/regions/munch.jpg",
      imageSource: munchUrl,
      imageLabel: "MUNCH官方馆舍实景",
      why: "用一座馆快速体验Edvard Munch与Oslo当代滨水城区，是返程半日里信息密度最高的室内选择。",
      ticket: "按MUNCH官网购买普通门票；周四10:00开放，12:30硬离馆。",
      url: munchUrl,
      map: mapSearch("MUNCH Oslo"),
      tour: "自行参观，优先核心陈列，不追加耗时导览。",
      duration: "2小时30分",
      effort: "低（馆内步行）",
      gear: "轻便日包；大件行李留在住宿寄存",
      photoTip: "遵守展厅摄影规则；先看核心作品，再上高层看Bjørvika。",
    },
  ],
  foods: [
    osloFood({
      name: "Bjørvika快捷午餐",
      type: "返程日前午餐",
      tier: "€€",
      near: "MUNCH—Oslo S步行圈",
      meal: "12:40–13:40",
      url: "https://www.visitoslo.com/en/activities-and-attractions/boroughs/city-centre/",
      map: mapSearch("Bjørvika lunch"),
      order: "汤、鱼类、三明治或当日热食",
      note: "排队超过15分钟就外带；13:40结束，不压缩取行李和机场列车。",
    }),
  ],
  execution: {
    grade: "A−｜经典半日与20:00返程可兼容",
    tone: "ready",
    basis:
      "景点集中在Bjørvika步行圈，15:15开始取行李、16:00前离开Oslo S、目标16:30到OSL，保留约3.5小时机场缓冲。",
    anchors: [
      { time: "10:00–12:30", title: "MUNCH", detail: "周四10:00开馆，12:30硬离馆。" },
      { time: "15:15", title: "回住宿取行李", detail: "寄存凭证和证件随身。" },
      { time: "16:00前", title: "离开Oslo S", detail: "目标16:30到OSL。" },
      { time: "20:00", title: "OSL返沪", detail: "以实际航司订单为准。" },
    ],
    prep: [
      "前一晚完成值机并核对托运、中转与航站楼要求",
      "确认住宿退房后寄存和15:15取件",
      "把MUNCH票、机场列车和返程订单保存离线",
    ],
    buffers: [
      { math: "12:30离MUNCH → 15:15取件", result: "2小时45分午餐与可删短走" },
      { math: "16:00离Oslo S → 20:00起飞", result: "约4小时门到门缓冲" },
    ],
    hardCutoff:
      "12:30离MUNCH；15:15开始取行李；15:45进入Oslo S；16:00前搭机场列车；起飞前45分钟到登机口。",
    dropOrder: ["先删13:45后的Bjørvika短走", "再缩短午餐和MUNCH", "不压缩机场缓冲"],
    recheck: [
      { label: "MUNCH", note: "周四开放与当天展厅", url: munchUrl },
      { label: "OSL交通", note: "机场列车与运行状态", url: oslTransportUrl },
      { label: "OSL出发", note: "实际航班、值机与登机口", url: "https://www.avinor.no/en/airport/oslo/flight-times/#departure" },
    ],
    recovery:
      "任何航班、寄存或交通不确定都提前去OSL；取消时只按承运航司书面安排处理。",
  },
  country: "挪威 → 中国",
  stay: "不住 · 20:00从OSL返沪",
  routeData: {
    scope: "Oslo S / Bjørvika经典半日 → 16:00前机场列车 → OSL",
    walking: "市中心约4–6 km；Oslo S至OSL铁路通常约20分钟",
    hardStop: "15:15取行李；15:45进入Oslo S；16:00前离开；20:00起飞",
    reservation: "Oslo市中心住宿待订；MUNCH门票可提前；机场列车当天执行",
    accuracy: "Opera House、MUNCH、Oslo S与OSL均为真实节点；住宿锚点订房后替换。",
    media: {
      title: "Oslo Opera House与Bjørvika",
      image: "/nordic-dubai-field-guide/images/regions/oslo-opera-house.jpg",
      source: operaUrl,
      credit: "Oslo Opera House实景；开放区域以现场标识为准",
    },
    stops: [
      { time: "08:30", title: "Oslo S / Bjørvika住宿", lat: 59.9089, lng: 10.7587, local: "Bjørvika", address: "订房后替换为实际地址", arriveBy: "walk", leg: "退房并寄存行李", dwell: "寄存至15:15", task: "确认寄存凭证；贵重物随身。", ticket: "住宿待订。" },
      { time: "09:00–09:45", title: "Oslo Opera House", lat: 59.9075, lng: 10.7531, local: "Den Norske Opera & Ballett", address: "Kirsten Flagstads plass 1, 0150 Oslo", arriveBy: "walk", leg: "从Bjørvika住宿步行", dwell: "45分", task: "走公共外部和屋顶；湿滑时只看地面外观。", ticket: "外部免费；不依赖工作日导览。", official: operaUrl },
      { time: "10:00–12:30", title: "MUNCH", lat: 59.9063, lng: 10.7555, local: "MUNCH", address: "Edvard Munchs Plass 1, 0194 Oslo", arriveBy: "walk", leg: "从歌剧院步行约5–10分", dwell: "2时30分", task: "优先核心陈列；12:30硬离馆。", ticket: "按官网购买普通门票。", official: munchUrl },
      { time: "15:15", title: "取行李", lat: 59.9089, lng: 10.7587, local: "住宿锚点", address: "订房后替换为实际地址", arriveBy: "walk", leg: "午餐和可删短走后返回", dwell: "30分内", task: "15:45前进入Oslo S。", ticket: "出示寄存凭证。" },
      { time: "16:00前", title: "Oslo S", lat: 59.91103, lng: 10.75314, local: "Oslo sentralstasjon", address: "Jernbanetorget 1, 0154 Oslo", arriveBy: "walk", leg: "从住宿拖箱步行", dwell: "乘下一班合适的机场车", task: "不等待特定运营商。", ticket: "Vy/Flytoget当天实际票。", official: oslTransportUrl },
      { time: "目标16:30", title: "Oslo Airport", lat: 60.1939, lng: 11.1004, local: "Oslo lufthavn", address: "Edvard Munchs veg, 2061 Gardermoen", arriveBy: "train", leg: "Oslo S→OSL通常约20分", dwell: "值机、托运、安检与候机", task: "确认中转和行李直挂；起飞前45分钟到门口。", ticket: "20:00返沪，以实际航司订单为准。", official: "https://www.avinor.no/en/airport/oslo/flight-times/#departure" },
    ],
  },
  backup: {
    trigger: "航班异常、寄存不确定、暴雨强风或前一日铁路严重晚点",
    title: "删除市区活动，Oslo S直接去OSL",
    verdict: "安全优先；16:00是最晚线，任何不确定都可更早离城",
    route: [
      { label: "Oslo S", query: "Oslo S", url: mapSearch("Oslo S"), note: "取行李后直达" },
      { label: "OSL出发层", query: "Oslo Airport departures", url: mapSearch("Oslo Airport departures"), note: "按航司要求办理" },
    ],
    timeline: [
      ["上午", "留在住宿附近", "完成值机、行李与航班复核。"],
      ["最晚15:15", "取行李去Oslo S", "若航班异常则更早。"],
      ["16:00前", "机场列车", "错过目标车就乘下一班。"],
      ["目标16:30", "到OSL", "托运、安检并到登机口。"],
    ],
    transport: "Oslo S→OSL按当天Vy/Flytoget运行执行；不绑定特定班次。",
    meal: "Oslo S或OSL顺路外带，不预订餐厅。",
    booking: [
      { label: "OSL公共交通", url: oslTransportUrl, note: "复核运行" },
      { label: "OSL出发", url: "https://www.avinor.no/en/airport/oslo/flight-times/#departure", note: "复核航班" },
    ],
    exit: "任何返程不确定都立即删景点并提前去机场。",
  },
  freeTime: [],
  mapUrl: mapSearch("Oslo Opera House MUNCH Oslo S Oslo Airport"),
  bookingUrl: munchUrl,
});

export function applyBalancedPlanAudit(plans) {
  return applyBalancedPlanAuditBase(plans).map((plan) =>
    plan.id === "core"
      ? {
          ...plan,
          decision: {
            ...plan.decision,
            lodging:
              "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Moxy Bergen 1晚＋Scandic Voss 1晚＋Flåm 1晚（待订）＋Vatnahalsen Høyfjellshotell 1晚（已确认）＋Oslo S / Bjørvika 1晚（待订）。",
            transfer:
              "高：9月2–3日PVG→BKK→CPH；9月12日17:50飞BGO；9月13日18:29铁路；9月14日09:50巴士＋12:10船；9月15日已购17:10 Flåm→Vatnahalsen；9月16日已购09:13 Vatnahalsen→Oslo S；9月17日16:00前去OSL。",
            weather:
              "中：Ulriken和Stegastein可独立删除；9月17日先删Bjørvika短走、再缩MUNCH，始终保留机场缓冲。",
            booking:
              "已确认泰航去程、Bob W、Sky Hotel、Moxy Bergen、Scandic Voss、9月12日航班、Vatnahalsen Høyfjellshotell，以及9月15日17:10和9月16日09:13两张Vy行程；仅补核Flåm 9月14–15日与Oslo S / Bjørvika 9月16–17日住宿。",
            return:
              "9月17日上午完成Opera House＋MUNCH，16:00前从Oslo S去OSL，20:00乘受保护联程返沪。",
          },
          days: plan.days.map((day) =>
            day?.id === "sep15"
              ? patchSep15(day)
              : day?.id === "sep16"
                ? patchSep16(day)
                : day?.id === "sep17"
                  ? patchSep17(day)
                  : day,
          ),
        }
      : plan,
  );
}
