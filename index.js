const yaml = require("yaml");
const { readFile } = require("fs/promises");

const yamlPlugin = () => ({
  name: "yaml",
  setup(build) {
    const cache = new Map();

    build.onLoad({ filter: /.\.(yml|yaml)$/ }, async (args) => {
      const source = await readFile(args.path, "utf8");
      const cacheData = cache.get(args.path)

      if (!cacheData || cacheData.source !== source) {
        const parsed = yaml.parse(source);
        cache.set(args.path, { source, parsed })
      }

      return {
        contents: JSON.stringify(cache.get(args.path).parsed),
        loader: "json",
      };
    });
  },
});

module.exports = yamlPlugin;
