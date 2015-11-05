$(function(){
	var $this,
		default_content,
		$currentPanel,
		currentNumber,
		lasturl;
		
	//put current panel data
		$currentPanel = $('#pageContent').children('.panel');
		currentNumber = $currentPanel.data('number');
		default_content = $('#pageContent').html();
	//put navs in footer to object	
		var $navFooter = $('#navbar-ul').find('.nav');
		navClick($navFooter);
	//execute loadFunc to put navs in panael
		loadFunc();

	//click action to move to next page
	function navClick($nav){
		$nav.click(function (e){
				$(window).off('scroll');//when link is clicked, seemywork scroll function stops.
				$this = $(this);
				checkURL(this.hash);
				e.preventDefault();
		});
	}
	
	function loadFunc(){
	//put navs in panel	to object
		var $navPanel = $('.panel').find('.nav');
		navClick($navPanel);
				
		var panelId = $('.panel').attr('id');
		//execute powertip which is following cursor.	
		if(panelId!='home'||panelId!='about'||panelId!='contact'){
			$('.tip').powerTip({
				followMouse: true,
				placement:'e'
			});
			$('#offtip1,#offtip2').hover(function(){
					$.powerTip.hide();
				},function(){
					$.powerTip.show($('.tip'));
			});
		}

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
			var scrollHeight,
				leadHeight = $('.about-lead-sec').innerHeight(),
				gotoHeight = $('#goto').innerHeight(),
				gotoTop = $('#goto').css('bottom'),
				gotoTop = parseInt(gotoTop),
				trsPoint = leadHeight - gotoHeight - gotoTop;
				console.log(gotoTop);
				$(window).on('scroll',function(){
					scrollHeight = $(this).scrollTop();					
					if(trsPoint < scrollHeight){
						$('#goto').css('background-image','url(img/about/seemywork.png)');
						$('#goto-pf-img').attr('src','img/arrow-r.png')					
					}else if(scrollHeight < trsPoint){
						$('#goto').css('background-image','url(img/about/seemywork-w.png)');
						$('#goto-pf-img').attr('src','img/arrow-rw.png')					
					}
				});
		}//about page function
		
		if(panelId=='portfolio'){
			var scrollHeight,
				prtUbc = $('#portfolio-ubc').innerHeight(),
				prtNwp = $('#portfolio-nwp').innerHeight()+prtUbc,
				prtEcm = $('#portfolio-ecm').innerHeight()+prtNwp,
				prtRgk = $('#portfolio-rgk').innerHeight()+prtEcm,
				prtWzb = $('#portfolio-wzb').innerHeight()+prtRgk,
				prtEas = $('#portfolio-eas').innerHeight()+prtWzb,
				gotoH=$('#goto').innerHeight(),
				gotoTop=$('#goto').css('top'),
				gotoTop = parseInt(gotoTop);
				
				$(window).on('scroll',function(){
					scrollHeight = $(this).scrollTop()+gotoH+gotoTop;
						if(
							prtNwp<scrollHeight&scrollHeight<prtEcm||
							prtRgk<scrollHeight&scrollHeight<prtWzb
						){
							$('#goto-contact-img').attr('src','img/arrow-r.png');
							$('#goto').css('background-image','url(img/contactme.png)');
						}
						
						if(
							prtUbc<scrollHeight&scrollHeight<prtNwp||
							prtEcm<scrollHeight&scrollHeight<prtRgk||
							prtWzb<scrollHeight&scrollHeight<prtEas
						){
							$('#goto-contact-img').attr('src','img/arrow-rw.png');
							$('#goto').css('background-image','url(img/contactme-w.png)');
						} 
				});
			}//portfolio page function
	
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
	function loadPage(urlName)
	{
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
		var thisTarget = $this.attr('href');
			$('#pageContent').append(data);
		var $thisPanel = $('#pageContent').children(thisTarget);
			$thisPanel.css('opacity',0);
			
		$(window).on('load', function(){//wait for image loading
			//load background image on portfolio page
			if($thisPanel.attr('id') == 'portfolio'){
				var $section = $('.portfolio').children('section');
				$section.each(function(index, element){
					var id = $(element).attr('id');
					var background = $(element).data('background');
					$('#'+id).css('background-image','url('+background+')');					
				});
			}
			
			$('#ajaxloader').css('visibility','hidden');
			
			var	thisWidth = $thisPanel.width(),
				thisNumber = $this.data('number'),
				currentWidth = $currentPanel.width();
				$('#backto').css('position','absolute');
				$('#goto').css('position','absolute');
				
					if(currentNumber < thisNumber){
						$("body,html").animate({scrollTop:0},500);
						$currentPanel
							.stop()
							.animate({
										left:-(currentWidth)
									},500);
						$thisPanel.css({
							opacity:1,
							left: thisWidth
						})
						.stop()
						.animate({
							left:0,
							},{
							duration:500,
							complete:function(){
									$('#pageContent').children().not($thisPanel).remove();
									$currentPanel = $thisPanel;
									currentNumber = thisNumber;
									$('#backto').css('position','fixed');
									$('#goto').css('position','fixed');
									loadFunc();
									$(window).off('load');
								}
							});
					}else if(thisNumber < currentNumber){
						$("body,html").animate({scrollTop:0},500);
						$currentPanel
							.stop()
							.animate({
									left : currentWidth
								}, 500);
						$thisPanel.css({
							opacity:1,
							left:-(thisWidth)
						})
						.stop()
						.animate({
							left:0,
							},{
							duration:500,
							complete:function(){
									$('#pageContent').children().not($thisPanel).remove();
									$currentPanel = $thisPanel;
									currentNumber = thisNumber;
									$('#backto').css('position','fixed');
									$('#goto').css('position','fixed');
									loadFunc();
									$(window).off('load');
								}
							});
					}else{
						e.preventDefault();
					}
		});
		$(window).trigger('load');				
								
	}//pageSlide()
		
});	
