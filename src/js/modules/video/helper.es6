const utils = require('../utils.es6');

var helper = {
    /**
     * Plays the video after clicking on the thumbnail
     * @param  {string} className The class name on which click is to be listened
     * @param  {object} options   Options object
     * @return {null}
     */
    play: (className, options) => {
        let classes = document.getElementsByClassName(className);
        for (let i = 0; i < classes.length; i++) {
            classes[i].onclick = function() {
                options.onVideoShow();
                let url = classes[i].getAttribute('data-ejs-url');
                let template = helper.template(url, options);
                classes[i].parentNode.parentNode.innerHTML = template;
            };
        }
    },

    /**
     * Common template for vimeo and youtube iframes
     * @param  {string} url     URL of the embedding video
     * @param  {object} options Options object
     * @return {string}         compiled template with variables replaced
     */
    template: (url, options) => {
        let dimensions = utils.dimensions(options);
        let template =
            `<div class="ejs-video-player">
        <iframe src="${url}" frameBorder="0" width="${dimensions.width}" height="${dimensions.height}"></iframe>
        </div>`;
        return template;
    },

    /**
     * Template for showing vimeo and youtube video details
     * @param  {object} data     Object containing the variable values as key-value pair
     * @param  {string} embedUrl URL of the video
     * @return {string}          template with variables replaced
     */
    detailsTemplate: (data, embedUrl) => {
        var template =
            `<div class="ejs-video">
        <div class="ejs-video-preview">
        <div class="ejs-video-thumb" data-ejs-url="${embedUrl}">
        <div class="ejs-thumb" style="background-image:url(${data.thumbnail})"></div>
        <i class="fa fa-play-circle-o"></i>
        </div>
        <div class="ejs-video-detail">
        <div class="ejs-video-title">
        <a href="${data.url}">
        ${data.title}
        </a>
        </div>
        <div class="ejs-video-desc">
        ${data.description}
        </div>
        <div class="ejs-video-stats">
        <span>
        <i class="fa fa-eye"></i>${data.views}
        </span>
        <span>
        <i class="fa fa-heart"></i>${data.likes}
        </span>
        </div>
        </div>
        </div>
        </div>`;
        return template;
    },

    /**
     * Applies video.js to all audio and video dynamically
     * @param  {object} options Options object
     * @return {null}
     */
    applyVideoJS: (options) => {
        let dimensions = utils.dimensions(options);
        options.videojsOptions.width = dimensions.width;
        options.videojsOptions.height = dimensions.height;
        if (options.videoJS) {
            if (!window.videojs) {
                throw new ReferenceError("You have enabled videojs but you haven't loaded the library.Find it at http://videojs.com/");
            }
            let elements = options.element.getElementsByClassName('ejs-video-js');
            for (let i = 0; i < elements.length; i++) {
                videojs(elements[i], options.videojsOptions, () => options.videojsCallback());
            }
        }
    },

    /**
     * Destroys the onclick event for opening the video template from the details template
     * @param  {className} className
     * @return {null}
     */
    destroy: (className) => {
        let classes = document.getElementsByClassName(className)
        for (let i = 0; i < classes.length; i++) {
            classes[i].onclick = null
        }
    }
}

module.exports = helper;
