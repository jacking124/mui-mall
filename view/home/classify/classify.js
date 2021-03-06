mui.plusReady(function() {
	var search = document.getElementById("search");
	//监听input框键盘事件
	search.addEventListener("keypress", function(e) {
		//当e.keyCode的值为13 即，点击前往/搜索 按键时执行以下操作
		if (e.keyCode == 13) {
			document.activeElement.blur(); //隐藏软键盘  
			var t1 = window.setTimeout(function() {
				classInfo.gotoGoodsClass('')
			}, 500); //使用字符串执行方法
		}
	});
	var classInfo = new Vue({
		el: "#app",
		data: {
			GoodsClassList: [],
			searchString: "",
		},
		computed: {
			mui_col_xs: function() {
				if (os.isTablet) {
					return "mui-col-xs-2";
				} else {
					return "mui-col-xs-4";
				}
			},
		},
		created: function() {
			this.GoodsClassList = classListByCache;
		},
		methods: {
			gotoGoodsClass: function(GoodsClassID) {
				document.activeElement.blur(); //隐藏软键盘  
				var extras = {}
				UIAPI.openWindow("../../search/search.html", "search.html", extras);
				this.searchString = "";
			},
			swichTab: function(index) {
				mui('#slider').slider().gotoItem(index);
			},
		}

	})
	classInfo.$nextTick(function() {
		//阻尼系数
		var deceleration = mui.os.ios ? 0.003 : 0.0009;
		mui('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration: deceleration
		});
	})

})

var os = function() {
	var ua = navigator.userAgent,
		isWindowsPhone = /(?:Windows Phone)/.test(ua),
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
		isAndroid = /(?:Android)/.test(ua),
		isFireFox = /(?:Firefox)/.test(ua),
		isChrome = /(?:Chrome|CriOS)/.test(ua),
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(
			ua)),
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,
		isPc = !isPhone && !isAndroid && !isSymbian;
	return {
		isTablet: isTablet,
		isPhone: isPhone,
		isAndroid: isAndroid,
		isPc: isPc
	};
}();

