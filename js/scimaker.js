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



! function() {
    /** constants */
    var feed_url = 'http://mobilecollective.co.uk/?feed=rss2&tag=sciencemakers'

    /** functions */
    // get data from xml
    // note - jquery can't handle namespaces, so text:encoded -> find("encoded")
	function get_data (el) {
	    var data = {}
	    data.author = el.find("creator").text()
	    data.title = el.find("title").text()
	    data.description = el.find("description").text()
	    data.content= el.find("encoded").text();
	    data.link = el.find("link").text();
	    data.pubdate = el.find("pubDate").text();
	    return data;


	}

    function erase() {
	if ($('#slide-8').length) {
	    $('#slide-8').remove();
	    return 1;
	}
	return 0;
    }
    var doSummary = function() {
	if (erase())
	    return
	
	var process_data = function() {
	    $(data).find("item").each(function() {

	    });
	}
    	$.get(feed_url, process_data);
    }
    var doBlog = function() {
	if (erase())
	    return
	
	var blogel = $('<div id="slide-8" class="slide story slide-8"></div>')

	var containerel = $('<div class="container"></div>');
	
	

	var add_to_blog = function(d) {
	    var item = $("#item-template").clone().attr('id','');

	    for (var i in d) {
		
		
		$(item).find("."+i).append(d[i]);
	    }
	    var link = $(item).find(".link");
	    var href = $(link).text();

	    $(item).find(".link").html('<a href="'+href+'">'+href+'</a>');
	    $(containerel).append(item);
	    var div = $("<div></div>");
// we could just load a fragment, but then we get unwanted elements...	    
//	    $(containerel).append($(div).load(href + " .blog-post",function(){console.log("loaded")}));
	}

	var add_to_page = function() {
	    $(blogel).append(containerel)
	    $('#slide-6').after(blogel)
	}
	


	var process_data = function (data) {

	    $(data).find("item").each(
		function () { // or "item" or whatever suits your feed
		    var el = $(this);
		    var d = get_data(el);
		    add_to_blog(d)
		    console.log(d)
		    
		    //     $('body').prepend(el.find('encoded').text())
		    
		});
	    add_to_page()
	    $('html, body').animate({
		scrollTop: $("#slide-8").offset().top
	    }, 2000);
	}
	
    	$.get(feed_url, process_data);

    }

    $(document).ready(function(){
	easterEgg('s',doBlog);

    });

    function easterEgg(pass,f) {
	var easterEgg = pass;
	var eggLength = easterEgg.length;
	var keyHistory = '';
	var match;
	//log('easterEgg');
	jQuery(document).keypress(function(e) {
	    keyHistory += String.fromCharCode(e.which)
	    match = keyHistory.match(easterEgg);
	    if(match) {
		f();

		keyHistory = match = '';
	    } else if (keyHistory.length > 30) {
		keyHistory = keyHistory.substr((keyHistory.length - eggLength - 1));
	    }
	});
    }

} ();
