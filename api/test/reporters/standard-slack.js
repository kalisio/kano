const concat = require('concat-stream')
const SlackNotifier = require('./slack-notifier')

const SlackReporter = concat({ encoding: 'string' }, function (data) {
  const notifier = new SlackNotifier(process.env.SLACK_WEBHOOK_URL)
  const context = process.env.STANDARD_CONTEXT
  let errors = 0
  // Add a title
  notifier.addSection(`*[${context}]* checking style`)
  // Scan the output
  const lines = data.split('\n')
  lines.forEach(function (line) {
    const re = /\s*([A-Za-z]:)?([^:]+):([^:]+):([^:]+): (.*)/.exec(line)
    if (re) {
      notifier.addSection(`:exclamation:  ${re[2]}:${re[3]}:${re[4]}: ${re[5]}`)
      errors++
    }
  })
  // Format the result
  if (errors > 0) notifier.addSection(`:x:  failed with *${errors}* errors`)
  else notifier.addSection(':heavy_check_mark:  passed')
  notifier.addDivider()
  // Send the noficiation
  notifier.notify(`*[${context}]* checking style`)
})

const stream = process.stdin

stream.pipe(SlackReporter)

stream.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
