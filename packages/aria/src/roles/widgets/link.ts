import { Role } from "../../types";
import * as Attributes from "../../attributes";
import { Command } from "../abstract";

/**
 * @see https://www.w3.org/TR/wai-aria/#link
 */
export const Link: Role = {
  name: "link",
  label: { from: ["author", "contents"], required: true },
  inherits: [Command],
  supported: [Attributes.Expanded]
};
