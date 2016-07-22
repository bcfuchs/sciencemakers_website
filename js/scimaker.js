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
    /** vars */
    var feed_url = 'http://mobilecollective.co.uk/?feed=rss2&tag=sciencemakers'
    var blogel = $('<div id="slide-8" class="slide story slide-8" data-slide="8"></div>')
    var headline = '<div class="row title-row"><div class="col-12 font-light">Our <span class="font-semibold">News</span></div></div>';
    var containerel = $('<div class="container"></div>');
    var sliderel = $('<div class="slider"></div>');
    var row =  $('<div class="row"></div>');

    
    /** functions */

    function scroll_to_div() {
	console.log('scrool-to-div');
	console.log($("#slide-8").offset().top);
	$('html, body').animate({
	    scrollTop: $("#slide-8").offset().top
	}, 2000);

    }
    // get data from xml
    // note - jquery can't handle namespaces, so <text:encoded/> -> find("encoded")
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
	

    function add_to_blog (d,cb) {
	var item = $("#item-template").clone().attr('id','');
	// object keys match classes in template
	for (var i in d) {
	    $(item).find("."+i).append(d[i]);
	}
	var link = $(item).find(".link");
	var href = $(link).text();	
	$(item).find(".link").html('<a href="'+href+'">'+href+'</a>');
	cb(item);

	
	var div = $("<div></div>");

	    // we could just load a fragment, but then we get unwanted elements...	    
//	    $(containerel).append($(div).load(href + " .blog-post",function(){console.log("loaded")}));
	}


    function erase() {
	if ($('#slide-8').length) {
	    $('#slide-8').html('');
	    $('#slide-8').remove();
	    containerel = $('<div class="container"></div>');
	    sliderel = $('<div class="slider"></div>');
	    return 1;
	}
	return 0;
    }
    // create summary boxes linked to full blog post
    var doSummary = function() {
	if (erase())
	    return


	var make_popup = function(el) {

	    return $($(el).clone()).fancybox({
		'autoScale': true,
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'speedIn': 500,
		'speedOut': 300,
		'autoDimensions': true,
		'centerOnScroll': true,
		padding: 2,
		titleShow: true,
		overlayColor: '#111',
		afterClose: scroll_to_div    // note value changes as fboxes are removed...
	    });

	    
	}

	var make_box = function(d) {
	    var img = $(d.content).find("img")[0];
	    var grad = 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%)';
	    var gradhover = 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%)';
	    var box = $("#post-summary-template").clone().attr('id','')
	    var hoverBlogPost = function(e) {
		$(this).css('background-image','');
		$(this).css('background-image',gradhover + ',url("'+$(img).attr('src')+'")');
	    }
	    var hoverOut = function(e) {
		$(this).css('background-image','');
		$(this).css('background-image',grad + ',url("'+$(img).attr('src')+'")');
	    }
	    $(box).css('background-image',grad + ',url("'+$(img).attr('src')+'")');

	    $(box).hover(hoverBlogPost,hoverOut);

	    $(box).find(".title").html(d.title);
	    $(box).find(".description").html(d.description);
	    var popup = make_popup(box);
	    $(box).click(function(){ popup.click()});
	    $(sliderel).append(box);

	}
	var process_data = function(data) {
	    $(data).find("item").each(function() {
		// make a preview box for loading into slider
		var el = $(this);
		console.log("getting data...");
		var d = get_data(el);
		make_box(d)

	    });
	    $(blogel).append(sliderel);
	    $('#slide-6').after(blogel)
	    scroll_to_div();
	}

	
	$.get(feed_url, process_data);
    }
    var doBlog = function() {
	if (erase())
	    return
	



	
	var add_to_page = function() {
	    $(blogel).append(containerel)
	    $('#slide-6').after(blogel)
	}
	


	var process_data = function (data) {
	    $(containerel).append(headline);
	    var i = 0;
	    $(data).find("item").each(
		function (i) { 

		    var el = $(this);
		    var d = get_data(el);

		    var date = Date.parse(d.pubdate);
		    var id = "blogpost-" +date;
		    var atb_cb = function(item) {
			
			$(containerel).append($(row).clone().attr('id',id).append(item));
		    }
		    add_to_blog(d,atb_cb)
		    console.log(d)
		    
		    //     $('body').prepend(el.find('encoded').text())
		    
		});
	    add_to_page()
	    scroll_to_div();
	}
	
    	$.get(feed_url, process_data);

    }
    var show_devtools = function(e) {
	$("#devtools").toggleClass("hide");	
    }
    
    $(document).ready(function(){
	easterEgg('s',doBlog);
	easterEgg('t',doSummary);
	easterEgg('d',show_devtools);
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
