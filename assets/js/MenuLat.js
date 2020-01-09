$(function(){
	
    var jMenu = $('.MenuLateral'),
        jBtn = $('#btnMenu')        
    ;


      
        
    jBtn.click(function(){
        (jMenu.hasClass('isMenuOpen')) ? hide() : show();
       
        return false;
    });

 
    // Show
    function show(){
		jMenu.addClass('isMenuOpen');
    }
    
    // Hide
    function hide(){
		jMenu.removeClass('isMenuOpen');
    }


});