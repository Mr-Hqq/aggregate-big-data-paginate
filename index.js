const aggregatePaginate = require('./aggregatePaginate')

/**
 * @param {Schema} schema
 */
module.exports = function (schema) {
	schema.statics.aggregatePage = aggregatePaginate
}
