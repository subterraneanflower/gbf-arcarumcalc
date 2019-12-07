import * as React from 'react';
import { useState, useCallback } from 'react';
import { TitlePage } from './containers/TitlePage';
import { MemoryRouter, Switch, Route } from 'react-router';
import { EvokerSelectPage } from './containers/EvokerSelectPage';
import { SummonSelectPage } from './containers/SummonSelectPage';
import { InventoryPage } from './containers/InventoryPage';
import { ResultPage } from './containers/ResultPage';
import { ArcarumContext, AdditionalTicketInfo, RenewalEventInterval } from './context/arcarum_context';
import { EvokerData } from './data/arcarum';
import { GbfInventory } from './lib/gbf';
import { EventPage } from './containers/EventPage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const App = () => {
  const [targetEvoker, setTargetEvoker] = useState<EvokerData | undefined>();
  const [summonLevel, setSummonLevel] = useState<number>(0);
  const [unusedTickets, setUnusedTickets] = useState<number>(0);
  const [inventory, setInventory] = useState<GbfInventory>({
    sephiraStone: 0,
    astra: 0,
    idean: 0,
    fragment: 0,
    arcarumPoint: 0
  });
  const [additionalTicketInfo, setAdditionalTicketInfo] = useState<AdditionalTicketInfo>({
    startAt: 'none',
    days: 0
  });
  const [renewalEventInterval, setRenewalEventInterval] = useState<RenewalEventInterval>('monthly');

  return (
    <MemoryRouter>
      <ArcarumContext.Provider
        value={{
          targetEvoker,
          summonLevel,
          unusedTickets,
          inventory,
          additionalTicketInfo,
          renewalEventInterval,
          setTargetEvoker,
          setSummonLevel,
          setUnusedTickets,
          setInventory,
          setAdditionalTicketInfo,
          setRenewalEventInterval
        }}
      >
        <Route
          render={({ location }) => {
            return (
              <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="page-fade" timeout={200}>
                  <Switch location={location}>
                    <Route path="/" exact component={TitlePage} />
                    <Route path="/evoker" exact component={EvokerSelectPage} />
                    <Route path="/summon" exact component={SummonSelectPage} />
                    <Route path="/inventory" exact component={InventoryPage} />
                    <Route path="/event" exact component={EventPage} />
                    <Route path="/result" exact component={ResultPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
      </ArcarumContext.Provider>
    </MemoryRouter>
  );
};
