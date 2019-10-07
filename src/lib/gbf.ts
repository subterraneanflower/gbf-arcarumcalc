import { EvokerData } from '../data/arcarum';
import { AdditionalTicketInfo, RenewalEventInterval } from '../context/arcarum_context';

export interface GbfInventory {
  sephiraStone: number;
  astra: number;
  idean: number;
  fragment: number;
  arcarumPoint: number;
}

export interface GbfArcarumProgress {
  targetEvoker: EvokerData;
  summonLevel: number;
  inventory: GbfInventory;
  additionalTicketInfo?: AdditionalTicketInfo;
  renewalEventInterval: RenewalEventInterval;
}

export const combineGbfInventory = (inventory1: GbfInventory, inventory2: GbfInventory): GbfInventory => {
  return {
    sephiraStone: inventory1.sephiraStone + inventory2.sephiraStone,
    astra: inventory1.astra + inventory2.astra,
    idean: inventory1.idean + inventory2.idean,
    fragment: inventory1.fragment + inventory2.fragment,
    arcarumPoint: inventory1.arcarumPoint + inventory2.arcarumPoint
  };
};
