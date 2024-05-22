WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			autoplay: {
				delay: 50000,
				disableOnInteraction: false
			},
			lazy: true
		})
	}


	// Products slider
	const productsSliders = [],
		products = document.querySelectorAll('.products .swiper')

	products.forEach((el, i) => {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 4
				},
				1440: {
					spaceBetween: 40,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => {
					setHeight(swiper.el.querySelectorAll('.product'))

					setTimeout(() => {
						$(swiper.el).find('> .swiper-button-next, > .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				},
				resize: swiper => {
					let products = swiper.el.querySelectorAll('.product')

					products.forEach(el => el.style.height = 'auto')

					setHeight(products)

					setTimeout(() => {
						$(swiper.el).find('> .swiper-button-next, > .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Videos slider
	const videosSliders = [],
		videos = document.querySelectorAll('.videos .swiper')

	videos.forEach((el, i) => {
		el.classList.add('videos_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				768: {
					spaceBetween: 24,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 24,
					slidesPerView: 3
				},
				1440: {
					spaceBetween: 40,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						$(swiper.el).find('> .swiper-button-next, > .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						$(swiper.el).find('> .swiper-button-next, > .swiper-button-prev').css(
							'top', $(swiper.el).find('.thumb').outerHeight() * 0.5
						)
					})
				}
			}
		}

		videosSliders.push(new Swiper('.videos_s' + i, options))
	})


	// Text slider
	const textSliders = [],
		textSlider = document.querySelectorAll('.text_block .slider .swiper')

	textSlider.forEach((el, i) => {
		el.classList.add('text_s' + i)

		let options = {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1
		}

		textSliders.push(new Swiper('.text_s' + i, options))
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('header .mob_menu_btn, .overlay').click(e => {
		e.preventDefault()

		$('header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header .menu').toggleClass('show')

		$('header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// Filter
	$('.mob_filter_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next('.filter').slideToggle(300)
	})


	$('.filter .name').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active').next('.data').slideToggle(300)
	})


	$('.filter .item .spoler_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.data')

		$(this).toggleClass('active')

		parent.find('.hide').slideToggle(300)
	})


	temperatureMaxRange = $('.filter #temperature_max_range').ionRangeSlider({
		type: 'double',
		min: 55,
		max: 95,
		from: 65,
		to: 85,
		step: 1,
		onChange: data => {
			$('.filter .temperature_max_range input.from').val(data.from)
			$('.filter .temperature_max_range input.to').val(data.to)
		},
		onUpdate: data => {
			$('.filter .temperature_max_range input.from').val(data.from)
			$('.filter .temperature_max_range input.to').val(data.to)
		}
	}).data('ionRangeSlider')

	$('.filter .temperature_max_range .input').keyup(function () {
		temperatureMaxRange.update({
			from: parseInt($('.filter .temperature_max_range input.from').val()),
			to: parseInt($('.filter .temperature_max_range input.to').val())
		})
	})


	temperatureMinRange = $('.filter #temperature_min_range').ionRangeSlider({
		type: 'double',
		min: -30,
		max: 0,
		from: -25,
		to: -5,
		step: 1,
		onChange: data => {
			$('.filter .temperature_min_range input.from').val(data.from)
			$('.filter .temperature_min_range input.to').val(data.to)
		},
		onUpdate: data => {
			$('.filter .temperature_min_range input.from').val(data.from)
			$('.filter .temperature_min_range input.to').val(data.to)
		}
	}).data('ionRangeSlider')

	$('.filter .temperature_min_range .input').keyup(function () {
		temperatureMinRange.update({
			from: parseInt($('.filter .temperature_min_range input.from').val()),
			to: parseInt($('.filter .temperature_min_range input.to').val())
		})
	})


	$('.filter .reset_btn').click(function() {
		if(temperatureMaxRange) {
			temperatureMaxRange.reset()
		}

		if(temperatureMinRange) {
			temperatureMinRange.reset()
		}
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Product page
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			lazy: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})

		new Swiper('.product_info .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 20,
			slidesPerView: 1,
			lazy: true,
			thumbs: {
				swiper: productThumbs
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			}
		})
	}


	// Мини всплывающие окна
	$('.mini_modal_btn').click(function(e) {
		e.preventDefault()

		const modalId = $(this).data('modal-id')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.mini_modal').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		} else {
			$('.mini_modal_btn').removeClass('active')
			$(this).addClass('active')

			$('.mini_modal').removeClass('active')
			$(modalId).addClass('active')

			setTimeout(() => $(modalId).find('.input').focus(), 50)

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(e => {
		if ($(e.target).closest('.modal_cont').length === 0) {
			$('.mini_modal, .mini_modal_btn').removeClass('active')

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Search
	$('header .search .form .input').keyup(function(e) {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length
				? _self.addClass('active')
				: _self.removeClass('active')
		})
	})

	$('header .search .clear_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('form')

		parent.find('.input').removeClass('active').val('')
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})