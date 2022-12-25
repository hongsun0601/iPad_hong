import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'






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
function playScroll() {
    document.documentElement.classList.remove('fixed')
}
function stopScroll() {
    document.documentElement.classList.add('fixed')
}

const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', () => {
    if (headerEl.classList.contains('menuing')) {
        headerEl.classList.remove('menuing')
        searchInputEl.value = ''
        playScroll()
    } else {
        headerEl.classList.add('menuing')
        stopScroll()
    }
})

const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', () => {
    headerEl.classList.add('searching--mobile')
    searchInputEl.focus()
})
searchCancelEl.addEventListener('click', () => {
    headerEl.classList.remove('searching--mobile')
})


window.addEventListener('resize', event => {
    if (window.innerWidth <= 740) {
        headerEl.classList.remove('searching')
    } else {
        headerEl.classList.remove('searching--mobile')
    }
})



const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')
navMenuToggleEl.addEventListener('click', () => {
    if (navEl.classList.contains('menuing')) {
        hideNavMenu()
    } else {
        showNavMenu()
    }
})
navEl.addEventListener('click', event => {
    event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)
function showNavMenu() {
    navEl.classList.add('menuing')
}
function hideNavMenu() {
    navEl.classList.remove('menuing')
}

const io = new IntersectionObserver(function (entries) {
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

const video = document.querySelector('.stage video')
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

const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function (ipad) {
    const itemEl = document.createElement('div')
    itemEl.classList.add('item')

    let colorList = ''
    ipad.colors.forEach(function (color) {
        colorList += `<li style="background-color: ${color};"></li>`
    })


    itemEl.innerHTML = `
    <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}">
    </div>
    <ul class="colors">
        ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price"> ₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>`

    itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
    const mapEl = document.createElement('div')
    mapEl.classList.add('map')

    let mapList = ''
    nav.maps.forEach(map => {
        mapList += `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
    })

    mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

    navigationsEl.append(mapEl)
})


const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()

const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
    const h3El = el.querySelector('h3')
    h3El.addEventListener('click', function () {
        el.classList.toggle('active')
    })
})