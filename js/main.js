// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');

const basketEl = basketStarterEl.querySelector('header .basket');

basketStarterEl.addEventListener('click', function (event) {
    event.stopPropagation()
    if (basketEl.classList.contains('show')) {
        hideBasket()
    } else {
        showBasket()
    }
})

window.addEventListener('click', function () {
    basketEl.classList.remove('show')
})

function showBasket() {
    basketEl.classList.add('show')
}

function hideBasket() {
    basketEl.classList.remove('show')
}

// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

searchShadowEl.addEventListener('click', hideSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchStarterEl.addEventListener('click', showSearch)

function showSearch() {
    headerEl.classList.add('searching')
    document.documentElement.classList.add('fixed');
    console.log(headerMenuEls)
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    setTimeout(function () {
        searchInputEl.focus()
    }, 600)
}

function hideSearch() {
    headerEl.classList.remove('searching')
    document.documentElement.classList.remove('fixed');
    headerMenuEls.reverse().forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
    })
    searchDelayEls.forEach(function (el, index) {
        el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
    })
    searchDelayEls.reverse()
    searchInputEl.value = ''
}

const io =new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
            return
        }
        entry.target.classList.add('show')
    })
})

const infoEls = document.querySelectorAll('.info')
  infoEls.forEach(function (el) {
    io.observe(el)
  })


//   video

const video  = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
})
