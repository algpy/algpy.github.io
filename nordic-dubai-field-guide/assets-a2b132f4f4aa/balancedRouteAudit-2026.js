const stop = (time, title, lat, lng, extra = {}) => ({ time, title, lat, lng, ...extra });

const baseBalancedRouteAudit = {
  sep07: {
    scope: "Bob W Østerbro退房 → Helsingør双核心 → Malmö市中心真实酒店",
    walking: "约7–9 km；行李只在车站、轮渡和入住段随身",
    hardStop: "15:25回Helsingør Station取行李；跨海后在Malmö C下车",
    reservation: "Kronborg票；Helsingør行李柜；轮渡与Öresundståg当天票",
    accuracy: "住宿、车站、场馆、码头和Sky Hotel均为真实入口；柜满就删景点直达Malmö。",
    stops: [
      stop("07:00", "Bob W Copenhagen Østerbro", 55.7074866, 12.558793, {
        local: "Teglværksgade 31",
        dwell: "退房",
        task: "门禁码、自助退房和行李检查。",
      }),
      stop("07:45前", "København H", 55.67273, 12.56465, {
        arriveBy: "transit",
        leg: "按Rejseplanen约20–30分",
        task: "看站台，乘区域列车。",
      }),
      stop("08:40", "Helsingør Station行李柜", 56.03451, 12.61472, {
        arriveBy: "train",
        leg: "45–55分",
        dwell: "25分",
        task: "柜满直接跨海，不拖箱游览。",
      }),
      stop("10:00", "Kronborg Castle", 56.03903, 12.62116, {
        arriveBy: "walk",
        dwell: "2时25分",
        task: "12:25收口。",
      }),
      stop("13:40", "Øresund Aquarium", 56.03965, 12.61426, {
        arriveBy: "walk",
        dwell: "70分",
        task: "14:50离馆。",
      }),
      stop("15:55后", "Helsingør Ferry Terminal", 56.03298, 12.61495, {
        arriveBy: "walk",
        leg: "先取行李",
        task: "乘下一班可登船航次。",
      }),
      stop("到港后", "Helsingborg C", 56.0443, 12.6945, {
        arriveBy: "ferry",
        leg: "约20分",
        task: "转直达Malmö C列车。",
      }),
      stop("约50–65分后", "Malmö C", 55.60925, 13.00084, {
        arriveBy: "train",
        task: "不要继续坐到Hyllie。",
      }),
      stop("抵达后15–20分", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        arriveBy: "walk",
        local: "Kaptensgatan 1",
        task: "入住并确认会议通勤。",
      }),
    ],
  },
  sep08: conferenceRoute("9.08", "Workshop / Tutorial Day 1"),
  sep09: {
    ...conferenceRoute("9.09", "Workshop / Tutorial Day 2"),
    scope: "Sky Hotel → Hyllie会场 → 条件式Malmö Konsthall → Sky Hotel",
    hardStop: "17:15仍未离会场就删除Konsthall；18:50离馆",
    stops: [
      ...conferenceRoute("9.09", "Workshop / Tutorial Day 2").stops.slice(0, -1),
      stop("17:30条件式", "Malmö Konsthall", 55.59586, 13.00672, {
        arriveBy: "train",
        leg: "Hyllie→Triangeln约3分＋步行",
        dwell: "80分",
        task: "18:50离馆。",
      }),
      stop("20:30前", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        arriveBy: "walk",
        task: "Triangeln附近晚餐后步行回Kaptensgatan 1。",
      }),
    ],
  },
  sep10: conferenceRoute("9.10", "ECCV Main Conference Day 1"),
  sep11: conferenceRoute("9.11", "ECCV Main Conference Day 2"),
  sep12: {
    scope: "ECCV最终日 → Malmö市中心取行李 → CPH机场酒店",
    walking: "约3–5 km；会场和跨境各一段列车",
    hardStop: "本人最终义务结束后不加活动；取行李直达CPH",
    reservation: "CPH机场酒店；次日实际航班；跨境车票",
    accuracy: "Sky Hotel在Kaptensgatan 1；周六晚间直飞不写入路线。",
    stops: [
      stop("07:00", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        local: "Kaptensgatan 1",
        task: "退房寄存。",
      }),
      stop("首场前50分", "Malmömässan / Malmö Arena", 55.5670501, 12.9773717, {
        arriveBy: "train",
        leg: "Triangeln/Malmö C→Hyllie",
        dwell: "以最终program为准",
        task: "本人义务结束即离场。",
      }),
      stop("义务结束后+0:40内", "Sky Hotel取行李", 55.6009917, 13.0040424, {
        arriveBy: "train",
        task: "不加晚餐。",
      }),
      stop("取件后", "Triangeln / Malmö C", 55.5953, 13.0014, {
        arriveBy: "walk",
        task: "选第一班合适直达CPH列车。",
      }),
      stop("进站后+0:45内", "Copenhagen Airport Terminal 3", 55.63028, 12.64955, {
        arriveBy: "train",
        leg: "约20–35分",
        task: "步行去机场酒店。",
      }),
      stop("抵达后15–30分", "CPH机场酒店区", 55.62912, 12.65137, {
        arriveBy: "walk",
        task: "订房后替换为真实前台坐标。",
      }),
    ],
  },
  sep13: {
    scope: "CPH早班参考直飞 → Bergen文化与高处视角 → 18:29 Voss列车",
    walking: "约5–7 km；Ulriken只走站区短段",
    hardStop: "14:00未开始Ulriken就删；17:40前进入Bergen Station",
    reservation: "实际CPH→BGO直飞；Ulriken条件票；18:29 Bergen→Voss；Voss住宿",
    accuracy: "航班为当前可行参考；Bergen地面点、Ulriken与Voss车站为真实锚点。",
    stops: [
      stop("06:20", "Copenhagen Airport Terminal 3", 55.63028, 12.64955, {
        arriveBy: "walk",
        task: "按实际航班托运安检。",
      }),
      stop("当前参考09:40", "Bergen Airport", 60.2965332, 5.2198177, {
        arriveBy: "flight",
        task: "取行李、买Skyss票。",
      }),
      stop("11:20", "Bergen Station寄存", 60.3903, 5.3334, {
        arriveBy: "tram",
        leg: "Bybanen约45分",
        task: "贵重物随身。",
      }),
      stop("12:40", "Bryggens Museum", 60.3983664, 5.3228055, {
        arriveBy: "walk",
        dwell: "60分",
        task: "Schøtstuene不列主线。",
      }),
      stop("14:00", "Ulriken Express / lower station", 60.3674, 5.3656, {
        arriveBy: "shuttle",
        task: "天气或进度不成立即删。",
      }),
      stop("14:30", "Ulriken 643", 60.3774, 5.381, {
        arriveBy: "cable_car",
        dwell: "75分",
        task: "只走站区。",
      }),
      stop("17:40前", "Bergen Station", 60.3903, 5.3334, {
        arriveBy: "shuttle",
        task: "取行李进站。",
      }),
      stop("18:29–19:49", "Voss Station", 60.6291046, 6.4101148, {
        arriveBy: "train",
        leg: "R40",
        task: "步行入住。",
      }),
    ],
  },
  sep14: {
    scope: "09:50官方巴士 → 12:10 Nærøyfjord船 → Flåm连住",
    walking: "约1–3 km；大件随巴士和船",
    hardStop: "09:20到Stop A；11:50回票面码头",
    reservation: "09:50 VY456 + 12:10 Gudvangen→Flåm船 + Flåm住宿",
    accuracy: "Stop A、Stop H和两端码头均为官方节点；时刻按2026年9月表。",
    stops: [
      stop("09:20", "Voss Bus Terminal Stop A", 60.6291046, 6.4101148, {
        task: "核对VY456 / Norway’s Best。",
      }),
      stop("10:55", "Gudvangen Stop H", 60.8814484, 6.8414416, {
        arriveBy: "bus",
        leg: "09:50–10:55",
        task: "先认码头。",
      }),
      stop("11:50", "Gudvangen Ferry Terminal", 60.8814484, 6.8414416, {
        arriveBy: "walk",
        task: "停止午餐，准备登船。",
      }),
      stop("12:10–14:10", "Nærøyfjord cruise", 60.9052, 6.916, {
        arriveBy: "ferry",
        dwell: "2小时",
        task: "外甲板风冷时回舱。",
      }),
      stop("14:10", "Flåm Ferry Terminal / Station", 60.8629525, 7.1131783, {
        arriveBy: "ferry",
        task: "步行入住，Museum条件式。",
      }),
    ],
  },
  sep15: {
    scope: "09:30 Flåm接驳 → Otternes → Aurland → 14:15 Stegastein → 15:35 Flåm",
    walking: "约4–6 km；Otternes上下各500米较陡",
    hardStop: "12:10开始下坡；13:55到Aurland Stop F",
    reservation: "09:30/12:35接驳；Otternes 10:00导览（若参加）；14:15 Stegastein",
    accuracy: "Flåm、Otternes、Aurland、Stegastein按2026年9月运营表；农庄坐标为真实入口。",
    stops: [
      stop("09:15", "Flåm shuttle stop", 60.8629525, 7.1131783, {
        task: "09:30发车。",
      }),
      stop("09:35", "Otternes bus stop", 60.8738, 7.1457, {
        arriveBy: "bus",
        task: "步行500米较陡上坡。",
      }),
      stop("10:00–11:00", "Otternes Bygdetun", 60.8754798, 7.1489584, {
        arriveBy: "walk",
        dwell: "60分",
        task: "进入建筑需导览票。",
      }),
      stop("12:35", "Otternes bus stop", 60.8738, 7.1457, {
        arriveBy: "walk",
        task: "12:10开始下坡。",
      }),
      stop("12:44", "Aurland Stop F / Church", 60.9054, 7.1873, {
        arriveBy: "bus",
        dwell: "午餐至13:55",
        task: "14:15 Stegastein签到。",
      }),
      stop("14:30–14:50", "Stegastein Viewpoint", 60.9086345, 7.2117732, {
        arriveBy: "bus",
        dwell: "20分",
        task: "低云即删。",
      }),
      stop("15:35", "Flåm Station", 60.8629525, 7.1131783, {
        arriveBy: "bus",
        task: "补给并准备铁路日。",
      }),
    ],
  },
  sep16: {
    scope: "08:20 Flåm Railway → 10:02 F4 → 15:30机场快线 → OSL酒店",
    walking: "约1–2 km；两次同站换乘",
    hardStop: "08:05前到Flåm站；Myrdal和Oslo S都不离站",
    reservation: "Flåm→Oslo同一Vy联程；Oslo S→OSL；OSL机场酒店",
    accuracy: "Flåm、Myrdal、Oslo S、OSL均为真实站点；时刻按2026-09-16 Entur查询。",
    stops: [
      stop("08:05", "Flåm Station", 60.8629525, 7.1131783, {
        task: "看站屏。",
      }),
      stop("09:17", "Myrdal Station", 60.7351714, 7.1228288, {
        arriveBy: "train",
        leg: "08:20–09:17",
        dwell: "45分",
        task: "同站换乘，不离站。",
      }),
      stop("15:05", "Oslo S", 59.9110251, 10.7531379, {
        arriveBy: "train",
        leg: "F4 10:02–15:05",
        dwell: "25分",
        task: "转15:30 FLY2；错过乘下一班。",
      }),
      stop("15:49", "Oslo lufthavn", 60.1931498, 11.0968156, {
        arriveBy: "train",
        leg: "15:30–15:49",
        task: "步行入住。",
      }),
      stop("16:20", "OSL机场酒店区", 60.1937, 11.1005, {
        arriveBy: "walk",
        task: "订房后替换为真实前台坐标。",
      }),
    ],
  },
};

function conferenceRoute(date, title) {
  return {
    scope: `Sky Hotel Malmö City → Hyllie会场 → ${title} → Sky Hotel`,
    walking: "约3–5 km；另有市内区域列车往返",
    hardStop: "个人首场前50分钟离店；晚间保留至少两班返程",
    reservation: "ECCV注册；Skånetrafiken票",
    accuracy: "Sky Hotel、Triangeln/Malmö C、Hyllie和会场均为真实节点。",
    stops: [
      stop("首场前50分", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        local: "Kaptensgatan 1",
        task: "步行至Triangeln/Malmö C。",
      }),
      stop("约10–15分后", "Triangeln / Malmö C", 55.5953, 13.0014, {
        arriveBy: "walk",
        task: "乘直达Hyllie列车。",
      }),
      stop("首场前25–30分", "Hyllie Station", 55.5648, 12.9765, {
        arriveBy: "train",
        leg: "约3–7分",
        task: "步行入会场。",
      }),
      stop("首场前20分", "Malmömässan / Malmö Arena", 55.5670501, 12.9773717, {
        arriveBy: "walk",
        dwell: "以最终program为准",
        task: title,
      }),
      stop("活动结束后", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        arriveBy: "train",
        task: "从Triangeln/Malmö C步行回Kaptensgatan 1。",
      }),
    ],
  };
}

const confirmedFlightRouteAudit = {
  sep12: {
    scope: "ECCV最终日 → Malmö市中心取行李 → CPH 17:50直飞 → Bergen住宿",
    walking: "约4–6 km；会场、跨境和BGO进城各一段公交",
    hardStop: "13:30离开Hyllie会场；15:15前进CPH Terminal 3；17:20前到登机口",
    reservation: "17:50实际航班；Bergen Station步行圈住宿；跨境列车票",
    accuracy: "Sky Hotel为Kaptensgatan 1真实地址；17:50起飞由用户的实际航班确认。",
    stops: [
      stop("07:00", "Sky Hotel Malmö City", 55.6009917, 13.0040424, {
        local: "Kaptensgatan 1",
        task: "退房寄存，护照和电脑随身。",
      }),
      stop("13:30", "Malmömässan / Malmö Arena", 55.5670501, 12.9773717, {
        arriveBy: "train",
        dwell: "以最终program为准",
        task: "13:30硬离会。",
      }),
      stop("14:05–14:20", "Sky Hotel取行李", 55.6009917, 13.0040424, {
        arriveBy: "train",
        task: "取件后立即去Triangeln。",
      }),
      stop("14:40前", "Triangeln Station", 55.5953, 13.0014, {
        arriveBy: "walk",
        task: "乘能在15:15前到CPH的直达车。",
      }),
      stop("15:15前", "Copenhagen Airport Terminal 3", 55.63028, 12.64955, {
        arriveBy: "train",
        task: "托运、安检；17:20前到登机口。",
      }),
      stop("17:50", "CPH → BGO", 55.6181, 12.656, {
        arriveBy: "flight",
        leg: "约1小时20–25分钟",
        task: "到达时间以票面为准。",
      }),
      stop("票面到达", "Bergen Airport", 60.2965332, 5.2198177, {
        arriveBy: "flight",
        task: "取行李、买Skyss票。",
      }),
      stop("落地+1:35–2:00", "Bergen Station步行圈住宿", 60.3903, 5.3334, {
        arriveBy: "tram",
        leg: "Bybanen Line 1约45分钟",
        task: "入住后不夜游。",
      }),
    ],
  },
  sep13: {
    scope: "Bergen整日文化与高处视角 → 18:29 Voss列车",
    walking: "约6–8 km；Ulriken只走站区短段",
    hardStop: "12:30未开始Ulriken就删；17:15结束用餐，18:10前到站台",
    reservation: "Bryggens Museum；Ulriken条件票；18:29 Bergen→Voss；Voss住宿",
    accuracy: "Bergen住宿、Bryggen、Bryggens Museum、Ulriken与Voss车站为真实锚点。",
    stops: [
      stop("07:30", "Bergen Station步行圈住宿", 60.3903, 5.3334, {
        task: "退房，在Bergen Station寄存大件。",
      }),
      stop("08:20", "Bryggen", 60.39723, 5.3248, {
        arriveBy: "walk",
        dwell: "80分钟",
        task: "公共木仓后巷与码头尺度。",
      }),
      stop("10:00–11:20", "Bryggens Museum", 60.3983664, 5.3228055, {
        arriveBy: "walk",
        dwell: "80分钟",
        task: "优先考古遗址与中世纪城市层。",
      }),
      stop("12:30", "Ulriken Express / lower station", 60.3674, 5.3656, {
        arriveBy: "shuttle",
        task: "天气或进度不成立即删。",
      }),
      stop("13:00–14:45", "Ulriken 643", 60.3774, 5.381, {
        arriveBy: "cable_car",
        dwell: "105分钟",
        task: "只走站区与短步道。",
      }),
      stop("18:10前", "Bergen Station", 60.3903, 5.3334, {
        arriveBy: "shuttle",
        task: "取行李、核对站台并留在站内。",
      }),
      stop("18:29–19:49", "Voss Station", 60.6291046, 6.4101148, {
        arriveBy: "train",
        leg: "R40",
        task: "步行入住。",
      }),
    ],
  },
};

export const balancedRouteAudit = {
  ...baseBalancedRouteAudit,
  ...confirmedFlightRouteAudit,
};
