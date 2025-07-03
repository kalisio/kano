export default function (app, options) {
  const db = options.db || app.db
  options.Model = db.collection('configurations')
}
