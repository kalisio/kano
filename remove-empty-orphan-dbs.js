// Should be set by --eval
var appDb
var empty

if (!appDb) {
	print('You must provide a DB name holding the organisations of your app using --eval "appDb = \'name\'"')
} else {
	appDb = db.getSiblingDB(appDb)
	var orgs = appDb.getCollection('organisations')
	var dbs = db.getMongo().getDBNames()
	// Iterate over DBs
	for (var i in dbs) {
		var dbName = dbs[i]
		try {
			var id = new ObjectId(dbName)
			// Check if valid Object ID
		  if (id.getTimestamp()) {
			  var db = db.getSiblingDB(dbName)
			  var collections = db.getCollectionNames()
			  var remove = true
			  // Check if used by app
			  var org = orgs.findOne({ _id: id })
			  if (!org) {
				  // Iterate over collections to check if empty ?
				  if (empty) {
					  for (var j in collections) {
					  	var collectionName = collections[j]
					  	var collection = db.getCollection(collectionName)
					  	if (collection.stats().count > 0) {
					  		remove = false
					  	}
					  }
					}
				} else {
					remove = false
				}
			  // Drop when required
			  if (remove) {
			  	print('Dropping orphan empty DB ' + dbName)
			  	db.dropDatabase()
			  } else {
			  	print('Skipping non orphan or non empty DB ' + dbName)
			  }
			}
		} catch (error) {
			print(error)
		}
	}
}