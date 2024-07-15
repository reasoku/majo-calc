<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="(player, index) in players"
            :key="index"
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="player.name"
              :label="player.label"
            ></v-text-field>
            <v-text-field
              v-model="player.score"
              label="持ち点"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="deposit" label="供託点数" type="number">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="honba" label="本場" type="number">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card :class="resultClass">
              <v-card-title>合計点数</v-card-title>
              <v-card-text>{{ totalScore }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-radio-group v-model="selectedPlayer" row>
              <v-row>
                <v-col v-for="(player, index) in players" :key="index" cols="3">
                  <v-radio :label="player.name" :value="player.label"></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title>トップを取る条件</v-card-title>
              <v-card-text>{{ topCondition }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CHILD_RON_POINTS,
  PARENT_RON_POINTS,
  CHILD_TSUMO_POINTS,
  //PARENT_TSUMO_POINTS,
} from "../scoringConstants"; // 定数のインポート

// プレイヤーの型を定義
interface Player {
  label: string;
  name: string;
  score: number;
}

const players = ref<Player[]>([
  { label: "東家（起家）", name: "起家", score: 30000 },
  { label: "南家", name: "南家", score: 27000 },
  { label: "西家", name: "西家", score: 22000 },
  { label: "北家", name: "北家", score: 20000 },
]);

const deposit = ref<number>(1000);
const honba = ref<number>(1);
const selectedPlayer = ref<string>(players.value[0].label);

const totalScore = computed<number>(() => {
  const urn = (
    players.value.reduce(
      (sum: number, player: Player) => sum +  parseInt(player.score.toString()),
      0
    ) + parseInt(deposit.value.toString())
  );
  console.log("urn" + urn);
  return urn;
});

const resultClass = computed<string>(() => {
  return totalScore.value === 100000 ? "green-result" : "red-result";
});

const topCondition = computed<string>(() => {
  // 合計点数が100000点でない場合は、条件を出力しない
  if(totalScore.value !== 100000) return "合計点数が100,000点になっていません";

  // 選択された人の条件を出力する
  const selected = {
    ...players.value.find(
      (player: Player) => player.label === selectedPlayer.value
    ),
  };

  if (!selected) return "条件を確認したいプレイヤーが選択されていません";

  // スコアに基づいてプレイヤーをソート
  const sortedPlayers = players.value
    .map((player: Player) => ({ ...player, score: player.score }))
    .sort((a: Player, b: Player) => b.score - a.score);

  // トップのプレイヤーと2着のプレイヤーを取得
  const topPlayer = sortedPlayers[0];
  const secondPlayer = sortedPlayers[1];

  // 他家との差を取得
  const differenceFromTop = topPlayer.score - selected.score;
  const differenceFromSecond = secondPlayer.score - selected.score;

  const isParent = selected.label === "北家";
  const otherPlayers = players.value.filter(
    (player: Player) => player.label !== selected.label
  );

  // 点差を計算
  const requiredScore = topPlayer.score - selected.score;

  const ronMessage = getRonPointsMessage(
    isParent,
    requiredScore,
    differenceFromSecond
  );

  const tsumoMessage = getTsumoPointsMessage(isParent, selected, otherPlayers);

  const messageDifferenceFromTop = differenceFromTop ? `トップと ${differenceFromTop} 点差です。` : "現在トップです。";
  const messageRequiredScore =
    requiredScore > 0
      ? `トップを取るには、` + ronMessage + `ツモなら` + tsumoMessage
      : "上がればOK";

  const finalMessage = `${messageDifferenceFromTop}\n
      ${messageRequiredScore}`;
  return finalMessage;
});

function getRonPointsMessage(
  isParent: boolean,
  requiredScore: number,
  differenceFromSecond: number
) {
  // TODO:トップ条件２ちゃ条件とかの修正は入れる必要がある

  // 直撃の時は差の半分で良い
  const requiredScoreHalf = requiredScore / 2;

  // ロンの時ポイントのテーブル
  const ronPointTable = getRonPointTable(isParent);

  // 直撃の条件
  const requiredRonPointsDirect = ronPointTable.find(
    ([key, value]) =>
      value >= requiredScoreHalf && value >= differenceFromSecond
  );

  // 他家からの条件
  const requiredRonPointsNoDirect = ronPointTable.find(
    ([key, value]) => value >= requiredScore
  );

  if (!requiredRonPointsDirect || !requiredRonPointsNoDirect) {
    return "ちょっと変";
  }

  return `直撃ならあと ${requiredRonPointsDirect[1]} 点以上、他家からので和了なら${requiredRonPointsNoDirect[1]}の和了が必要です。`;
}

function getTsumoPointsMessage(
  isParent: boolean,
  tsumoPlayer: Player,
  otherPlayers: Player[]
) {
  const requiredWinningPoints = calcRequiredWinningPoints(
    isParent,
    tsumoPlayer,
    otherPlayers
  );

  return isParent
    ? `${requiredWinningPoints[1]} 点オール以上の和了が必要です`
    : `${requiredWinningPoints[0]}, ${requiredWinningPoints[1]}以上の和了が必要です`;
}

function getRonPointTable(isParent: boolean) {
  // 親子で得点のテーブルが違う
  const ronPoints = isParent ? PARENT_RON_POINTS : CHILD_RON_POINTS;
  // ロンの時のテーブルを整理
  return Object.entries(ronPoints).sort((a, b) => a[1] - b[1]);
}

function getTsumoPointTable() {
  const childTsumoPointsValues = Object.values(CHILD_TSUMO_POINTS).sort(
    (a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      } else {
        return a[0] - b[0];
      }
    }
  );
  return childTsumoPointsValues;
}

function calcRequiredWinningPoints(
  isParent: boolean,
  tsumoPlayer: Player,
  otherPlayers: Player[]
): number[] {
  // 親,子の支払い点数を取得
  const paymentPoints = getTsumoPointTable();
  // コピーを作成
  const paidPlayer = { ...tsumoPlayer };

  for(const paymentPoint of paymentPoints) {
    let updatedPlayers: any[];

    // ツモ上がりの時の結果を計算する
    if (isParent) {
      const point = paymentPoint[1];
      const payerPlayers = otherPlayers.map((player) => ({
        ...player,
        score: player.score - point,
      }));
      paidPlayer.score += point * 3;
      updatedPlayers = payerPlayers.concat(paidPlayer);
    } else {
      const payerPlayers = otherPlayers.map((player) => {
        if (player.label === "北家") {
          return { ...player, score: player.score - paymentPoint[1] };
        } else {
          return { ...player, score: player.score - paymentPoint[0] };
        }
      });
      paidPlayer.score += paymentPoint[0] * 2 + paymentPoint[1];
      updatedPlayers = payerPlayers.concat(paidPlayer);
    }

    console.log(paymentPoint);
    updatedPlayers.sort((a, b) => b.score - a.score);

    // 自分の順位を確認する
    const tsumoPlayerLank = updatedPlayers.findIndex(
      (player) => player.label === tsumoPlayer.label
    );
    // 自分の順位が1位だったらその時の支払い点数を返す
    if (tsumoPlayerLank === 0) {
      return paymentPoint;
    }
  }

  return [0, 0];
}
</script>

<style>
.green-result {
  background-color: #e0f7fa;
  border-color: #4caf50;
}
.red-result {
  background-color: #ffebee;
  border-color: #f44336;
}
</style>
