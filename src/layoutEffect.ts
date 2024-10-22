import * as Eq from 'effect/Equivalence';
import { EffectCallback, useLayoutEffect } from 'react';
import { StableHookOptions } from './options';
import { useEqMemoize } from './useEqMemoize';

export const useStableLayoutEffect = <A extends ReadonlyArray<unknown>>(
  callback: EffectCallback,
  dependencies: A,
  eq: Eq.Equivalence<A>,
  options?: StableHookOptions
): ReturnType<typeof useLayoutEffect> => {
  return useLayoutEffect(callback, useEqMemoize(dependencies, eq, options));
};