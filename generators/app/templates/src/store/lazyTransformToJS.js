// @flow
import { Iterable } from 'immutable';

export function lazyTransformToJS(state: *) {
  let result = state;

  if (process.env.NODE_ENV !== 'production' && Iterable.isIterable(state)) {
    result = {};

    state.forEach((part, key) =>
      Object.defineProperty(result, key, {
        get() {
          if (!Iterable.isIterable(part)) return part;

          return part.toJS();
        },
        enumerable: true,
      }),
    );
  }

  return result;
}
