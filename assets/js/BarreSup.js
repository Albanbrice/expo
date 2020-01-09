$(function(){
	
    var jHeader = $('.SiteHeader'),
        jBtn = $('.SiteHeader-open')
    ;
    
    if($('.front').length > 0){
        // On fait apparaître la barre des sites du ministère
        
        show();

        var timeout = setTimeout(function(){
            // On cache la barre
            hide();
        }, 4000);
    }
    
    
    jBtn.click(function(){
        (jHeader.hasClass('show')) ? hide() : show();
        clearTimeout(timeout);
        
        return false;
    });
    
    /*jHeader.hover(
      function() {
        show();
      }, function() {
        hide();
      }
    );*/
    
    // Show
    function show(){
//        TweenLite.to(jHeader, 0.8, {css:{className: "+=show"}, ease:Power3.easeInOut});
		jHeader.addClass("show");
    }
    
    // Hide
    function hide(){
//        TweenLite.to(jHeader, 0.8, {css:{className: "-=show"}, ease:Power3.easeInOut});
		
		jHeader.removeClass("show");
    }

});