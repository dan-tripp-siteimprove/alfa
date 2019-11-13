import * as aria from "@siteimprove/alfa-aria";
import { Device } from "@siteimprove/alfa-device";
import { Element, Node, Text } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";

export function isExposed<T extends Element | Text>(
  context: Node,
  device: Device
): Predicate<T> {
  return node =>
    aria.isExposed(node, context, device).some(isExposed => isExposed);
}
