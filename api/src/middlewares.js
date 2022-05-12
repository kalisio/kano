import express from '@feathersjs/express'

export default function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this

  // FIXME: https://github.com/kalisio/kTeam/issues/1
  // app.use(express.notFound())
  app.use(express.errorHandler())
}
