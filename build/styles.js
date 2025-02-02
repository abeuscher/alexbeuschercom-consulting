const sass = require("sass");
const fs = require("fs");
const path = require("path");

function BuildStyles(eleventyConfig, isWatchMode = false) {
  if (isWatchMode) {
    console.log("Watching for style changes...");
    eleventyConfig.addWatchTarget("./src/styles/**/*.scss");
  }

  const outputDir = path.join(__dirname, "../dist/styles");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const compileSass = () => {
    const result = sass.renderSync({
      file: path.join(__dirname, "../src/styles/theme.scss"),
      outputStyle: "compressed",
      includePaths: [
        path.join(__dirname, "../node_modules"),
        path.join(__dirname, "../src/styles"),
      ],
    });

    fs.writeFileSync(path.join(outputDir, "theme.css"), result.css);
    console.log("Styles compiled to theme.css");
  };

  eleventyConfig.on("beforeBuild", () => {
    compileSass();
  });
}

module.exports = { BuildStyles };
