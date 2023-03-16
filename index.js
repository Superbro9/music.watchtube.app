function setupCarousel(selector, things, type) {
  let current = 0
  const next = document.querySelector(`.carousel-container.${selector} .button.next`)
  const prev = document.querySelector(`.carousel-container.${selector} .button.prev`)

  for (let i in things) {
    const it = things[i]
    if (type == 'images') {
      const full = document.createElement('div')
      full.classList.add('item')

      const inner = document.createElement('img')
      inner.src = it

      full.append(inner)

      document.querySelector(`.carousel-container.${selector} .carousel`).append(full)

      const thumbnail = document.createElement('div')
      thumbnail.classList.add('item')
      thumbnail.dataset.index = i
      thumbnail.onclick = () => {
        changePage(parseInt(i))
      }

      const thumbInner = document.createElement('img')
      thumbInner.src = it
      thumbnail.append(thumbInner)

      document.querySelector(`.carousel-container.${selector} .preview`).append(thumbnail)
    } else if (type == 'articles') {
      const div = document.createElement('div')
      div.classList.add('item')

      const inner = document.createElement('span')
      inner.classList.add('review')
      inner.innerHTML = `
                <span class="text">${it.review}</span>
                <span class="author">- ${it.author}</span>
            `
      inner.onclick = () => {
        window.open(it.link)
      }
      div.append(inner)
      document.querySelector(`.carousel-container.${selector} .carousel`).append(div)
    }
  }

  const items = document.querySelectorAll(`.carousel-container.${selector} .carousel .item`)

  function changePage(type) {
    if (type === true) {
      current == items.length - 1 ? (current = 0) : current++
    } else if (type === false) {
      current == 0 ? (current = items.length - 1) : current--
    } else if (typeof type == 'number') {
      current = type
    }
    items.forEach((item, i) => {
      item.style.transform = `translateX(${(i - current) * 100}%)`
    })
    if (document.querySelector(`.carousel-container.${selector} .preview`)) {
      document.querySelectorAll(`.carousel-container.${selector} .preview .item`).forEach(e => e.classList.remove('active'))
      document.querySelector(`.carousel-container.${selector} .preview .item[data-index="${current}"]`).classList.add('active')
    }
  }

  next.onclick = () => changePage(true)
  prev.onclick = () => changePage(false)
  setInterval(() => changePage(true), 5000)
  changePage()
}

const screenshots = ['assets/Recommendations.png', 'assets/Playing.png', 'assets/Song.png', 'assets/Library.png', 'assets/Info.png', 'assets/Search.png']

setupCarousel('screenshots', screenshots, 'images')

document.querySelector('.nav .hamburger').onclick = () => {
  document.querySelector('.nav').classList.toggle('hamburger-active')
}

window.onclick = e => {
  if (document.querySelector('.nav').classList.contains('hamburger-active') && (e.target.tagName === 'A' || e.target.classList.contains('nav')))
    document.querySelector('.nav').classList.remove('hamburger-active')
}

window.onresize = () => {
  if (document.body.scrollWidth > 550) document.querySelector('.nav').classList.remove('hamburger-active')
}
