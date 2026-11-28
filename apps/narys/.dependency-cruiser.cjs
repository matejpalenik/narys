const architecture = '^src/feature/architecture/';
const server = `(?:^src/config/|${architecture}(?:infrastructure|application|domain)/)`;

module.exports = {
  forbidden: [
    { name: 'no-cycles', severity: 'error', from: {}, to: { circular: true } },
    { name: 'resolve-imports', severity: 'error', from: {}, to: { couldNotResolve: true } },
    {
      name: 'browser-to-server',
      severity: 'error',
      from: { path: `(?:^src/app/providers\\.tsx$|${architecture}ui/)` },
      to: { path: server, reachable: true },
    },
    {
      name: 'domain-dependencies-point-inward',
      severity: 'error',
      from: { path: `${architecture}domain/` },
      to: { pathNot: `${architecture}domain/`, reachable: true },
    },
    {
      name: 'application-ports-own-adapters',
      severity: 'error',
      from: { path: `${architecture}application/` },
      to: {
        path: `(?:^src/app/|^src/config/|${architecture}(?:api|infrastructure|ui)/)`,
        reachable: true,
      },
    },
  ],
  options: {
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
    doNotFollow: { path: 'node_modules' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
    },
  },
};
