# mongoose-aggregate-big-data-paginate

> this package will use for big data that mongo can't handle or count with aggregate.


## Installation

```sh
npm install mongoose-aggregate-big-data-paginate
yarn add mongoose-aggregate-big-data-paginate
```

## Usage

Adding the plugin to a schema,

```js
var mongoose = require("mongoose");
var aggregatePages = require("mongoose-aggregate-big-data-paginate");

var schema = new mongoose.Schema({});

schema.plugin(aggregatePages);

var model = mongoose.model("Model", schema);
```

and then use model `aggregatePage` method,

```js
// as Promise

var Model = require("/models/model");

const options = {
  page: 1,
  limit: 10,
};

var myAggregate = myModel.aggregate();
myModel
  .aggregatePage(myAggregate, options)
  .then(function (results) {
    console.log(results);
  })
  .catch(function (err) {
    console.log(err);
  });
```
### Model.aggregatePaginate([aggregateQuery], [options])

Returns promise

**Parameters**

- `[aggregate-query]` {Object} - Aggregate Query criteria. [Documentation](https://docs.mongodb.com/manual/aggregation/)
- `[options]` {Object}
    - `[page]` {Number} - Current Page (Defaut: 1)
    - `[limit]` {Number} - Docs. per page (Default: 10).

**Return value**

Promise fulfilled with object having properties:

- `docs` {Array} - Array of documents
- `totalDocs` {Number} - Total number of documents that match a query
- `totalPages` {Number} - Total number of pages.
- `pages` {Array} - All 5 pages

Please note that the above properties can be renamed by setting customLabels attribute.
