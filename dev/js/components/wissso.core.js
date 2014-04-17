// 函数创建一个命名空间
//Cloud Atlas命名空间的实现方法
var WISSSO = window.WISSSO || {};
(function () {
	WISSSO.namespace = function(ns) {
	    if (!ns || !ns.length) {
	        return null;
	    }
	    var levels = ns.split(".");
		var nsobj = WISSSO;
		//如果申请的命名空间是在CA下的，则必须忽略它，否则就成了CA.CA了
		for (var i=(levels[0] == "WISSSO") ? 1 : 0; i < levels.length; ++i) {
		    //如果当前命名空间下不存在，则新建一个关联数组。
		    nsobj[levels[i]] = nsobj[levels[i]] || {};
		    nsobj = nsobj[levels[i]];
		}
		//返回所申请命名空间的一个引用；
		    return nsobj;
	};
})();
