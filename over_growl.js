/*
===========================================================================
Authors: BlackRogue01 & Carolina123
Copyright: RogueSignal.io, wwww.roguesignal.io, 2022
MD5 Function: Blueimp - https://github.com/blueimp/JavaScript-MD5
---------------------------------------------------------------------------
  Simple, clean, flexible & customizable Growler library.

  See README.txt
===========================================================================
*/
class OverGrowl {
  constructor(data={}) {
    this.el = data.el ? data.el : 'overgrowl'
    this.name = data.public ? data.public : 'growler'
    this.options = {
      inline: true,
      ...data
    }

    this.parent_id = this.options.inline ? 'growler' : this.name
    this.apply_css();
    if (this.options.css) { this.apply_css(this.name + '_config_css',this.options.css) }

    var e = document.getElementById(this.el)
    if (!e) { e = Object.assign(document.createElement('div'), { id: this.el }) }
    var p = document.getElementById(this.parent_id+'-parent')
    if (!p) { p = Object.assign(document.createElement('div'), { id: this.parent_id+'-parent' }) }
    e.appendChild(p)
    document.body.prepend(e)
    this.parent = p
    this.parent.counter ||= 0
    this.parent.growls = []

    // Set up methods by built-in type names.
    for(let type of ['success','alert','info','system','error','growl']) {
      this[type] = (msg,options={}) => { this.growl_type(type,msg,options) }
    }
  }

  growl_type(type,msg,options={}) {
    this.growler({ type: type, message: msg },options)
  }

  add_type(type,noticecss='',iconcss='') {
    this[type] = (msg,options={}) => { this.growl_type(type,msg,options) }
    this.apply_type_style(type,noticecss,iconcss)
  }

  apply_type_style(type,noticecss='',iconcss='') {
    this.apply_css(this.name+'_'+type+'_style',
      `
        .${this.name}-notice.${type}{
          ${noticecss}
        }
        .${this.name}-icon.${type}{
          ${iconcss}
        }
      `
    )
  }

  apply_css(id=`${this.name}_style`, style=this.default_style()) {
    var s = document.getElementById(id)
    if (!s) { s = Object.assign(document.createElement('style'), { id: id, type: 'text/css' }) }
    s.appendChild(document.createTextNode(style))
    document.head.appendChild(s);
    this.style_sheet = s;
  }

  append_css(style="") {
    this.style_sheet.appendChild(document.createTextNode(style))
  }

  reset_css() {
    var id =`${this.name}_style`
    var style = this.default_style()
    var s = document.getElementById(id)
    s.textContent = style;
    console.log(style)
    document.head.appendChild(s);
  }

  growler(data,opts) {
    this.msgStore ||= []
    var type_configs = {}
    if (this.options.type_config && this.options.type_config[data.type] ) {
      type_configs = this.options.type_config[data.type]
    }

    var options = {
      no_close: false,
      fade: 500,
      duration: 5000,
      unique: true,
      offset_x: 20,
      offset_y: 20,
      close_button: false,
      z_index: 10000,
      text_select: 'all',
      css: null,
      ...this.options,
      ...type_configs,
      ...opts
    }
    this.parent.counter++;

    if (options.unique) {
      var hash = md5(data.message);
      if (this.msgStore[hash] == true) return;
      this.msgStore[hash] = true
    }

    var grDiv = Object.assign(document.createElement('div'),{ classList: `${this.name}-notice ${data.type}` })
    var textArea = Object.assign(document.createElement('p'))
    grDiv.append(
      Object.assign(document.createElement('div'),{ classList: `${this.name}-icon ${data.type ? data.type : 'notype'}`}),
      Object.assign(textArea,{ innerHTML: data.message }),
    )
    grDiv.hash = hash
    var closeElem = grDiv
    if (options.close_button) {
      closeElem = document.createElement('div')
      Object.assign(closeElem,{ classList: `${this.name}-close`, innerHTML: '&#10006;' })
      grDiv.append(closeElem);
    }
    if (options.no_close == false) {
      closeElem.addEventListener('click',() => { 
        this.removeGrowl(grDiv,options) 
      })
    }
    textArea.style.userSelect = this.options.text_select
    textArea.addEventListener('click',(e) => { e.stopPropagation(); })

    parent = document.getElementById(this.parent_id + '-parent')
    parent.style.zIndex = options.z_index;
    parent.style.right = options.offset_x + 'px';
    parent.style.top = options.offset_y + 'px';
    parent.style.visibility = 'visible';
    grDiv.style.transition = 'opacity ' + (options.fade > 0 ? options.fade / 1000 : 0.01) + 's';
    parent.appendChild(grDiv)
    parent.growls.push(grDiv)

    setTimeout(()=>{
      grDiv.classList.add(`${this.name}-notice--op`)
    },200)
    if (options.duration > 0) {
      setTimeout(()=>{
        this.removeGrowl(grDiv,options);
      },options.duration)
    }
  }

  clearGrowls () {
    this.parent.growls.forEach( function(gr,i) {
      this.removeGrowl(gr,{ fade: this.options.fade })
    }.bind(this))
  }

  // Use try to just ignore removals happening from other source before timer removes triggers.
  removeGrowl (e,options){
    try{
      this.msgStore[e.hash] = false;
      e.classList.remove(`${this.name}-notice--op`)
      setTimeout(() => {
        try {
          parent = e.parentElement
          parent.removeChild(e)
          var index = parent.growls.indexOf(e);
          if (index !== -1) {
            parent.growls.splice(index, 1);
          }
          this.parent.counter--
          if (this.parent.counter == 0) {
            parent.style.visibility = 'hidden'
            parent.style.zIndex = -1000
          }
        } catch{}
      },options.fade + 100);
    }
    catch{}
  }

  default_style() {
      return `
          #${this.name}-parent{
              grid-area: 1 / 1 / 4 / 3;
              position: absolute;
              top: 20px;
              right: 20px;
              display: grid;
              grid-row-gap: 5px;
              padding: 10px;
              align-content: flex-start;
              overflow: hidden;
              visibility: hidden;
              z-index: -1000;
              opacity: 0.9;
              user-select: unset;
              cursor: pointer;
          }
          .${this.name}-notice{
              padding: 2px 2px 2px 2px;
              display: grid;
              grid-template-columns: auto auto;
              grid-column-gap: 5px;
              justify-content: flex-start;
              align-content: center;
              border-width: 4px;
              border-style: solid;
              border-radius: 15px;
              border-color: #000000;
              background-color: whitesmoke;
              color: #222222;
              opacity: 0;
              transition: opacity 0.5s;
              width:300px;
              box-shadow: 5px 5px 5px 0px rgba(18, 18, 18, 0.9);
              position: relative;
          }
          .${this.name}-close{
              font-size: 10px;
              color: #FF0000;
              border-style: solid;
              border-radius: 0px 15px 0px 5px;
              border-color: #00000088;
              border-width:0px 0px 1px 0px;
              text-align:center;
              position: absolute;
              padding:0px;
              padding-right:2px;
              padding-top:2px;
              margin:0px;
              top:0px;
              right:-1px;
              width:20px;
              opacity: 0.8;
              user-select: none;
              cursor: pointer;      
          }
          .${this.name}-notice>p{
              font-size: 14px;
              font-family: korolev-compressed, sans-serif;
              font-weight: 400;
              user-select: all;
              cursor: copy;      
          }
          .${this.name}-notice--op{ opacity: 1; }

          .${this.name}-notice.alert{
              border-color: rgb(152, 132, 37);
              background-color: #ffdfAA;
          }
          .${this.name}-notice.error{
              border-color: rgb(152, 37, 37);
              background-color: #ffBBBB;
          }
          .${this.name}-notice.info{
              border-color: #27adff;
              background-color: #DDDDFF;
          }
          .${this.name}-notice.success{
              border-color: rgb(89, 160, 89);
              background-color: #BBffBB;
          }
          .${this.name}-notice.system{
              border-color: rgb(168, 102, 4);
              background-color: #ffbc9a;
          }
          .${this.name}-icon{
              width: 40px;
              height: 40px;
              background-size: cover;
          }
          .${this.name}-icon.notype{
              width: 0px;
              height: 0px;
          }
          .${this.name}-icon.alert{
              background-image: url('data:image/png;base64,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');
          }
          .${this.name}-icon.error{
              background-image: url('data:image/png;base64,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');
          }
          .${this.name}-icon.info{
              background-image: url('data:image/png;base64,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');
          }
          .${this.name}-icon.success{
              background-image: url('data:image/png;base64,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');
          }
          .${this.name}-icon.system{
              background-image: url('data:image/png;base64,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');
          }
      `
  }
}

// Blueimp MD5 hash: https://github.com/blueimp/JavaScript-MD5
!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);