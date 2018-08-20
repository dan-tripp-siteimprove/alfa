import { intersect } from "@siteimprove/alfa-util";
import { BrowserSpecific } from "./browser-specific";
import { isBrowserSpecific } from "./is-browser-specific";
import { Browser, Version } from "./types";

export function flatMap<T, U>(
  value: T | BrowserSpecific<T>,
  iteratee: (value: T) => U | BrowserSpecific<U>
): U | BrowserSpecific<U> {
  if (isBrowserSpecific(value)) {
    const values: Array<{
      value: U;
      browsers: Map<Browser, Set<Version>>;
    }> = [];

    for (const fst of value.values) {
      const value = iteratee(fst.value);

      if (isBrowserSpecific(value)) {
        for (const snd of value.values) {
          const browsers: Map<Browser, Set<Version>> = new Map();

          for (const [browser, thd] of fst.browsers) {
            const fth = snd.browsers.get(browser);

            if (fth === undefined) {
              continue;
            }

            const common = intersect(thd, fth);

            if (common.size > 0) {
              browsers.set(browser, common);
            }
          }

          if (browsers.size > 0) {
            values.push({ value: snd.value, browsers });
          }
        }
      } else {
        values.push({
          value,
          browsers: fst.browsers
        });
      }
    }

    return new BrowserSpecific(values);
  }

  return iteratee(value);
}
