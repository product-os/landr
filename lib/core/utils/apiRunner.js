/**
 * Run api hook factory
 * @param {Object} data - Data that every api hook receivces
 * @param {Object} data.config - Config from .getConfig
 * @param {Array} data.pages - Routes for site
 * @param {Object} data.locals - All data collected by scraping repo
 * @returns {Function} . - Returns a function to supply the hook name
 */
module.exports = ({ config, pages, locals }) => hook => {
  if (typeof config.hooks[hook] === 'function') {
    return Promise.resolve(config.hooks[hook]())
  }
}
