import { Device } from "@siteimprove/alfa-device";
import { Converters } from "./converters";
import { getComputedProperty } from "./properties/helpers/get-property";
import { getRootStyle } from "./properties/helpers/get-root-style";
import { Style } from "./style";
import { Values } from "./values";

const { max, min } = Math;

export namespace Resolvers {
  export function length<S>(
    length: Values.Length,
    device: Device,
    style: Style<S> | null = null
  ): Values.Length<"px"> {
    const { unit, value } = length;
    const { viewport } = device;

    const { value: fontSize } = getComputedProperty(style, "fontSize");
    const { value: rootFontSize } = getComputedProperty(
      style === null ? null : getRootStyle(style),
      "fontSize"
    );

    switch (unit) {
      // https://www.w3.org/TR/css-values/#em
      case "em":
        return Values.length(fontSize.value * value, fontSize.unit);

      // https://www.w3.org/TR/css-values/#ex
      case "ex":
        return Values.length(fontSize.value * value * 0.5, fontSize.unit);

      // https://www.w3.org/TR/css-values/#ch
      case "ch":
        return Values.length(fontSize.value * value * 0.5, fontSize.unit);

      // https://www.w3.org/TR/css-values/#rem
      case "rem":
        return Values.length(rootFontSize.value * value, fontSize.unit);

      // https://www.w3.org/TR/css-values/#vh
      case "vh":
        return Values.length((viewport.height * value) / 100, "px");

      // https://www.w3.org/TR/css-values/#vw
      case "vw":
        return Values.length((viewport.width * value) / 100, "px");

      // https://www.w3.org/TR/css-values/#vmin
      case "vmin":
        return Values.length(
          (min(viewport.width, viewport.height) * value) / 100,
          "px"
        );

      // https://www.w3.org/TR/css-values/#vmax
      case "vmax":
        return Values.length(
          (max(viewport.width, viewport.height) * value) / 100,
          "px"
        );
    }

    return Values.length(Converters.length(value, unit, "px"), "px");
  }

  export function percentage<S>(
    percentage: Values.Percentage,
    of: Values.Length,
    device: Device,
    style: Style<S> | null = null
  ): Values.Length<"px"> {
    return length(
      Values.length(of.value * percentage.value, of.unit),
      device,
      style
    );
  }
}
