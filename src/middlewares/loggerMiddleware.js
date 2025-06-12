const logRequest = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
}

const logSpecificRequest = (req, res, next) => {
  console.log('Sólo para método en la raíz - home')
  console.log(`${req.method} - ${req.url}`)
  next()
}

export { logRequest, logSpecificRequest }
