import { stringify } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

const repos = [{
  name: "double",
  url: "double.git",
}, {
  name: "half-answer",
  url: "half-answer.git",
}];

const string1 = `
[submodule "double"]
\tpath = double
\turl = double.git
[submodule "half-answer"]
\tpath = half-answer
\turl = half-answer.git
`.trimStart();
Deno.test("stringify", () => {
  assertEquals(stringify(repos), string1);
});

const string2 = `
[submodule "double"]
\tpath = parent/double
\turl = https://example.com/double.git
`.trimStart();
Deno.test("stringify with basePath and baseUrl", () => {
  assertEquals(
    stringify([repos[0]], {
      basePath: "parent",
      baseUrl: "https://example.com/",
    }),
    string2,
  );
});
