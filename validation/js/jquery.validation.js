/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-04-13 15:00:26
 * @version $Id$
 */

(function($){
	$.fn.validation = function(opt){
		var _this = $(this);
		opt = $.extend({}, $.fn.validation.defaults, opt);
		return $(this).each(function(){
			new Validation(_this, opt);
		});
	};
	$.fn.validation.defaults = {
		status: {}
	};

	function Validation(_this, opt){
		this.elem = _this;
		this.opt = opt;
		this.init();
	}

	Validation.prototype = {
		init: function(){
			this.valiate();
			var s = this.getStatus();
			if(this.opt.callback){
				this.opt.callback(s);
			}
		},
		valiate: function(){
			var config = this.opt.config;
			var data = this.opt.data;
			for(var i in config){
				this.opt.status[i] = this[config[i]]( data[i] && data[i] );
			}
		},
		getStatus: function(){
			return this.opt.status;
		},
		isNotEmpty: function(data){
			if(data){
				return true;
			}
			return false;
		},
		isNumber: function(data){
			var re = /[^\d]+/g
			if( data && !re.test(data) ){
				return true;
			}
			return false;
		}
	};
})(jQuery);