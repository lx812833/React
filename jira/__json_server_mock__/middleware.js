module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    const { username, password } = req.body
    if (username === '123' && password === '123') {
      return res.status(200).json({
        user: {
          token: 'token123'
        }
      })
    } else {
      return res.status(400).json({
        message: '用户名或者密码错误'
      })
    }
  }
  next()
}