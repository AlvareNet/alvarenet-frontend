const { addWebpackAlias, override } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
  }),
);
