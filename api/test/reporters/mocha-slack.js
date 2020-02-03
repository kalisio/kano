// https://github.com/mochajs/mocha/issues/812

const mocha = require('mocha')
const SlackNotifier = require('./slack-notifier')

const EVENT_RUN_BEGIN = mocha.Runner.constants.EVENT_RUN_BEGIN
const EVENT_RUN_END = mocha.Runner.constants.EVENT_RUN_END
const EVENT_SUITE_BEGIN = mocha.Runner.constants.EVENT_SUITE_BEGIN
const EVENT_SUITE_END = mocha.Runner.constants.EVENT_SUITE_END
const EVENT_TEST_PASS = mocha.Runner.constants.EVENT_TEST_PASS
const EVENT_TEST_FAIL = mocha.Runner.constants.EVENT_TEST_FAIL
const EVENT_TEST_PENDING = mocha.Runner.constants.EVENT_TEST_PENDING

function SlackReporter (runner, options) {
  mocha.reporters.Base.call(this, runner)
  const notifier = new SlackNotifier(process.env.SLACK_WEBHOOK_URL || options.reporterOptions.webhook_url)
  const context = process.env.MOCHA_CONTEXT || options.reporterOptions.context
  let startTime
  let passes = 0
  let failures = 0
  let skips = 0
  let messages = []

  runner.on(EVENT_RUN_BEGIN, function () {
    startTime = new Date()
    notifier.addSection(`[${context}] running tests ${startTime.toUTCString()}`)
  })

  runner.on(EVENT_RUN_END, function () {
    const duration = ((new Date() - startTime) / 60).toFixed(2)
    notifier.addSection(`Duration: ${duration}s`)
    notifier.addDivider()
    notifier.notify()
  })

  runner.on(EVENT_SUITE_BEGIN, function (suite) {
    if (!suite.root) {
      console.log(`[${suite.fullTitle()}]`)
      notifier.addSection(`*[${suite.fullTitle()}]*`)
      passes = 0
      skips = 0
      failures = 0
      messages = []
    }
  })

  runner.on(EVENT_SUITE_END, function (suite) {
    if (!suite.root) {
      messages.forEach(message => {
        notifier.addSection(message)
      })
      notifier.addSection(`${passes} passed, ${failures} failed, ${skips} skipped`)
    }
  })

  runner.on(EVENT_TEST_PENDING, function (test) {
    console.log('skip: %s', test.title)
    notifier.addSection(`:heavy_minus_sign:  ${test.title} skipped`)
    skips++
  })

  runner.on(EVENT_TEST_PASS, function (test) {
    console.log('pass: %s', test.title)
    notifier.addSection(`:heavy_check_mark:  ${test.title} passed`)
    passes++
  })

  runner.on(EVENT_TEST_FAIL, function (test, err) {
    console.log('fail: %s -- error: %s', test.title, err.message)
    notifier.addSection(`:x: ${test.title} failed: ${err.message}`)
    failures++
  })
};

module.exports = SlackReporter
