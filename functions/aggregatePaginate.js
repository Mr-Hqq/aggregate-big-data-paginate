function findRightPage(pageNumber) {
	const _oneToFourRange = [1, 2, 3, 4]
	if (pageNumber < 5) {
		return { pageNumber }
	}
	if (pageNumber % 5 === 0) {
		pageNumber = 5
		return {
			pageNumber,
		}
	}
	while (!_oneToFourRange.includes(pageNumber)) {
		pageNumber -= 5
	}
	return {
		pageNumber,
	}
}
function prepareParamsAggregatePaginate(page) {
	const { pageNumber } = findRightPage(page)
	return {
		pageNumber,
	}
}
async function aggregatePage(aggregate, options = { page: 1, limit: 10 }) {
	let { pageNumber } = prepareParamsAggregatePaginate(options.page)
	const skipPage = (pageNumber - 1) * options.limit
	aggregate.push(
		{
			$facet: {
				metadata: [
					{ $count: 'total' },
					{ $addFields: { page: Number(options.page) } },
				],
				docs: [
					{ $skip: Number(skipPage) },
					{ $limit: Number(options.limit) },
				],
			},
		},
		{ $unwind: '$metadata' },
	)
	const model =
		(await this.aggregate(aggregate).allowDiskUse(true)) || []
	if (model.length < 1) {
		return {
			result: {},
			totalDocs: 0,
			totalPages: 0,
			pages: [],
		}
	}
	const result = model[0].docs
	const totalDocs = model[0].metadata.total
	const totalPages = Math.ceil(
		model[0].metadata.total / options.limit,
	)
	const pages = []
	for (let i = 0; i < totalPages + 1; i++) {
		pages.push(options.page - pageNumber + (i + 1))
	}
	return {
		result,
		totalDocs,
		totalPages,
		pages,
	}
}
module.exports = schema => {
	schema.statics.aggregatePage = aggregatePage
}

module.exports = aggregatePage
