import {atomFamily, selectorFamily} from 'recoil';

export const logsState = atomFamily({
  key: 'logs',
  default: [],
});

export const connectionLogs = selectorFamily({
  key: 'logsSelector',
  get: (id) => ({get}) => get(logsState(id)),
});
