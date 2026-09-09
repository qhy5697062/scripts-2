!(async () => {
  let network = !$network?.wifi?.bssid
  let modules = await httpAPI('/v1/modules', 'GET')
  let previousNetwork = modules.enabled.includes('Network Enabled')
  if (previousNetwork !== network) {
    console.log(`Network: ${previousNetwork} -> ${network}`)
    modules = await httpAPI('/v1/modules', 'POST', {
      'Network Enabled': network,
      'Network Disabled': !network,
    })
    // console.log(JSON.stringify(modules, null, 2))
  } else {
    console.log(`Network: ${previousNetwork}`)
  }
  $done({ network })
})()

function httpAPI(path = '', method = 'POST', body = null) {
  return new Promise(resolve => {
    $httpAPI(method, path, body, result => {
      resolve(result)
    })
  })
}
