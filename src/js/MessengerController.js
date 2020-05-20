export default class MessengerController {
  constructor(api, renderer) {
    this.api = api;
    this.renderer = renderer;
    this.inputTextarea = document.querySelector('.input_field');
    this.inputDnD = document.querySelector('.input');
    this.messagesFieid = document.querySelector('.messenger_field');
  }

  async init() {
    const messagesList = await this.api.getMsg();
    for (const item of messagesList) {
      if (item.file) {
        // console.log('123123');
        this.renderer.addFileMsg(`${this.api.server}/${item.file}`, item.id);
      } else {
        this.renderer.addMsg(item.text, item.id);
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
        this.api.addMsg(this.inputTextarea.value);
        this.inputTextarea.value = '';
        const messages = await this.api.getMsg();
        const lastMsg = messages.length - 1;
        this.renderer.addMsg(messages[lastMsg].text, messages[lastMsg].id);
      }
    });

    // console.log(this.messagesFieid);

    // this.messagesFieid.addEventListener('click', () => {
    //     this.inputDnD.dispatchEvent(new MouseEvent('click'));
    // });

    this.inputDnD.addEventListener('input', (event) => {
      const files = Array.from(event.currentTarget.files);
      this.api.uploadToServer(files);
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
      this.api.uploadToServer(files);
    });
  }
}
