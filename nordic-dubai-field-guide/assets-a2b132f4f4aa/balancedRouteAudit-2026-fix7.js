import { balancedRouteAudit as balancedRouteAuditBase } from "./balancedRouteAudit-2026-fix6.js";

const thaiScheduleUrl = "https://www.thaiairways.com/en-us/plan-trip/flight-schedule/";
const storeRingheimUrl = "https://storeringheim.no/en/transport-to-the-hotel/";
const storeRingheimName = "Store Ringheim Hotel og Restaurant";
const storeRingheimAddress = "Mølstervegen 44, 5705 Voss";

const patchFlightArrival = (route) => ({
  ...route,
  scope:
    "9.02 PVG T2 17:25 → BKK国际转机 → 9.03 CPH T3 07:40 → Bob W → Cisternerne（条件式）→ Absalon",
  hardStop:
    "9.02 14:25前到PVG T2；BKK跟随International Transfer；9.03 15:20仍不能进Cisternerne就删除",
  reservation:
    "已确认泰航PVG→BKK→CPH联程；Bob W订单；Absalon晚餐；Cisternerne仅条件式购买",
  accuracy:
    "去程机场与航站楼已按订单锁定；BKK登机口、行李直挂和实际到达只认航司App、登机牌与机场屏幕。",
  stops: route.stops.map((stop, index) =>
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
            "按申根入境标识办理边检并取行李；到达后先补水、整理网络与交通票，再前往Bob W。",
          ticket:
            "PVG值机时确认两段登机牌与行李直挂标签；BKK只按International Transfer标识和航司指引换乘。",
          official: thaiScheduleUrl,
        }
      : stop,
  ),
});

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
    "下车后在事先与酒店约定的集合点等免费接送；若酒店未确认，立即改乘Voss Taxi。",
  ticket:
    "保存Vy车票、酒店接送书面确认与Voss Taxi电话；列车晚点时主动通知酒店。",
  official: storeRingheimUrl,
});

const hotelArrivalStop = () => ({
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
    "提前把19:49计划到站时间发给酒店并获得接送确认；入住时再次确认次晨送到Voss Stop A的时间。",
  ticket:
    "免费接送必须提前约定；未收到明确确认就使用Voss Taxi，不拖行李夜间步行上坡。",
  official: storeRingheimUrl,
});

const patchVossArrival = (route) => {
  const alreadyPatched = route.stops.some((stop) => stop.title === storeRingheimName);
  return {
    ...route,
    scope:
      "Moxy Bergen → Bergen Station寄存 → Bergen文化主线 → 18:29 Voss列车 → Store Ringheim预约接送",
    reservation:
      "Bryggens Museum；条件式Ulriken；Bergen→Voss实际Vy；Store Ringheim已确认订单与免费接送确认",
    accuracy:
      "Store Ringheim落到Mølstervegen 44真实坐标；Voss Station与酒店分为两个点，不再误写成车站步行圈。",
    stops: alreadyPatched
      ? route.stops
      : [...route.stops.slice(0, -1), vossStationStop(route.stops.at(-1)), hotelArrivalStop()],
  };
};

const patchVossDeparture = (route) => ({
  ...route,
  scope:
    "Store Ringheim → 预约接送/出租车 → Voss Bus Terminal Stop A → Gudvangen Stop H → Nærøyfjord船 → Flåm",
  hardStop:
    "08:50前离开Store Ringheim；09:10前到Voss Stop A；09:50巴士与12:10船只认票面",
  reservation:
    "Store Ringheim送站确认；09:50 Voss→Gudvangen巴士；12:10 Nærøyfjord船；Flåm两晚",
  accuracy:
    "酒店、Voss Stop A、Gudvangen Stop H、码头和Flåm终点均为真实点位；酒店到Stop A不再按步行圈处理。",
  stops: route.stops.map((stop, index) =>
    index === 0
      ? {
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
            "早餐时间只认订单或酒店确认；如不能在08:30前完成，前一晚申请打包早餐。08:50前离店。",
          ticket:
            "前一晚再次确认酒店免费送站；没有书面确认就在08:40前叫Voss Taxi。",
          official: storeRingheimUrl,
        }
      : stop,
  ),
});

export const balancedRouteAudit = {
  ...balancedRouteAuditBase,
  sep03: patchFlightArrival(balancedRouteAuditBase.sep03),
  sep13: patchVossArrival(balancedRouteAuditBase.sep13),
  sep14: patchVossDeparture(balancedRouteAuditBase.sep14),
};
