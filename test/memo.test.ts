import * as Eq from 'effect/Equivalence';
import * as O from 'effect/Option';
import { o1a, o1b, o2 } from './state';
import { renderHook } from '@testing-library/react-hooks';
import { useStableMemo } from '../src/index';

const nEq = Eq.tuple(O.getEquivalence(Eq.number));

describe('useStableMemo', () => {
  test('should not return a value if the values are the same', () => {
    let o = o1a;
    const { result, rerender } = renderHook(() => useStableMemo(() => o, [o], nEq));
    o = o1b;
    rerender();
    expect(result.current).toStrictEqual(o1a);
  });

  test('should return a new value if the values are different', () => {
    let o = o1a;
    const { result, rerender } = renderHook(() => useStableMemo(() => o, [o], nEq));
    o = o2;
    rerender();
    expect(result.all[0]).not.toStrictEqual(result.all[1]);
  });
});
