! function() {
$(document).ready(function(){
// paralink
    console.log($('.nav').offset())
    $("a.paralink").click(function(){
	console.log(this.href);
	window.open(this.href);
    });
// show and news
    if (location.href.match(/#show(.*)$/)) {
	
	var el = location.href.match(/#show(.*)$/);
	$(el[1]).removeClass('hide');
	var top = $(el[1]).offset().top;
	top = top + "px"
        console.log(top)
        $('html, body').animate({
	    	    	    scrollTop: '"'+top+'"'
//	    	    	    scrollTop: "500px"

        }, 1000);
	
    }
    if (location.href.match(/#news(.*)$/)) {
	console.log('news');
	var el = location.href.match(/#news(.*)$/);


	console.log($(el[1]));
	console.log('clicked');
	$(el[1]).fancybox({
            'autoScale': true,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            'autoDimensions': true,
            'centerOnScroll': true // remove the trailing comma!!
        }).click();


    }
    var titleOnHover = function() {
	console.log("title on hover");
	$(".title-on-hover").hover(function(){
	    	console.log("title on hover 2");
	    var title = $(this).data('title');
	    console.log(title);
	});


    }

    titleOnHover();

});



}()
