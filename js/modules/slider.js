function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

  // Slider

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevArrowBtn = document.querySelector(prevArrow),
    nextArrowBtn = document.querySelector(nextArrow),
    currentNumSlider = document.querySelector(currentCounter),
    totalNumSlider = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  function checkNumCheck(numberSlide, counterSlide) {
    if (numberSlide < 10) {
      counterSlide.textContent = `0${numberSlide}`;
    } else {
      counterSlide.textContent = numberSlide;
    }
  }

  checkNumCheck(slideIndex, currentNumSlider);
  checkNumCheck(slides.length, totalNumSlider);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  function selectedDot() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  function transformSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`;
  }

  nextArrowBtn.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    transformSlide();

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    checkNumCheck(slideIndex, currentNumSlider);

    selectedDot();
  });

  prevArrowBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    transformSlide();

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    checkNumCheck(slideIndex, currentNumSlider);

    selectedDot();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      transformSlide();

      checkNumCheck(slideIndex, currentNumSlider);

      selectedDot();
    });
  });
}

export default slider;