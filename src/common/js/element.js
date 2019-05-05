import {elementStyle} from 'common/js/config'

export default class Element {
  constructor({id, css, type, properties}) {
    this.id = id
    this.css = css
    this.type = type
    this.properties = properties
  }
}

export function createElementText(textData) {
  const textCss = {
    color: '#676767',
    fontSize: 24,
    textAlign: 'left',
    width: 200,
    height: 30
  }
  const textSize = {
    small: {height: 30},
    medium: {height: 42},
    large: {height: 46}
  }
  return new Element({
    id: textData.id,
    css: Object.assign({}, elementStyle, textCss, textSize[textData.size]),
    type: 'text',
    properties: textData.properties
  })
}

export function createElementPicture(pictureData) {
  const pictureCss = {}
  return new Element({
    id: pictureData.id,
    css: Object.assign({}, elementStyle, pictureCss),
    type: 'picture',
    properties: pictureData.properties
  })
}

export function createElementAlbum(albumData) {
  const albumCss = {}
  return new Element({
    id: albumData.id,
    css: Object.assign({}, elementStyle, albumCss),
    type: 'album',
    properties: albumData.properties
  })
}

export function createElementVideo(videoData) {
  const videoCss = {}
  return new Element({
    id: videoData.id,
    css: Object.assign({}, elementStyle, videoCss),
    type: 'video',
    properties: videoData.properties
  })
}