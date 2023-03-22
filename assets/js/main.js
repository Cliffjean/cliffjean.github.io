/**
* Template Name: MyPortfolio - v4.0.1
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {
    burgerMenu.classList.toggle('active');
  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})()

/** BALL */

var easing = 0.01;
var easingTargetX=5;
var easingTargetY=5;
var vx=0, vy = 0, ballx = 0 ,bally=0;
var ball = document.getElementById('ball');
var canvas = document.getElementById("c");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');




function main(){

  if(easingTargetX == (ballx+10) && easingTargetY == (bally+10)  ) return;
  start(); 
  
  window.setTimeout(main, 200);
}
window.addEventListener('mousemove', function(e){
  
  easingTargetX = e.clientX;
  easingTargetY = e.clientY;
  main();

  //drawballLine(ballx, bally);

});

function start(sx, sy){

 
  if(typeof sx != 'undefined'){

    easingTargetX = sx;
    easingTargetY = sy;
  }


  vx = (easingTargetX - ballx) * easing;
  vy = (easingTargetY - bally) * easing;

  ballx += vx; bally += vy;
   
  ball.style.left = ballx - 10 +'px';
  ball.style.top = bally - 10 + 'px';

 
}

window.addEventListener('dragover',function(e){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawballLine(ax, ay){

ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(easingTargetX, easingTargetY);
  ctx.lineTo(ax,ay);
  ctx.stroke();

}
 
