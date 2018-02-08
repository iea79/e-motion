var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    $(document).ready(function(){
        var HeaderTop = $('#header').offset().top;
        
        $(window).scroll(function(){
            if( $(window).scrollTop() > HeaderTop ) {
                $('#header').addClass('stiky');
            } else {
                $('#header').removeClass('stiky');
            }
        });
    });

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	$('.navbar__link').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) {
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top -30 }, 500);
		}
		if ($('.header__menu_right').hasClass('open')) {
			$('.header__menu_right').removeClass('open');
		}
		return false;
	});

	// Переключение пунктов меню при скролле
   	$(document).on("scroll", onScroll);


   	// Мобильное меню header__menu_right
    $('.header__mobile').on('click touchend', function(event) {
    	event.preventDefault();
		$('.header__menu_right').toggleClass('open');
	});

	// Всплывающее меню Приложения к договору
    $('.download__menu_trigger').on('click touchend', function(event) {
    	event.preventDefault();
		$('.download__menu').toggleClass('open');
	});

	// Всплывающая регистрация в шапке
    $('.header__down_reg_btn').on('click touchend', function(event) {
    	event.preventDefault();
		$('.header__sighup').addClass('open');
	});
	$('.header__sighup .close').on('click', function(event) {
		event.preventDefault();
		$('.header__sighup').removeClass('open');
	});

	if (isXsWidth()) {
		$('body').on('click', '.map__list_title', function() {
			$('.map__list').toggleClass('open');
		});
		$('body').on('click', '.map__link', function() {
			$('.map__list').removeClass('open');
		});
	}

});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
}

var menu_selector = ".navbar"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню. 
function onScroll(){
	var scroll_top = $(document).scrollTop();
	$(menu_selector + " a").each(function(){
		var hash = $(this).attr("href");
		var target = $(hash);
		if (target.position().top - 40 <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
			$(menu_selector + " a.active").removeClass("active");
			$(this).addClass("active");
		} else {
			$(this).removeClass("active");
		}
	});
}

