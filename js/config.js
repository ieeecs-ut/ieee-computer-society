var carousel_settings = {
	// Carousels
		carousels: {
			speed: 10,
			fadeIn: false,
			fadeDelay: 250
		}
}

window._skel_config = {
	preset: 'standard',
	prefix: '/css/style',
	resetCSS: true
};

window._skel_panels_config = {
	preset: 'standard'
};

	// onVisible
		(function() {
		
			// Vars
				var $window = jQuery(window),
					elements = [],
					delay = 10,
					pad = 0,
					timerId,
					poll = function() {
						var l = elements.length,
							x = $window.scrollTop() + $window.height(),
							i, e;
					
						for (i=0; i < l; i++)
						{
							e = elements[i];

							if (!e.state && x - e.pad > e.o.offset().top)
							{
								e.state = true;
								(e.fn)();
							}
						}
					};

			// Event bindings
				$window.load(function() {

					$window.on('scroll resize', function() {

						// Clear existing timeout (if one exists)
							window.clearTimeout(timerId);

						// Set our poll function to run after (delay)ms (prevents it from running until the user's done scrolling/resizing)
							timerId = window.setTimeout(function() { (poll)(); }, delay);

					}).trigger('resize');

				});

			// onVisible jQuery function (pretty much just adds the element to our list of elements to poll)
				jQuery.fn.n33_onVisible = function(fn, p) {
					elements.push({ o: jQuery(this), fn: fn, pad: (p ? p : pad), state: false });
				};

		})();

// Touch events enabling for some reason :/
jQuery(function() {

	jQuery.fn.n33_formerize=function(){var _fakes=new Array(),_form = jQuery(this);_form.find('input[type=text],textarea').each(function() { var e = jQuery(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = jQuery(this); var x = jQuery(jQuery('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = jQuery(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = jQuery(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { jQuery(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = jQuery(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); jQuery(this).find('select').val(jQuery('option:first').val()); jQuery(this).find('input,textarea').each(function() { var e = jQuery(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
	jQuery.browser={};(function(){jQuery.browser.msie=false;jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

	// Forms (IE <= 9 only)
		if (jQuery.browser.msie && jQuery.browser.version <= 9)
			jQuery('form').n33_formerize();

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$box = $('.box')
			_IEVersion = (navigator.userAgent.match(/MSIE ([0-9]+)\./) ? parseInt(RegExp.$1) : 99),
			//_isTouch = !!('ontouchstart' in window),
			_isMobile = !!(navigator.userAgent.match(/(iPod|iPhone|iPad|Android|IEMobile)/));
	// Initialize carousels
		$('.carousel').each(function() {
			
			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('div');
			
			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;
			
			// Main
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $t.width() - parseInt($reel.css('padding-left'));
					leftLimit = 0;
					$t._updatePos();
				};
			
				if (_IEVersion < 9)
					$t._updatePos = function() { $reel.css('left', pos); };
				else
					$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };
				
			// Forward
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= carousel_settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}
							
							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});
			
			// Backward	
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += carousel_settings.carousels.speed;

							if (pos >= leftLimit)
							{
								window.clearInterval(timerId);
								pos = leftLimit;
							}
							
							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});
					
			// Init
				$window.load(function() {

					reelWidth = $reel[0].scrollWidth;

					skel.onStateChange(function() {
			
						if (_isMobile)	//changed from isTouch
						{
							$reel
								.css('overflow-y', 'hidden')
								.css('overflow-x', 'scroll')
								.scrollLeft(0);
							$forward.hide();
							$backward.hide();
						}
						else
						{ 
							$reel
								.css('overflow', 'visible')
								.scrollLeft(0);
							$forward.show();
							$backward.show();
						}

						$t._update();
					});

					$window.resize(function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});
			
		});

});