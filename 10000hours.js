const startButton = document.querySelector(".start_btn");
const result = document.querySelector(".result");
const modal = document.querySelector("#modal");
const openButton = document.querySelector(".modal_btn");
const closeButton = document.querySelector(".close_btn");
const shareButton = document.querySelector(".share_btn");
const loading = document.querySelector(".result_loading");
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-messaging.js';
// TODO: Replace the following with your app's Firebase project configuration
    const firebaseConfig = {
      apiKey: "AIzaSyC4kLvzm70vYYJC8BDoF0Dp3QfoScs2oJ0",
      authDomain: "hours-push.firebaseapp.com",
      projectId: "hours-push",
      storageBucket: "hours-push.appspot.com",
      messagingSenderId: "155240921444",
      appId: "1:155240921444:web:4a0b66889e4c822dec6271",
      measurementId: "G-98ML1QR89N"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);            
    
    async function getUserToken () {
      const messaging = await getMessaging(app);
      const swReg = await navigator.serviceWorker.register('./sw.js')
      console.log('등록된 SW', swReg)
      const token = await getToken(messaging, { vapidKey: "BEqB-tFJ0QLv_xKP1bL2v3f2uT-ToExLHDA80-HbjAi_cMCsXWhz-7bwZRdiLRXFebpK7arO4-ntYoXyaeW-2Z0", serviceWorkerRegistration: swReg})  
      alert(token)
    }
getUserToken()
// let isSubscribed = false;
// let swRegistration = null;

// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   console.log('Service Worker and Push is supported');

//   navigator.serviceWorker.register('./sw.js')
//   .then(function(swReg) {
//     console.log('Service Worker is registered', swReg);
//     swRegistration = swReg;
//     const config = {
// 	  apiKey: '${{ secrets.API_KEY }}',
// 	  authDomain: '${{ secrets.AUTH_DOMAIN }}',
// 	  projectId: '${{ secrets.PROJECT_ID }}',
// 	  storageBucket: '${{ secrets.STORAGE_BUCKET }}',
// 	  messagingSenderId: '${{ secrets.MESSAGING_SENDER_ID }}',
// 	  appId: '${{ secrets.APP_ID }}',
// 	  measurementId: '${{ secrets.MEASUREMENT_ID }}',
// 	};

// 	firebase.initializeApp(config);

// 	const messaging = firebase.messaging();
// 	messaging
// 	  .requestPermission()
// 	  .then(() => {
// 		console.log('등록된 Service Worker:', swRegistration, 'vapidKey:', '${{secrets.VAPID_KEY}}')
// 		const user_token = messaging.getToken({serviceWorkerRegistration: swRegistration, vapidKey: '${{secrets.VAPID_KEY}}'});	
// 		alert(user_token);
// 	    return user_token;
// 	  })
// 	  .then(token => {
// 	    alert(token)
// 	  })
// 	  .catch(err => {
// 	    alert(err)
// 	    console.log("No permission to send push", err);
// 	  });

// 	messaging.onMessage(payload => {
// 	  console.log("Message received. ", payload);
// 	  const { title, ...options } = payload.notification;
// 	});
	  
//     // Set the initial subscription value
//     swRegistration.pushManager.getSubscription()
//         .then(function(subscription) {
//             isSubscribed = !(subscription === null);
            
//             if (isSubscribed) {
//                 console.log('User IS subscribed.');
//             } else {
//                 console.log('User is NOT subscribed.');
//             }
    
//     });
//   })
//   .catch(function(error) {
//     console.error('Service Worker Error', error);
//   });
// } else {
//   console.warn('Push messaging is not supported');
// }

function calculator() {
    const fieldValue = document.querySelector("#field_value");
    let timeValue = document.querySelector("#time_value");
    let timeValue_int = Number(timeValue.value);

    const fieldResult = document.querySelector(".field_result");
    const timeResult = document.querySelector(".time_result");

    if(fieldValue.value == "") {
        alert('입력되지 않았습니다.');
        fieldValue.focus();
        return false;
    } else if (timeValue.value== "") {
        alert('입력되지 않았습니다.');
        timeValue.focus();
        return false;
    } else if (timeValue_int > 24) {
        alert('잘못된 값입니다. 24이하의 값을 입력해 주세요.');
        return false;
    }

    result.style.display = "none";
    loading.style.display = "flex";

    setTimeout(function() {
        loading.style.display = "none";
        result.style.display = "flex";
        fieldResult.innerText = fieldValue.value;
        timeResult.innerText = parseInt((10000/timeValue_int), 10);
    }, 1800);   
}

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if(event.target == modal) {
        closeModal();
    }
};

function copyUrl() {
    let url = window.location.href;
    let tmp = document.createElement('input');    

    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
    alert("URL이 복사되었습니다"); 
}

shareButton.addEventListener('click', copyUrl);
openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
startButton.addEventListener("click", calculator);

// const config = {
//   apiKey: '${{ secrets.API_KEY }}',
//   authDomain: '${{ secrets.AUTH_DOMAIN }}',
//   projectId: '${{ secrets.PROJECT_ID }}',
//   storageBucket: '${{ secrets.STORAGE_BUCKET }}',
//   messagingSenderId: '${{ secrets.MESSAGING_SENDER_ID }}',
//   appId: '${{ secrets.APP_ID }}',
//   measurementId: '${{ secrets.MEASUREMENT_ID }}',
// };

// firebase.initializeApp(config);

// const messaging = firebase.messaging();
// // console.log(messaging)
// // navigator.serviceWorker.register('https://jytorch.github.io/10000hours_PWA/firebase-messaging-sw.js')
// //       .then((registration) => {
// // 	  console.log(registration)
// // 	  messaging.useServiceWorker(registration);
// // 	  // Request permission and get token.....
// //       });

// messaging
//   .requestPermission()
//   .then(() => {
// 	console.log('등록된 Service Worker:', swRegistration, 'vapidKey:', '${{secrets.VAPID_KEY}}')
// 	const user_token = messaging.getToken({serviceWorkerRegistration: swRegistration, vapidKey: '${{secrets.VAPID_KEY}}'});	
// 	alert(user_token);
// //     message.innerHTML = "Notifications allowed";
//     return user_token;
//   })
//   .then(token => {
//     alert(token)
//     // tokenString.innerHTML = "Token Is : " + token;
//   })
//   .catch(err => {
//     alert(err)
//     // errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
//     console.log("No permission to send push", err);
//   });

// messaging.onMessage(payload => {
//   console.log("Message received. ", payload);
//   const { title, ...options } = payload.notification;
// });
