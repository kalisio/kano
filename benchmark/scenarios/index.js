const weightedScenarios = require('./scenarios')

// Get a scenario according to its probability
function getRandomScenario() {
  const r = Math.random()
  let sum = 0
  const scenarios = Object.keys(weightedScenarios)
  for (var i = 0; i < scenarios.length; ++i) {
    const scenario = scenarios[i]
    const probability = weightedScenarios[scenario]
    sum += probability
    if (r < sum) {
      break
    }
  }
  return scenarios[i]
}

module.exports = getRandomScenario
