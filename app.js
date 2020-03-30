let http = require('http')
let fs = require('fs')
let url = require('url')
let template = require('art-template')
let data = JSON.parse(fs.readFileSync('./public/data/feedback.json', 'utf-8'))
let comments = data.feedback
http.createServer(function(req, res){
	let urlObj = url.parse(req.url, true)
	let pathname = urlObj.pathname
	if (pathname === '/') {
		fs.readFile('./views/index.html', function(err, data) {
			if (err) {
				return res.end('404 Not found.')
			}
			let htmlStr = template.render(data.toString(), {
				comments: comments
			})
			res.end(htmlStr)
		})
	} else if (pathname === '/pinglun') {
		fs.readFile('./views/index.html', function(err, data) {
			let dateTime = new Date().format('yyyy-MM-dd hh:mm:ss')
			let item = {
				...urlObj.query,
				dateTime
			}
			comments.unshift(item)
			let htmlStr = template.render(data.toString(), {
				comments: comments
			})
			let writeDate = [
				feedback = comments
			]
			fs.writeFileSync('./public/data/feedback.json', JSON.stringify(writeDate), 'utf8')
			res.end(htmlStr)
		})
	} else if (pathname === '/post') {
		fs.readFile('./views/post.html', function(err, data) {
			if (err) {
				return res.end('404 Not Found.')
			}
			res.end(data)
		})
	} else if (pathname.indexOf('/public/') === 0) {
		fs.readFile('.' + pathname, function(err, data) {
			if (err) {
				return res.end('404 Not Found.')
			}
			res.end(data)
		})
	} else {
		fs.readFile('./views/404.html', function(err, data) {
			if (err) {
				return res.end('404 Not found.')
			}
			res.end(data)
		})
	}
	
}).listen(8090, function(){
	console.log('listen 8090')
})

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}