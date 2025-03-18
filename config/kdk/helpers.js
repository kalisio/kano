module.exports = {
  verticalSeparator: (options) => {
    // color: color to be used. Default to `grey-4`
    return Object.assign({
      component: 'QSeparator',
      vertical: true,
      color: 'grey-4',
      style: 'margin-left: 2px; margin-right: 2px;'
    }, options)
  },
  horizontalSeparator: (options) => {
    // color: color to be used. Default to `grey-4`
    return Object.assign({
      component: 'QSeparator',
      color: 'grey-4',
      class: 'full-width',
      style: 'min-height: 1px;'
    }, options)
  },
  leftPane: (options) => {
    // component: component to be used to render the leftPane. Default to 'LeftPane`
    const component = options?.component || 'LeftPane'
    return {
      content: [{ component }]
    }
  },
  toggleWidget: (options) => {
    // widgetId: widget identifier
    // icon: icon to be displayed
    // showMessage: label or tooltip to be displayed when not toggled
    // hideMessage: label or tooltip to be displayed when toggled
    // renderer: renderer of the action
    const params = Object.assign({ renderer: 'item' }, options)
    return {
      id: `toggle-${params.widgetId}`, 
      icon: params.icon, 
      label: params.renderer === 'item' ? params.showMessage : null,
      tooltip: params.renderer === 'button' ? params.showMessage : null,
      toggle: { 
        label: params.renderer === 'item' ? params.hideMessage : null,
        tooltip: params.renderer === 'button' ? params.hideMessage : null,
      },
      renderer: params.renderer,
      widgetId: params.widgetId,
      component: 'action/KToggleWidgetVisibility'
    }
  },
  toggleSticky: (options) => {
    // stickyId: sticky identifier
    // icon: icon to be displayed
    // showMessage: label or tooltip to be displayed when not toggled
    // hideMessage: label or tooltip to be displayed when toggled
    // renderer: renderer of the action
    const params = Object.assign({ renderer: 'item' }, options)
    return {
      id: `toggle-${params.stickyId}`, 
      icon: params.icon, 
      label: params.renderer === 'item' ? params.showMessage : null,
      tooltip: params.renderer === 'button' ? params.showMessage : null,
      toggle: { 
        label: params.renderer === 'item' ? params.hideMessage : null,
        tooltip: params.renderer === 'button' ? params.hideMessage : null,
      },
      renderer: params.renderer,
      stickyId: params.stickyId,
      component: 'action/KToggleStickyVisibility'
    }
  },
  assign: (object, patch) => {
    return Object.assign(object, patch)
  },
  visible: (object, rule) => {
    return module.exports.assign(object, { visible: rule })
  }
}