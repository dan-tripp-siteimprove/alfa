import { getRole, Role } from "@siteimprove/alfa-aria";
import { Device } from "@siteimprove/alfa-device";
import { Element, Node } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";

export function hasRole(
  context: Node,
  device: Device,
  predicate: Predicate<Role> = () => true
): Predicate<Element> {
  return element =>
    getRole(element, context, device).some(role =>
      role.filter(predicate).isSome()
    );
}
