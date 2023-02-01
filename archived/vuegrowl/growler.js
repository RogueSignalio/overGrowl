
class SW_Growler {
  constructor(data) {
    this.el = data.el ? data.el : sw_components
    this.name = data.public ? data.public : 'growler'
    this.duration = data.duration ? data.duration : 6000
    this.fade = data.fade ? data.fade : 500
    console.log(data)
    this.style();
    var e = document.getElementById(this.el)
    e.appendChild(document.createElement(this.name))
    Vue.component(this.name,this.component(this.name));
    var v = new Vue({ el: '#'+this.el })
  }
  component(public_method) {
    return {
      props: {
        gtype: String,
        gmsg: String
      },
      data: function() {
        return {
          msgStore: {},
          name: public_method
        }
      },
      created () {
        console.log('Growler Init OK...');
        window[public_method] = this.growlDaddy
      },
      methods: {
        growlDaddy (data) {
          var hash = md5(data.message);
          if (this.msgStore[hash] == true) {
            return;
          }
          this.msgStore[hash] = true

          var grDiv = Object.assign(document.createElement('div'),{ classList: `${this.name}-notice ${data.type}` })
          grDiv.append(
            Object.assign(document.createElement('div'),{ classList: data.type }) ,
            Object.assign(document.createElement('p'),{ innerHTML: data.message })
          )
          grDiv.addEventListener('click',() => { 
            this.msgStore[hash] = false;
            this.removeGrowl(grDiv) 
          })
          document.getElementById('growler-daddy').appendChild(grDiv)

          setTimeout(()=>{
            grDiv.classList.add(`${this.name}-notice--op`)
          },200)
          setTimeout(()=>{
            this.msgStore[hash] = false;
            this.removeGrowl(grDiv);
          },6000)
        },
        // Use try to just ignore removals happening from other source before timer remove triggers.
        removeGrowl (e){
          try{
            e.classList.remove(`${this.name}-notice--op`)
            setTimeout(() => { try { e.parentElement.removeChild(e) } catch{} },500);
          }
          catch{}
        },
      },
      watch: {
        gmsg() {
          var dataObj = {
            type: this.gtype,
            message: this.gmsg,
            timestamp: ''
          }  
          this.growlDaddy(dataObj)
        }
      },
      template: `<div id="${this.name}-daddy"><!-- insert notices here --></div>`
    }
  }
  style() {
      var mystyle = `
          #${this.name}-daddy{
              grid-area: 1 / 1 / 4 / 3;
              position: absolute;
              top: 20px;
              right: 50px;
              /* width: 30vw; */
              display: grid;
              grid-row-gap: 5px;
              padding: 10px;
              align-content: flex-start;
              overflow: hidden;
              z-index: 80;
              opacity: 0.8;
              /* border: 2px solid black; */
          }
          .${this.name}-notice{
              /* width: 30vw; */
              /* height: 50px; */
              padding: 2px 2px 2px 2px;
              display: grid;
              grid-template-columns: auto auto;
              grid-column-gap: 5px;
              justify-content: flex-start;
              align-content: center;
              border-width: 4px;
              border-style: solid;
              border-radius: 5px;
              background-color: whitesmoke;
              /* transform: translateX(30vw);
              transition: transform 1s;
               */
              opacity: 0;
              transition: opacity 0.5s;
              box-shadow: 5px 5px 5px 0px rgba(68, 68, 68, 0.8);
          }
          .${this.name}-notice>p{
              color: #000000;
              font-size: 24px;
//              font-family: korolev-compressed, sans-serif;
              font-weight: 400;
          }
          .${this.name}-notice--op{
              opacity: 1;
          }
          #${this.name}-daddy>.alert{
              border-color: rgb(152, 37, 37);
              background-color: #ffBBBB;
          }
          #${this.name}-daddy>.info{
              border-color: #27adff;
              background-color: #DDDDFF;
          }
          #${this.name}-daddy>.success{
              border-color: rgb(89, 160, 89);
              background-color: #BBffBB;
          }
          #${this.name}-daddy>.system{
              border-color: rgb(168, 146, 4);
              background-color: #ffDDDD;
          }
          .${this.name}-notice>.alert{
              width: 20px;
              height: 20px;
              background-image: url('icon-alert.png');
              background-size: cover;
          }
          .${this.name}-notice>.info{
              width: 20px;
              height: 20px;
              background-image: url('icon-info.png');
              background-size: cover;
          }
          .${this.name}-notice>.success{
              width: 20px;
              height: 20px;
              background-image: url('icon-success.webp');
              background-size: cover;
          }
          .${this.name}-notice>.system{
              width: 20px;
              height: 20px;
              background-image: url('icon-system.png');
              background-size: cover;
          }
      `
    var s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode(mystyle))
    document.head.appendChild(s);
  }
}
