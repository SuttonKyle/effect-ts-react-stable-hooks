import * as E from 'effect/Either';
import * as Eq from 'effect/Equivalence';
import * as O from 'effect/Option';

export const o1a = O.some(1);
export const o1b = O.some(1);
export const o2 = O.some(2);

export const e1a = E.right(1);
export const e1b = E.right(1);
export const e2 = E.right(2);

export const nEq = Eq.tuple(O.getEquivalence(Eq.number));
