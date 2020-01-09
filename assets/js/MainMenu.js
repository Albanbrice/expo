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
				
				
				if (jBtn.hasClass("map-opened")){
					return false;
				}
				
                jBtn.toggleClass('isMenuOpen');
                (jBtn.hasClass('isMenuOpen')) ? MainMenu.open() : MainMenu.close();

                return false;
            });

            jItemTitle.not(':eq(0)').click(function(){

                var elem = $(this).next('.ItemMenu-list');
                MainMenu.openItem(elem);

                return false;

            });
            
            // Focus sur un element du menu
            var jLinks = $('.MenuLateral-nav a');
            jLinks.focus(function() {		
                if(!jBtn.hasClass('isMenuOpen')){
                    jBtn.addClass('isMenuOpen');
                    MainMenu.open();
                }
            });
            
            // Ajout parent actif menu 
            $('.ItemMenu-list li a.active').parents('.ItemMenu').find('.ItemMenu-title').addClass('active');
            

        },

        /**
        * Ouvre le menu principal
        **/
        open: function() {

            jOverlay.show();
			_initScroll();

            vTL = new TimelineLite()
                .to(jMenu, .4, {css:{className:'+=isMenuOpen'}, ease: Power4.EaseOut})
                //.to(jItem, .3, {autoAlpha:0, y:"+=20", ease: Power4.EaseOut}, "=-.3")
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
				.to($('.ItemMenu-list'), .5, {css:{className:'-=isItemOpen'}, ease: Power4.EaseIn})
			;

        },

        /**
        * Ouvre un item du menu
        **/
        openItem: function(elem) {

            var jLiElem = $('li', elem);

            /**
            * Si aucun élément est ouvert : on ouvre l'élément courant
            **/
            if($('.isItemOpen').length == 0){


                vTL = new TimelineLite()
                    .to(elem, .3, {css:{className:'+=isItemOpen'}, ease: Power4.EaseOut})
                    .staggerFromTo(jLiElem, .2,  {autoAlpha: 0}, {autoAlpha:1, ease: Power4.EaseOut}, .05, "=-.1")
                ;
                vTL.seek(vTL.totalDuration()).pause(0);
                vTL.play();

            }

            /**
            * Si l'élément courant est déjà ouvert : on le replie
            **/
            else if(elem.hasClass('isItemOpen')){

                vTL = new TimelineLite()
                    .staggerFromTo(jLiElem, .2, {autoAlpha: 1}, {autoAlpha:0, ease: Power4.EaseIn}, -.05)
                    .to(elem, .4, {css:{className:'-=isItemOpen'}, ease: Power4.EaseIn}, "=-.2")
                ;
                vTL.seek(vTL.totalDuration()).pause(0);
                vTL.play();

            }

            /**
            * Si un autre élément est déjà ouvert : on replie le old et on ouvre le nouveau
            **/
            else{

                var jElemOld = $('.isItemOpen');
                var jLiElemOld = $('li', jElemOld);

                vTL = new TimelineLite()
                    .to(elem, .4, {css:{className:'+=isItemOpen'}, ease: Power4.EaseOut})
                    .staggerFromTo(jLiElem, .2, {autoAlpha: 0}, {autoAlpha:1, ease: Power4.EaseOut}, .05, "=-.55")
                    .staggerFromTo(jLiElemOld, .2, {autoAlpha: 1}, {autoAlpha:0, ease: Power4.EaseIn}, -.05, "=-.6")
                    .to(jElemOld, .4, {css:{className:'-=isItemOpen'}, ease: Power4.EaseIn}, "=-.2")
                ;
                vTL.seek(vTL.totalDuration()).pause(0);
                vTL.play();

            }

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