const { IncomingWebhook } = require('@slack/webhook')

class SlackNotifier {
  constructor (slackWebhookUrl) {
    this.webhook = new IncomingWebhook(slackWebhookUrl)
    this.blocks = []
  }

  addSection (text) {
    this.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text
      }
    })
    return { }
  }

  addDivider () {
    this.blocks.push({
      type: 'divider'
    })
  }

  async notify (text) {
    await this.webhook.send({
      text,
      blocks: this.blocks
    })
    this.blocks = []
  }
}

module.exports = SlackNotifier
