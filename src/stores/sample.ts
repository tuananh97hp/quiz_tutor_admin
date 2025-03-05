/**
 *
 * Getting started with Recoil: https://recoiljs.org/docs/introduction/getting-started/
 *
 **/

import { atom, selector } from 'recoil';

export const sampleAtom = atom({
  key: 'sampleAtom',
  default: 0,
});

export const sampleSelector = selector({
  key: 'sampleSelector',
  get: ({ get }) => {
    return get(sampleAtom);
  },
});
