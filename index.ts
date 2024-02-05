import { type Tree } from "@lezer/common";
import { buildParser } from "@lezer/generator";

const Parser = buildParser(`
  @top Program { expression }

  expression { Name | Number | BinaryExpression }

  BinaryExpression { "(" expression ("+" | "-") expression ")" }

  @tokens {
    Name { @asciiLetter+ }
    Number { @digit+ }
  }
`);

function renderTree(tree: Tree) {
  let items = "";
  let level = 0;
  tree.iterate({
    enter({ type, from, to }) {
      items += `${"".padEnd(level)}- ${type.name} (${from} → ${to})\n`;
      level += 1;
    },
    leave() {
      level -= 1;
    },
  });
  return items;
}

if (import.meta.main) {
  const tree = Parser.parse("(a+(1-2))");
  console.log(renderTree(tree));
}
