export default class MessengerController {
  constructor(api, renderer) {
    this.api = api;
    this.renderer = renderer;
    this.inputTextarea = document.querySelector('.input_field');
    this.inputDnD = document.querySelector('.input');
    this.messagesFieid = document.querySelector('.messenger_field');
    this.clipBtn = document.querySelector('.clip_btn');
    this.inputBtn = document.querySelector('.input_btn');
    // this.wsURL = `ws://localhost:7070/ws`;
    this.wsURL = 'wss://ahj-diploma-serv.herokuapp.com/ws';
    this.lazyLoadCounter = 10;
    this.messageslimit = 10;
    this.messageCount = 0;
  }

  async init() {
    this.ws = new WebSocket(this.wsURL);
    // this.ws.addEventListener('open', () => {
    //   console.log('connected');
    // });

    this.ws.addEventListener('message', (event) => {
      if (event.data && event.data !== null) {
        const messageObject = JSON.parse(event.data);
        if (messageObject.type === 'text') {
        // console.log(messageObject.type);
          this.messageCount += 1;
          // console.log('1');
          // console.log(this.messageCount);
          this.renderer.addMsg(messageObject, 'append');
        } else {
          // console.log(messageObject.type);
          this.messageCount += 1;
          // console.log('2');
          // console.log(this.messageCount);
          this.renderer.addFileMsg(messageObject, 'append');
        }
      // this.renderer.addMsg(messageObject.text, messageObject.id);
      }
    });

    // this.ws.addEventListener('close', (evt) => {
    // console.log('connection closed', evt);
    // });

    // this.ws.addEventListener('error', () => {
    //   console.log('error');
    // });


    const messagesList = await this.api.getMsg(this.lazyLoadCounter);

    // const messagesListNew = await this.api.getTest(10);
    // console.log('messagesListNew');
    // console.log(messagesListNew);
    if (messagesList.length > this.lazyLoadCounter) {
      for (let i = 0; i < this.lazyLoadCounter; i += 1) {
        const index = messagesList.length - 1 - i;
        // console.log(index);
        if (messagesList[index].type === 'text') {
          // console.log(item.type);
          this.messageCount += 1;
          // console.log('3');
          // console.log(this.messageCount);
          this.renderer.addMsg(messagesList[index], 'prepend');
        } else {
          this.messageCount += 1;
          // console.log('4');
          // console.log(this.messageCount);
          this.renderer.addFileMsg(messagesList[index], 'prepend');
        }
      }
    } else {
      for (const item of messagesList) {
        // console.log(item.type);
        if (item.type === 'text') {
          // console.log(item.type);
          this.messageCount += 1;
          // console.log('3');
          // console.log(this.messageCount);
          this.renderer.addMsg(item, 'append');
        } else {
          this.messageCount += 1;
          // console.log('4');
          // console.log(this.messageCount);
          this.renderer.addFileMsg(item, 'append');
        }
      }

      // this.renderer.addMsg(item.text, item.id);
    }

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('link_test')) {
        // console.log(event.target);
        // event.preventDefault();
      }
    });


    this.inputTextarea.addEventListener('keydown', async (event) => {
    //   console.log(this.inputTextarea.value);
      if (event.key === 'Enter') {
        event.preventDefault();
        if (this.ws.readyState === WebSocket.OPEN) {
          try {
            const newTextMsg = {
              type: 'text',
              favorite: false,
              msg: this.inputTextarea.value,
            };
            this.ws.send(JSON.stringify(newTextMsg));
          } catch (e) {
            // console.log(e);
          }
        } else {
          this.ws = new WebSocket(this.wsURL);
          const newTextMsg = {
            type: 'text',
            favorite: false,
            msg: this.inputTextarea.value,
          };
          this.ws.send(JSON.stringify(newTextMsg));
        }
        this.inputTextarea.value = '';
      }
    });

    this.inputBtn.addEventListener('click', async () => {
      //   console.log(this.inputTextarea.value);
      // this.api.addMsg(this.inputTextarea.value);
      if (this.ws.readyState === WebSocket.OPEN) {
        try {
          const newTextMsg = {
            type: 'text',
            favorite: false,
            msg: this.inputTextarea.value,
          };
          this.ws.send(JSON.stringify(newTextMsg));
        } catch (e) {
          // console.log(e);
        }
      } else {
        this.ws = new WebSocket(this.wsURL);
        const newTextMsg = {
          type: 'text',
          favorite: false,
          msg: this.inputTextarea.value,
        };
        this.ws.send(JSON.stringify(newTextMsg));
      }
      this.inputTextarea.value = '';
      // const messages = await this.api.getMsg();
      // const lastMsg = messages.length - 1;
      // this.renderer.addMsg(messages[lastMsg].text, messages[lastMsg].id);
    });

    // console.log(this.messagesFieid);

    this.clipBtn.addEventListener('click', () => {
      this.inputDnD.dispatchEvent(new MouseEvent('click'));
    });

    this.inputDnD.addEventListener('input', (event) => {
      const files = Array.from(event.currentTarget.files);
      // const files = Array.from(evt.dataTransfer.files);
      // console.log(files);
      // for (const file of files) {


      for (const item of files) {
        // console.log(item);
        const fileTypeRegExp = /[a-z]+/;
        const fileType = item.type.match(fileTypeRegExp);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(item);
        fileReader.onload = () => {
          // console.log(item.type);
          // console.log(fileType);
          const message = {
            type: fileType,
            favorite: false,
            name: item.name,
            msg: fileReader.result,
          };
          this.ws.send(JSON.stringify(message));
        };
      }
      // this.api.uploadToServer(files);
    });

    this.messagesFieid.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      this.messagesFieid.classList.add('focus');
    });

    this.messagesFieid.addEventListener('dragleave', (evt) => {
      evt.preventDefault();
      this.messagesFieid.classList.remove('focus');
    });

    this.messagesFieid.addEventListener('drop', (evt) => {
      evt.preventDefault();
      this.messagesFieid.classList.remove('focus');
      const files = Array.from(evt.dataTransfer.files);


      for (const item of files) {
        // console.log(item);
        const fileTypeRegExp = /[a-z]+/;
        const fileType = item.type.match(fileTypeRegExp)[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(item);
        fileReader.onload = () => {
          // console.log(item.type);
          // console.log(fileType);
          const message = {
            type: fileType,
            favorite: false,
            name: item.name,
            msg: fileReader.result,
          };
          this.ws.send(JSON.stringify(message));
        };
      }
    });

    this.renderer.container.addEventListener('scroll', (event) => {
      if (event.target.scrollTop === 0) {
        // console.log('work');
        this.lazyLoad();
      }
    });
  }

  async lazyLoad() {
    this.messageslimit += this.lazyLoadCounter;
    // console.log(this.messageslimit);
    const messagesListNew = await this.api.getMsg(this.messageslimit);
    // console.log(messagesListNew);
    if (messagesListNew === 'All loaded') {
      alert('All loaded');
    }
    messagesListNew.reverse();
    // console.log(messagesListNew);
    for (const item of messagesListNew) {
      // console.log(item.type);
      if (item.type === 'text') {
        // console.log(item.type);
        this.messageCount += 1;
        // console.log('3');
        // console.log(this.messageCount);
        this.renderer.addMsg(item, 'prepend');
      } else {
        this.messageCount += 1;
        // console.log('4');
        // console.log(this.messageCount);
        this.renderer.addFileMsg(item, 'prepend');
      }
    }
  }
}
