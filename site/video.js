async function getVideos() {
    try {
        let res = await fetch(
            "https://aq0uwjdcwi.execute-api.eu-west-1.amazonaws.com/Prod/get-videos", {
            method: "GET",
            mode: "cors"
        }
        )

        const { body } = await res.json();
        return body.videos
    } catch (error) {
        throw error
    }
}

function playVideo(vidLink, title, description) {
    const video = $('#poster')
    video.attr('src', vidLink)

    const div = document.createElement('div')
    div.innerHTML = `
        <h1>${title}</h1>
        <p>${description}</p>
    `
    $('#details').html('')
    $('#details').append(div)
}

$(document).ready(async () => {
    const videos = await getVideos()
    for (let video of videos) {
        const { author, videoLink, thumbnailLink, duration, description, title } = video;
        const vidBox = document.createElement('div')
        vidBox.className = "videoThumb row"
        vidBox.onclick = function () { playVideo(videoLink, title, description) }
        vidBox.innerHTML = `
            <div class="col-6">
                <div class="img-container">
                    <div class="positioning">
                        ${duration}
                    </div>
                    <img src="${thumbnailLink}" class="thumb" />
                </div>
            </div>
            <div class="col-6">
                <h4>${title}</h4> 
                <h5>${author}</h5>
            </div>
        `
        $('#video-list').append(vidBox)
    }
})