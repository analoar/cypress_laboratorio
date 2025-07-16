const config = {
  REPORT_DIR: 'cypress-image-diff-html-report',
  SCREENSHOTS_DIR: 'cypress-visual-screenshots',
  FAILURE_THRESHOLD: 0.1,
  JSON_REPORT: { FILENAME: 'report_visual_compare', OVERWRITE: true }, 
  NAME_TEMPLATE: '[browserName]/[specName]-[givenName]'

};
module.exports = config;
