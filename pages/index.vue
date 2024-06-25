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
                  <v-radio :label="player.name" :value="player.name"></v-radio>
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

<script setup>
import { ref, computed } from "vue";
import { CHILD_RON_POINTS, PARENT_RON_POINTS } from "../scoringConstants.js"; // 定数のインポート

const players = ref([
  { label: "東家（起家）", name: "起家", score: 30000 },
  { label: "南家", name: "南家", score: 27000 },
  { label: "西家", name: "西家", score: 22000 },
  { label: "北家", name: "北家", score: 20000 },
]);

const deposit = ref(1000);
const honba = ref(1);
const selectedPlayer = ref(players.value[0].name);

const totalScore = computed(() => {
  return (
    players.value.reduce((sum, player) => sum + parseInt(player.score), 0) +
    parseInt(deposit.value)
  );
});

const resultClass = computed(() => {
  return totalScore.value === 100000 ? "green-result" : "red-result";
});

const topCondition = computed(() => {
  // 選択された人の条件を出力する
  const selected = players.value.find(
    (player) => player.name === selectedPlayer.value
  );

  // スコアに基づいてプレイヤーをソート
  const sortedPlayers = players.value
    .map((player) => ({ ...player, score: parseInt(player.score) }))
    .sort((a, b) => b.score - a.score);

  // トップのプレイヤーと2着のプレイヤーを取得
  const topPlayer = sortedPlayers[0];
  const secondPlayer = sortedPlayers[1];

  // トップとの差を取得
  const differenceFromTop = topPlayer.score - selected.score;
  const differenceFromSecond = secondPlayer.score - selected.score;

  const isParent = selected.label === "北家";
  const isTopParent = players.label === "北家";

  // 点差を計算
  const requiredScore = topPlayer.score - parseInt(selected.score);
  const requiredScoreHalf = requiredScore / 2;

  // 直撃の時、CHILD_RON_POINTSの中で必要な点数以上の上がりを特定
  const ronPoints = isParent ? PARENT_RON_POINTS : CHILD_RON_POINTS;
  const sortedRonPoints = Object.entries(ronPoints).sort((a, b) => a[1] - b[1]);

  const requiredRonPointsDirect = sortedRonPoints.find(
    ([key, value]) =>
      value >= requiredScoreHalf && value >= differenceFromSecond
  );

  // 他家からロンの時CHILD_RON_POINTSの中で必要な点数以上の上がりを特定
  const requiredRonPointsNoDirect = sortedRonPoints.find(
    ([key, value]) => value >= requiredScore
  );

  const messageDifferenceFromTop = `トップと ${differenceFromTop} 点差です`;
  const messageRequiredScore =
    requiredScore > 0
      ? `トップを取るには、` +
        `直撃ならあと ${requiredRonPointsDirect[1]} 点以上、他家からので上がりなら${requiredRonPointsNoDirect[1]}の上がりが必要です。` +
        `ツモなら`
      : "現在トップです。上がればOK";

  const finalMessage = `${messageDifferenceFromTop}\n
      ${messageRequiredScore}`;
  return finalMessage;
});
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
