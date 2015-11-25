$(function(){
	var $this,
		thisNumber,
		lasturl,
	//put current panel data
		$currentPanel = $('#pageContent').children('.panel'),
	//put current panel's number	
		currentNumber = $currentPanel.data('number'),
	//put defualt content	
		default_content = $('#pageContent').html();
	//execute loadFunc for each landing page
		loadFunc();


	function loadFunc(){
		var panelId = $('.panel').attr('id'),
			scrollHeight = "";//Store scroll height

		if(panelId=='about'){
		//about page background color change	
			$('.about').colorScroll({
				colors: [{
					color: '#222',
					position: 0
				},{
					color: '#dad4d4',
					position: '100%'
				}]
			});
			//about page seemywork fadein/fadeout
				gotoTop = $('#goto-pf').css('bottom'),
				gotoTop = parseInt(gotoTop),
				abtbottomTop = $('#about-bottom').offset().top;
				$(window).on('scroll',function(){
					scrollHeight = $(this).scrollTop() + gotoTop;
					if(abtbottomTop < scrollHeight){
						$('#goto-pf').css('background-image','url(img/about/seemywork.png)');
						$('#goto-pf-img').attr('src','img/arrow-r.png');			
					}else if(scrollHeight < abtbottomTop){
						$('#goto-pf').css('background-image','url(img/about/seemywork-w.png)');
						$('#goto-pf-img').attr('src','img/arrow-rw.png');			
					}
				});
		}//about page function

		//Gazette page function
		if(panelId=='gazettemag'){
			var	gztConcept = $('#gzt-concept').offset().top,
				gztAds = $('#gzt-ads').offset().top,
				gztCirc = $('#gzt-circ').offset().top;
			$(window).on('scroll',function(){
				scrollHeight = $(this).scrollTop();
				if(gztConcept < scrollHeight && scrollHeight < gztAds){
					$('#gofrom-gzt').css('background-image','url(img/contactme-w.png)');
					$('#gofrom-gzt-img').attr('src','img/arrow-rw.png');
					$('#backfrom-gzt-img').attr('src','img/arrow-lw.png');
				}else{
					$('#gofrom-gzt').css('background-image','url(img/contactme.png)');
					$('#gofrom-gzt-img').attr('src','img/arrow-r.png');
					$('#backfrom-gzt-img').attr('src','img/arrow-l.png');	
				}

				if(gztAds < scrollHeight && scrollHeight < gztCirc){
					$('#gzt-ads').addClass('active');
				}else{
					$('#gzt-ads').removeClass('active');
				}
			});
			
			$('body').bind('mousewheel DOMMouseScroll click', function(event){
				if($('#gzt-ads').hasClass('active')){
					$('.gzt-adphone-inner').addClass("active");
					$('.gzt-adtablet-inner').addClass("active");
					$('.gzt-adtablet-h-inner').addClass("active");
				}else{
					$('.gzt-adphone-inner').removeClass("active");
					$('.gzt-adtablet-inner').removeClass("active");
					$('.gzt-adtablet-h-inner').removeClass("active");
				}
			});
		}

		//contact form
		if(panelId=='contact'){
			// Get the form.
			var form = $('#contact-form');
			var formMessages = $('#form-messages');
			// Set up an event listener for the contact form.
			$(form).submit(function(e) {
				e.preventDefault();
				$('#sending').css('visibility','visible');
				var formData = $(form).serialize();
				$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					data: formData
				})
				.done(function(response) {
					$('#sending').css('visibility','hidden');
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');
					$(formMessages).text(response);
					$('#name').val('');
					$('#email').val('');
					$('#message').val('');
				})
				.fail(function(data) {
					$('#sending').css('visibility','hidden');
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');
					if (data.responseText !== '') {
						$(formMessages).text(data.responseText);
					} else {
						$(formMessages).text('Oops! An error occured and your message could not be sent.');
					}
				});
			});
		}//finish contact form

	}//finish loadFunc()

	//Detect changing hash tag
	window.onhashchange = hashChange;
	function hashChange(){
		if(location.hash == "#home"){
			thisNumber = 1;
		}else if(location.hash == "#about"){
			thisNumber = 2;
		}else if(location.hash == "#portfolio"){
			thisNumber = 3;
		}else if(location.hash == "#gazettemag"){
			thisNumber = 4;
		}else if(location.hash == "#ubcbaja"){
			thisNumber = 5;
		}else if(location.hash == "#newsportal"){
			thisNumber = 6;
		}else if(location.hash == "#ecommerce"){
			thisNumber = 7;
		}else if(location.hash == "#reggiekey"){
			thisNumber = 8;
		}else if(location.hash == "#wazabibuzz"){
			thisNumber = 9;
		}else if(location.hash == "#typography"){
			thisNumber = 10;
		}else if(location.hash == "#contact"){
			thisNumber = 11;
		}else if(location.hash == ""){//If the first landing page is index.php, it doesn't have a hash so it needs to be put a hash.
			location.hash = "#home";
			thisNumber = 1;
		}
		checkURL(location.hash);
	}
		
	//Checking hash tag
	function checkURL(hash){
		if(!hash) hash=window.location.hash;
		
		if(hash != lasturl){
			lasturl=hash;
			
			if(hash==""){
				$('#pageContent').html(default_content);
			}else{
				loadPage(hash);
			}
		}else if(hash == lasturl){
			return false;
		}
	}
	
	//Fetching next page data
	function loadPage(urlName){
		urlName=urlName.replace('#','');
		$('#ajaxloader').css('visibility','visible');
		
		$.ajax({
			type: "POST",
			url: "load_page.php",
			data: 'page='+urlName,
			dataType: "html",
			success: function(content){
				if(parseInt(content)!=0)
				{		    
					pageSlide(content);
				}
			}
		});
	}
	
	//Slide out current page and slide in next page
	function pageSlide(data){
		var thisTarget = location.hash;//deprecated catching a hash from $this.attr('href');
			$('#pageContent').append(data);
		var	$thisPanel = $('#pageContent').children(thisTarget);
			$thisPanel.css('opacity',0);
			
		$(window).on('load', function(){//wait for image loading
			if($thisPanel.attr('id') == 'portfolio'){
				var $section = $('.portfolio').children('section');
				$section.each(function(index, element){
					var id = $(element).attr('id'),
						background = $(element).data('background');
					$('#'+id).css('background-image','url('+background+')');					
				});
			}
			//Hide ajax loader
			$('#ajaxloader').css('visibility','hidden');
			//not let backto and goto buttons move.
			$('#backto').css('position','absolute');
			$('#backfrom-gzt').css('position','absolute');
			$('#goto').css('position','absolute');
			$('#goto-pf').css('position','absolute');
			$('#goto-contact').css('position','absolute');
			$('#gofrom-gzt').css('position','absolute');
			var windowWidth = $(window).width();

			if(currentNumber < thisNumber){
				$currentPanel
					.stop()
					.animate({
								left:-(windowWidth)
							},500);
				$("body,html").animate({scrollTop:0},500);	
				$thisPanel.css({
					opacity:1,
					left: windowWidth,
				})
					.stop()
					.animate({
						left:0,
						},{
						duration:500,
						complete:function(){
								// window.scrollTo(0,0);
								$('#pageContent').children().not($thisPanel).remove();
								$currentPanel = $thisPanel;
								currentNumber = thisNumber;
								$('#backto').css('position','fixed');
								$('#backfrom-gzt').css('position','fixed');
								$('#goto').css('position','fixed');
								$('#goto-pf').css('position','fixed');
								$('#goto-contact').css('position','fixed');
								$('#gofrom-gzt').css('position','fixed');
								loadFunc();
								$(window).off('load');
							}
						});
			}else if(thisNumber < currentNumber){
				$currentPanel
					.stop()
					.animate({
							left : windowWidth,
						}, 500);
				
				$("body,html").animate({scrollTop:0},500);	
				$thisPanel.css({
					opacity:1,
					left:-(windowWidth),
				})
					.stop()
					.animate({
						left:0,
						},{
						duration:500,
						complete:function(){
								// window.scrollTo(0,0);
								$('#pageContent').children().not($thisPanel).remove();
								$currentPanel = $thisPanel;
								currentNumber = thisNumber;
								$('#backto').css('position','fixed');
								$('#backfrom-gzt').css('position','fixed');
								$('#goto').css('position','fixed');
								$('#goto-pf').css('position','fixed');
								$('#goto-contact').css('position','fixed');
								$('#gofrom-gzt').css('position','fixed');
								loadFunc();
								$(window).off('load');
							}
						});
			}
		});
		$(window).trigger('load');//Trigger window load						
	}//pageSlide()
		
});	
