"use strict";

import 'expose-loader?$!jquery';
import './vendor/slick.min.js';


$(() => {
	var myWidth = 0,
		myHeight = 0,
		isMain = $("body.main").length,
		isMobileMd = false,
		isMobile = false;
	// function calcInvest(){
	// 	var cols = [0, 0, 0];
 //    	$(".indust-thumbs__item").each(function(){

 //    	});
 //    }

 	if( isMain ){	
	 	$(".b-go").click(function(){
			var block = $( $(this).attr("data-block") ),
				off = $(this).attr("data-offset")||106,
				duration = $(this).attr("data-duration")||400;

				$("body, html").animate({
					scrollTop : block.offset().top-off
				},duration);
			return false;
		});
	}else{
		$(".b-go").each(function(){
			$(this).find("a").attr("href", $(".header-logo").attr("href") + "#" + $(this).attr("data-hash") );
		});
	}

	function resize(tog){
	    if( typeof( window.innerWidth ) == 'number' ) {
	        myWidth = window.innerWidth;
	        myHeight = window.innerHeight;
	    } else if( document.documentElement && ( document.documentElement.clientWidth || 
	    document.documentElement.clientHeight ) ) {
	        myWidth = document.documentElement.clientWidth;
	        myHeight = document.documentElement.clientHeight;
	    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	        myWidth = document.body.clientWidth;
	        myHeight = document.body.clientHeight;
	    }

	    if( $(".papers").length ){
	    	calcWhitePapersHeight();
	    }

	    if( $(".indust-thumbs__item").length ){
	    	moveIndustHover($(".indust-thumbs__item.active"));
	    }

	    $(".customers__item").each(function(){
	    	var height = $(this).height();
	    	$(this).find(".customers__item-front").css("height", height);
	    });

	    if( $(".main-careers").length ){
	    	if( !isMobileMd && myWidth < 480 ){
	    		careersMobile();
	    		isMobileMd = true;
	    	}else if( isMobileMd && myWidth >= 480 ){
	    		careersDesktop();
	    		isMobileMd = false;
	    	}
	    }

	    if( $(".main-customers").length ){
	    	if( !isMobile && myWidth < 768 ){
	    		customersMobile();
	    		isMobile = true;
	    	}else if( isMobile && myWidth >= 768 ){
	    		customersDesktop();
	    		isMobile = false;
	    	}
	    }
	}

	function whenScroll(){
		var scroll = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		
		if( scroll > 1 ){
			$(".header-fixed").addClass("fixed");
		}else{
			$(".header-fixed").removeClass("fixed");
		}

		if( isMain ){
			$(".b-go.active").removeClass("active");

			highLightMenu(scroll);
		}
	}

	function highLightMenu(scroll){
		for( var i = $(".b-go").length - 1; i >= 0; i-- ){
			var $el = $(".b-go").eq(i),
				$block = $( $el.attr("data-block") );

			if( scroll + myHeight/2 + 50 > $block.offset().top ){
				$el.addClass("active");
				// window.location.hash = $el.attr("data-hash");
				return true;
			}
		}
		return true;
	}

	if( window.location.hash != "" ){
		var hash = window.location.hash.substring(1);

		if( isMain && $(".b-go[data-hash='"+hash+"']").length ){
			$(".b-go[data-hash='"+hash+"']").click();
		}
	}

	$(".main-about .news-item__more").click(function(){
		$(this).parents(".main-about").find(".mobile-hidden").fadeIn(300);
		$(this).hide();
	});

	// Main Indust Slide --------------------------------- Main Indust Slide
	$('.indust-slider').slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,  
        cssEase: 'ease', 
        speed: 500,
        fade: true,
        prevArrow: '<div class="slick-arrow-left icon-arrow-left"></div>',
        nextArrow: '<div class="slick-arrow-right icon-arrow-right"></div>',
        adaptiveHeight: true,
        responsive: [
	    	{
	    		breakpoint: 768,
	    		settings: {
	    			fade: false
	    		}
	    	}
	  	]
    }); 

    if( $(".indust-thumbs__item").length ){
    	$(".indust-thumbs__item").eq(0).addClass("active");

    	$(".indust-thumbs__item").click(function(){
    		$(".indust-slider").slick("slickGoTo", $(this).index());

    		return false;
    	});

    	var menuTimer = null;
    	$(".indust-thumbs__item").hover(function(){
    		clearTimeout(menuTimer);

    		moveIndustHover($(this));
    	}, function(){
    		menuTimer = setTimeout(function(){
    			moveIndustHover($(".indust-thumbs__item.active"));
    		}, 300);
    	});

    	$('.indust-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	    	$(".indust-thumbs__item.active").removeClass("active");
	        $(".indust-thumbs__item").eq(nextSlide).addClass("active");
	        moveIndustHover($(".indust-thumbs__item.active"));
	    });
    }
    function moveIndustHover($el){
		$(".indust-thumbs__hover").css({
			width: $el.width() + 25,
			height: $el.height() + 30,
			left: $el.position().left - 20,
			top: $el.position().top - 15
		});
	}
    // Main Indust Slide --------------------------------- Main Indust Slide

    // Main Stacks Slide --------------------------------- Main Stacks Slide
    $('.stacks').slick({
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,  
        cssEase: 'ease', 
        speed: 500,
        prevArrow: '<div class="slick-arrow-left icon-arrow-left"></div>',
        nextArrow: '<div class="slick-arrow-right icon-arrow-right"></div>',
        adaptiveHeight: true,
        responsive: [
	    	{
	    		breakpoint: 768,
	    		settings: {
	    			slidesToShow: 2,
	    			slidesToScroll: 1
	    		}
	    	},
	    	{
	    		breakpoint: 480,
	    		settings: {
	    			slidesToShow: 1,
	    			slidesToScroll: 1
	    		}
	    	}
	  	]
    });
    // Main Stacks Slide --------------------------------- Main Stacks Slide

    // Main Customers Slide ------------------------------ Main Customers Slide
    $(".customers__item").hover(function(){
    	if( myWidth > 768 ){
    		var height = $(this).height() - $(this).find(".customers__item-text").height() - 28;
    		$(this).find(".customers__item-front").css("height", height);
    	}
    }, function(){
    	var height = $(this).height();
    	$(this).find(".customers__item-front").css("height", height);
    });

    function customersDesktop(){

    }
    
    function customersMobile(){
    	$('.customers').slick({
	        dots: false,
	        slidesToShow: 2,
	        slidesToScroll: 2,
	        infinite: true,  
	        cssEase: 'ease', 
	        speed: 500,
	        prevArrow: '<div class="slick-arrow-left icon-arrow-left light"></div>',
	        nextArrow: '<div class="slick-arrow-right icon-arrow-right light"></div>',
	        adaptiveHeight: true,
	        responsive: [
	        	{
		    		breakpoint: 5000,
		    		settings: "unslick"
		    	},
		    	{
		    		breakpoint: 768,
		    		settings: {
		    			slidesToShow: 2,
		    			slidesToScroll: 1,
		    			centerPadding: '13px',
		    		}
		    	},
		    	{
		    		breakpoint: 480,
		    		settings: {
		    			slidesToShow: 1,
		    			slidesToScroll: 1
		    		}
		    	}
		  	]
	    });
    }
    // Main Customers Slide ------------------------------ Main Customers Slide

    // Main Careers Slide -------------------------------- Main Careers Slide
    $("body").on("click", ".job-list__more", function(){
    	var $cont = $(this).parents(".job-list");

    	$cont.addClass("opened");
    	$(this).hide();

    	return false;
    });

    var careersTog = false;
    function careersMobile(){
    	var index = $(".tabs-block.active .vacancy-item.active").index();
		$(".vacancy-item.active").removeClass("active");
		$(".tabs-block.active .vacancy-item").eq(index).click();

    	if( careersTog ) return true;

    	$(".job-list").animate({
			height: "hide",
			opacity: 0
		}).removeClass("active");

		careersTog = true;
    }

	function careersDesktop(){
		var index = $(".tabs-block.active .vacancy-item.active").index();
		$(".job-list").hide();
		$(".vacancy-item.active").removeClass("active");

		$(".tabs-block.active .vacancy-item").eq(index).click();
	}

    $(".vacancy-item").click(function(e, toggle){
    	if( $(this).hasClass("active") ) return false;
    	var $cont = $(this).parents(".tabs-block");

    	$cont.find(".vacancy-item.active").removeClass("active");

    	if( myWidth >= 480 ){
    		$cont.find(".tabs-block__jobs").html( $("#"+$(this).attr("data-id")).clone() );
    		$(this).addClass("active");
    	}else{
    		if( toggle !== true ){
    			$cont.find(".job-list.active").animate({
	    			height: "hide",
	    			opacity: 0
	    		}).removeClass("active");

	    		$("#"+$(this).attr("data-id")).animate({
	    			height: "show",
	    			opacity: 1
	    		}).addClass("active");

	    		$(this).addClass("active");
    		}
    	}

    	return false;
    });

    $(".tabs__item").click(function(){
    	if( $(this).hasClass("active") ) return false;

    	$(".tabs__item.active").removeClass("active");
    	$(".tabs-block.active").fadeOut(0).removeClass("active");
    	$("#"+$(this).attr("data-id"))
    		.fadeIn(0)
    		.addClass("active")
    		.find(".vacancy-item").eq(0).trigger("click", true);

    	$(this).addClass("active");

    	return false;
    });
    // Main Careers Slide -------------------------------- Main Careers Slide

    // White Papers -------------------------------------- White Papers
    function calcWhitePapersHeight(){
    	var items = [],
    		index = 0,
    		prevPos = $(".papers-item").eq(0).position().top;
    	$(".papers-item").css("height", "auto");
    	$(".papers-item").each(function(){
    		if( $(this).position().top != prevPos ){
    			index++;
    		}
    		if( typeof items[index] != "object" ){
    			items[index] = [];
    		}
    		items[index].push($(this));

    		prevPos = $(this).position().top;
    	});

    	for( var i in items ){
    		var maxHeight = 0;
    		for( var $item of items[i] ){
    			if( maxHeight < $item.height() ){
    				maxHeight = $item.height();
    			}
    		}

			for( var $item of items[i] ){
				$item.css("height", maxHeight);
    		}    		
    	}
    }
    // White Papers -------------------------------------- White Papers

    // Show animation ------------------------------------ Show animation
    $(".show-anim").each(function(){
        var $this = $(this),
        	delay = 150;

        $this.css("display", "inline-block");
        setTimeout(function(){
            setTimeout(function(){
                $this.addClass("show");
            }, 10);
        }, $this.index()*delay + delay);
    });
	// Show animation ------------------------------------ Show animation

	$(window).resize(resize);
    resize();

    $(window).scroll(whenScroll);
	$(window).on("load", whenScroll);

	if( $(".tabs__item").length ){
    	$(".tabs__item").eq(0).click();
    }
});