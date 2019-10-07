export enum GbfElement {
  FIRE = 'fire',
  WATER = 'water',
  EARTH = 'earth',
  WIND = 'wind',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Evoker {
  FRAUX = 'fraux',
  ALANAAN = 'alanaan',
  MARIA_THERESA = 'maria-theresa',
  HAASELIA = 'haaselia',
  CAIM = 'caim',
  LOBELIA = 'lobelia',
  ESTARRIOLA = 'estarriola',
  KATZELIA = 'katzelia',
  GEISENBORGER = 'geisenborger',
  NIER = 'nier'
}

export interface ArcarumSummonData {
  slug: string;
  element: GbfElement;
  name: { ja: string };
}

export interface EvokerData {
  slug: string;
  name: { ja: string };
  arcarumSummon: ArcarumSummonData;
}

export interface ArcarumMaterial {
  sephiraStone: number;
  astra: number;
  idean: number;
  fragment: number;
}

export interface DropMaterial {
  estimatedMin: number;
  estimatedMax: number;
}

export interface EnemyDropMaterial {
  sephiraStone: DropMaterial;
  astra: {
    fourElements: DropMaterial;
    lightAndDark: DropMaterial;
  };
  idean: DropMaterial;
}

export interface StageInfo {
  expectedFragmentValue: number;
  expectedSephiraStoneValue: number;
  expectedAstraValue: number;
  bossDropMaterial?: EnemyDropMaterial;
}

export interface CheckpointInfo {
  stages: StageInfo[];
  dropArcarumPoint: DropMaterial;
}

export const arcarumSummon: { [key: string]: ArcarumSummonData } = {
  theDevil: {
    slug: 'the-devil',
    element: GbfElement.FIRE,
    name: { ja: 'ザ・デビル' }
  },
  theSun: {
    slug: 'the-sun',
    element: GbfElement.FIRE,
    name: { ja: 'ザ・サン' }
  },
  justice: {
    slug: 'justice',
    element: GbfElement.WATER,
    name: { ja: 'ジャスティス' }
  },
  theMoon: {
    slug: 'the-moon',
    element: GbfElement.WATER,
    name: { ja: 'ザ・ムーン' }
  },
  theHangedMan: {
    slug: 'the-hanged-man',
    element: GbfElement.EARTH,
    name: { ja: 'ザ・ハングドマン' }
  },
  theTower: {
    slug: 'the-tower',
    element: GbfElement.EARTH,
    name: { ja: 'ザ・タワー' }
  },
  temperance: {
    slug: 'tenperance',
    element: GbfElement.WIND,
    name: { ja: 'テンペランス' }
  },
  judgemenet: {
    slug: 'judgement',
    element: GbfElement.WIND,
    name: { ja: 'ジャッジメント' }
  },
  theStar: {
    slug: 'the-star',
    element: GbfElement.LIGHT,
    name: { ja: 'ザ・スター' }
  },
  death: {
    slug: 'death',
    element: GbfElement.DARK,
    name: { ja: 'デス' }
  }
};

export const evoker: { [key: string]: EvokerData } = {
  fraux: {
    slug: 'fraux',
    name: { ja: 'フラウ' },
    arcarumSummon: arcarumSummon.theDevil
  },
  alanaan: {
    slug: 'alanann',
    name: { ja: 'アラナン' },
    arcarumSummon: arcarumSummon.theSun
  },
  mariaTheresa: {
    slug: 'maria-theresa',
    name: { ja: 'マリア・テレサ' },
    arcarumSummon: arcarumSummon.justice
  },
  haaselia: {
    slug: 'haaselia',
    name: { ja: 'ハーゼリーラ' },
    arcarumSummon: arcarumSummon.theMoon
  },
  caim: {
    slug: 'caim',
    name: { ja: 'カイム' },
    arcarumSummon: arcarumSummon.theHangedMan
  },
  lobelia: {
    slug: 'lobelia',
    name: { ja: 'ロベリア' },
    arcarumSummon: arcarumSummon.theTower
  },
  estarriola: {
    slug: 'estarriola',
    name: { ja: 'エスタリオラ' },
    arcarumSummon: arcarumSummon.temperance
  },
  katzelia: {
    slug: 'katzelia',
    name: { ja: 'カッツェリーラ' },
    arcarumSummon: arcarumSummon.judgemenet
  },
  geisenborger: {
    slug: 'geisenborger',
    name: { ja: 'ガイゼンボーガ' },
    arcarumSummon: arcarumSummon.theStar
  },
  nier: {
    slug: 'nier',
    name: { ja: 'ニーア' },
    arcarumSummon: arcarumSummon.death
  }
};

export const evokers: EvokerData[] = [
  evoker.fraux,
  evoker.alanaan,
  evoker.mariaTheresa,
  evoker.haaselia,
  evoker.caim,
  evoker.lobelia,
  evoker.estarriola,
  evoker.katzelia,
  evoker.geisenborger,
  evoker.nier
];

export const levelToRequiredMaterials: ArcarumMaterial[] = [
  { sephiraStone: 0, astra: 0, idean: 0, fragment: 0 }, // なし
  { sephiraStone: 2, astra: 3, idean: 2, fragment: 0 }, // SR
  { sephiraStone: 5, astra: 5, idean: 3, fragment: 0 }, // SR1
  { sephiraStone: 10, astra: 10, idean: 5, fragment: 0 }, // SR2
  { sephiraStone: 15, astra: 15, idean: 7, fragment: 0 }, // SR3
  { sephiraStone: 30, astra: 30, idean: 15, fragment: 0 }, // SSR3
  { sephiraStone: 45, astra: 45, idean: 25, fragment: 10 }, // SSR4
  { sephiraStone: 0, astra: 0, idean: 0, fragment: 20 }, // SSR5
  { sephiraStone: 30, astra: 200, idean: 20, fragment: 0 } // 賢者取得
];

//
// ここから下の数値データは勘だけで入力している。
// データは取っていない。
//
const zeroDrop: DropMaterial = { estimatedMin: 0, estimatedMax: 0 };

const normalCheckpoint: CheckpointInfo = {
  stages: [
    { expectedSephiraStoneValue: 1 / 3, expectedAstraValue: 0.2, expectedFragmentValue: 0.15 },
    { expectedSephiraStoneValue: 1 / 3, expectedAstraValue: 0.2, expectedFragmentValue: 0.15 },
    { expectedSephiraStoneValue: 1 / 3, expectedAstraValue: 0.2, expectedFragmentValue: 0.15 }
  ],
  dropArcarumPoint: { estimatedMin: 500, estimatedMax: 1000 }
};

const puppetCheckpoint: CheckpointInfo = {
  stages: [
    { expectedSephiraStoneValue: 1 / 2, expectedAstraValue: 0.5, expectedFragmentValue: 0.3 },
    { expectedSephiraStoneValue: 1 / 2, expectedAstraValue: 0.5, expectedFragmentValue: 0.3 },
    {
      expectedFragmentValue: 0,
      expectedSephiraStoneValue: 0,
      expectedAstraValue: 0,
      bossDropMaterial: {
        sephiraStone: zeroDrop,
        astra: {
          fourElements: { estimatedMin: 1 * 0.5, estimatedMax: 4 * 0.5 },
          lightAndDark: { estimatedMin: 1 * 0.5, estimatedMax: 3 * 0.5 }
        },
        idean: { estimatedMin: 1 * (1 / 3) * 0.5, estimatedMax: 2 * (1 / 3) * 0.5 }
      }
    }
  ],
  dropArcarumPoint: { estimatedMin: 600, estimatedMax: 1100 }
};

const bossCheckpoint: CheckpointInfo = {
  stages: [
    { expectedSephiraStoneValue: 1 / 2, expectedAstraValue: 0.5, expectedFragmentValue: 0.3 },
    { expectedSephiraStoneValue: 1 / 2, expectedAstraValue: 0.5, expectedFragmentValue: 0.3 },
    {
      expectedFragmentValue: 0,
      expectedSephiraStoneValue: 0,
      expectedAstraValue: 0,
      bossDropMaterial: {
        sephiraStone: { estimatedMin: 3, estimatedMax: 3 },
        astra: {
          fourElements: { estimatedMin: 1, estimatedMax: 3 },
          lightAndDark: { estimatedMin: 1, estimatedMax: 3 }
        },
        idean: { estimatedMin: 3, estimatedMax: 5 }
      }
    }
  ],
  dropArcarumPoint: { estimatedMin: 700, estimatedMax: 1200 }
};

export const checkpointNumberToInfo: CheckpointInfo[] = [
  normalCheckpoint,
  normalCheckpoint,
  puppetCheckpoint,
  normalCheckpoint,
  normalCheckpoint,
  puppetCheckpoint,
  normalCheckpoint,
  normalCheckpoint,
  bossCheckpoint
];
