let request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}

let name = ``
let type
let page = 1
search.addEventListener(`click`, function (e) {
    page = 1
    name = filmName.value
    type = filmType.value
    add(name, type, 1)
})

function addBtn(count) {
    while (plag.children.length > 0) {
        plag.removeChild(plag.lastChild);
    }
    for (let i = 0; i <= count; i++) {
        if (i == 0) {
            btn = document.createElement(`button`)
            btn.innerHTML = `<<`
            plag.append(btn)
            btn.addEventListener(`click`, function (e) {
                if (page > 1) {
                    page--
                }
                add(name, type, page)
            })
        }
        if ((((page - i < 3) && (i => 0)) && i - page < 3) && i !== 0) {
            btn = document.createElement(`button`)
            btn.innerHTML = i
            plag.append(btn)
            btn.addEventListener(`click`, function (e) {
                add(name, type, i)
                page = i
            })
        }

        if (i == page) {
            btn.style.background = `red`
        }
        if (i == count) {
            btn = document.createElement(`button`)
            btn.innerHTML = `>>`
            plag.append(btn)
            btn.addEventListener(`click`, function (e) {
                if (page < count) {
                    page++
                }
                add(name, type, page)
            })
        }

    }
}

function add(a, b, c) {
    while (res.children.length > 0) {
        res.removeChild(res.lastChild);
    }
    request.open("GET", `http://www.omdbapi.com/?i=tt3896198&apikey=621814d0&s=${a}&type=${b}&page=${c}`);
    request.responseType = "json";
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status == 200) {
            let check = request.response;
            if (check.Error !== undefined) {
                while (plag.children.length > 0) {
                    plag.removeChild(plag.lastChild);
                }
                return alert(check.Error)
            } else {
                let totalResults = +check.totalResults
                let count = Math.ceil(totalResults / 10)
                addBtn(count)
                for (let n of check.Search) {
                    let div = document.createElement(`div`)
                    div.style.display = `flex`
                    div.style.justifyContent = `space-around`
                    div.style.margin = `5px`
                    div.style.width = `30%`
                    div.style.minHeight = `150px`
                    div.style.padding = `10px`
                    div.style.border = `1px solid black`
                    res.append(div)

                    let poster = document.createElement(`div`)
                    poster.style.background = `url(${n.Poster}) no-repeat`
                    poster.style.backgroundSize = `contain`
                    poster.style.width = `40%`
                    poster.style.marginRight = `20px`
                    poster.style.margin = `5px`
                    div.append(poster)

                    let info = document.createElement(`div`)
                    info.style.width = `50%`
                    div.append(info)

                    let p = document.createElement(`p`)
                    p.innerHTML = n.Type
                    p.style.marginBottom = `15px`
                    info.append(p)

                    p = document.createElement(`p`)
                    p.innerHTML = `\"` + n.Title + `\"`
                    p.style.marginBottom = `15px`
                    info.append(p)

                    p = document.createElement(`p`)
                    p.innerHTML = n.Year
                    p.style.marginBottom = `15px`
                    info.append(p)

                    btn = document.createElement(`button`)
                    btn.innerHTML = `Details`
                    info.append(btn)

                    btn.addEventListener(`click`, function (e) {
                        request.open("GET", `http://www.omdbapi.com/?i=tt3896198&apikey=621814d0&t=${n.Title}`);
                        request.responseType = "json";
                        request.onreadystatechange = function () {
                            if (request.readyState === 4 && request.status == 200) {
                                let current = request.response;
                                let modCheck = document.getElementById(`mod`)
                                if (modCheck !== null) {
                                    mod.remove()
                                }
                                div = document.createElement(`div`)
                                div.setAttribute(`id`, `mod`)
                                document.body.append(div)

                                let modal = document.createElement(`div`)
                                modal.style.background = `#E5FFFF`
                                modal.style.padding = `20px`
                                modal.style.display = `flex`
                                modal.style.flexWrap = `wrap`
                                modal.style.width = `80%`
                                div.append(modal)

                                div = document.createElement(`div`)
                                div.style.background = `url(${n.Poster}) center no-repeat`
                                div.style.backgroundSize = `contain`
                                div.style.width = `30%`
                                div.style.height = `200px`
                                div.style.marginRight = `20px`
                                modal.append(div)

                                div = document.createElement(`div`)
                                div.style.width = `60%`
                                div.style.display = `flex`
                                div.style.flexWrap = `wrap`
                                modal.append(div)

                                for (let [key, value] of Object.entries(current)) {
                                    if (key == `Poster`) {
                                        continue
                                    } else if (key == `Ratings`) {
                                        p = document.createElement(`p`)
                                        p.innerHTML = key + `:`
                                        p.style.width = `20%`
                                        div.append(p)
                                        p = document.createElement(`p`)
                                        p.setAttribute(`id`, `rank`)
                                        p.style.width = `70%`
                                        p.style.marginLeft = `20px`
                                        p.style.padding = `5px`
                                        p.style.display = `flex`
                                        p.style.flexWrap = `wrap`
                                        p.style.alignItems = `center`
                                        div.append(p)
                                        for (let z of current.Ratings) {
                                            for (let [key1, value1] of Object.entries(z)) {
                                                p = document.createElement(`p`)
                                                p.innerHTML = key1 + `:`
                                                p.style.width = `22%`
                                                p.style.marginBottom = `5px`
                                                rank.append(p)
                                                p = document.createElement(`p`)
                                                p.innerHTML = value1
                                                p.style.width = `22%`
                                                p.style.marginBottom = `5px`
                                                rank.append(p)
                                            }
                                        }
                                    } else {
                                        p = document.createElement(`p`)
                                        p.innerHTML = key + `:`
                                        p.style.width = `20%`
                                        div.append(p)
                                        p = document.createElement(`p`)
                                        p.innerHTML = value
                                        p.style.width = `70%`
                                        p.style.marginLeft = `20px`
                                        p.style.padding = `5px`
                                        div.append(p)
                                    }
                                }
                            }
                        }
                        request.send();
                    })
                }
            }
        }
    }
    request.send();
}