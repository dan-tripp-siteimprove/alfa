import { Element, Node } from "@siteimprove/alfa-dom";
import { getId } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";

export function hasId(
  context: Node,
  predicate: Predicate<string> = () => true
): Predicate<Element> {
  return element =>
    getId(element, context)
      .filter(predicate)
      .isSome();
}
