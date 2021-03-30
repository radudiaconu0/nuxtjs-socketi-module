
import Soketi from '@soketi/soketi-js'

<% if (options.broadcaster === 'pusher') { %>
window.Pusher = require('pusher-js')
<% } else if (options.broadcaster === 'socket.io') { %>
window.io = require('socket.io-client')
<% } %>

function getHeaders ({ app }) {
  const headers = {}

  <% if (options.authModule) { %>
  if (app.$auth) {
    const strategy = app.$auth.strategy

    if (strategy.options.name === 'laravelSanctum') {
      headers.referer = location.origin
      headers['X-XSRF-TOKEN'] = app.$auth.$storage.getCookies()['XSRF-TOKEN']
    } else {
      const tokenName = strategy.options.token.name || 'Authorization'
      const token = app.$auth.strategy.token.get()

      if (token) {
        headers[tokenName] = token
      }
    }
  }
  <% } %>

  return headers
}

export default function (ctx, inject) {
  const options = <%= serialize(options) %>
  options.auth = options.auth || {}
  options.auth.headers = {
    ...options.auth.headers,
    ...getHeaders(ctx)
  }

  // runtimeConfig
  const runtimeConfig = ctx.$config && ctx.$config.socketi || {}

  const socketi = new Soketi({
    ...options,
    ...runtimeConfig
  })

  <% if (options.authModule) { %>
  if (ctx.app.$auth) {
    ctx.app.$auth.$storage.watchState('loggedIn', loggedIn => {
      socketi.options.auth.headers = {
        ...socketi.options.auth.headers,
        ...getHeaders(ctx)
      }

      <% if (options.connectOnLogin) { %>
      if (loggedIn) {
        socketi.connect()
      }
      <% } %>

      <% if (options.disconnectOnLogout) { %>
      if (!loggedIn && socketi.connector) {
        socketi.disconnect()
      }
      <% } %>
    })
  }
  <% } %>

  ctx.$socketi = socketi
  inject('socketi', socketi)
}
