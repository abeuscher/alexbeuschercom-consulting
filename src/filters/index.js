const addFilters = (eleventyConfig) => {
  eleventyConfig.addFilter("prettyjson", (data) => {
    return JSON.stringify(data, undefined, 2);
  });
};

module.exports = { addFilters };
