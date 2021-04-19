import * as path from "https://deno.land/std@0.93.0/path/mod.ts";

export type Repository = {
  name: string;
  url: string;
};

export type Options = {
  basePath?: string;
  baseUrl?: string;
};

function getPath(repo: Repository, opts: Options) {
  return opts.basePath ? path.join(opts.basePath, repo.name) : repo.name;
}

function getUrl(repo: Repository, opts: Options) {
  return (opts.baseUrl || "") + repo.url;
}

function getRepo(repo: Repository, opts: Options) {
  return [
    `[submodule "${repo.name}"]`,
    `\tpath = ${getPath(repo, opts)}`,
    `\turl = ${getUrl(repo, opts)}`,
  ].join("\n") + "\n";
}

export function stringify(repos: Repository[], opts: Options = {}) {
  return repos
    .map((repo) => getRepo(repo, opts))
    .join("");
}
