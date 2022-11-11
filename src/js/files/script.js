// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { getHash, isMobile } from "./functions.js";
import "./sliderAdaptive.js";
// import { formsModules } from "./forms/forms.js";
let block = document.querySelector(".menu__item");
//document.addEventListener("click", documentActions);
if (getHash()) {
	const nav = getHash();
	const link = document.querySelector(`a[href="${nav}"]`);
	if (link) {
		window.addEventListener("load", function () {
			link.click();
		});
	}
}
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
function createSlides() {
	const sliders = document.querySelectorAll('.slider');
	if (sliders.length > 0) {
		sliders.forEach((slider, i) => {
			const images = document.createElement('div');
			let slides = [];
			let inputs = [];
			let labels = [];
			const links = slider.dataset.slider.replace(/\s{2,}/g, '').split(';', 5);
			links.forEach(link => {
				slides.push(link);
			});
			slides.forEach((slide, index) => {
				const input = document.createElement('input');
				input.type = 'radio';
				input.name = `radio-btn-${i + 1}`;
				input.id = `radio${index + 1}-${i + 1}`;
				inputs.push(input);
				const label = document.createElement('label');
				label.setAttribute('for', `radio${index + 1}-${i + 1}`);
				label.classList.add('navigation-btn');
				labels.push(label);
			});
			inputs.forEach(input => {
				slider.append(input);
			})
			labels.forEach(label => {
				slider.append(label);
			})

			images.classList.add('imgs_slides');
		})
	}
}
const cards = document.querySelectorAll('.card-preview-slider');
if (cards.length > 0) {
	if (isMobile.any()) {
		cards.forEach(card => {
			const slider = card.querySelector('.swiper');
			new Swiper(slider, {
				slidePreview: 1,
				loop: true,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					dynamicBullets: true,
				},
			})
		})
	} else {
		document.addEventListener('mouseover', (e) => {
			const target = e.target;
			if (target.classList.contains('card-preview-slider__item')) {
				const parent = target.closest('.card-preview-slider');
				const slides = parent.querySelectorAll('.swiper-slide');
				const lis = parent.querySelectorAll('.card-preview-slider__item');
				lis.forEach((li, i) => {
					if (target === li) {
						li.classList.add('_active');
						slides[i].classList.add('_active');
					} else {
						li.classList.remove('_active');
						slides[i].classList.remove('_active');
					}
				})
			}
		});
		document.addEventListener('click', (e) => {
			const target = e.target;
			if (target.classList.contains('card-preview-slider__item')) {
				const parent = target.closest('.card-preview-slider');
				const href = parent.dataset.href ? parent.dataset.href : 'https://www.google.com/';
				window.location.href = href;
			}
		});
		cards.forEach(card => {
			card.addEventListener('mouseleave', (e) => {
				const parent = e.currentTarget;
				const slides = parent.querySelectorAll('.swiper-slide');
				const lis = parent.querySelectorAll('.card-preview-slider__item');
				lis.forEach((li, i) => {
					if (i === 0) {
						li.classList.add('_active');
						slides[i].classList.add('_active');
					} else {
						li.classList.remove('_active');
						slides[i].classList.remove('_active');
					}
				})
			});
		})
	}
}
//createSlides();
function documentActions(e) {
	let targetElement = e.target;
	let targetPrevItem = targetElement.parentElement;
	let blockOk = document.querySelectorAll(".menu__item._ok");

	if (targetElement.classList.contains("_icon-arrow-down")) {
		targetPrevItem.classList.toggle("_ok");
	}

	if (blockOk.length > 1) {
		_removeClasses(blockOk, "_ok");
	}

	if (!targetElement.closest(".menu__item") && blockOk.length > 0) {
		_removeClasses(blockOk, "_ok");
	}

	if (targetElement.classList.contains("_icon-search")) {
		document
			.querySelector(".header__form")
			.classList.toggle("_search-active");
	} else if (
		!targetElement.closest(".header__form") &&
		document.querySelector(".header__form._search-active")
	) {
		document
			.querySelector(".header__form")
			.classList.remove("_search-active");
	}
	if (targetElement.matches('[id^="card-preview-slide"]') || targetElement.matches('.card-preview-slider__item')) {
		const parent = targetElement.closest('.card-preview-slider');
		window.location.href = parent.dataset.href;
	}
}




//Управление кнопкой отправки по чекбоксу

function checkboxFunction() {
	const checkboxInput = document.querySelector('.checkbox');
	const buttonClass = document.querySelector('.form__button');

	checkboxInput.addEventListener('change', () => {
		buttonClass.classList.toggle('active');
		buttonClass.toggleAttribute('disabled');
	})

}
checkboxFunction();


function requiredChecked() {

}
requiredChecked();


//Маска телефона

window.addEventListener("DOMContentLoaded", function () {
	[].forEach.call(document.querySelectorAll('.tel'), function (input) {
		var keyCode;
		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___-__-__",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5) this.value = ""
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)

	});

});


//Paralax

document.addEventListener("mousemove", parallax);
function parallax(event) {
	// this.querySelectorAll(".team__right-body._watcher-view span").forEach((shift) => {
	// 	const position = shift.getAttribute("value");
	// 	const x = (window.innerWidth - event.pageX * position) / 50;
	// 	const y = (window.innerHeight - event.pageY * position) / 5
	// 	shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
	// }
}

// document.querySelectorAll(".team__right-body._watcher-view").forEach(parallaxWrap =>
// 	parallaxWrap.addEventListener("mousemove", ({ clientX, clientY }) => {
// 		parallaxWrap.style.setProperty("--x", clientX);
// 		parallaxWrap.style.setProperty("--y", clientY);
// 	}),
// );
document.addEventListener("mousemove", ({ clientX, clientY }) => {
	document.querySelectorAll(".team__right-body._watcher-view").forEach(parallaxWrap => {
		parallaxWrap.style.setProperty("--x", clientX);
		parallaxWrap.style.setProperty("--y", clientY);
	})
});
// function parallax() {
// 	document.querySelectorAll(".team__right-body._watcher-view").forEach(parallaxWrap =>
// }