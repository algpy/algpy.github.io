const links = {
  cphFlights: "https://www.cph.dk/en/flight-information",
  sas: "https://www.flysas.com/en",
  oresund: "https://www.oresundstag.se/en/travel-information/timetables",
  skane: "https://www.skanetrafiken.se/",
  skyHotel: "https://skyhotelapartments.se/malmo/malmo-city",
  bobW: "https://bobw.co/locations/copenhagen/copenhagen-osterbro",
  bergenAirport: "https://www.skyss.no/en/travel/airport-bergen/",
  bryggensMuseum: "https://bymuseet.no/museum/bryggens-museum/",
  ulriken: "https://ulriken643.no/en/",
  entur: "https://entur.no/",
  vy: "https://www.vy.no/en",
  vossBus: "https://www.norwaysbest.com/en/flam/things-to-do/bus-voss-gudvangen-voss",
  fjordCruise: "https://www.norwaysbest.com/en/flam/things-to-do/fjord-cruise-naeroyfjord",
  flamAurland: "https://www.norwaysbest.com/en/flam/things-to-do/shuttlebus-flam-aurland",
  otternes: "https://www.norwaysbest.com/en/flam/things-to-do/historical-farm-tour-at-otternes",
  stegastein: "https://www.norwaysbest.com/en/flam/things-to-do/stegastein-viewpoint",
  flamRail: "https://www.norwaysbest.com/en/flam/things-to-do/the-flam-railway-round-trip",
  oslTransport: "https://www.avinor.no/en/airport/oslo/info/public-transportation/",
};

const mapSearch = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const mapRoute = (origin, destination) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=transit`;

const overrides = {
  sep03: {
    stay: "Bob W Copenhagen Østerbro · 已确认第1晚",
  },
  sep04: {
    stay: "Bob W Copenhagen Østerbro · 已确认第2晚",
    transit: [
      {
        mode: "官方往返小巴",
        route: "哥本哈根票面集合点 → Skovtårnet → Møns Klint / GeoCenter → 哥本哈根",
        time: "按已购订单的集合时间",
        duration: "整团约8.5小时",
        buffer: "提前30分钟签到；Møns主停留约2小时45分",
        ticket: "Møns Klint官方小巴订单",
        official: "https://moensklint.dk/en/bus-trip-from-Copenhagen/",
        map: mapRoute("Copenhagen", "GeoCenter Møns Klint"),
      },
    ],
    transport: [
      "核心路线只用哥本哈根往返官方小巴，不再把工作日678局部班次误写成整段公共交通时刻",
      "集合点、Skovtårnet是否入场、返城时间全部服从实际订单；强风、雷暴或崖区关闭就切室内Plan B",
    ],
  },
  sep05: {
    stay: "Bob W Copenhagen Østerbro · 已确认第3晚",
  },
  sep06: {
    stay: "Bob W Copenhagen Østerbro · 已确认第4晚",
    main: null,
  },
  sep07: {
    city: "哥本哈根 → 赫尔辛格 → 马尔默",
    stay: "Sky Hotel Malmö City · Kaptensgatan 1 · 已确认第1晚",
    summary:
      "从Bob W Østerbro退房后，把行李带到Helsingør Station正规行李柜；完成Kronborg与Øresund Aquarium后，乘官方轮渡到Helsingborg，再乘直达列车到Malmö C并步行入住Sky Hotel Malmö City。路线不再误绕Hyllie。",
    route:
      "Bob W Østerbro → Helsingør寄存 → Kronborg / Øresund Aquarium → Helsingborg C → Malmö C → Sky Hotel Malmö City",
    main: [
      {
        time: "07:00–07:30",
        title: "Bob W Østerbro退房、带行李前往København H",
        detail:
          "完成自助退房并检查门锁/行李；护照、签证页、会议注册凭证和充电宝随身。按Rejseplanen当天路线去København H，目标07:35前到站台。",
      },
      {
        time: "07:45–08:40窗口",
        title: "København H → Helsingør",
        detail:
          "乘当天实际区域列车；到站先确认行李柜，不拖箱进入老城和城堡。",
      },
      {
        time: "08:40–09:05",
        title: "Helsingør Station寄存大件",
        detail:
          "DSB确认车站设有行李柜，但不保证尺寸和空位。柜满时不拖箱游览：直接跨海去Malmö入住，Kronborg与水族馆改为删除。",
      },
      {
        time: "09:05–09:40",
        title: "港口与老城短走",
        detail: "只走车站—老城—Kronborg轴线；09:40转向城堡入口。",
      },
      {
        time: "09:40–10:00",
        title: "Kronborg入场准备",
        detail: "核对票面、寄存规则与当日免费介绍；不把10:00开门写成09:40入场。",
      },
      {
        time: "10:00–12:25",
        title: "Kronborg：炮廓、礼拜堂、舞厅与海峡视线",
        detail:
          "优先10:15免费短介绍；12:25无条件收口。13:00 Hamlet英文团只有在主动删除水族馆时才替换。",
      },
      {
        time: "12:35–13:25",
        title: "Værftets Madmarked午餐",
        detail: "旧船厂多摊位，单人用餐快；13:25离开。",
      },
      {
        time: "13:25–13:40",
        title: "步行到Øresund Aquarium",
        detail: "沿港口主路到Strandpromenaden 5。",
      },
      {
        time: "13:40–14:50",
        title: "Øresund Aquarium",
        detail: "看海峡本地生境缸、触摸池与研究说明；按当日开放和现场票务执行。",
      },
      {
        time: "14:50–15:55",
        title: "回站、取行李并进入轮渡码头",
        detail:
          "15:25前回到车站区，先取行李再确认下一班可登船航次；不加M/S Maritime Museum。",
      },
      {
        time: "按下一班可登船航次",
        title: "Helsingør → Helsingborg",
        detail: "官方轮渡约20分钟；上船后核对Helsingborg C至Malmö C的实际直达列车。",
      },
      {
        time: "到港后约50–65分钟",
        title: "Helsingborg C → Malmö C",
        detail:
          "乘直达Öresundståg到Malmö C；不再为了错误的Hyllie酒店多坐两站。",
      },
      {
        time: "抵达Malmö C后15–20分钟",
        title: "步行入住Sky Hotel Malmö City",
        detail:
          "按Kaptensgatan 1导航，走明亮主路；前台确认早餐、寄存和9月12日退房安排。",
      },
    ],
    transit: [
      {
        mode: "区域列车",
        route: "København H → Helsingør",
        time: "07:45前后",
        duration: "45–55分",
        buffer: "比Kronborg开门早约1小时",
        ticket: "DSB当天票",
        official: "https://www.dsb.dk/en/",
        map: mapRoute("København H", "Helsingør Station"),
      },
      {
        mode: "官方轮渡",
        route: "Helsingør → Helsingborg",
        time: "按下一班可登船航次",
        duration: "约20分",
        buffer: "先取行李再进码头",
        ticket: "官方轮渡票",
        official: "https://www.oresundslinjen.com/",
        map: mapRoute("Helsingør Station", "Helsingborg Central Station"),
      },
      {
        mode: "Öresundståg + 步行",
        route: "Helsingborg C → Malmö C → Sky Hotel Malmö City",
        time: "到港后",
        duration: "列车约50–65分 + 步行15–20分",
        buffer: "接受错过一班；晚间仍有高频车",
        ticket: "Skånetrafiken / Öresundståg",
        official: links.oresund,
        map: mapRoute("Helsingborg Central Station", "Sky Hotel Malmö City"),
      },
    ],
    transport: [
      "Helsingør站柜满或行李超尺时，删除景点并直接跨海入住，不拖箱走炮廓和港区",
      "跨海后在Malmö C下车，步行到Kaptensgatan 1；Hyllie只在次日作为会场站使用",
    ],
  },
  sep08: {
    stay: "Sky Hotel Malmö City · Kaptensgatan 1 · 已确认第2晚",
    summary:
      "Workshop/Tutorial以最终program为准。住宿在Malmö市中心，不是Hyllie步行区：每次去会场都要为步行、候车、3分钟列车和入场合计预留约35–45分钟。",
    route:
      "Sky Hotel Malmö City → Triangeln / Malmö C → Hyllie → Malmömässan → 市区住宿",
    main: [
      {
        time: "07:00–07:35",
        title: "早餐并选定唯一Workshop主线",
        detail: "从官方页面只选一个AM、PM或Full-day主线；标记3位想交流的作者。",
      },
      {
        time: "个人首场前50分钟",
        title: "从Sky Hotel出发去Malmömässan",
        detail:
          "步行到Triangeln或Malmö C，乘直达列车到Hyllie，再步行入场；目标首场前20–30分钟到达对应建筑。",
      },
      {
        time: "AM / Full-day",
        title: "Workshop / Tutorial",
        detail: "官网未发布分钟program前不虚构开场；茶歇问一个具体论文问题。",
      },
      {
        time: "官方午餐时段",
        title: "会议午餐与换桌交流",
        detail: "是否含餐以注册类别为准；优先和同研究方向的人同桌。",
      },
      {
        time: "PM / Full-day",
        title: "继续同一研究线",
        detail: "不为多听几场频繁换房；记录会后要跟进的具体材料。",
      },
      {
        time: "官方活动结束后",
        title: "社交活动或顺路晚餐",
        detail: "只参加已确认活动；否则回市中心住宿附近吃饭，不为临时活动错过合理返程。",
      },
      {
        time: "21:00前",
        title: "回Sky Hotel并记录联系人",
        detail: "从Hyllie乘直达车回Triangeln/Malmö C，余下步行走明亮主路。",
      },
    ],
    transit: [
      {
        mode: "步行 + 区域列车 + 步行",
        route: "Sky Hotel Malmö City → Triangeln / Malmö C → Hyllie → Malmömässan",
        time: "个人首场前50分钟离店",
        duration: "门到门约25–35分",
        buffer: "另留15–20分应对候车、站台和会场安检",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Sky Hotel Malmö City", "Malmömässan"),
      },
    ],
    transport: [
      "Sky Hotel Malmö City不在Hyllie；每天必须乘区域列车往返会场",
      "首场前50分钟离店，回程走Triangeln/Malmö C与Kaptensgatan明亮主路",
    ],
  },
  sep09: {
    stay: "Sky Hotel Malmö City · Kaptensgatan 1 · 已确认第3晚",
    route:
      "Sky Hotel Malmö City → Triangeln / Malmö C → Hyllie → Malmömässan → Malmö Konsthall → Sky Hotel",
    main: [
      {
        time: "个人首场前50分钟",
        title: "Sky Hotel → Malmömässan",
        detail: "按最终program倒排；目标首场前20–30分钟到场，不再写成15分钟步行。",
      },
      {
        time: "AM / Full-day",
        title: "Workshop / Tutorial Day 2",
        detail: "延续昨天同一方向，减少随机游走。",
      },
      {
        time: "官方午餐时段",
        title: "约昨天认识的人固定桌继续聊",
        detail: "只约1–2人，问题具体到方法或数据。",
      },
      {
        time: "PM / Full-day",
        title: "完成Workshop / Tutorial",
        detail:
          "16:50看一次时间；只有session自然结束且17:10前能离场，才执行美术馆。",
      },
      {
        time: "17:10–17:30硬转场窗",
        title: "Hyllie → Triangeln → Malmö Konsthall",
        detail: "17:15后尚未离开会场就删除美术馆；不打车抢闭馆。",
      },
      {
        time: "17:30–18:50（条件式）",
        title: "Malmö Konsthall",
        detail: "免费入场；按周三晚间开放执行。18:50离馆，不参加不懂语言的长导览。",
      },
      {
        time: "19:00–20:30",
        title: "Triangeln附近晚餐后步行回酒店",
        detail: "酒店就在市中心，不需要再坐车去Hyllie。",
      },
    ],
    transit: [
      {
        mode: "步行 + 区域列车 + 步行",
        route: "Sky Hotel Malmö City → Triangeln / Malmö C → Hyllie → Malmömässan",
        time: "个人首场前50分钟离店",
        duration: "门到门约25–35分",
        buffer: "另留15–20分",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Sky Hotel Malmö City", "Malmömässan"),
      },
      {
        mode: "区域列车 + 步行",
        route: "Hyllie → Triangeln → Malmö Konsthall",
        time: "17:10–17:30",
        duration: "约15–20分",
        buffer: "17:15未离场即删",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Malmömässan", "Malmö Konsthall"),
      },
    ],
  },
  sep10: {
    stay: "Sky Hotel Malmö City · Kaptensgatan 1 · 已确认第4晚",
    route:
      "Sky Hotel Malmö City → Triangeln / Malmö C → Malmö Arena / Malmömässan → 市区住宿",
    main: [
      {
        time: "首场前70–55分钟",
        title: "早餐、最终program与个人义务检查",
        detail:
          "确认会场建筑、poster/oral时段和移动路线；住宿到会场需换乘，不能把通勤压进30分钟。",
      },
      {
        time: "首场前50分钟",
        title: "从Sky Hotel出发",
        detail:
          "步行到Triangeln/Malmö C，乘直达车到Hyllie；目标首场前20–30分钟入场。",
      },
      {
        time: "上午官方program",
        title: "主会：只跟一条研究主线",
        detail: "每个报告最多记一个可复现实验或数据假设问题。",
      },
      {
        time: "10:30–11:15窗口",
        title: "Expo首轮：预选3个展位",
        detail: "若与核心session或个人义务冲突，移到下午。",
      },
      {
        time: "官方午餐时段",
        title: "会议午餐 / 已确认的Speed Mentoring",
        detail: "Mentoring只有注册确认才参加。",
      },
      {
        time: "下午官方program",
        title: "主会 + 展示前45分钟准备",
        detail: "有个人展示时提前45分钟停止逛展，检查海报、转接头和备份。",
      },
      {
        time: "18:00起",
        title: "按最终program决定官方活动或晚餐",
        detail: "Expo闭馆不等于主会结束；只参加已确认活动。",
      },
      {
        time: "21:15前",
        title: "乘车回Sky Hotel",
        detail: "保留至少两班返程；回酒店后整理3位联系人。",
      },
    ],
    transit: [
      {
        mode: "步行 + 区域列车 + 步行",
        route: "Sky Hotel Malmö City → Triangeln / Malmö C → Hyllie → 会场",
        time: "首场前50分钟离店",
        duration: "门到门约25–35分",
        buffer: "另留15–20分",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Sky Hotel Malmö City", "Malmömässan"),
      },
    ],
  },
  sep11: {
    stay: "Sky Hotel Malmö City · Kaptensgatan 1 · 已确认第5晚",
    route:
      "Sky Hotel Malmö City ↔ Triangeln / Malmö C ↔ Hyllie会场；晚餐只选返程轨道轴",
    main: [
      {
        time: "首场前60–50分钟",
        title: "确认展示时段、房间与设备并离店",
        detail: "作者义务前45分钟锁死；住宿到会场另有约25–35分钟通勤。",
      },
      {
        time: "上午官方program",
        title: "Main Conference：问题、证据、联系人",
        detail: "每场只记核心假设、最强证据和可继续联系的人。",
      },
      {
        time: "10:30–18:00内择45分钟",
        title: "Expo第二轮：工具、招聘、数据三选一",
        detail: "选择与核心session不冲突的一窗；问完离开。",
      },
      {
        time: "官方午餐时段",
        title: "只约一个深聊对象",
        detail: "优先已确认Mentoring，否则延续昨天最重要的一次交流。",
      },
      {
        time: "下午官方program",
        title: "Main Conference + 展示后FAQ记录",
        detail: "展示结束后10分钟内记下问题和材料承诺。",
      },
      {
        time: "18:30–20:45",
        title: "市中心小桌晚餐",
        detail: "控制3–5人；餐厅只选Hyllie→Triangeln/Malmö C返程轴。",
      },
      {
        time: "21:15前",
        title: "回Sky Hotel",
        detail: "从Triangeln/Malmö C步行回Kaptensgatan 1，不把networking变成熬夜。",
      },
    ],
    transit: [
      {
        mode: "步行 + 区域列车 + 步行",
        route: "Sky Hotel Malmö City ↔ Triangeln / Malmö C ↔ Hyllie会场",
        time: "全天",
        duration: "单程门到门约25–35分",
        buffer: "去程另留15–20分；晚餐后保留至少两班返程",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Sky Hotel Malmö City", "Malmö Arena"),
      },
    ],
  },
  sep12: {
    city: "马尔默 → 哥本哈根机场",
    country: "瑞典 → 丹麦",
    phase: "ECCV最终日与机场前置",
    title: "完成ECCV后前置到CPH：不再假定不存在的周六晚间直飞",
    summary:
      "2026年9月12日是周六；当前可核对的CPH→BGO直飞集中在上午/中午，无法在ECCV收尾后当晚直飞。均衡路线保留最终日义务，傍晚取行李去CPH机场酒店，次早乘直飞；不虚构航班，也不在会后加海边或市中心打卡。",
    verified:
      "ECCV会期、Sky Hotel Malmö City地址、跨境列车与当前周班表已核对；航空时刻会变，执行前只认实际可售订单",
    stay: "CPH Terminal 3连廊机场酒店 · 1晚（待订）",
    route:
      "Sky Hotel Malmö City退房寄存 → Hyllie会场 → Malmö市中心取行李 → CPH Airport → 机场酒店",
    load: "会议最终日 + 跨境前置 · 不飞不存在的晚间直飞",
    main: [
      {
        time: "07:00–07:40",
        title: "Sky Hotel退房、寄存与订单离线化",
        detail:
          "大件寄存在酒店；护照、电脑、药物和会议材料随身。确认寄存凭证、CPH机场酒店与次日实际航班。",
      },
      {
        time: "个人首场前50分钟",
        title: "Sky Hotel → Hyllie会场",
        detail:
          "经Triangeln/Malmö C乘直达车；住宿不在Hyllie，必须保留门到门通勤和入场余量。",
      },
      {
        time: "上午至官方最终义务结束",
        title: "ECCV Main Conference Final Day",
        detail:
          "优先本人报告、作者义务与已约定会面；最终program发布前不虚构结束分钟。",
      },
      {
        time: "官方义务结束后+0:00–0:40",
        title: "Hyllie → Malmö市中心住宿",
        detail:
          "乘第一班合适列车回Triangeln/Malmö C，步行取大件；不在Hyllie临时加晚餐。",
      },
      {
        time: "取行李后+0:00–0:25",
        title: "步行到Triangeln / Malmö C",
        detail: "按实时运行选择最近且有直达CPH的站；行李多时优先Malmö C明亮主路。",
      },
      {
        time: "进站后+0:00–0:45",
        title: "Malmö → Copenhagen Airport",
        detail:
          "乘直达Øresundståg；接受错过一班，不为追车跑动。跨境检查或施工时服从运营方。",
      },
      {
        time: "抵达CPH后15–30分钟",
        title: "步行入住Terminal 3连廊机场酒店",
        detail:
          "只选航站楼步行可达或一站轨道、24小时前台住宿；完成次日值机后吃饭休息。",
      },
    ],
    transit: [
      {
        mode: "区域列车 + 步行",
        route: "Sky Hotel Malmö City → Hyllie会场 → Sky Hotel",
        time: "会前 / 最终义务结束后",
        duration: "单程门到门约25–35分",
        buffer: "去程另留15–20分；回程不追加活动",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Sky Hotel Malmö City", "Malmömässan"),
      },
      {
        mode: "Öresundståg",
        route: "Triangeln / Malmö C → Copenhagen Airport Terminal 3",
        time: "取行李后",
        duration: "列车通常约20–35分",
        buffer: "另留候车、步行和跨境运行余量",
        ticket: "Skånetrafiken / Øresundståg",
        official: links.oresund,
        map: mapRoute("Sky Hotel Malmö City", "Copenhagen Airport Terminal 3"),
      },
    ],
    sights: [
      {
        name: "ECCV Final Day",
        why: "完成本人必须到场的报告、作者与研究交流义务；普通观光不应挤压它。",
        ticket: "ECCV注册与本人日程。",
        tour: "按最终program和本人义务执行。",
        url: "https://eccv.ecva.net/Conferences/2026/Dates",
        map: mapSearch("Malmömässan"),
      },
      {
        name: "CPH机场前置住宿",
        why: "周六晚间直飞不可用时，把跨境移动前置能保住会议最终日，并让周日早班直飞可执行。",
        ticket: "可取消的航站楼连廊住宿；次日航班未出票前不写成已锁定。",
        tour: "无夜间观光；入住、值机、晚餐、睡眠。",
        url: "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/hotel",
        map: mapSearch("Copenhagen Airport hotel Terminal 3"),
      },
    ],
    foods: [
      {
        name: "ECCV会场午餐",
        type: "会议餐",
        order: "一份完整热食与水",
        note: "是否包含以注册权益为准，不离会场追餐厅。",
        price: "按ECCV注册权益",
        tier: "—",
        near: "Malmö Arena / Malmömässan",
        meal: "午餐",
        booking: "按会议注册",
        url: "https://eccv.ecva.net/Conferences/2026/Registration",
        map: mapSearch("Malmömässan"),
      },
      {
        name: "CPH机场晚餐",
        type: "机场顺路热食",
        order: "汤、三明治或热主食",
        note: "先入住和完成次日值机；不为餐厅进哥本哈根市区。",
        price: "约100–250 DKK",
        tier: "€€",
        near: "CPH Terminal 3",
        meal: "晚餐",
        booking: "现场购买",
        url: "https://www.cph.dk/en/practical/food-shopping",
        map: mapSearch("Copenhagen Airport food"),
      },
    ],
    rain: {
      trigger: "会议延长、跨境列车异常或次日航班调整",
      title: "删除全部会后活动，只守机场住宿与次日航班",
      detail:
        "会后唯一任务是取行李去CPH。跨境列车异常时按运营方改线；次日航班变化只通过原订单处理。",
    },
    transport: [
      "不再写9月12日晚间CPH→BGO直飞；当前周班表不支持这个前提",
      "9月12日只前置到CPH机场酒店；9月13日直飞必须以实际可售订单为准",
      "Sky Hotel Malmö City在Kaptensgatan 1，不是Hyllie步行酒店",
    ],
    sources: [
      { label: "ECCV日期", url: "https://eccv.ecva.net/Conferences/2026/Dates", type: "官网" },
      { label: "Sky Hotel Malmö City", url: links.skyHotel, type: "住宿官网" },
      { label: "Øresundståg", url: links.oresund, type: "运营方" },
      { label: "CPH航班", url: links.cphFlights, type: "机场官网" },
    ],
    visual: { slot: 6, label: "ECCV会场 → Malmö市中心取行李 → CPH机场酒店" },
    timeCheck: {
      status: "可执行；航班不锁死",
      note:
        "ECCV最终program与航班都属于动态信息。固定结构是：完成本人义务→回市中心取行李→跨境到CPH机场酒店；次日只执行实际可售直飞。",
    },
    execution: {
      grade: "A−｜保留会议最终日；增加一晚机场前置",
      tone: "good",
      basis:
        "周六晚间直飞不可用。前置到CPH比硬写不存在的航班更诚实，也比周六中午早退会议更均衡。",
      anchors: [
        { time: "07:00–07:40", title: "退房寄存", detail: "大件留Sky Hotel。" },
        { time: "首场前50分钟", title: "去Hyllie", detail: "按市中心住宿重新计算通勤。" },
        { time: "本人最终义务结束后", title: "回酒店取行李", detail: "停止临时加会面。" },
        { time: "取行李后", title: "直达CPH", detail: "入住机场酒店，不进城。" },
      ],
      prep: [
        "确认Sky Hotel寄存与取件截止",
        "确认CPH机场酒店可步行到Terminal 3",
        "把实际航班、跨境车和酒店订单离线保存",
      ],
      buffers: [
        { math: "市中心酒店↔Hyllie", result: "门到门约25–35分，另留15–20分" },
        { math: "Malmö→CPH", result: "列车约20–35分，另留候车和跨境运行余量" },
      ],
      hardCutoff: "本人最终义务结束后不再加会面；回Sky Hotel取行李并直达CPH机场酒店。",
      dropOrder: ["Expo临时回访", "会后晚餐", "任何海边或市中心观光"],
      recheck: [
        { label: "ECCV Final Day", note: "最终program和本人义务", url: "https://eccv.ecva.net/Conferences/2026/Dates" },
        { label: "Øresundståg", note: "跨境施工和实时运行", url: links.oresund },
        { label: "次日航班", note: "只认实际可售订单", url: links.cphFlights },
      ],
      recovery: "列车异常时服从运营方；航班调整只通过原订单处理。",
    },
    backup: {
      trigger: "会议延长、跨境交通异常或次日航班变化",
      title: "会议—取行李—机场酒店直线",
      verdict: "默认备选 · 删除所有会后支线",
      route: [
        { label: "ECCV会场", query: "Malmömässan", note: "" },
        { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "取行李" },
        { label: "CPH", query: "Copenhagen Airport Terminal 3", note: "" },
        { label: "机场酒店", query: "Copenhagen Airport hotel", note: "" },
      ],
      timeline: [
        ["最终义务结束", "离开会场", "不再加Expo或晚餐。"],
        ["+0:40内", "回市中心取行李", "接受错过一班列车。"],
        ["取件后", "直达CPH", "不进哥本哈根市区。"],
        ["到达后", "入住并值机", "吃饭、休息。"],
      ],
      transport: "Hyllie—Malmö市中心—CPH均按运营方实时执行。",
      meal: "会场餐、随身路餐或CPH机场热食。",
      booking: [
        { label: "Øresundståg", url: links.oresund, note: "检查跨境运行" },
        { label: "CPH航班", url: links.cphFlights, note: "次日实际订单" },
      ],
      exit: "取到行李后不增加任何支线，直达CPH机场酒店。",
    },
  },
  sep13: {
    city: "哥本哈根机场 → 卑尔根 → 沃斯",
    country: "丹麦 → 挪威",
    phase: "早班直飞、Bergen精华与晚间转场",
    title: "早班直飞后抓住卑尔根核心，再乘18:29列车去沃斯",
    summary:
      "以当前周班表中的08:15–09:40直飞作为可行参考，而不是已锁定航班。落地后只保留Bryggen、Bryggens Museum和天气良好时的Ulriken；18:29–19:49乘R40到Voss。修复中的Schøtstuene不再写进主线。",
    verified:
      "当前周班表、Bryggens Museum开放、Ulriken接驳和Entur 2026-09-13 Bergen→Voss时刻已核对；执行前仍按实际订单与运营公告复核",
    stay: "Voss Station / Bus Terminal步行圈 · 1晚",
    route:
      "CPH机场酒店 → CPH → BGO → Bergen Station寄存 → Bryggen / Bryggens Museum → Ulriken → Bergen Station → Voss",
    load: "中高 · 早班飞行 + 文化主轴 + 条件式高视角 + 18:29铁路",
    main: [
      {
        time: "05:45–06:20",
        title: "早餐、退房与航班复核",
        detail:
          "机场酒店出发；这里的08:15参考只说明路线可行，最终必须用实际订单替换航班号、托运和登机口。",
      },
      {
        time: "06:20–07:35",
        title: "进入CPH、托运与安检",
        detail: "按航司要求执行；完成安检后再买早餐/水。",
      },
      {
        time: "当前参考08:15–09:40",
        title: "CPH → BGO直飞",
        detail:
          "当前周班表显示周日有早班直飞；未出票前不把SK2862写成已确认。若实际可售时间变化，整日按落地时间重算。",
      },
      {
        time: "09:40–10:30",
        title: "取行李、购买Skyss票并进入轻轨站",
        detail: "不在机场吃正餐；确认18:29 Bergen→Voss车票与Voss入住。",
      },
      {
        time: "10:30–11:20窗口",
        title: "BGO → Nonneseter / Bergen Station",
        detail: "Bybanen Line 1通常约45分钟；按实际发车上车，不虚构固定一班。",
      },
      {
        time: "11:20–11:35",
        title: "Bergen Station正规寄存",
        detail: "大件寄存，贵重物、防风层和水随身。",
      },
      {
        time: "11:35–12:10",
        title: "Bryggen港口立面与公共木仓后巷",
        detail: "从港口整体尺度进入公共木板通道；不把鱼市场排队当核心。",
      },
      {
        time: "12:10–12:40",
        title: "顺路快速午餐",
        detail: "选鱼汤、鱼饼或已备路餐；12:40无条件离开，不排长队。",
      },
      {
        time: "12:40–13:40",
        title: "Bryggens Museum",
        detail:
          "用考古遗址和中世纪城市层理解Bryggen；2026年日常开放窗口以官网为准。Schøtstuene仍处修复/重开信息冲突，不列入主线。",
      },
      {
        time: "13:40–14:00",
        title: "步行至Ulriken Express站并候车",
        detail: "从Bryggen轴步行到Torgallmenningen；13:55前到站，不再买餐。",
      },
      {
        time: "14:00–14:30",
        title: "Ulriken Express + 缆车上山",
        detail:
          "只在能见度、风况与运营都正常时执行；接驳按运营方每30分钟节奏复核。",
      },
      {
        time: "14:30–15:45",
        title: "Ulriken 643高处视角",
        detail: "只走站区安全平台和短步道，不做长线徒步；低云时整段删除。",
      },
      {
        time: "15:45–16:30",
        title: "下山并乘16:15前后接驳返市中心",
        detail: "缆车连续运行但接驳有节奏；错过一班仍有余量，不打车追赶。",
      },
      {
        time: "16:30–17:00",
        title: "回Bergen Station并取行李",
        detail: "从市中心步行回站区；17:00前完成取件。",
      },
      {
        time: "17:00–17:45",
        title: "车站附近热食",
        detail: "只选能在45分钟内完成的热食；排队长就用路餐。",
      },
      {
        time: "17:45–18:10",
        title: "进入站台区",
        detail: "核对18:29 R40站台与实时公告；不再离站。",
      },
      {
        time: "18:29–19:49",
        title: "Bergen Station → Voss Station（R40）",
        detail:
          "Entur当前目标日时刻为18:29–19:49；以实际Vy/Entur订单和站屏为准。误车时后续参考20:39–21:56或21:36–22:53，并通知酒店晚到。",
      },
    ],
    transit: [
      {
        mode: "直飞",
        route: "CPH → BGO",
        time: "当前可行参考08:15–09:40",
        duration: "约1时25分",
        buffer: "未出票前不锁航班；至少按航司要求进入航站楼",
        ticket: "实际可售航司订单",
        official: links.cphFlights,
        map: mapRoute("Copenhagen Airport", "Bergen Airport"),
      },
      {
        mode: "Bybanen Line 1",
        route: "BGO → Nonneseter / Bergen Station",
        time: "取行李后",
        duration: "约45分",
        buffer: "另留取行李、购票和候车时间",
        ticket: "Skyss实际票",
        official: links.bergenAirport,
        map: mapRoute("Bergen Airport", "Bergen Station"),
      },
      {
        mode: "Ulriken Express + 缆车",
        route: "Torgallmenningen → Ulriken → Bergen中心",
        time: "14:00–16:30条件式",
        duration: "约2.5小时",
        buffer: "低云、强风、停运或14:00未能上车即删",
        ticket: "Ulriken官方票",
        official: links.ulriken,
        map: mapRoute("Torgallmenningen Bergen", "Ulriken643"),
      },
      {
        mode: "Vy / R40",
        route: "Bergen Station → Voss Station",
        time: "18:29–19:49",
        duration: "1时20分",
        buffer: "17:40前进入站区；前48小时复核",
        ticket: "Vy实际订单",
        official: links.entur,
        map: mapRoute("Bergen Station", "Voss Station"),
      },
    ],
    sights: [
      {
        name: "Bryggen + Bryggens Museum",
        image: "/nordic-dubai-field-guide/images/localized/Bergen-Bryggen-13-original.jpg",
        imageSource: "https://en.visitbergen.com/things-to-do/bryggen-in-bergen",
        imageLabel: "Bryggen木仓后巷实景",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Bryggen-in-Bergen-834d53a7b2.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Bryggen_in_Bergen.jpg",
        fallbackImageLabel: "Bryggen世界遗产街区备用实景",
        why: "把世界遗产木仓立面与地下考古层连起来，理解Bergen作为汉萨港口的结构。",
        ticket: "Bryggen公共巷道免费；博物馆票按官网。",
        tour: "本日用自助主线，不把未确认重开的Schøtstuene写进固定行程。",
        url: links.bryggensMuseum,
        map: mapSearch("Bryggens Museum Bergen"),
      },
      {
        name: "Ulriken 643",
        image: "/nordic-dubai-field-guide/images/localized/Ulriken_Bergen_original.jpg",
        imageSource: "https://commons.wikimedia.org/wiki/File:Ulriken_Bergen.jpg",
        imageLabel: "Ulriken山顶真实景观图",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Ulriken_Bergen_01.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Ulriken_Bergen_01.jpg",
        fallbackImageLabel: "Ulriken同地点备用实景",
        why: "从一处高视角读Bergen群山、港口与海岸，不重复Fløyen。",
        ticket: "官方接驳/缆车票；只在天气与运行同时成立时购买。",
        tour: "站区短停，不做长线徒步。",
        url: links.ulriken,
        map: mapSearch("Ulriken643"),
      },
    ],
    rain: {
      trigger: "航班晚到、低云、强风、大雨或Ulriken停运",
      title: "只留Bryggen + Bryggens Museum，直接去18:29列车",
      detail:
        "Ulriken是第一删除项。航班明显晚点时压缩Bryggen户外段，不压缩寄存、取件和进站。",
    },
    transport: [
      "早班直飞未出票前只作为可行参考；实际落地晚于11:00时自动删除Ulriken",
      "Schøtstuene重开信息冲突，主线改为开放更明确的Bryggens Museum",
      "Bergen→Voss当前目标班18:29–19:49，后续有20:39与21:36恢复班次",
    ],
    sources: [
      { label: "CPH航班", url: links.cphFlights, type: "机场官网" },
      { label: "BGO机场交通", url: links.bergenAirport, type: "公共交通" },
      { label: "Bryggens Museum", url: links.bryggensMuseum, type: "博物馆官网" },
      { label: "Ulriken", url: links.ulriken, type: "运营方" },
      { label: "Entur", url: links.entur, type: "国家行程规划" },
    ],
    visual: { slot: 6, label: "CPH早班直飞 · Bryggen、Ulriken与18:29 Voss列车" },
    timeCheck: {
      status: "可执行；飞行动态、地面锚点已核验",
      note:
        "航空段只作为当前参考。地面硬锚点是14:00前能否开始Ulriken、17:40前回站、18:29开往Voss。",
    },
    execution: {
      grade: "A−｜早班飞行后仍保有Bergen核心；Ulriken可删",
      tone: "good",
      basis:
        "用机场前置换来周日早班直飞；Bergen只选一馆、一片世界遗产街区和一处高视角。",
      anchors: [
        { time: "当前参考08:15–09:40", title: "CPH→BGO", detail: "实际订单替换参考。" },
        { time: "12:40–13:40", title: "Bryggens Museum", detail: "修复中的Schøtstuene不列主线。" },
        { time: "14:00判断", title: "Ulriken去留", detail: "天气或进度不成立就删。" },
        { time: "18:29–19:49", title: "Bergen→Voss", detail: "17:40前进站。" },
      ],
      prep: [
        "下载实际航班、Skyss、Ulriken、Vy和Voss酒店订单",
        "把20:39与21:36后续列车记作恢复方案",
        "防风层、防滑鞋、水和路餐随身",
      ],
      buffers: [
        { math: "BGO→Bergen Station", result: "取行李后约1小时15分预算" },
        { math: "Ulriken返城→18:29列车", result: "约2小时余量" },
      ],
      hardCutoff: "14:00仍未开始Ulriken或天气不成立就删除；17:40前进入Bergen Station。",
      dropOrder: ["Ulriken", "Bryggen户外加走", "午餐改路餐；18:29车票不删"],
      recheck: [
        { label: "实际航班", note: "起飞、托运、抵达", url: links.cphFlights },
        { label: "Ulriken", note: "能见度、风与接驳", url: links.ulriken },
        { label: "Entur/Vy", note: "18:29车次与站台", url: links.entur },
      ],
      recovery: "航班晚到先删Ulriken；误掉18:29时改20:39或21:36并通知Voss酒店。",
    },
    backup: {
      trigger: "航班晚到、低云、强风或Ulriken停运",
      title: "Bergen文化短轴 + Voss列车",
      verdict: "稳妥备选 · 删除Ulriken",
      route: [
        { label: "BGO", query: "Bergen Airport", note: "" },
        { label: "Bergen Station", query: "Bergen Station", note: "寄存" },
        { label: "Bryggens Museum", query: "Bryggens Museum", note: "" },
        { label: "Voss", query: "Voss Station", note: "" },
      ],
      timeline: [
        ["落地后", "Bybanen进城", "不在机场吃正餐。"],
        ["可用窗口", "Bryggen + Museum", "户外段可压缩。"],
        ["17:40前", "回Bergen Station", "取行李进站。"],
        ["18:29–19:49", "去Voss", "晚点用后续车。"],
      ],
      transport: "BGO轻轨→市中心步行→Vy去Voss。",
      meal: "鱼汤/鱼饼或路餐；不为餐厅误车。",
      booking: [
        { label: "Skyss", url: links.bergenAirport, note: "机场交通" },
        { label: "Entur", url: links.entur, note: "Bergen→Voss" },
      ],
      exit: "17:40前进入Bergen Station。",
    },
  },
  sep14: {
    stay: "Flåm车站—码头步行圈 · 连住第1晚",
    title: "09:50巴士接12:10峡湾船：完整穿过Nærøyfjord",
    summary:
      "09:50–10:55从Voss Stop A乘官方巴士到Gudvangen Stop H，保留75分钟码头缓冲；12:10–14:10乘正规观光船完整穿过UNESCO Nærøyfjord到Flåm。时间已按运营方2026年9月表对齐。",
    route:
      "Voss Stop A 09:50 → Gudvangen Stop H 10:55 → 12:10 Nærøyfjord船 → Flåm 14:10 → 住宿",
    main: [
      { time: "07:30–08:30", title: "早餐、退房与路餐", detail: "确认巴士、12:10船票、Flåm两晚住宿和码头信息。" },
      { time: "09:20–09:35", title: "到Voss Bus Terminal Stop A", detail: "火车站旁但不要等在铁路站台；核对VY456 / Norway’s Best车辆。" },
      { time: "09:50–10:55", title: "Voss → Gudvangen官方巴士", detail: "当前2026季节表每日运行；以票面、车辆和临时公告为准。" },
      { time: "10:55–11:20", title: "确认Stop H、码头与报到位置", detail: "先找到票面码头、洗手间和行李规则，再吃饭。" },
      { time: "11:20–11:50", title: "Gudvangen快速热食", detail: "只点能在30分钟内完成的一份热食；排队长就用路餐。" },
      { time: "11:50–12:10", title: "登船准备", detail: "回到码头、核对二维码和行李；不去Viking Valley。" },
      { time: "12:10–14:10", title: "Gudvangen → Flåm Nærøyfjord观光船", detail: "完整航段约2小时；外甲板风冷时回舱，全程无需划船。" },
      { time: "14:10–14:35", title: "下船、步行入住Flåm", detail: "住宿控制在车站—码头步行圈；大件先放下。" },
      { time: "14:35–15:30（开放时）", title: "Flåm Railway Museum", detail: "按当日开放补铁路工程背景；延误就删。" },
      { time: "15:30后", title: "补给、晚餐与休息", detail: "买9月16日铁路路餐；今天不加Stegastein。" },
    ],
    transit: [
      {
        mode: "官方巴士 VY456",
        route: "Voss Stop A → Gudvangen Stop H",
        time: "09:50–10:55",
        duration: "1时05分",
        buffer: "距12:10开船75分钟",
        ticket: "Norway’s Best实际订单",
        official: links.vossBus,
        map: mapRoute("Voss Station", "Gudvangen Ferry Terminal"),
      },
      {
        mode: "正规峡湾观光船",
        route: "Gudvangen → Nærøyfjord → Flåm",
        time: "12:10–14:10",
        duration: "2小时",
        buffer: "11:50回到码头",
        ticket: "Norway’s Best单程船票",
        official: links.fjordCruise,
        map: mapRoute("Gudvangen Ferry Terminal", "Flåm Ferry Terminal"),
      },
    ],
    transport: [
      "当前官方组合是09:50–10:55巴士 + 12:10–14:10峡湾船，不再写‘按实际船票’却不给可执行主线",
      "巴士到船有75分钟，先认码头再吃饭；不把Viking Valley塞进缓冲",
      "船停航只通过运营方改签，不找小船或出租艇替代",
    ],
    timeCheck: {
      status: "官方时刻已对齐",
      note: "Stop A 09:50发车、Stop H 10:55抵达、12:10开船、14:10到Flåm；执行前48小时复核。",
    },
    execution: {
      grade: "A｜75分钟换乘缓冲，水陆一条线",
      tone: "good",
      basis: "官方巴士和峡湾船在同一运营体系中形成稳定衔接。",
      anchors: [
        { time: "09:20", title: "到Stop A", detail: "核对车辆。" },
        { time: "09:50–10:55", title: "巴士", detail: "Voss→Gudvangen。" },
        { time: "11:50", title: "回码头", detail: "停止午餐。" },
        { time: "12:10–14:10", title: "峡湾船", detail: "Gudvangen→Flåm。" },
      ],
      prep: ["下载巴士、船与Flåm住宿订单", "准备路餐和防风层", "贵重物随身"],
      buffers: [{ math: "10:55到→12:10开船", result: "75分钟" }],
      hardCutoff: "11:50回到票面码头，停止吃饭和拍照。",
      dropOrder: ["Gudvangen热食改路餐", "Flåm Railway Museum", "绝不删除船前缓冲"],
      recheck: [
        { label: "Voss巴士", note: "Stop A与车辆", url: links.vossBus },
        { label: "峡湾船", note: "12:10班与码头", url: links.fjordCruise },
      ],
      recovery: "巴士或船异常只通过Norway’s Best处理；不自行拼车追船。",
    },
  },
  sep15: {
    stay: "Flåm车站—码头步行圈 · 连住第2晚",
    title: "09:30接驳串起Otternes、Aurland与14:15 Stegastein",
    summary:
      "按2026年9月官方接驳表：09:30从Flåm出发、09:35到Otternes停靠点；12:35再上车、12:44到Aurland；14:15从Aurland Stop F去Stegastein，15:35回Flåm。Otternes建筑内部只有实际买到导览票才进入；无票仍可按现场标识走获准的农庄外部与峡湾视角。",
    route:
      "Flåm 09:30 → Otternes 09:35 → Aurland 12:44 → Stegastein 14:30 → Flåm 15:35",
    main: [
      { time: "07:45–08:30", title: "天气、订单与步行条件复核", detail: "确认09:30接驳、12:35续程、14:15 Stegastein和回程；Otternes导览只在实际订单存在时加入，低云时删除观景台。" },
      { time: "09:15–09:30", title: "到Flåm接驳站签到", detail: "只带日包；大件留住宿。" },
      { time: "09:30–09:35", title: "Flåm → Otternes停靠点", detail: "按9月官方表；下车后仍有约500米较陡步行。" },
      { time: "09:35–09:55", title: "步行上坡到Otternes", detail: "防滑慢走；09:55前到导览集合点。" },
      { time: "09:55–11:50", title: "Otternes农庄外部与峡湾视角", detail: "按现场标识走获准区域；只有实际买到导览票才在票面时段进入对应建筑，不把10:00导览当成无条件存在。" },
      { time: "11:50–12:10", title: "收口、补水并准备下坡", detail: "不闯封闭空间；11:50停止延伸，12:10开始下坡。" },
      { time: "12:10–12:35", title: "下坡回停靠点候车", detail: "12:30班从Flåm出发，约12:35到Otternes；不要卡点。" },
      { time: "12:35–12:44", title: "Otternes → Aurland", detail: "按9月官方接驳表。" },
      { time: "12:45–13:55", title: "Aurland午餐与公共滨水短走", detail: "只选顺路热食；13:55前去Stop F。" },
      { time: "13:55–14:15", title: "Aurland Stop F签到", detail: "核对票面；低云、道路调整或无票即删。" },
      { time: "14:15–15:35", title: "Aurland → Stegastein → Flåm", detail: "14:30到观景台、14:50离开，约15:35回Flåm；只乘官方巴士。" },
      { time: "15:45–16:30（开放时）", title: "Flåm Railway Museum / 补漏", detail: "已在前日看过则直接休息；不重复打卡。" },
      { time: "16:30后", title: "晚餐、买铁路路餐、早睡", detail: "核对9月16日08:20 Flåm Railway和10:02 Myrdal接续。" },
    ],
    transit: [
      {
        mode: "Flåm—Aurland官方接驳",
        route: "Flåm → Otternes → Aurland",
        time: "09:30–09:35；12:35–12:44",
        duration: "两段合计约14分",
        buffer: "Otternes上下各为500米较陡步行留20–25分",
        ticket: "官方接驳实际票；Otternes建筑导览另购",
        official: links.flamAurland,
        map: mapRoute("Flåm Station", "Aurland Church"),
      },
      {
        mode: "Stegastein官方巴士",
        route: "Aurland Stop F → Stegastein → Flåm",
        time: "14:15–15:35",
        duration: "1时20分",
        buffer: "13:55到Stop F；低云即删",
        ticket: "官方实际票",
        official: links.stegastein,
        map: mapRoute("Aurland Church", "Stegastein Viewpoint"),
      },
    ],
    transport: [
      "9月官方接驳把Flåm 09:30、Otternes 09:35、Aurland 12:44和14:15 Stegastein连成一条线",
      "Otternes停靠点到农庄约500米且较陡，时间轴已为上下坡各留20–25分钟",
      "Otternes建筑导览只在实际有票时执行；Stegastein低云时直接删除，不自驾、不临时包车",
    ],
    timeCheck: {
      status: "官方9月交通时刻已对齐；Otternes入内为条件项",
      note: "09:30 Flåm、09:35 Otternes、12:35上车、12:44 Aurland、14:15 Stop F、15:35 Flåm；建筑导览必须以实际可售票为准。",
    },
    execution: {
      grade: "A｜两种官方巴士串成闭环",
      tone: "good",
      basis: "下坡、午餐、签到均有明确缓冲，Stegastein仍可独立删除。",
      anchors: [
        { time: "09:30–09:35", title: "Flåm→Otternes", detail: "之后陡坡步行。" },
        { time: "09:55–11:50", title: "Otternes", detail: "外部按现场标识；入内导览需实际票。" },
        { time: "12:35–12:44", title: "Otternes→Aurland", detail: "12:10开始下坡。" },
        { time: "14:15–15:35", title: "Stegastein", detail: "低云即删。" },
      ],
      prep: ["下载两段巴士与Stegastein订单", "如需入内另存Otternes导览票", "穿防滑鞋并准备水和路餐"],
      buffers: [
        { math: "Otternes下坡→12:35上车", result: "25分钟" },
        { math: "12:44到Aurland→14:15发车", result: "91分钟" },
      ],
      hardCutoff: "12:10开始下坡；13:55到Aurland Stop F。",
      dropOrder: ["Flåm Railway Museum", "Aurland额外商店", "Stegastein；不压缩巴士签到"],
      recheck: [
        { label: "Flåm—Aurland接驳", note: "09:30与12:35两段", url: links.flamAurland },
        { label: "Otternes", note: "实际导览库存、集合点与允许区域", url: links.otternes },
        { label: "Stegastein", note: "14:15与能见度", url: links.stegastein },
      ],
      recovery: "错过12:35接驳就删除Aurland/Stegastein并回Flåm；不靠临时出租车追票。",
    },
  },
  sep16: {
    city: "弗洛姆 → 米达尔 → 奥斯陆机场",
    country: "挪威",
    phase: "Flåm Railway + Bergen Line东行",
    title: "08:20山地铁路接10:02 Bergen Line，15:49到OSL",
    summary:
      "08:20–09:17从Flåm到Myrdal，保留45分钟换乘；10:02–15:05乘F4直达Oslo S，再乘15:30–15:49机场快线到OSL。前两段应购买为同一Vy联程；Oslo S—OSL是独立高频机场段，错过15:30就乘下一班。",
    verified:
      "Norway’s Best 2026夏秋表与Entur 2026-09-16 Myrdal→Oslo、Oslo S→OSL查询已核对；执行前48小时仍以Vy/站屏为准",
    stay: "OSL机场航站楼步行酒店 · 1晚（待订）",
    route:
      "Flåm 08:20 → Myrdal 09:17 / 10:02 → Oslo S 15:05 / 15:30 → OSL 15:49 → 机场酒店",
    load: "长铁路观景日 · 45分钟换乘 + 25分钟Oslo S缓冲",
    main: [
      { time: "06:45–07:30", title: "早餐、退房与路餐", detail: "完成酒店结算；水、热饮和午餐上车前备好。" },
      { time: "07:30–08:05", title: "步行到Flåm Station并看站屏", detail: "08:05前到站；只带实际联程订单。" },
      { time: "08:20–09:17", title: "Flåm Railway：Flåm → Myrdal", detail: "按2026年5月1日至9月30日表；最终以票面和站屏为准。" },
      { time: "09:17–10:02", title: "Myrdal同票联程换乘", detail: "Flåm—Oslo须购买在同一Vy订单；45分钟同站换乘，不离站、不拖箱拍远景。" },
      { time: "10:02–15:05", title: "F4 Myrdal → Oslo S", detail: "沿Hardangervidda东行；不在Finse等站自行下车。" },
      { time: "15:05–15:30", title: "Oslo S转机场列车", detail: "25分钟换乘；看清Flytoget与Vy站台，不跑动。错过15:30就乘下一班。" },
      { time: "15:30–15:49", title: "Oslo S → Oslo lufthavn（FLY2）", detail: "Entur当前目标日为19分钟；实际票务与站屏优先。" },
      { time: "15:49–16:20", title: "步行入住OSL机场酒店", detail: "优先航站楼连廊；非连廊只用正规接驳。" },
      { time: "16:20后", title: "晚餐、值机与休息", detail: "复核9月17日OSL返沪整张国际联程；不进Oslo市区打卡。" },
    ],
    transit: [
      {
        mode: "Flåm Railway",
        route: "Flåm → Myrdal",
        time: "08:20–09:17",
        duration: "57分",
        buffer: "08:05前到站；Myrdal有45分钟换乘",
        ticket: "Flåm→Oslo同一Vy联程",
        official: links.flamRail,
        map: mapRoute("Flåm Station", "Myrdal Station"),
      },
      {
        mode: "Bergen Line F4",
        route: "Myrdal → Oslo S",
        time: "10:02–15:05",
        duration: "5时03分",
        buffer: "接受官方联程；不自行拆短接续",
        ticket: "Vy联程订单",
        official: links.vy,
        map: mapRoute("Myrdal Station", "Oslo Central Station"),
      },
      {
        mode: "Flytoget FLY2",
        route: "Oslo S → Oslo lufthavn",
        time: "15:30–15:49",
        duration: "19分",
        buffer: "Oslo S有25分钟；错过就乘下一班",
        ticket: "Flytoget实际票",
        official: links.oslTransport,
        map: mapRoute("Oslo Central Station", "Oslo Airport"),
      },
    ],
    transport: [
      "08:20–09:17与10:02–15:05形成45分钟Myrdal换乘，不再写‘抵达后按票面’",
      "Oslo S当前参考15:30–15:49到OSL，错过就乘下一班，不影响机场住宿",
      "Flåm→Oslo优先放在同一Vy订单；Oslo S→OSL可另买Flytoget",
    ],
    sources: [
      { label: "Flåm Railway", url: links.flamRail, type: "运营方" },
      { label: "Vy", url: links.vy, type: "铁路" },
      { label: "Entur", url: links.entur, type: "国家行程规划" },
      { label: "OSL交通", url: links.oslTransport, type: "机场官网" },
    ],
    timeCheck: {
      status: "目标日铁路已逐段核对",
      note: "08:20–09:17、10:02–15:05、15:30–15:49；前48小时复核施工、站台与实际订单。",
    },
    execution: {
      grade: "A｜两次换乘分别45分钟与25分钟",
      tone: "good",
      basis: "Flåm—Oslo用同一Vy联程吸收前两段波动；Oslo S—OSL为独立高频机场段，机场酒店继续吸收晚点。",
      anchors: [
        { time: "08:20–09:17", title: "Flåm Railway", detail: "08:05前到站。" },
        { time: "10:02–15:05", title: "F4到Oslo S", detail: "Myrdal换乘45分钟。" },
        { time: "15:30–15:49", title: "去OSL", detail: "错过乘下一班。" },
      ],
      prep: ["下载Flåm→Oslo联程", "准备全天路餐", "确认OSL酒店步行路线"],
      buffers: [
        { math: "09:17到→10:02开", result: "45分钟" },
        { math: "15:05到→15:30开", result: "25分钟" },
      ],
      hardCutoff: "08:05前到Flåm站；Myrdal和Oslo S都不离站加点。",
      dropOrder: ["Oslo市区全部删除", "机场餐改酒店餐", "不删除OSL前置住宿"],
      recheck: [
        { label: "Vy联程", note: "车次、施工与站台", url: links.vy },
        { label: "Entur", note: "全段实时规划", url: links.entur },
      ],
      recovery: "Flåm Railway晚点时由同一联程处理；Oslo S错过机场车就乘下一班。",
    },
    backup: {
      trigger: "铁路晚点、施工或换乘变化",
      title: "保持同一联程，不在途中下车",
      verdict: "铁路恢复方案",
      route: [
        { label: "Flåm", query: "Flåm Station", note: "" },
        { label: "Myrdal", query: "Myrdal Station", note: "同站换乘" },
        { label: "Oslo S", query: "Oslo Central Station", note: "" },
        { label: "OSL", query: "Oslo Airport", note: "" },
      ],
      timeline: [
        ["08:05前", "到Flåm站", "看站屏。"],
        ["晚点时", "联系Vy/看App", "不自行买回Bergen票。"],
        ["到Oslo S后", "乘下一班机场车", "机场酒店吸收波动。"],
      ],
      transport: "只通过Vy/Entur改线；不离站追景点。",
      meal: "使用随身路餐。",
      booking: [
        { label: "Vy", url: links.vy, note: "联程处理" },
        { label: "Entur", url: links.entur, note: "实时替代" },
      ],
      exit: "抵达OSL后直接入住。",
    },
  },
};

const confirmedFlightCorrections = {
  sep12: {
    city: "马尔默 → 哥本哈根机场 → 卑尔根",
    country: "瑞典 → 丹麦 → 挪威",
    phase: "ECCV最终日与17:50飞往Bergen",
    stay: "Bergen Station / Nonneseter步行圈 · 1晚（待订）",
    title: "ECCV后赶17:50直飞：下午13:30是离会硬截止",
    summary:
      "按你已确认的9月12日17:50 CPH→BGO直飞重算：上午保留ECCV个人最终义务，13:30必须离开Hyllie会场，回Sky Hotel取行李后经Triangeln直达CPH。目标15:15前进入航站楼，17:50起飞；落地BGO后只轻轨进城、入住和休息。",
    route:
      "Sky Hotel退房寄存 → Hyllie会场 → 13:30离会 → Sky Hotel取行李 → Triangeln → CPH → 17:50 BGO → Bergen Station住宿",
    load: "高 · 会议最终日 + 跨境列车 + 17:50直飞",
    bookingUrl: links.cphFlights,
    food: [
      "午餐使用ECCV会场餐或随身路餐；过安检后只有时间充足才买顺路热食",
      "不为餐厅拖延13:30离会、托运、安检、登机口或Bergen入住",
    ],
    social: [
      "13:20前只完成已约定的研究交流；13:30硬离会后不再增加会面",
      "跨境列车、航班和BGO轻轨各自保管票证与行李，不临时拼车",
    ],
    safety: [
      "护照、电脑、药物和订单随身；托运行李不放电子设备、证件或充电宝",
      "跨境列车异常立即按运营方改线；抵达Bergen后只入住，不夜游",
    ],
    verified:
      "17:50起飞由你的实际航班确认；Sky Hotel地址、跨境列车与BGO轻轨为官方交通锚点。到达时间、航司截载与登机口只认票面。",
    main: [
      {
        time: "07:00–07:40",
        title: "Sky Hotel退房、寄存与飞行文件复核",
        detail:
          "大件寄存在Kaptensgatan 1；护照、电脑、药物和登机材料随身。把17:50航班、托运截止、Sky Hotel取件与Bergen住宿离线保存。",
      },
      {
        time: "个人首场前50分钟",
        title: "Sky Hotel → Hyllie会场",
        detail:
          "经Triangeln/Malmö C乘直达车到Hyllie；住宿不在会场步行区。",
      },
      {
        time: "上午–13:20",
        title: "ECCV Main Conference Final Day",
        detail:
          "优先本人报告、作者义务与已约会面。13:20开始收口；若官方强制义务在13:30后，它与17:50航班实质冲突，网站不伪造兼容。",
      },
      {
        time: "13:30–14:05",
        title: "Hyllie → Sky Hotel Malmö City",
        detail:
          "13:30硬离会；乘第一班合适列车回Triangeln/Malmö C，步行去Kaptensgatan 1。",
      },
      {
        time: "14:05–14:20",
        title: "取行李并检查寄存件",
        detail: "不在酒店吃饭；取件后立即去Triangeln。",
      },
      {
        time: "14:20–14:40",
        title: "步行到Triangeln并进站",
        detail:
          "用Skånetrafiken/Øresundståg实时路线；大件行李不跑动追车。",
      },
      {
        time: "目标14:40–15:15",
        title: "Triangeln → Copenhagen Airport",
        detail:
          "选能在15:15前进入Terminal 3的直达跨境列车；开车前48小时再核对施工和边检。",
      },
      {
        time: "15:15–17:20",
        title: "CPH托运、安检与登机口",
        detail:
          "距17:50起飞约2小时35分钟。托运截止和登机时间以航司订单为准；17:20前到登机口。",
      },
      {
        time: "17:50–票面到达",
        title: "CPH → BGO直飞",
        detail:
          "17:50为你已确认的起飞时间；到达时刻、托运截止和登机口只认实际航班订单，不再用估算值伪装成票面时间。",
      },
      {
        time: "落地+0:00–0:45",
        title: "取行李、买Skyss票并进入轻轨站",
        detail: "不在机场吃正餐；看Line 1实时发车。",
      },
      {
        time: "落地+0:45–1:35",
        title: "BGO → Nonneseter / Bergen Station",
        detail: "Bybanen Line 1通常约45分钟；按当晚实际班次执行。",
      },
      {
        time: "落地+1:35–2:00",
        title: "步行入住Bergen Station步行圈酒店",
        detail:
          "只做入住、简餐和洗漱；不去Bryggen夜游。到达晚于票面预期时通知酒店。",
      },
    ],
    transit: [
      {
        mode: "区域列车 + 步行",
        route: "Hyllie会场 → Sky Hotel → Triangeln",
        time: "13:30–14:40",
        duration: "约70分钟含取行李",
        buffer: "13:30硬离会",
        ticket: "Skånetrafiken",
        official: links.skane,
        map: mapRoute("Malmömässan", "Sky Hotel Malmö City"),
      },
      {
        mode: "Øresundståg",
        route: "Triangeln → Copenhagen Airport Terminal 3",
        time: "目标14:40–15:15",
        duration: "列车通常约20–30分钟",
        buffer: "目标比起飞早至少2小时35分钟进航站楼",
        ticket: "Skånetrafiken / Øresundståg",
        official: links.oresund,
        map: mapRoute("Triangeln Station Malmö", "Copenhagen Airport Terminal 3"),
      },
      {
        mode: "已确认直飞",
        route: "CPH → BGO",
        time: "17:50起飞",
        duration: "以实际航班订单为准",
        buffer: "15:15前进航站楼，17:20前到登机口",
        ticket: "已确认的实际航班订单",
        official: links.cphFlights,
        map: mapRoute("Copenhagen Airport", "Bergen Airport"),
      },
      {
        mode: "Bybanen Line 1",
        route: "BGO → Nonneseter / Bergen Station",
        time: "取行李后",
        duration: "约45分钟",
        buffer: "另留取行李、购票和候车时间",
        ticket: "Skyss实际票",
        official: links.bergenAirport,
        map: mapRoute("Bergen Airport", "Bergen Station"),
      },
    ],
    sights: [
      {
        name: "ECCV Final Day",
        why: "只完成本人必须到场的报告、作者与研究交流义务；普通观光不能挤压13:30离会硬截止。",
        ticket: "ECCV注册与本人最终program。",
        tour: "13:20开始收口，13:30离开会场。",
        url: "https://eccv.ecva.net/Conferences/2026/Dates",
        map: mapSearch("Malmömässan"),
      },
    ],
    foods: [
      {
        name: "ECCV会场午餐 / 随身路餐",
        type: "航班日时间保险",
        order: "能在13:20前结束的热食、三明治与水",
        note: "会场餐排队长就用随身路餐；13:20开始收口，13:30必须离会。",
        price: "按ECCV权益或现场价格",
        tier: "€",
        near: "Malmömässan",
        meal: "午餐",
        booking: "不另订餐厅",
        url: "https://eccv.ecva.net/Conferences/2026/Registration",
        image: "/nordic-dubai-field-guide/images/localized/BuffetLunchConference-b48b9466a5.jpg",
        imageSource: "https://commons.wikimedia.org/wiki/File:BuffetLunchConference.jpg",
        imageLabel: "会议自助午餐场景参考；ECCV实际餐食以现场为准",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Malmomassan-5583338035.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Malm%C3%B6m%C3%A4ssan.jpg",
        fallbackImageLabel: "Malmömässan会场实景备用图",
        map: mapSearch("Malmömässan"),
      },
      {
        name: "CPH安检后顺路补给",
        type: "条件式机场热食",
        order: "能随时结束的热食或外带",
        note: "完成托运和安检后再决定；17:20前必须到登机口，不为指定门店跨区。",
        price: "按机场现场价格",
        tier: "€€",
        near: "CPH实际登机口动线",
        meal: "飞行前补给",
        booking: "现场购买",
        url: "https://www.cph.dk/en/practical/food-shopping",
        image: "/nordic-dubai-field-guide/images/localized/Sm-rrebr-d_at_Kastrup_IMG_8275_C-78aa9170bf.jpg",
        imageSource: "https://commons.wikimedia.org/wiki/File:Sm%C3%B8rrebr%C3%B8d_at_Kastrup_IMG_8275_C.JPG",
        imageLabel: "CPH（Kastrup）机场开放式三明治实景参考",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/lagkagehuset-terminal-2-3-d043a09a61.jpg",
        fallbackImageSource: "https://www.cph.dk/en/practical/food-shopping",
        fallbackImageLabel: "CPH航站楼烘焙店实景备用图；实际门店以机场当日目录为准",
        map: mapSearch("Copenhagen Airport Terminal 3"),
      },
    ],
    sources: [
      { label: "ECCV日期", url: "https://eccv.ecva.net/Conferences/2026/Dates", type: "官网" },
      { label: "Sky Hotel Malmö City", url: links.skyHotel, type: "住宿官网" },
      { label: "Øresundståg", url: links.oresund, type: "运营方" },
      { label: "CPH航班", url: links.cphFlights, type: "机场官网" },
      { label: "BGO机场交通", url: links.bergenAirport, type: "公共交通" },
    ],
    visual: { slot: 6, label: "ECCV会场 → Sky Hotel取行李 → CPH 17:50 → Bergen" },
    transport: [
      "17:50 CPH→BGO起飞时间已由你确认；到达时间和航司截载只认票面",
      "13:30是Hyllie离会硬截止；13:30后的强制会议义务与该航班不可同时满足",
      "Sky Hotel在Kaptensgatan 1，必须回市中心取行李，不能按Hyllie酒店计算",
    ],
    timeCheck: {
      status: "17:50起飞已确认；地面链路可执行",
      note:
        "固定硬锚点为13:30离开Hyllie会场、15:15前进入CPH Terminal 3和17:50起飞。BGO到达时刻、托运截止与登机口以实际订单为准；落地后按相对时间轻轨进城。",
    },
    rain: {
      trigger: "会议拖延、跨境列车异常或航班延误",
      title: "13:30仍硬离会，只保留取行李—CPH—BGO",
      detail:
        "航班仍计划17:50起飞时，不因延误预报而晚到机场。跨境列车异常时立即按运营方改线，不加任何会后活动。",
    },
    execution: {
      grade: "B＋｜17:50飞行可执行，但13:30必须离会",
      tone: "caution",
      basis:
        "真实瓶颈不是航班是回Malmö市中心取行李。按13:30离会、15:15前进航站楼计算，可保留约2小时35分钟机场余量。",
      anchors: [
        { time: "13:30", title: "离开Hyllie会场", detail: "不再加会面或午餐。" },
        { time: "14:05–14:20", title: "Sky Hotel取行李", detail: "Kaptensgatan 1。" },
        { time: "15:15前", title: "进入CPH Terminal 3", detail: "托运和安检只认航司截止。" },
        { time: "17:50", title: "CPH→BGO", detail: "到达用票面时间。" },
      ],
      prep: [
        "确认Sky Hotel寄存和14:05前后取件",
        "保存17:50航班、托运截止、登机时间与Bergen酒店订单",
        "前48小时查Øresundståg施工与边检",
      ],
      buffers: [
        { math: "13:30离会→14:20取好行李", result: "50分钟" },
        { math: "14:20离酒店→15:15进CPH", result: "55分钟目标窗口" },
        { math: "15:15进航站楼→17:50起飞", result: "2小时35分钟" },
      ],
      hardCutoff: "13:30离开Hyllie会场；15:15前进CPH Terminal 3；17:20前到登机口。",
      dropOrder: ["13:20后会面", "会后午餐", "全部观光；不删机场余量"],
      recheck: [
        { label: "17:50航班订单", note: "到达、托运、登机口", url: links.cphFlights },
        { label: "Øresundståg", note: "跨境施工和实时运行", url: links.oresund },
        { label: "BGO轻轨", note: "Line 1晚间发车", url: links.bergenAirport },
      ],
      recovery:
        "航班延误也按原机场截止到达；跨境列车异常只按运营方改线。落地晚就通知Bergen酒店，不夜游。",
    },
    backup: {
      trigger: "会议拖延、跨境交通异常或大雨",
      title: "13:30离会—取行李—CPH—17:50飞行直线",
      verdict: "默认备选 · 删除全部会后支线",
      route: [
        { label: "ECCV会场", query: "Malmömässan", note: "13:30离开" },
        { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "取行李" },
        { label: "CPH", query: "Copenhagen Airport Terminal 3", note: "15:15前" },
        { label: "BGO", query: "Bergen Airport", note: "票面到达" },
        { label: "Bergen住宿", query: "Bergen Station", note: "" },
      ],
      timeline: [
        ["13:30", "离开会场", "不再加活动。"],
        ["14:05–14:20", "Sky Hotel取行李", "立即去Triangeln。"],
        ["15:15前", "进CPH", "守住托运与安检。"],
        ["17:50", "飞BGO", "到达以票面为准。"],
        ["落地后", "轻轨进城入住", "不夜游。"],
      ],
      transport: "Hyllie—Malmö市中心—CPH—BGO按实时运行与航班订单执行。",
      meal: "会场早午餐、随身路餐或CPH安检后热食。",
      booking: [
        { label: "Øresundståg", url: links.oresund, note: "检查跨境运行" },
        { label: "17:50航班", url: links.cphFlights, note: "只认实际订单" },
        { label: "Skyss", url: links.bergenAirport, note: "BGO轻轨" },
      ],
      exit: "13:30离会；到Bergen后只入住。",
    },
  },
  sep13: {
    city: "卑尔根 → 沃斯",
    country: "挪威",
    phase: "Bergen完整日与晚间Voss转场",
    stay: "Voss Station / Bus Terminal步行圈 · 1晚",
    title: "一整天看懂卑尔根，再乘18:29列车去沃斯",
    summary:
      "昨晚已住Bergen Station步行圈，今天从Bryggen世界遗产街区、Bryggens Museum考古层与天气良好时的Ulriken高处视角读懂港口。17:15后不再加点，18:10前到站台，18:29–19:49乘R40到Voss。",
    route:
      "Bergen住宿 → Bryggen → Bryggens Museum → Ulriken（条件式）→ Bergen Station取行李/早晚餐 → 18:29 Voss",
    load: "中高 · 世界遗产城市层 + 条件式高视角 + 18:29铁路",
    food: [
      "11:20–12:00在Bryggens Museum—Ulriken顺路轴快速午餐；排队长就用路餐",
      "16:15–17:15在Bergen Station步行圈完成早晚餐；Voss抵达后只补水和次日早餐",
    ],
    social: [
      "Bryggens Museum公共导览和Ulriken缆车是自然交流场景，但不为聊天错过12:30判断",
      "17:15后停止社交和加点，18:10前带行李进入站台区",
    ],
    verified:
      "Bryggens Museum开放、Ulriken运营/接驳与Entur目标日Bergen→Voss时刻已核对；执行前仍按官方公告与实际订单复核。",
    main: [
      { time: "07:30–08:20", title: "早餐、退房与Bergen Station正规寄存", detail: "大件寄存，贵重物、防风层、水和路餐随身。" },
      { time: "08:20–09:40", title: "Bryggen港口立面、公共木仓后巷与码头尺度", detail: "早晨人少时读街区结构；不把鱼市场排队当核心。" },
      { time: "09:40–10:00", title: "Bryggens Museum入场准备", detail: "核对当日开门、门票与官方导览；未开门就继续公共街区。" },
      { time: "10:00–11:20", title: "Bryggens Museum", detail: "用考古遗址和中世纪城市层理解Bryggen；不把重开信息不稳定的其他汉萨建筑写进固定主线。" },
      { time: "11:20–12:00", title: "顺路快速午餐", detail: "鱼汤、鱼饼或已备路餐；12:00无条件离开。" },
      { time: "12:00–12:30", title: "步行至Ulriken Express站并候车", detail: "按官方约每30分钟接驳节奏；天气或能见度不成立就整段删除。" },
      { time: "12:30–13:00", title: "Ulriken Express + 缆车上山", detail: "只在运营、风况和能见度都正常时执行。" },
      { time: "13:00–14:45", title: "Ulriken 643高处视角", detail: "只走站区安全平台与短步道，不做长线徒步。" },
      { time: "14:45–15:45", title: "下山并返回市中心", detail: "接驳错过一班仍有余量，不打车追赶。" },
      { time: "15:45–16:15", title: "回Bergen Station取行李", detail: "16:15前完成取件。" },
      { time: "16:15–17:15", title: "车站附近早晚餐", detail: "只选能在1小时内完成的热食；排队长就用路餐。" },
      { time: "17:15–18:10", title: "进入站台区并核对R40", detail: "查18:29站台与实时公告；不再离站。" },
      { time: "18:29–19:49", title: "Bergen Station → Voss Station（R40）", detail: "Entur当前目标日时刻为18:29–19:49；误车时后续参考20:39–21:56或21:36–22:53，并通知酒店晚到。" },
    ],
    transit: [
      {
        mode: "Ulriken Express + 缆车",
        route: "Torgallmenningen → Ulriken → Bergen中心",
        time: "12:30–15:45条件式",
        duration: "约3小时15分钟",
        buffer: "低云、强风、停运或12:30未能上车即删",
        ticket: "Ulriken官方票",
        official: links.ulriken,
        map: mapRoute("Torgallmenningen Bergen", "Ulriken643"),
      },
      {
        mode: "Vy / R40",
        route: "Bergen Station → Voss Station",
        time: "18:29–19:49",
        duration: "1时20分",
        buffer: "17:15结束用餐；18:10前到站台；前48小时复核",
        ticket: "Vy实际订单",
        official: links.entur,
        map: mapRoute("Bergen Station", "Voss Station"),
      },
    ],
    foods: [
      {
        name: "Bergen顺路快速午餐",
        type: "鱼汤 / 鱼饼 / 路餐",
        order: "能在11:20–12:00完成的一份热食",
        note: "只选Bryggens Museum到Ulriken接驳轴线；12:00离开，不排长队。",
        price: "约100–250 NOK",
        tier: "€–€€",
        near: "Bergen市中心",
        meal: "午餐",
        booking: "当天决定",
        url: "https://en.visitbergen.com/food-and-drink",
        image: "/nordic-dubai-field-guide/images/localized/Fish-soup-at-Sostrene-Hagelin-4b3e9b00a0.jpg",
        imageSource: "https://www.sostrenehagelin.no/",
        imageLabel: "Bergen鱼汤与鱼饼实景参考",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Fish-soup-in-Bergen-8d55dba7b8.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Fish_soup_in_Bergen.jpg",
        fallbackImageLabel: "Bergen鱼汤备用实景",
        map: mapSearch("Bergen city centre food"),
      },
      {
        name: "Bergen Station步行圈早晚餐",
        type: "列车前热食",
        order: "能在一小时内完成的主食与水",
        note: "16:15–17:15执行；17:15无条件结束，排队长就改路餐。",
        price: "约150–350 NOK",
        tier: "€€",
        near: "Bergen Station",
        meal: "早晚餐",
        booking: "不锁不可取消订位",
        url: "https://en.visitbergen.com/food-and-drink",
        image: "/nordic-dubai-field-guide/images/localized/Norwegian.open.sandwich-01-07678aecaf.jpg",
        imageSource: "https://commons.wikimedia.org/wiki/File:Norwegian.open.sandwich-01.jpg",
        imageLabel: "挪威开放式三明治实景参考",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Fish-pie-Cafe-Aura-Bergen-2019-01-b68e42d6ef.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Fish_pie,_Caf%C3%A9_Aura,_Bergen,_2019_(01).jpg",
        fallbackImageLabel: "Bergen热鱼饼餐备用实景",
        map: mapSearch("Bergen Station restaurants"),
      },
      {
        name: "Voss站区次日补给",
        type: "到站后简餐",
        order: "水、面包、水果和9月14日早餐",
        note: "19:49抵达后不再安排正式晚餐；住宿太晚就使用预先准备的路餐。",
        price: "约80–180 NOK",
        tier: "€",
        near: "Voss Station步行圈",
        meal: "晚间补给",
        booking: "现场购买",
        url: "https://www.visitvoss.no/en/restaurants-cafes-bars-voss",
        image: "/nordic-dubai-field-guide/images/localized/Brunost-8e4a029737.jpg",
        imageSource: "https://commons.wikimedia.org/wiki/File:Brunost.jpg",
        imageLabel: "挪威brunost路餐补给实景参考",
        fallbackImage: "/nordic-dubai-field-guide/images/localized/Waffles_and_Coffee_-Unsplash-24463d2560.jpg",
        fallbackImageSource: "https://commons.wikimedia.org/wiki/File:Waffles_and_Coffee_(Unsplash).jpg",
        fallbackImageLabel: "挪威华夫饼与咖啡备用实景",
        map: mapSearch("Voss Station"),
      },
    ],
    sources: [
      { label: "Bryggens Museum", url: links.bryggensMuseum, type: "博物馆官网" },
      { label: "Ulriken", url: links.ulriken, type: "运营方" },
      { label: "Entur", url: links.entur, type: "国家行程规划" },
      { label: "Vy", url: links.vy, type: "铁路" },
    ],
    visual: { slot: 6, label: "Bryggen考古层 · Ulriken高视角 · 18:29 Voss列车" },
    transport: [
      "昨晚已住Bergen，今天没有航班落地风险；主线是一馆、一片世界遗产街区和一处高视角",
      "Ulriken低云或运营异常就删，不用Fløyen填满时间",
      "Bergen→Voss目标班18:29–19:49，后续有20:39与21:36恢复参考",
    ],
    timeCheck: {
      status: "Bergen整日链路与18:29铁路已对齐",
      note:
        "昨晚已抵达Bergen，本日没有航空段。12:30无法开始Ulriken就删除高处支线；17:15结束用餐、18:10前到站台，目标18:29–19:49前往Voss。",
    },
    rain: {
      trigger: "低云、强风、大雨或Ulriken停运",
      title: "删除Ulriken，保留Bryggen + Bryggens Museum + 18:29列车",
      detail: "在市中心加一段室内休息或KODE，不为‘两座山’消耗体力。",
    },
    execution: {
      grade: "A｜整日Bergen核心 + 18:29 Voss转场",
      tone: "good",
      basis: "昨晚已进Bergen，城市文化、高处地形与晚间铁路之间有足够余量。",
      anchors: [
        { time: "10:00–11:20", title: "Bryggens Museum", detail: "开门前先走Bryggen公共街区。" },
        { time: "12:30判断", title: "Ulriken去留", detail: "天气或运营不成立就删。" },
        { time: "18:29–19:49", title: "Bergen→Voss", detail: "18:10前到站台。" },
      ],
      prep: ["Bergen Station寄存、Ulriken、Vy和Voss酒店订单离线保存", "记20:39与21:36后续列车作恢复方案", "防风层、防滑鞋、水和路餐随身"],
      buffers: [
        { math: "14:45开始下山→18:29列车", result: "3小时44分钟" },
        { math: "17:15结束用餐→18:29开车", result: "74分钟" },
      ],
      hardCutoff: "12:30仍未开始Ulriken或天气不成立就删除；17:15结束用餐，18:10前到站台。",
      dropOrder: ["Ulriken", "Bryggen户外加走", "正式餐改路餐；18:29车票不删"],
      recheck: [
        { label: "Bryggens Museum", note: "周日开门与导览", url: links.bryggensMuseum },
        { label: "Ulriken", note: "能见度、风与接驳", url: links.ulriken },
        { label: "Entur/Vy", note: "18:29车次与站台", url: links.entur },
      ],
      recovery: "Ulriken不成立就留在Bergen市中心；误掉18:29时改20:39或21:36并通知Voss酒店。",
    },
    backup: {
      trigger: "低云、强风、大雨或Ulriken停运",
      title: "Bergen文化短轴 + 18:29 Voss列车",
      verdict: "稳妥备选 · 删除Ulriken",
      route: [
        { label: "Bergen住宿", query: "Bergen Station", note: "" },
        { label: "Bryggen", query: "Bryggen Bergen", note: "" },
        { label: "Bryggens Museum", query: "Bryggens Museum", note: "" },
        { label: "Voss", query: "Voss Station", note: "" },
      ],
      timeline: [
        ["08:20后", "Bryggen公共街区", "不在鱼市场排队。"],
        ["10:00–11:20", "Bryggens Museum", "优先考古层。"],
        ["下午", "KODE/室内休息", "不去第二座山。"],
        ["18:10前", "回Bergen Station", "取行李进站。"],
        ["18:29–19:49", "去Voss", "晚点用后续车。"],
      ],
      transport: "Bergen市中心步行→Vy去Voss。",
      meal: "鱼汤/鱼饼或路餐；不为餐厅误车。",
      booking: [
        { label: "Bryggens Museum", url: links.bryggensMuseum, note: "开放" },
        { label: "Entur", url: links.entur, note: "Bergen→Voss" },
      ],
      exit: "18:10前到站台。",
    },
  },
};

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

const commonReplacements = {
  sep03: [
    ["Nordhavn/Østerbro", "Bob W Copenhagen Østerbro"],
    ["Nordhavn Station", "Bob W Copenhagen Østerbro"],
    ["回 Nordhavn", "回 Bob W Østerbro"],
    ["Nordhavn%20Station", "Bob%20W%20Copenhagen%20Osterbro"],
    ["把酒店真实前台坐标替换Nordhavn示例锚点", "确认Bob W门禁码与Teglværksgade 31导航"],
    ["住宿尚未提供，Bob W Copenhagen Østerbro 仅作安全住宿区锚点", "住宿已确认为Bob W Copenhagen Østerbro，地图使用Teglværksgade 31真实地址"],
    ["住宿优先 Østerbro/Nordhavn，24小时前台、距轨道站步行 5–8 分钟", "已确认Bob W Østerbro；提前保存数字门禁码、客服入口和从车站步行路线"],
    ["住 Østerbro/Nordhavn 时顺路", "住 Bob W Østerbro 时仅在顺路且营业时"],
    ["机场到Nordhavn约25–40分钟", "机场到Bob W约25–40分钟"],
    ["只住有24小时前台、离站不超过8分钟的地方；先放行李。", "按Bob W数字门禁入住并先放行李；门禁码和客服入口提前离线保存。"],
    ["航班、酒店和入境耗时尚未提供", "航班抵达与入境耗时尚未提供；Bob W住宿已确认"],
  ],
  sep04: [
    ["Nordhavn/Østerbro", "Bob W Copenhagen Østerbro"],
    ["回Nordhavn选鱼汤或开放三明治", "回Bob W住宿交通线上选鱼汤或开放三明治"],
  ],
  sep05: [["Nordhavn/Østerbro", "Bob W Copenhagen Østerbro"]],
  sep06: [["Nordhavn/Østerbro", "Bob W Copenhagen Østerbro"]],
  sep07: [
    ["Hyllie住宿", "Sky Hotel Malmö City"],
    ["Hyllie酒店", "Sky Hotel Malmö City"],
    ["提前入住Hyllie", "提前入住Sky Hotel Malmö City"],
    ["晚餐到Hyllie后就近吃", "晚餐到Sky Hotel附近就近吃"],
    ["直接跨海去Hyllie", "直接跨海去Malmö C并入住Sky Hotel"],
    ["入住Hyllie会场步行区", "入住Sky Hotel Malmö City"],
    ["Helsingborg C→Hyllie直达列车", "Helsingborg C→Malmö C直达列车"],
    ["再接Öresundståg去Hyllie", "再接Öresundståg去Malmö C"],
    ["首个运行正常的Øresundståg去Hyllie", "首个运行正常的Øresundståg去Malmö C"],
    ["København H—Hyllie", "København H—Malmö C"],
    ["18:30前到Hyllie", "18:30前到Sky Hotel"],
    ["直接去Hyllie", "直接去Malmö C并入住Sky Hotel"],
    ["去Hyllie提前入住", "去Malmö C并提前入住Sky Hotel"],
    ["不再为了错误的Sky Hotel Malmö City多坐两站", "到Malmö C即下车，不要继续坐到Hyllie"],
  ],
  sep08: [
    ["Hyllie住宿", "Sky Hotel Malmö City"],
    ["Hyllie酒店", "Sky Hotel Malmö City"],
    ["5–12分", "25–35分"],
    ["住Hyllie后步行约25–35分钟，按个人首场前30分钟到即可", "从Sky Hotel乘车到会场门到门约25–35分钟，按个人首场前50分钟离店"],
    ["住Hyllie会场步行区，按个人首场前30分钟出门", "住Malmö市中心，按个人首场前50分钟离店"],
    ["全日步行；即使下暴雨也只暴露25–35分钟，带防水电脑内胆。", "步行＋区域列车往返；雨天带防水电脑内胆，并按门到门25–35分钟另留15–20分钟余量。"],
  ],
  sep09: [
    ["Hyllie住宿", "Sky Hotel Malmö City"],
    ["住宿 → Malmömässan", "Sky Hotel Malmö City → Malmömässan"],
    ["5–12分", "25–35分"],
  ],
  sep10: [
    ["Hyllie住宿", "Sky Hotel Malmö City"],
    ["5–12分", "25–35分"],
  ],
  sep11: [
    ["Hyllie住宿", "Sky Hotel Malmö City"],
    ["5–15分", "25–35分"],
    ["21:15前回Hyllie", "21:15前回Sky Hotel"],
  ],
  sep15: [
    ["Otternes历史农庄（公共/已订导览）", "Otternes历史农庄（外部主线 / 导览条件式）"],
    ["Otternes已订导览和官方巴士是低压力交流场景", "只有实际买到Otternes导览票时才加入导览；官方巴士是低压力交流场景"],
  ],
};

export function applyBalancedAuditDay(baseDay, legacyOverride) {
  const auditOverride = {
    ...(overrides[baseDay.id] || {}),
    ...(confirmedFlightCorrections[baseDay.id] || {}),
  };
  const cleanOverride = Object.fromEntries(
    Object.entries(auditOverride).filter(([, value]) => value !== null),
  );
  const merged = { ...baseDay, ...(legacyOverride || {}), ...cleanOverride };
  const audited = replaceDeep(merged, commonReplacements[baseDay.id] || []);

  if (baseDay.id === "sep03" && audited.routeData) {
    const hotelStop = {
      time: "落地+1:30",
      title: "Bob W Copenhagen Østerbro",
      lat: 55.7074866,
      lng: 12.558793,
      local: "Teglværksgade 31",
      address: "Teglværksgade 31, Copenhagen",
      arriveBy: "train",
      leg: "机场 → 住宿约25–40分",
      dwell: "放行李30分",
      task: "按Bob W数字门禁和真实地址入住；门禁码离线保存。",
      ticket: "按Rejseplanen当日路线执行。",
      official: links.bobW,
    };
    const returnStop = {
      ...hotelStop,
      time: "20:00",
      title: "返回 Bob W Copenhagen Østerbro",
      arriveBy: "metro",
      leg: "公交/地铁约25–35分",
      dwell: "结束",
      task: "不再加夜景；次日按官方小巴票面集合时间倒推起床。",
    };
    return {
      ...audited,
      routeData: {
        ...audited.routeData,
        accuracy: "机场、Bob W Teglværksgade 31、景点与餐厅入口均已落点。",
        stops: audited.routeData.stops.map((item, index) =>
          index === 1 ? hotelStop : index === 4 ? returnStop : item,
        ),
      },
    };
  }

  if (baseDay.id === "sep07") {
    return {
      ...audited,
      backup: audited.backup
        ? {
            ...audited.backup,
            route: audited.backup.route.map((item) =>
              item.label === "Hyllie Station"
                ? {
                    ...item,
                    label: "Sky Hotel Malmö City",
                    query: "Sky Hotel Malmö City",
                    url: mapSearch("Sky Hotel Malmö City"),
                  }
                : item,
            ),
          }
        : audited.backup,
    };
  }

  if (baseDay.id === "sep08") {
    return {
      ...audited,
      execution: audited.execution
        ? {
            ...audited.execution,
            grade: "A−｜市中心住宿需乘车通勤；精确program待发布",
          }
        : audited.execution,
    };
  }

  if (baseDay.id === "sep13") {
    return {
      ...audited,
      transit: audited.transit.map((item) =>
        item.route === "Bergen Station → Voss Station"
          ? { ...item, buffer: "17:15前结束用餐；18:10前到站台；前48小时复核" }
          : item,
      ),
      execution: {
        ...audited.execution,
        anchors: audited.execution.anchors.map((item) =>
          item.title === "Bergen→Voss" ? { ...item, detail: "18:10前到站台。" } : item,
        ),
        hardCutoff: "12:30仍未开始Ulriken或天气不成立就删除；17:15结束用餐，18:10前到站台。",
      },
      backup: {
        ...audited.backup,
        timeline: audited.backup.timeline.map((item) =>
          item[1] === "回Bergen Station" ? ["18:10前", item[1], item[2]] : item,
        ),
        exit: "18:10前到站台。",
      },
      routeData: audited.routeData
        ? {
            ...audited.routeData,
            hardStop: "12:30未开始Ulriken就删；17:15结束用餐，18:10前到站台",
            stops: audited.routeData.stops.map((item) =>
              item.title === "Bergen Station"
                ? { ...item, time: "18:10前", task: "取行李、核对站台并留在站内。" }
                : item,
            ),
          }
        : audited.routeData,
    };
  }

  return audited;
}

export function applyBalancedHotels(hotels) {
  return hotels.map((hotel) => {
    if (hotel.city === "哥本哈根") {
      return {
        ...hotel,
        area: "Bob W Copenhagen Østerbro · Teglværksgade 31",
        why: "已确认住宿；靠近Nordhavn一带轨道交通，独立工作室适合连续4晚。",
        return: "按Bob W官方地址导航；机场和København H均用Rejseplanen从门口重算。",
        avoid: "Bob W为数字化自助入住，不要误写成24小时前台；提前保存门禁码和客服入口。",
        examples: "Bob W Copenhagen Østerbro（已确认）",
      };
    }
    if (hotel.city === "马尔默") {
      return {
        ...hotel,
        area: "Sky Hotel Malmö City · Kaptensgatan 1",
        why: "已确认住宿；在Malmö市中心，距Triangeln和Malmö C步行约10–15分钟。",
        return: "去ECCV需步行至Triangeln/Malmö C、乘直达车到Hyllie，再步行入场；单程门到门按25–35分钟。",
        avoid: "不要再按Hyllie会场步行酒店计算，也不要把Hyllie写成取行李地点。",
        examples: "Sky Hotel Malmö City（已确认）",
      };
    }
    if (hotel.city.startsWith("CPH机场")) {
      return {
        ...hotel,
        city: "CPH机场（仅11天会后返程）",
        area: "Terminal 3连廊 / 一站轨道交通",
        why: "11天路线会后从Malmö就近经CPH离境时才考虑；15天线9月12日已直飞BGO，不住CPH机场。",
        return: "从Malmö C/Triangeln乘直达Øresundståg到Terminal 3。",
        avoid: "15天路线不要误加CPH机场晚。",
        examples: "Clarion Hotel Copenhagen Airport / Comfort Hotel Copenhagen Airport / 同级",
      };
    }
    return hotel;
  });
}

export function applyBalancedBookings(bookings) {
  return bookings.map((item) => {
    if (item.id === "hotels") {
      return {
        ...item,
        title: "核对已订Bob W与Sky Hotel；补Bergen/Voss/Flåm/OSL住宿",
        note: "9.03–07 Bob W Østerbro、9.07–12 Sky Hotel Malmö City按现有订单；另订9.12 Bergen 1晚、9.13 Voss 1晚、9.14–16 Flåm 2晚、9.16 OSL机场1晚。",
      };
    }
    if (item.id === "core-flights") {
      return {
        ...item,
        title: "15天核心飞行：9.12 17:50 CPH→BGO",
        note: "17:50起飞已由你确认；把实际到达、托运截止和登机时间写入离线订单。13:30离开Hyllie会场，15:15前进CPH。",
        url: links.cphFlights,
      };
    }
    if (item.id === "fjord") {
      return {
        ...item,
        title: "9.14 Voss巴士＋12:10 Nærøyfjord船",
        note: "目标组合为09:50–10:55官方巴士、12:10–14:10 Gudvangen→Flåm船；同日一起核对后再购。",
      };
    }
    if (item.id === "rail") {
      return {
        ...item,
        title: "9.16 Flåm 08:20 → Myrdal 10:02 → Oslo",
        note: "Flåm→Myrdal 08:20–09:17、F4 10:02–15:05；优先同一Vy订单。Oslo S再乘15:30前后机场车。",
      };
    }
    return item;
  });
}

export function applyBalancedSources(sources) {
  return sources.map((source) => {
    if (source.category === "挪威铁路") {
      return {
        ...source,
        scope: "9.13 Bergen 18:29–19:49→Voss；9.16 Flåm 08:20→Myrdal 10:02→Oslo 15:05",
        status: "已按Entur/运营方目标日查询；前48小时再查",
      };
    }
    if (source.category === "峡湾运营方") {
      return {
        ...source,
        scope: "9.14 Voss 09:50→Gudvangen 10:55；12:10→14:10 Nærøyfjord船",
        status: "2026年9月官方时刻已对齐；前48小时复核",
      };
    }
    return source;
  });
}

const finalizeCoreDay = (day) => {
  let audited = replaceDeep(day, commonReplacements[day.id] || []);
  if (["sep12", "sep13", "sep14", "sep15"].includes(day.id)) {
    audited = { ...audited, freeTime: [] };
  }
  if (day.id === "sep03") {
    audited = {
      ...audited,
      freeTime: [
        {
          window: "20:00前已回Bob W且体力正常",
          title: "在住宿内整理Møns订单与路餐",
          detail: "不再出门；把9月4日官方小巴的实际集合点、二维码、防雨层、水和路餐一次整理好。",
          how: "在Bob W房内完成，不新增交通。",
          cutoff: "21:30前休息；第二天只按官方小巴票面时间出发。",
        },
      ],
    };
  }
  if (day.id === "sep12") {
    audited = { ...audited, bookingUrl: links.cphFlights };
  }
  if (["sep03", "sep04", "sep05", "sep06"].includes(day.id)) {
    audited = replaceDeep(audited, [
      ["Nordhavn Station Copenhagen", "Bob W Copenhagen Østerbro"],
      ["Nordhavn%20Station%20Copenhagen", "Bob%20W%20Copenhagen%20Osterbro"],
    ]);
  }

  if (day.id === "sep03") {
    const hotelStop = {
      time: "落地+1:30",
      title: "Bob W Copenhagen Østerbro",
      lat: 55.7074866,
      lng: 12.558793,
      local: "Teglværksgade 31",
      address: "Teglværksgade 31, Copenhagen",
      arriveBy: "train",
      leg: "机场 → 住宿约25–40分",
      dwell: "放行李30分",
      task: "按Bob W数字门禁和真实地址入住；门禁码离线保存。",
      ticket: "按Rejseplanen当日路线执行。",
      official: links.bobW,
    };
    const returnStop = {
      ...hotelStop,
      time: "20:00",
      title: "返回 Bob W Copenhagen Østerbro",
      arriveBy: "metro",
      leg: "公交/地铁约25–35分",
      dwell: "结束",
      task: "不再加夜景；次日按官方小巴票面集合时间倒推起床。",
    };
    return {
      ...audited,
      routeData: audited.routeData
        ? {
            ...audited.routeData,
            accuracy: "机场、Bob W Teglværksgade 31、景点与餐厅入口均已落点。",
            stops: audited.routeData.stops.map((item, index) =>
              index === 1 ? hotelStop : index === 4 ? returnStop : item,
            ),
          }
        : audited.routeData,
    };
  }

  if (day.id === "sep07") {
    const cleaned = replaceDeep(audited, [
      ["9月8日住会场步行区的原则", "9月8日从Malmö市中心通勤的现实"],
      ["早晚跨境—Hyllie入住", "早晚跨境—Malmö市中心入住"],
    ]);
    return {
      ...cleaned,
      backup: cleaned.backup
        ? {
            ...cleaned.backup,
            route: cleaned.backup.route.map((item) =>
              item.label === "哥本哈根住宿"
                ? {
                    ...item,
                    query: "Bob W Copenhagen Østerbro",
                    url: mapSearch("Bob W Copenhagen Østerbro"),
                  }
                : item.label === "Hyllie Station"
                ? {
                    ...item,
                    label: "Sky Hotel Malmö City",
                    query: "Sky Hotel Malmö City",
                    url: mapSearch("Sky Hotel Malmö City"),
                  }
                : item.label === "酒店" && item.query === "Malmö Arena Hotel"
                  ? {
                      ...item,
                      label: "Sky Hotel Malmö City",
                      query: "Sky Hotel Malmö City",
                      url: mapSearch("Sky Hotel Malmö City"),
                    }
                  : item,
            ),
            timeline: cleaned.backup.timeline.map((item) =>
              item[1] === "入住、会务材料整理、就近晚餐"
                ? [item[0], item[1], "9月8日上午按首场前50分钟离店通勤，不把住宿当成会场步行区。"]
                : item,
            ),
            meal: "午餐150–300 DKK；晚餐在Sky Hotel或Triangeln/Malmö C步行轴上解决，不再绕去Emporia。",
          }
        : cleaned.backup,
    };
  }

  if (["sep08", "sep09", "sep10", "sep11"].includes(day.id)) {
    const conferenceCorrections = {
      sep08: [
        ["住Hyllie后步行约25–35分钟", "从Sky Hotel乘车到会场门到门约25–35分钟"],
        ["酒店步行25–35分 + 提前30分", "酒店到会场25–35分 + 提前20–30分"],
        ["酒店到会场步行不依赖公交。", "酒店到会场需步行＋区域列车；"],
        ["住Hyllie或Bullen晚餐", "保留Hyllie车站或Sky Hotel附近晚餐"],
      ],
      sep09: [
        ["返Hyllie", "回Sky Hotel"],
        ["在Hyllie/住宿附近吃", "在Triangeln/Sky Hotel附近吃"],
        ["18:50离馆 → 21:00前回Hyllie", "18:50离馆 → 21:00前回Sky Hotel"],
      ],
      sep10: [
        ["酒店—会场步行", "酒店—车站—会场（步行＋区域列车）"],
        ["直接去Hyllie吃", "乘车回Sky Hotel附近吃"],
      ],
      sep11: [
        ["以会场步行为主", "酒店往返会场为步行＋区域列车"],
        ["回到Hyllie", "回到Sky Hotel"],
        ["21:15前回Hyllie", "21:15前回Sky Hotel"],
        ["Malmö C/Triangeln→Hyllie 3–7分", "Hyllie→Malmö C/Triangeln列车3–7分，随后步行回Sky Hotel"],
        ["查Triangeln/Malmö C→Hyllie", "查Hyllie→Triangeln/Malmö C与步行回酒店路线"],
        ["把晚餐改到 Malmö C / Hyllie", "把晚餐改到 Malmö C / Sky Hotel"],
      ],
    };
    const correctedDay = replaceDeep(audited, conferenceCorrections[day.id]);
    const backupByDay = {
      sep08: {
        trigger: "全天暴雨、官方社交未确认，或Workshop结束晚于18:00",
        title: "会议闭环版：Sky Hotel—Hyllie会场—市中心住宿",
        verdict: "会议优先 · 保住第一天精力",
        route: [
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
          { label: "Malmömässan", query: "Malmömässan", note: "" },
          { label: "Hyllie车站餐饮", query: "Hyllie Station restaurants", note: "仅条件式" },
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
        ],
        timeline: [
          ["首场前50分", "离店并乘车去会场", "目标首场前20–30分钟入场。"],
          ["上午–下午", "完整参会", "茶歇认识2人，不为景点提前离场。"],
          ["官方结束后", "条件式Hyllie快餐或直接返回", "只选车站步行轴，不增加跨城支线。"],
          ["21:00前", "回Sky Hotel", "给最重要联系人发带上下文的跟进。"],
        ],
        transport: "Sky Hotel→Triangeln/Malmö C→Hyllie→会场，单程门到门25–35分钟，另留15–20分钟余量。",
        meal: "会议餐、Hyllie车站快餐或Sky Hotel附近简餐。",
        exit: "没有书面确认的官方活动就不等候，默认乘车回Sky Hotel。",
      },
      sep09: {
        trigger: "17:10仍未离开会场、Konsthall临时闭馆，或天气不适合步行",
        title: "删除美术馆：会议—Triangeln晚餐—Sky Hotel",
        verdict: "会议优先 · 晚餐顺返程轨道轴",
        route: [
          { label: "Malmömässan", query: "Malmömässan", note: "" },
          { label: "Triangeln", query: "Triangeln Station Malmö", note: "" },
          { label: "晚餐", query: "Möllans Falafel Malmö", note: "" },
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
        ],
        timeline: [
          ["首场前50分", "Sky Hotel出发", "继续前一日研究线。"],
          ["全天", "Workshop/Tutorial", "不为19:00闭馆提前离场。"],
          ["17:10硬判断", "删除Konsthall", "只要还在会场就立即切换。"],
          ["官方结束后", "列车到Triangeln", "候车和步行一起计入。"],
          ["18:30–19:45", "马尔默falafel或Skåne家常菜", "无订位选快餐，不为餐厅绕路。"],
          ["20:30前", "步行回Sky Hotel", "走明亮主路。"],
        ],
        transport: "Hyllie→Triangeln列车约3分钟，但门到门仍按20–30分钟；晚餐后步行回Kaptensgatan 1。",
        meal: "€ Möllans Falafel；有订位才选正式餐厅。",
        exit: "20:10还未入座就放弃正式餐，买快餐后直接回Sky Hotel。",
      },
      sep10: {
        trigger: "19:00 social未确认/满员，或主会拖延",
        title: "主会完整参加＋返程轨道轴晚餐",
        verdict: "不把候补活动当已获得名额",
        route: [
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
          { label: "Malmö Arena", query: "Malmö Arena", note: "" },
          { label: "晚餐", query: "Bullen Malmö", note: "有订位才去" },
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
        ],
        timeline: [
          ["首场前50分", "Sky Hotel出发", "到场后核对最终program。"],
          ["上午–下午", "完整主会", "展示义务前45分钟停止逛展。"],
          ["18:30硬判断", "无social确认就去顺路晚餐", "不在门外等候补。"],
          ["21:30前", "回Sky Hotel", "记录3位联系人与承诺资料。"],
        ],
        transport: "Sky Hotel到会场门到门25–35分钟；去市中心晚餐只选Triangeln/Malmö C返程轴。",
        meal: "会场/快餐；有订位才选Bullen；有social则随官方安排。",
        exit: "21:00才结束主会就乘车回Sky Hotel附近快餐。",
      },
      sep11: {
        trigger: "Lyran/Ruths无位、同行口味不统一，或暴雨",
        title: "主会＋Malmö C/Sky Hotel返程分食方案",
        verdict: "多价位、无需统一点餐、返程直观",
        route: [
          { label: "Malmö Arena", query: "Malmö Arena", note: "" },
          { label: "Malmö Saluhall", query: "Malmö Saluhall", note: "开放时才去" },
          { label: "Malmö C", query: "Malmö Central Station", note: "" },
          { label: "Sky Hotel", query: "Sky Hotel Malmö City", note: "" },
        ],
        timeline: [
          ["首场前50分", "Sky Hotel出发与展示检查", "海报/口头报告当天最高优先。"],
          ["上午–下午", "主会＋条件式Expo", "只在无核心冲突时逛展。"],
          ["官方结束后", "乘车到Malmö C/市中心", "天气差就直接回Sky Hotel附近。"],
          ["18:45–20:00", "市场分食或顺路晚餐", "出发前先看当日闭店时间。"],
          ["20:30前", "步行回Sky Hotel", "保留会后跟进时间。"],
        ],
        transport: "Hyllie至Malmö C列车约7分钟；会场到Sky Hotel整体门到门仍按25–35分钟。",
        meal: "€面包/熟食；€€鱼类/热菜；市场早关就回Sky Hotel附近。",
        exit: "出发前发现目标摊位已关，就直接回Sky Hotel附近吃。",
      },
    };
    const backup = {
      ...backupByDay[day.id],
      route: backupByDay[day.id].route.map((item) => ({
        ...item,
        url: mapSearch(item.query),
      })),
      booking: correctedDay.backup?.booking || [],
    };
    return {
      ...correctedDay,
      execution: correctedDay.execution
        ? {
            ...correctedDay.execution,
            grade:
              day.id === "sep08"
                ? "A−｜市中心住宿需乘车通勤；精确program待发布"
                : correctedDay.execution.grade,
          }
        : correctedDay.execution,
      backup,
    };
  }

  if (day.id === "sep13") {
    return {
      ...audited,
      transit: audited.transit.map((item) =>
        item.route === "Bergen Station → Voss Station"
          ? { ...item, buffer: "17:15前结束用餐；18:10前到站台；前48小时复核" }
          : item,
      ),
      execution: {
        ...audited.execution,
        anchors: audited.execution.anchors.map((item) =>
          item.title === "Bergen→Voss" ? { ...item, detail: "18:10前到站台。" } : item,
        ),
        hardCutoff: "12:30仍未开始Ulriken或天气不成立就删除；17:15结束用餐，18:10前到站台。",
      },
      backup: audited.backup
        ? {
            ...audited.backup,
            timeline: audited.backup.timeline.map((item) =>
              item[1] === "回Bergen Station" ? ["18:10前", item[1], item[2]] : item,
            ),
            exit: "18:10前到站台。",
          }
        : audited.backup,
      routeData: audited.routeData
        ? {
            ...audited.routeData,
            hardStop: "12:30未开始Ulriken就删；17:15结束用餐，18:10前到站台",
            stops: audited.routeData.stops.map((item) =>
              item.title === "Bergen Station"
                ? { ...item, time: "18:10前", task: "取行李、核对站台并留在站内。" }
                : item,
            ),
          }
        : audited.routeData,
    };
  }

  return audited;
};

export function applyBalancedPlanAudit(plans) {
  return plans.map((plan) => {
    if (plan.id !== "core") return plan;
    const cleaned = replaceDeep(plan, [
      ["Malmö Hyllie 5晚", "Sky Hotel Malmö City 5晚"],
      ["Malmö Hyllie", "Sky Hotel Malmö City"],
      ["Hyllie住宿", "Sky Hotel Malmö City"],
      ["Hyllie酒店", "Sky Hotel Malmö City"],
      ["住进Hyllie", "住进Sky Hotel Malmö City"],
      ["9月12日晚间直飞", "9月12日17:50直飞"],
      ["9月12日CPH→BGO", "9月12日17:50 CPH→BGO"],
    ]);
    return {
      ...cleaned,
      days: cleaned.days.map(finalizeCoreDay),
      groups: [
        ["哥本哈根与西兰", "D1–5"],
        ["Malmö · ECCV", "D6–10"],
        ["Bergen / Nærøyfjord / Aurlandsfjord", "D11–13"],
        ["Bergen Line→OSL", "D14"],
        ["OSL开口程返沪", "D15"],
      ],
      decision: {
        ...cleaned.decision,
        recommendation:
          "最佳版本：均衡深度。9月12日守住13:30离会和17:50飞行两个硬锚点，当晚住Bergen；9月13日完整看Bergen核心，再把两天留给UNESCO Nærøyfjord与Aurlandsfjord高差。",
        lodging:
          "Bob W Copenhagen Østerbro 4晚＋Sky Hotel Malmö City 5晚＋Bergen 1晚＋Voss 1晚＋Flåm 2晚＋OSL机场1晚。",
        transfer:
          "高：9月12日13:30离会、回市中心取行李、15:15前进CPH与17:50直飞；9月13日18:29铁路；9月14日09:50巴士＋12:10船；9月15日两段官方接驳；9月16日08:20＋10:02铁路。",
        weather:
          "中：Ulriken和Stegastein都是可独立删除项；Nærøyfjord船异常只走运营方改签，铁路段用联程与机场酒店吸收波动。",
        booking:
          "先核对已订Bob W、Sky Hotel与9月12日17:50航班；补Bergen、Voss、Flåm两晚与OSL机场住宿。交通核对：18:29 Bergen→Voss、9月14日09:50巴士＋12:10船、9月15日接驳、9月16日Flåm→Oslo联程。",
      },
    };
  });
}

export const balancedAuditOverrides = overrides;
