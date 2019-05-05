require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// 自定义路由开始
var apiRoutes = express.Router()

var formidable = require('formidable')
apiRoutes.get('/getPictureProd.do', function (req, res) {
  res.json({
    code: 200,
    data: {
      list: [{
          id: '1',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '2',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '3',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '4',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '5',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '6',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '7',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '8',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '9',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '10',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '11',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '12',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '13',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '14',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '15',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        }
      ],
      total: 30
    }
  })
})

apiRoutes.get('/getPictureUpload.do', function (req, res) {
  res.json({
    code: 200,
    data: {
      list: [{
          id: '1',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '2',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '3',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '4',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '5',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '6',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '7',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '8',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '9',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '10',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '11',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '12',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '13',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        },
        {
          id: '14',
          filename: '招聘.png',
          origin_url: 'http://localhost:8080/static/img101.png'
        },
        {
          id: '15',
          filename: '风景.jpg',
          origin_url: 'http://localhost:8080/static/img100.jpg'
        }
      ],
      total: 50
    }
  })
})

apiRoutes.post('/uploadPicture.do', function (req, res) {
  var form = new formidable.IncomingForm()
  // form.keepExtensions = true
  form.on('fileBegin', function (name, file) {
    file.path = path.join('F:/panaProject/editor/static/upload/image/', file.name);
  })
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
      return
    }
    console.log('上传成功')
    res.json({
      code: 200,
      msg: '',
      data: {
        id: 123,
        filename: files.picture.name,
        origin_url: 'http://localhost:8080/static/upload/image/' + files.picture.name
      }
    })
  })
})

apiRoutes.post('/deletePicture.do', function (req, res) {
  res.json({
    code: 200,
    msg: ''
  })
})

apiRoutes.get('/getMusicProd.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok',
    data: {
      list: [{
          id: 1,
          filename: '包包包公.mp3',
          origin_url: 'http://localhost:8080/static/包包包公.mp3'
        }, {
          id: 2,
          filename: '缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3',
          origin_url: 'http://localhost:8080/static/缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3'
        }, {
          id: 3,
          filename: 'A Kiss Is All I Miss.mp3',
          origin_url: 'http://localhost:8080/static/A Kiss Is All I Miss.mp3'
        }, {
          id: 4,
          filename: 'Ken Arai - Next To You - 钢琴版纯音乐.mp3',
          origin_url: 'http://localhost:8080/static/Ken Arai - Next To You - 钢琴版纯音乐.mp3'
        }, {
          id: 1,
          filename: '包包包公.mp3',
          origin_url: 'http://localhost:8080/static/包包包公.mp3'
        }, {
          id: 2,
          filename: '缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3',
          origin_url: 'http://localhost:8080/static/缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3'
        }, {
          id: 3,
          filename: 'A Kiss Is All I Miss.mp3',
          origin_url: 'http://localhost:8080/static/A Kiss Is All I Miss.mp3'
        }, {
          id: 4,
          filename: 'Ken Arai - Next To You - 钢琴版纯音乐.mp3',
          origin_url: 'http://localhost:8080/static/Ken Arai - Next To You - 钢琴版纯音乐.mp3'
        }, {
          id: 1,
          filename: '包包包公.mp3',
          origin_url: 'http://localhost:8080/static/包包包公.mp3'
        }, {
          id: 2,
          filename: '缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3',
          origin_url: 'http://localhost:8080/static/缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3'
        }
      ],
      total: 20
    }
  })
})

apiRoutes.get('/getMusicUpload.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok',
    data: {
      list: [{
          id: 1,
          filename: '包包包公.mp3',
          origin_url: 'http://localhost:8080/static/包包包公.mp3'
        }, {
          id: 2,
          filename: '缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3',
          origin_url: 'http://localhost:8080/static/缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3'
        }, {
          id: 3,
          filename: 'A Kiss Is All I Miss.mp3',
          origin_url: 'http://localhost:8080/static/A Kiss Is All I Miss.mp3'
        }, {
          id: 4,
          filename: 'Ken Arai - Next To You - 钢琴版纯音乐.mp3',
          origin_url: 'http://localhost:8080/static/Ken Arai - Next To You - 钢琴版纯音乐.mp3'
        }, {
          id: 1,
          filename: '包包包公.mp3',
          origin_url: 'http://localhost:8080/static/包包包公.mp3'
        }, {
          id: 2,
          filename: '缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3',
          origin_url: 'http://localhost:8080/static/缅甸 那些承诺 最棒泰国女声 轻柔泰语 Rap.mp3'
        }, {
          id: 3,
          filename: 'A Kiss Is All I Miss.mp3',
          origin_url: 'http://localhost:8080/static/A Kiss Is All I Miss.mp3'
        }, {
          id: 4,
          filename: 'Ken Arai - Next To You - 钢琴版纯音乐.mp3',
          origin_url: 'http://localhost:8080/static/Ken Arai - Next To You - 钢琴版纯音乐.mp3'
        }
      ],
      total: 30
    }
  })
})

apiRoutes.post('/deleteMusic.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok'
  })
})

apiRoutes.post('/save.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok',
    id: 100
  })
})

apiRoutes.post('/uploadMusic.do', function (req, res) {
  var form = new formidable.IncomingForm()
  // form.keepExtensions = true
  form.on('fileBegin', function (name, file) {
    file.path = path.join('F:/panaProject/editor/static/upload/music/', file.name);
  })
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
      return
    }
    console.log('上传成功')
    res.json({
      code: 200,
      msg: '',
      data: {
        id: 123,
        filename: files.music.name,
        origin_url: 'http://localhost:8080/static/upload/music/' + files.music.name
      }
    })
  })
})

apiRoutes.post('/deleteVideo.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok'
  })
})
apiRoutes.get('/getVideoUpload.do', function (req, res) {
  res.json({
    code: 200,
    msg: 'ok',
    data: {
      list: [],
      total: 0
    }
  })
})

apiRoutes.post('/uploadVideo.do', function (req, res) {
  var form = new formidable.IncomingForm()
  // form.keepExtensions = true
  form.on('fileBegin', function (name, file) {
    file.path = path.join('F:/panaProject/editor/static/upload/video/', file.name);
  })
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err)
      return
    }
    console.log('上传成功')
    res.json({
      code: 200,
      msg: '',
      data: {
        id: 123,
        filename: files.video.name,
        origin_url: 'http://localhost:8080/static/upload/video/' + files.video.name,
        cover_url:''
      }
    })
  })
})

app.use('/Panasign-cloud/editor', apiRoutes)
// 自定义路由结束
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
