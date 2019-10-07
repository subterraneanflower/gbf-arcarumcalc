import { GbfArcarumProgress, GbfInventory, combineGbfInventory } from './gbf';
import {
  levelToRequiredMaterials,
  ArcarumMaterial,
  checkpointNumberToInfo,
  DropMaterial,
  StageInfo,
  GbfElement
} from '../data/arcarum';

export interface EstimatedResult {
  days: number;
}

const emptyInventory = {
  sephiraStone: 0,
  astra: 0,
  idean: 0,
  fragment: 0,
  arcarumPoint: 0
};

const satisfiesRequiredMaterial = (required: ArcarumMaterial, inventory: GbfInventory): boolean => {
  const satisfiesSephiraStone = required.sephiraStone - inventory.sephiraStone <= 0;
  const satisfiesAstra = required.astra - inventory.astra <= 0;
  const satisfiesIdean = required.idean - inventory.idean <= 0;
  const satisfiesFragment = required.fragment - inventory.fragment <= 0;

  const satisfiesWithoutPoints = satisfiesSephiraStone && satisfiesAstra && satisfiesIdean && satisfiesFragment;

  // 不足分を補うためのアーカルムポイント
  const pointsForSehpiraStone = satisfiesSephiraStone ? 0 : (required.sephiraStone - inventory.sephiraStone) * 2000;
  const pointsForAstra = satisfiesAstra ? 0 : (required.astra - inventory.astra) * 1500;
  const pointsForFragment = satisfiesFragment ? 0 : (required.fragment - inventory.fragment) * 5000;
  const totalPoints = pointsForSehpiraStone + pointsForAstra + pointsForFragment;

  const satisfiesWithPoints = satisfiesIdean && totalPoints <= inventory.arcarumPoint;

  return satisfiesWithPoints;
};

const calcExpectedValueByDropMaterial = (drop: DropMaterial): number => {
  return (drop.estimatedMin + drop.estimatedMax) / 2;
};

const calcExpectedInventoryByStageInfo = (stage: StageInfo, element: GbfElement): GbfInventory => {
  const isLightOrDark = element === GbfElement.LIGHT || element === GbfElement.DARK;

  // パペット/ボスステージ
  if (stage.bossDropMaterial) {
    return {
      sephiraStone:
        calcExpectedValueByDropMaterial(stage.bossDropMaterial.sephiraStone) + stage.expectedSephiraStoneValue,
      astra:
        calcExpectedValueByDropMaterial(
          isLightOrDark ? stage.bossDropMaterial.astra.lightAndDark : stage.bossDropMaterial.astra.fourElements
        ) + stage.expectedAstraValue,
      idean: calcExpectedValueByDropMaterial(stage.bossDropMaterial.idean),
      fragment: stage.expectedFragmentValue,
      arcarumPoint: 0
    };
  }

  // 一般ステージ
  return {
    sephiraStone: stage.expectedSephiraStoneValue,
    astra: stage.expectedAstraValue,
    idean: 0,
    fragment: stage.expectedFragmentValue,
    arcarumPoint: 0
  };
};

const exploreCheckpoint = (checkpoint: number, element: GbfElement): GbfInventory => {
  const checkpointInfo = checkpointNumberToInfo[checkpoint - 1];

  if (!checkpointInfo) {
    return emptyInventory;
  }

  const expoloredResult = checkpointInfo.stages
    .map<GbfInventory>(stage => calcExpectedInventoryByStageInfo(stage, element))
    .reduce<GbfInventory>((prev, current) => combineGbfInventory(prev, current), emptyInventory);

  expoloredResult.arcarumPoint += calcExpectedValueByDropMaterial(checkpointInfo.dropArcarumPoint);

  return expoloredResult;
};

export const estimateArcarum: (progress: GbfArcarumProgress) => EstimatedResult = progress => {
  const totalRequiredMaterial = levelToRequiredMaterials
    .slice(progress.summonLevel + 1)
    .map((material): GbfInventory => ({ ...material, arcarumPoint: 0 }))
    .reduce<GbfInventory>((prev, current) => combineGbfInventory(prev, current), emptyInventory);

  let currentInventory = { ...progress.inventory };

  const loopLimit = 999;
  let exploreCount = 0;
  for (exploreCount = 0; exploreCount <= loopLimit; exploreCount++) {
    // アイテムが集まっていればbreak
    if (satisfiesRequiredMaterial(totalRequiredMaterial, currentInventory)) {
      break;
    }

    // アイテムが集まっていなければ探索
    const currentCheckpoint = (exploreCount % 9) + 1; // 1から9の範囲
    const exploreResultInventory = exploreCheckpoint(currentCheckpoint, progress.targetEvoker.arcarumSummon.element);

    currentInventory = combineGbfInventory(currentInventory, exploreResultInventory);

    // 復刻イベントが来たら3万ポイント追加
    if (progress.renewalEventInterval !== 'none') {
      if (progress.renewalEventInterval === 'monthly' && exploreCount && exploreCount % 30 === 0) {
        // 30日ごと
        currentInventory.arcarumPoint += 30000;
      } else if (progress.renewalEventInterval === 'bimonthly' && exploreCount && exploreCount % 60 === 0) {
        // 60日ごと
        currentInventory.arcarumPoint += 30000;
      }
    }
  }

  // 仮の推定日数
  let days = exploreCount;

  // 追加チケットがある場合
  if (progress.additionalTicketInfo) {
    // 今日からチケット追加開始の場合
    // すぐさま引き算する
    //
    // チケット追加開始日がわからない場合
    // ある程度期間が長ければ引き算する
    // ここではチケット追加日数の2倍以上の時間がかかっている場合、引き算している
    // この条件は適切かわからず、少し見直すべきかもしれない
    if (progress.additionalTicketInfo.startAt === 'today') {
      days -= progress.additionalTicketInfo.days;
    } else if (days > progress.additionalTicketInfo.days * 2) {
      days -= progress.additionalTicketInfo.days;
    }
  }

  return {
    days: Math.max(0, days)
  };
};
