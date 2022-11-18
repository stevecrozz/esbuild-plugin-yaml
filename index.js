const yaml = require("yaml");
const { readFile } = require("fs/promises");

const yamlPlugin = () => ({
  name: "yaml",
  setup(build) {
    build.onLoad({ filter: /.\.(yml|yaml)$/ }, async (args) => {
      const source = await readFile(args.path, "utf8");
      const parsed = yaml.parse(source);

      return {
        contents: JSON.stringify(parsed),
        loader: "json",
      };
    });
  },
});

module.exports = yamlPlugin;
