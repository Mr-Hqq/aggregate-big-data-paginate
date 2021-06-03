const aggregatePaginate = require('./functions/aggregatePaginate')

/**
 * @param {Schema} schema
 */
module.exports = function (schema) {
	schema.statics.aggregatePage = aggregatePaginate
}
