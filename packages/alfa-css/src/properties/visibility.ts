import { parse } from "@siteimprove/alfa-lang";
import { VisibilityGrammar } from "../grammars/visibility";
import { Property } from "../types";

export type Visibility = "visible" | "hidden" | "collapse";

/**
 * @see https://drafts.csswg.org/css-box/#propdef-visibility
 */
export const VisibilityProperty: Property<Visibility> = {
  inherits: true,
  parse(input) {
    return parse(input, VisibilityGrammar);
  },
  initial: "visible",
  computed(own, parent) {
    return own.visibility === undefined ? null : own.visibility;
  }
};
