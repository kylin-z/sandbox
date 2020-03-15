const { Compiler } = require('webpack');
const { ConcatSource } = require('webpack-sources');

class ModuleWrapperPlugin {
  constructor(options) {
    this.options = options;
  }

  wrapCode(name) {
    const injectVars = ['window', 'location', 'document'];
    return [
      `moduleWrapper('${name}', function(require, module, exports, {${injectVars.join(
        ","
      )}}){ \n
      `,
      "\n})"
    ];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "ModuleWrapperPlugin", // <-- Set a meaningful name here for stacktraces
      compilation => {
        compilation.hooks.afterOptimizeChunkAssets.tap(
          "ModuleWrapperPlugin",
          chunks => {
            chunks.forEach(chunk => {
              const entryFile = chunk.files.find(file => file.endsWith(".js"));
              const entryAsset = compilation.assets[entryFile];

              const [prefix, suffix] = this.wrapCode(chunk.name);

              compilation.assets[entryFile] = new ConcatSource(
                prefix,
                entryAsset,
                suffix
              );
            });
          }
        );
      }
    );
  }
}

module.exports = ModuleWrapperPlugin;
