export const getDelayColor = (delay) => {
  if (delay >= 40) return "#ff4d4f";
  if (delay >= 30) return "#ffa940";
  if (delay >= 20) return "#fadb14";
  return "#52c41a";
};

export const simulatedMapData = [
  { name: "UP", delay: 48, position: { gridArea: "up" } },
  { name: "MH", delay: 35, position: { gridArea: "mh" } },
  { name: "BR", delay: 32, position: { gridArea: "br" } },
  { name: "WB", delay: 30, position: { gridArea: "wb" } },
  { name: "TN", delay: 28, position: { gridArea: "tn" } },
  { name: "RJ", delay: 25, position: { gridArea: "rj" } },
  { name: "MP", delay: 22, position: { gridArea: "mp" } },
  { name: "GJ", delay: 20, position: { gridArea: "gj" } },
  { name: "KA", delay: 15, position: { gridArea: "ka" } },
];

export const topDelayData = [
  {
    rank: 1,
    state: "Uttar Pradesh",
    caseType: "Land Disputes",
    subType: "Civil Suits",
    avgDelay: 48,
    pendingCases: "1.2M",
  },
  {
    rank: 2,
    state: "Bihar",
    caseType: "Criminal",
    subType: "Sessions Trial",
    avgDelay: 41,
    pendingCases: "820K",
  },
  {
    rank: 3,
    state: "West Bengal",
    caseType: "Civil",
    subType: "Property",
    avgDelay: 37,
    pendingCases: "640K",
  },
  {
    rank: 4,
    state: "Rajasthan",
    caseType: "Family",
    subType: "Maintenance",
    avgDelay: 33,
    pendingCases: "410K",
  },
  {
    rank: 5,
    state: "Delhi",
    caseType: "Commercial",
    subType: "Contract",
    avgDelay: 31,
    pendingCases: "290K",
  },
];
