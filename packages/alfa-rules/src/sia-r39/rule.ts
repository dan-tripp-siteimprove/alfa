import { Diagnostic, Rule } from "@siteimprove/alfa-act";
import { DOM } from "@siteimprove/alfa-aria";
import { Element, Namespace, Node } from "@siteimprove/alfa-dom";
import { Predicate } from "@siteimprove/alfa-predicate";
import { Err, Ok } from "@siteimprove/alfa-result";
import { Criterion, Technique } from "@siteimprove/alfa-wcag";
import { Page } from "@siteimprove/alfa-web";

import { expectation } from "../common/act/expectation";
import { Question } from "../common/act/question";

import { Scope } from "../tags";

const { hasAccessibleName, isIncludedInTheAccessibilityTree } = DOM;
const { hasInputType, hasName, hasNamespace } = Element;
const { and, or, test } = Predicate;

export default Rule.Atomic.of<Page, Element, Question.Metadata>({
  uri: "https://alfa.siteimprove.com/rules/sia-r39",
  requirements: [
    Criterion.of("1.1.1"),
    Technique.of("G94"),
    Technique.of("G95"),
  ],
  tags: [Scope.Component],
  evaluate({ device, document }) {
    return {
      applicability() {
        return document.elementDescendants(Node.fullTree).filter(
          and(
            hasNamespace(Namespace.HTML),
            or(hasName("img"), and(hasName("input"), hasInputType("image"))),
            isIncludedInTheAccessibilityTree(device),
            (element) =>
              test(
                hasAccessibleName(device, (accessibleName) =>
                  element
                    .attribute("src")
                    .map((attr) => getFilename(attr.value))
                    .some(
                      (filename) =>
                        filename.toLowerCase() ===
                        accessibleName.value.toLowerCase().trim()
                    )
                ),
                element
              )
          )
        );
      },

      expectations(target) {
        return {
          1: Question.of(
            "name-describes-purpose",
            target,
            `Does the accessible name of the \`<${target.name}>\` element describe its purpose?`
          ).map((nameDescribesPurpose) =>
            expectation(
              nameDescribesPurpose,
              () => Outcomes.NameIsDescriptive(target.name),
              () => Outcomes.NameIsNotDescriptive(target.name)
            )
          ),
        };
      },
    };
  },
});

function getFilename(path: string): string {
  const base = path.substring(path.lastIndexOf("/") + 1);
  const params = base.indexOf("?");

  if (params !== -1) {
    return base.substring(0, params).trim();
  }

  return base.trim();
}

/**
 * @public
 */
export namespace Outcomes {
  export const NameIsDescriptive = (name: string) =>
    Ok.of(
      Diagnostic.of(
        `The accessible name of the \`<${name}>\` element describes its purpose`
      )
    );

  export const NameIsNotDescriptive = (name: string) =>
    Err.of(
      Diagnostic.of(
        `The accessible name of the \`<${name}>\` element does not describe its purpose`
      )
    );
}
