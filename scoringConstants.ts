interface RonPoints {
  FU_30_HAN_1: number;
  FU_30_HAN_2: number;
  FU_30_HAN_3: number;
  FU_30_HAN_4: number;
  FU_40_HAN_1: number;
  FU_40_HAN_2: number;
  FU_40_HAN_3: number;
  FU_50_HAN_1: number;
  FU_50_HAN_2: number;
  FU_50_HAN_3: number;
  FU_70_HAN_1: number;
  FU_70_HAN_2: number;
  FU_90_HAN_1: number;
  FU_90_HAN_2: number;
  FU_110_HAN_1: number;
  FU_110_HAN_2: number;
  MANGAN: number;
  HANEMAN: number;
  BAIMAN: number;
  SANBAIMAN: number;
  YAKUMAN: number;
  DOUBLE_YAKUMAN: number;
}

interface TsumoPoints {
  FU_30_HAN_1: number[];
  FU_30_HAN_2: number[];
  FU_30_HAN_3: number[];
  FU_30_HAN_4: number[];
  FU_40_HAN_1: number[];
  FU_40_HAN_2: number[];
  FU_40_HAN_3: number[];
  FU_50_HAN_1: number[];
  FU_50_HAN_2: number[];
  FU_50_HAN_3: number[];
  FU_70_HAN_1: number[];
  FU_70_HAN_2: number[];
  FU_90_HAN_1: number[];
  FU_90_HAN_2: number[];
  FU_110_HAN_1: number[];
  MANGAN: number[];
  HANEMAN: number[];
  BAIMAN: number[];
  SANBAIMAN: number[];
  YAKUMAN: number[];
  DOUBLE_YAKUMAN: number[];
}

export const CHILD_RON_POINTS: RonPoints = {
  FU_30_HAN_1: 1000,
  FU_30_HAN_2: 2000,
  FU_30_HAN_3: 3900,
  FU_30_HAN_4: 7700,
  FU_40_HAN_1: 1300,
  FU_40_HAN_2: 2600,
  FU_40_HAN_3: 5200,
  FU_50_HAN_1: 1600,
  FU_50_HAN_2: 3200,
  FU_50_HAN_3: 6400,
  FU_70_HAN_1: 2300,
  FU_70_HAN_2: 4500,
  FU_90_HAN_1: 2900,
  FU_90_HAN_2: 5800,
  FU_110_HAN_1: 3600,
  FU_110_HAN_2: 7100,
  MANGAN: 8000,
  HANEMAN: 12000,
  BAIMAN: 16000,
  SANBAIMAN: 24000,
  YAKUMAN: 32000,
  DOUBLE_YAKUMAN: 64000
};

export const PARENT_RON_POINTS: RonPoints = {
  FU_30_HAN_1: 1500,
  FU_30_HAN_2: 2900,
  FU_30_HAN_3: 5800,
  FU_30_HAN_4: 11600,
  FU_40_HAN_1: 2000,
  FU_40_HAN_2: 3900,
  FU_40_HAN_3: 7700,
  FU_50_HAN_1: 2400,
  FU_50_HAN_2: 4800,
  FU_50_HAN_3: 9600,
  FU_70_HAN_1: 3400,
  FU_70_HAN_2: 6800,
  FU_90_HAN_1: 4400,
  FU_90_HAN_2: 8700,
  FU_110_HAN_1: 5300,
  FU_110_HAN_2: 10600,
  MANGAN: 12000,
  HANEMAN: 18000,
  BAIMAN: 24000,
  SANBAIMAN: 36000,
  YAKUMAN: 48000,
  DOUBLE_YAKUMAN: 96000
};

export const CHILD_TSUMO_POINTS: TsumoPoints = {
  FU_30_HAN_1: [300, 500],
  FU_30_HAN_2: [500, 1000],
  FU_30_HAN_3: [1000, 2000],
  FU_30_HAN_4: [2000, 3900],
  FU_40_HAN_1: [400, 700],
  FU_40_HAN_2: [700, 1300],
  FU_40_HAN_3: [1300, 2600],
  FU_50_HAN_1: [400, 800],
  FU_50_HAN_2: [800, 1600],
  FU_50_HAN_3: [1600, 3200],
  FU_70_HAN_1: [600, 1200],
  FU_70_HAN_2: [1200, 2300],
  FU_90_HAN_1: [800, 1500],
  FU_90_HAN_2: [1500, 2900],
  FU_110_HAN_1: [1800, 3600],
  MANGAN: [2000, 4000],
  HANEMAN: [3000, 6000],
  BAIMAN: [4000, 8000],
  SANBAIMAN: [6000, 12000],
  YAKUMAN: [8000, 16000],
  DOUBLE_YAKUMAN: [16000, 32000]
};

// export const PARENT_TSUMO_POINTS: TsumoPoints = {
//   FU_30_HAN_1: 500,
//   FU_30_HAN_2: 1000,
//   FU_30_HAN_3: 2000,
//   FU_30_HAN_4: 3900,
//   FU_40_HAN_1: 700,
//   FU_40_HAN_2: 1300,
//   FU_40_HAN_3: 2600,
//   FU_50_HAN_1: 800,
//   FU_50_HAN_2: 1600,
//   FU_50_HAN_3: 3200,
//   FU_70_HAN_1: 1200,
//   FU_70_HAN_2: 2300,
//   FU_90_HAN_1: 1500,
//   FU_90_HAN_2: 2900,
//   FU_110_HAN_1: 1800,
//   FU_110_HAN_2: 3600,
//   MANGAN: 4000,
//   HANEMAN: 6000,
//   BAIMAN: 8000,
//   SANBAIMAN: 12000,
//   YAKUMAN: 16000,
//   DOUBLE_YAKUMAN: 32000
// };