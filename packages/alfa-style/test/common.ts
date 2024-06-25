import { Device } from "@siteimprove/alfa-device";
import { Element } from "@siteimprove/alfa-dom";
import { Context } from "@siteimprove/alfa-selector";

import { type Longhands, Style, type Value } from "../dist";

const device = Device.standard();

/**
 * @internal
 */
export function cascaded<N extends Longhands.Name>(
  element: Element,
  name: N,
  context: Context = Context.empty(),
): Value.JSON<Style.Cascaded<N>> {
  return Style.from(element, device, context)
    .cascaded(name)
    .getUnsafe()
    .toJSON();
}

/**
 * @internal
 */
export function specified<N extends Longhands.Name>(
  element: Element,
  name: N,
  context: Context = Context.empty(),
): Value.JSON<Style.Specified<N>> {
  return Style.from(element, device, context).specified(name).toJSON();
}
