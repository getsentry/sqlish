import peggy from 'peggy';
import type { LoaderDefinitionFunction } from 'webpack';

const peggyLoader: LoaderDefinitionFunction = function(source) {
  // https://peggyjs.org/documentation.html#generating-a-parser-javascript-api
  const peggyOptions: peggy.OutputFormatAmdCommonjsEs = {
    cache: false,
    dependencies: {},
    format: 'commonjs',
    optimize: 'speed',
    trace: false,
    output: 'source',
  };

  try {
    const result = peggy.generate(source, peggyOptions);
    return result;
  } catch (error) {
    this.emitError(new Error(`Peggy compilation failed: ${error}`));
    return '';
  }
};

export default peggyLoader; 