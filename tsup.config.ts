import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    errors: 'src/errors/index.ts',
    react: "src/react/index.ts",
    logging: "src/logging/index.ts",
    metrics: "src/metrics/index.ts",
    context: "src/context/index.ts",
    string: 'src/string/index.ts',
    date: 'src/date/index.ts',
    validation: 'src/validation/index.ts',
    guards: 'src/guards/index.ts',
    collection: 'src/collection/index.ts',
    object: 'src/object/index.ts',
    network: 'src/network/index.ts',
    storage: 'src/storage/index.ts',
    misc: 'src/misc/index.ts',
    adapters: 'src/adapters/index.ts',
    api: 'src/api/index.ts',
    async: 'src/async/index.ts',
    internal: 'src/internal/index.ts',
    observability: 'src/observability/index.ts',
    performance: 'src/performance/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.js',
    }
  },
  esbuildOptions(options, context) {
    if (context.format === 'cjs') {
      options.outdir = 'dist/cjs'
    } else {
      options.outdir = 'dist/esm'
    }
  },
})
