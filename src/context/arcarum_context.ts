import * as React from 'react';
import { EvokerData } from '../data/arcarum';
import { GbfInventory } from '../lib/gbf';

export type AdditionalTicketStartAt = 'today' | 'unknown' | 'none';

export interface AdditionalTicketInfo {
  startAt: AdditionalTicketStartAt;
  days: number;
}

export type RenewalEventInterval = 'none' | 'monthly' | 'bimonthly';

export interface ArcarumContextData {
  targetEvoker?: EvokerData;
  summonLevel: number;
  unusedTickets: number;
  inventory: GbfInventory;
  additionalTicketInfo?: AdditionalTicketInfo;
  renewalEventInterval: RenewalEventInterval;

  setTargetEvoker: (evoker: EvokerData) => any;
  setSummonLevel: (level: number) => any;
  setUnusedTickets: (tickets: number) => any;
  setInventory: (iventory: GbfInventory) => any;
  setAdditionalTicketInfo: (info: AdditionalTicketInfo) => any;
  setRenewalEventInterval: (interval: RenewalEventInterval) => any;
}

export const ArcarumContext = React.createContext<ArcarumContextData>({
  summonLevel: 0,
  unusedTickets: 0,
  inventory: {
    sephiraStone: 0,
    astra: 0,
    idean: 0,
    fragment: 0,
    arcarumPoint: 0
  },
  renewalEventInterval: 'none',

  setTargetEvoker: (evoker: EvokerData) => null,
  setSummonLevel: (level: number) => null,
  setUnusedTickets: (tickets: number) => null, 
  setInventory: (inventory: GbfInventory) => null,
  setAdditionalTicketInfo: (info: AdditionalTicketInfo) => null,
  setRenewalEventInterval: (interval: RenewalEventInterval) => null
});
