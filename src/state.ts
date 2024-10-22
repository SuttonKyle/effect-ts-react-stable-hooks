import * as E from 'effect/Either';
import * as Eq from 'effect/Equivalence';
import * as O from 'effect/Option';
import { Dispatch, SetStateAction, useReducer } from 'react';

const isSetStateFn = <A>(s: SetStateAction<A>): s is (a: A) => A => typeof s === 'function';

export const useStable = <A>(initState: A, eq: Eq.Equivalence<A>): [A, Dispatch<SetStateAction<A>>] =>
  useReducer(
    (s1: A, s2: SetStateAction<A>) => {
      const _s2 = isSetStateFn(s2) ? s2(s1) : s2;
      return eq(s1, _s2) ? s1 : _s2;
    },
    initState
  );

export const useStableO = <A>(initState: O.Option<A>): [O.Option<A>, Dispatch<SetStateAction<O.Option<A>>>] =>
  useStable(initState, O.getEquivalence(Eq.strict()));

export const useStableE = <A, E>(initState: E.Either<A, E>): [E.Either<A, E>, Dispatch<SetStateAction<E.Either<A, E>>>] =>
  useStable(initState, E.getEquivalence({left: Eq.strict(), right: Eq.strict()}));
