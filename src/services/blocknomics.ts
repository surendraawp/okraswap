// interface XMLHttpRequestResponse {
//     status: number;
//     response: {
//       satoshi: number;
//       address: string;
//     };
//   }
  
//   interface XMLHttpRequest {
//     onreadystatechange: () => void;
//     readyState: number;
//     open(method: string, url: string): void;
//     responseType: string;
//     send(data: string): void;
//   }
  
//   interface QRious {
//     element: HTMLElement;
//     value: string;
//     size: number;
//   }
  
//   interface Widget {
//     displayTimer(msg_area: string, remaining: number): void;
//     displayError(msg_area: string, msg: string): void;
//     displayMessage(msg_area: string, msg: string): void;
//     generateQr(address: string, amount: number): void;
//     displayCheckout(msg_area: string, satoshi: number, address: string, totalTime: number): void;
//     myTimeout: NodeJS.Timeout | null;
//     stopTimer(): void;
//   }
  
//   interface Blockonomics {
//     widget(options: {
//       msg_area: string;
//       uid: string;
//       email: string;
//       name?: string;
//       address?: string;
//       amount?: number;
//       quantity?: number;
//       phone?: string;
//       custom_one?: string;
//       custom_two?: string;
//       extra_data?: string;
//       timer?: number;
//     }): void;
//   }
  
//   declare const QRious: (options: QRious) => void;
  
//   const httpPostAsync = (theUrl: string, postData: any, callback: (response: XMLHttpRequestResponse) => void): void => {
//     const postOrder = new XMLHttpRequest();
//     postOrder.onreadystatechange = () => {
//       if (postOrder.readyState === 4) {
//         callback({
//           status: postOrder.status,
//           response: JSON.parse(postOrder.responseText),
//         });
//       }
//     };
//     postOrder.open('POST', theUrl);
//     postOrder.responseType = 'json';
//     postOrder.send(JSON.stringify(postData));
//   };
  
//   const loadClientChallenge = (): void => {
//     const script = document.createElement('script');
//     script.src = 'https://www.blockonomics.co/js/client-challenge.js';
//     document.head.appendChild(script);
//   };
  
//   const loadQrious = (): void => {
//     const script = document.createElement('script');
//     script.src = 'https://www.blockonomics.co/js/qrious.min.js';
//     document.head.appendChild(script);
//   };
  
//   const loadRequiredStyles = (): void => {
//     const styles = `
//       @font-face {
//         font-family: 'blockonomics-icons';
//         src:  url('/fonts/blockonomics-icons.woff?bue15') format('woff');
//         font-weight: normal;
//         font-style: normal;
//         font-display: block;
//       }
  
//       [class^="blockonomics-icon-"], [class*=" blockonomics-icon-"] {
//         /* use !important to prevent issues with browser extensions that change fonts */
//         font-family: 'blockonomics-icons' !important;
//         speak: never;
//         font-style: normal;
//         font-weight: normal;
//         font-variant: normal;
//         text-transform: none;
//         line-height: 1;
  
//         /* Better Font Rendering =========== */
//         -webkit-font-smoothing: antialiased;
//         -moz-osx-font-smoothing: grayscale;
//       }
  
//       .blockonomics-icon-close:before {
//         content: "\\e901";
//       }
//       .blockonomics-icon-copy:before {
//         content: "\\e900";
//       }
//     `;
  
//     const styleSheet = document.createElement('style');
//     styleSheet.innerText = styles;
//     document.head.appendChild(styleSheet);
//   };
  
//   const Widget: Widget = {
//     displayTimer(msg_area, remaining) {
//       const minutes = Math.floor(remaining / 60);
//       const seconds = Math.floor(remaining) % 60;
//       const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
//       document.getElementById(msg_area).querySelector('.time_remaining').innerHTML = `${minutes}:${formattedSeconds}`;
//     },
//     displayError(msg_area, msg) {
//       const self = this;
//       const widget_elem = document.getElementById(msg_area);
//       widget_elem.style.marginTop = '5px';
//       widget_elem.style.padding = '5px';
//       widget_elem.style.width = 'fit-content';
//       widget_elem.style.border = '1px solid lightgray';
//       widget_elem.style.borderRadius = '5px';
//       widget_elem.style.display = 'block';
//       widget_elem.innerHTML = `<div class='blockonomics_error'>` + msg + `<div class="blockonomics_close" style="text-align:center;"><a href="#" style="cursor:pointer">Close</a></div></div>`;
//       widget_elem.querySelector('.blockonomics_close a').onclick = function (evt) {
//         evt.preventDefault();
//         widget_elem.style.display = 'none';
//         self.stopTimer();
//       };
//     },
//     displayMessage(msg_area, msg) {
//       const self = this;
//       const widget_elem = document.getElementById(msg_area);
//       widget_elem.style.marginTop = '5px';
//       widget_elem.style.padding = '5px';
//       widget_elem.style.width = 'fit-content';
//       widget_elem.style.border = '1px solid lightgray';
//       widget_elem.style.borderRadius = '5px';
//       widget_elem.style.display = 'block';
//       widget_elem.innerHTML = `<div class='blockonomics_message'>` + msg + `<div class="blockonomics_close" style="text-align:center;"><a href="#" style="cursor:pointer">Close</a></div></div>`;
//       widget_elem.querySelector('.blockonomics_close a').onclick = function (evt) {
//         evt.preventDefault();
//         widget_elem.style.display = 'none';
//         self.stopTimer();
//       };
//     },
//     generateQr(address, amount) {
//       const data = `bitcoin:${address}?amount=${amount}`;
//       const qr_elem = document.getElementById('blockonomics_qrcode');
//       new QRious({
//         element: qr_elem,
//         value: data,
//         size: 135,
//       });
//     },
//     displayCheckout(msg_area, satoshi, address, totalTime) {
//       const self = this;
//       self.displayMessage(
//         msg_area,
//         `<div style="display:flex; align-items:center; justify-content: center;">
//           <div style="max-width: 30%; padding-right:7px;">
//             <a href="bitcoin:${address}?amount=${satoshi / 1e8}"><canvas id='blockonomics_qrcode' style="max-width:100%"></canvas></a>
//           </div>
//           <div>
//             <div>To pay, send bitcoin to this address:</div>
//             <input type="text" value="${address}" readonly>
//             <div>Amount of bitcoin (BTC) to send:</div>
//             <input type="text" value="${satoshi / 1e8}" readonly>
//             <div style="text-align:center"><small class='time_remaining'></small></div>
//           </div>
//         </div>`
//       );
//       self.generateQr(address, satoshi / 1e8);
  
//       const ws = new WebSocket('wss://www.blockonomics.co' + '/payment/' + address);
//       ws.onmessage = function (evt) {
//         ws.close();
//         if (window.blockonomicsPaymentCallback && !window.blockonomicsPaymentCallback.hasRun) {
//           window.blockonomicsPaymentCallback(JSON.parse(evt.data));
//           window.blockonomicsPaymentCallback.hasRun = true;
//         } else {
//           self.displayMessage(msg_area, 'Payment received! txid: ' + JSON.parse(evt.data).txid);
//         }
//         self.stopTimer();
//       };
  
//       let remaining = totalTime;
//       self.displayTimer(msg_area, remaining);
//       self.myTimeout = setInterval(function () {
//         remaining = remaining - 1;
//         self.displayTimer(msg_area, remaining);
//         if (remaining <= 0) {
//           self.stopTimer();
//           self.displayError(msg_area, 'Expired');
//         }
//       }, 1000);
//     },
//     myTimeout: null,
//     stopTimer() {
//       clearTimeout(this.myTimeout);
//     },
//   };
  
//   const Blockonomics: Blockonomics = {
//     widget({
//       msg_area,
//       uid,
//       email,
//       name,
//       address,
//       amount,
//       quantity,
//       phone,
//       custom_one,
//       custom_two,
//       extra_data,
//       timer,
//     }) {
//       uid = uid.trim();
//       if (uid == '') {
//         Widget.displayError(msg_area, 'Missing uid from configuration.');
//         return;
//       }
//       email = email.trim();
//       if (email == '') {
//         Widget.displayError(msg_area, 'Please enter a valid email.');
//         return;
//       }
  
//       let url = 'https://www.blockonomics.co/api/merchant_order/' + uid;
//       if (amount) {
//         url += '?amount=' + amount;
//       } else if (quantity) {
//         url += '?quantity=' + quantity;
//       }
  
//       const postData = {
//         client_challenge: run_challenge(),
//         emailid: email,
//       };
//       if (name) {
//         postData['name'] = name;
//       }
//       if (address) {
//         postData['address'] = address;
//       }
//       if (phone) {
//         postData['phone'] = phone;
//       }
//       if (custom_one) {
//         postData['Custom Field1'] = custom_one;
//       }
//       if (custom_two) {
//         postData['Custom Field2'] = custom_two;
//       }
//       if (extra_data) {
//         postData['extra_data'] = extra_data;
//       }
  
//       if (!url || !postData) return;
  
//       httpPostAsync(url, postData, function (data) {
//         if (data.status === 200) {
//           const countdown_timer = timer ? timer : 600;
//           Widget.displayCheckout(msg_area, data.response.satoshi, data.response.address, countdown_timer);
//         } else {
//           try {
//             const code = data.response.error_code;
//             let message = data.response.message;
//             if (message.length > 100) {
//               message = message.substring(0, 100);
//             }
//             Widget.displayError(msg_area, 'Unable to Generate Order. Error Code : ' + code + '. ' + message);
//           } catch (err) {
//             Widget.displayError(msg_area, 'Unable to Generate Order.');
//           }
//         }
//       });
//     },
//   };
  
//   loadClientChallenge();
//   loadRequiredStyles();
//   loadQrious();
//   if ((window as any).blockonomicsAsyncInit && !(window as any).blockonomicsAsyncInit.hasRun) {
//     (window as any).blockonomicsAsyncInit();
//     (window as any).blockonomicsAsyncInit.hasRun = true;
//   }
  

//   export {Blockonomics}