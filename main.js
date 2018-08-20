$(function () {
    $.get('./songs.json', function (response) {
        let items = response
        items.forEach((i) => {
            let $li = $(`
            <li>
               <a href="./song.html?id=${i.id}">
              <h2>${i.name}</h2>
              <div class="info">
                <svg class="icon-sq">
                   <use xlink:href="#icon-sq"></use>
                </svg>
                <p>${i.album}</p>
              </div>
              <svg class="icon-play">
                <use xlink:href="#icon-play"></use>
              </svg>
            </a>
          </li>
            `)
            $('#latestMusic').append($li)
        })
        $('#loadding').remove()
    })
})