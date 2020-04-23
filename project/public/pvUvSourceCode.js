import axios from 'axios'	

(function (win) {
  // 获取页面的 meta 标签 meta 标签id 必须是 id="pvUv"
	const el = document.querySelector('#pvUv')
	// 获取页面的 script 标签 script标签的id 必须是 buried-point-statistics
	const script = document.querySelector('#buried-point-statistics')
	// 配置 Click 后台数据默认接口
	const devProd = {
		prod: 'http://click.esmtong.cn/network/click/collect',
		dev: 'http://click.esmtong.cn/network/click/collect',
	}

	// 获取所有以 hedaer- 开头的字段值
	// 用这些字段值 拼接成请求 header
	const getHeader = () => {
		const attriMap = [...el.attributes]
		const attriObj = {}

		attriMap.forEach(v => {
			const attr = v.nodeName
			if (attr.indexOf('header-') != -1) {
				attriObj[attr.split('-')[1]] = v.nodeValue
			}
		})

		return attriObj
	}

	// 或者的 meta 值拼接成请求参数
  function meta () {
		const aurl = devProd[script.getAttribute('data-env')]
		const header = getHeader()
    const method = el.getAttribute('method')
    const dataAttr = el.getAttribute('data-attr')
    const ip = el.getAttribute('ip')
		const time = el.getAttribute('time')
		const url = el.getAttribute('url') || location.href.split('?')[0]
		const param = paramsJson()
    return { url, header, method, dataAttr, ip, time, aurl, param }
  }

	// 添加事件处理函数
	function addEvent (el, event, handle, capture) {
		//包装函数做处理  用于取消函数和this指向问题
		el["event"+event] = handle

		//先判断浏览器是否为主流浏览器
		if (el.addEventListener){
			el.addEventListener(event, el["event"+event], capture)

		} else if (el.attachEvent){
			el["event"+event] = function () {
				handle.call(el, window.event)
			}
			el.attachEvent("on"+event, el["event"+event])
		}
	}

	//注销事件
	function eventUnbind (el, event, capture) {
		if (el.removeEventListener) {
			el.removeEventListener(event,el["event"+event], capture)

		} else if (el.detachEvent) {
			el.detachEvent("on"+event, el["event"+event])
		}
	}

	// 把 URL 转成 JSON 格式 传递给后台
	// 后台参数格式 param: xxx
	function paramsJson () {
		if (el.getAttribute('param')) {
			return el.getAttribute('param')
		}
		const obj = {}
		const params = location.href
		const [, arr] = params.split('?')
		const options = arr ? arr.split('&') : []
		options.map(ps => {
			const [key, value] = ps.split('=')
			obj[key] = value
		}) 

		return arr
  }

  const chaceMeate = (metaOp => {
    return () => metaOp = metaOp ? metaOp : meta()
  })()

	// key 自定义参数
	// option meta 参数
	function request ({ header, method, aurl, data }) { 
		axios({ method, url: aurl, headers: header, data })
	}

	// 手动埋点方法
	// MutationObserver 监听页面元素变化
	function statement () { 
		const observe = new MutationObserver((mutations, observe) => {
			const all = [...document.getElementsByTagName('*')]
			const { url, aurl, param, method = 'get', header, dataAttr = 'data-stat', ...option } = chaceMeate()

			all.forEach(el => {
				const attr = el.getAttribute(dataAttr)
				if (attr && el.nodeName.toLowerCase() !== 'body') {
					// key 自定义属性
					const { key, act = 'click' } = JSON.parse( attr )
					const data = Object.assign( param, { url }, option, JSON.parse(key) )
					eventUnbind(el, act)
					addEvent(el, act, () => request({ aurl, method, header, data, }))
				}
			})
		})
		
		observe.observe(document.body, { childList: true, subtree: true })
	}

	// 手动埋点
	// key 自定义参数
	function manual (key) {
		const { url, aurl, method = 'get', header, dataAttr = 'data-stat', ...option } = chaceMeate()
		const data = Object.assign( param, { url }, option, key )
		request({ aurl, method, header, data, })
	}

	// 页面加载完后 自动执行 直接请求后台接口 发送埋点
	function loaderBody () {
		const body = document.body
		const { url, aurl, param, method = 'get', header, dataAttr = 'data-stat', ...option } = chaceMeate()
		// data-stat 是添加在 标签上的属性
		// 例如 <button data-stat='{"key": "{\"自定义属性\": \"1\"}", "act": "自定义事件"}'>埋点</button>
		const dataStat = body.getAttribute('data-stat')
		let data = { param, url, ...option }

		// 如果有自定义属性 拼接到参数里 一起传递给后台
		if (dataStat) {
			const { key } = JSON.parse(dataStat)
			data = {...data, ...key}
		}
		
		setTimeout(request({ aurl, method, header, data, }), 1000)
	}
	
	// 对外暴露的接口
	// 声明式调用 win.pvUv.statement
	/**
	  手动调用埋点 win.pvUv.manual
	 	pvUv.manual({ // 自定义请求参数
			自定义属性: 1,
			自定义属性: 2,
		})
	 */
	win.pvUv = {
		statement,  // 声明式
		manual,  // 手动
  }
  
  // 元素事件自动发送
	// statement()
	// onload 自动发送
	// addEvent(window, 'load', () => {
	// 	statement()
	// 	loaderBody()
	// })

})(window)

export {
	pvUv
}


