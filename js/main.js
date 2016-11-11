(function(){
	var lang = 'en';
	var time = 10000;
	var timeout;
	function timer(){
		$('#quote').removeClass('animated fadeInDown')
		$('#author').removeClass('animated fadeInUp');
		init(lang);
		timeout = setTimeout(timer,time);
	}
	timer();
	function init(lang){
		$.ajax({ 
			url: "http://api.forismatic.com/api/1.0/", 
			jsonp: "jsonp", 
			dataType: "jsonp", 
			data: { 
				method: "getQuote", 
				lang: lang, 
				format: "jsonp" 
			}, 
			success: function(response){ 
				console.log(response); 
				if (!response.quoteAuthor){
					init(lang);
					return;
				}
				$('#quote').addClass('animated fadeInDown')
				$('#author').addClass('animated fadeInUp');
				$('#quote').text(response.quoteText);
				$('#author').text(response.quoteAuthor);
			} 
		});
	}
	init('en');

	$('.li').on('click',function(){
		$('.active').removeClass('active');
		$(this).addClass('active');
		if ($(this).text() == "Русский"){
			$('#quote').removeClass('animated fadeInDown');
			$('#author').removeClass('animated fadeInUp');
			lang = 'ru';
			clearTimeout(timeout);
			init('ru');
			timer();
			return;
		}
		lang = 'en';
		$('#quote').removeClass('animated fadeInDown');
		$('#author').removeClass('animated fadeInUp');
		clearTimeout(timeout);
		init('en');
		timer();
	});
	$('.next').on('click',function(){
		$('#quote').removeClass('animated fadeInDown');
		$('#author').removeClass('animated fadeInUp');
		clearTimeout(timeout);
		init();
		timer();
	})
}
)();
