var MainMenu = (function(){

    var jBtn = $('#btnMenu, .btnMenu'),
        jMenu = $('.MenuLateral'),
        jSlider = $('.MenuLateral-container'),
        jItem = $('.ItemMenu'),
        jItemTitle = $('.ItemMenu-title', jItem),
        jItemList = $('.ItemMenu-list', jItem),
        jOverlay = null
    ;

    var localMainMenu = {

        /**
        * Initialisation
        **/
        init: function() {

            $('body').append('<div class="overlay"></div>');
            jOverlay = $('.overlay');

            jBtn.add(jOverlay).click(function(e){
				
				

				
                jBtn.toggleClass('isMenuOpen');
                (jBtn.hasClass('isMenuOpen')) ? MainMenu.open() : MainMenu.close();

                return false;
            });

  

        },

        /**
        * Ouvre le menu principal
        **/
        open: function() {

            jOverlay.show();
			_initScroll();

            vTL = new TimelineLite()
                .to(jMenu, .4, {css:{className:'+=isMenuOpen'}, ease: Power4.EaseOut})
                // .to(jItem, .3, {autoAlpha:0, y:"+=20", ease: Power4.EaseOut}, "=-.3")
            ;
            vTL.seek(vTL.totalDuration()).pause(0);
            vTL.play();

        },

        /**
        * Referme le menu principal
        **/
        close: function() {

            jOverlay.hide();
			_resetScroll();
			return new TimelineLite()
				.to(jMenu, .5, {css:{className:'-=isMenuOpen'}, ease: Power4.EaseIn})
				// .to($('.ItemMenu-list'), .5, {css:{className:'-=isItemOpen'}, ease: Power4.EaseIn})
			;

        },

        

    };
	
	
	
	var _mouswheelHandler;
	
	function _initScroll (){
		
		var scrollTop = 0,
			jContainer = jSlider
		;
		jContainer.scrollTop(scrollTop);
		
		_mouswheelHandler = function(e, d){

			scrollTop += d * -20;
			jContainer.scrollTop(scrollTop)
			scrollTop = Math.max(0, Math.min(jContainer.scrollTop(), scrollTop));

			e.stopImmediatePropagation();
			return false;
		};
		
		$(document).mousewheel(_mouswheelHandler);
		
	}
	
	function _resetScroll(){
		$(document).unmousewheel(_mouswheelHandler);
	}

    return localMainMenu;
	
	
})();

$(document).ready(function() {
    
    MainMenu.init();
	
	var k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
		n = 0;
	$(document).keydown(function (e) {
		if (e.keyCode === k[n++]) {
			if (n === k.length) {
				alert('Konami !!!');
				return !1;
			}
		} else k = 0
	});
    
});