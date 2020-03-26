import { register } from 'register-service-worker';
import { Notify, Loading } from 'quasar';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready() {
    if (process.env.DEV) {
      console.log('App is being served from cache by a service worker.');
    }
  },

  registered(/* registration */) {
    if (process.env.DEV) {
      console.log('Service worker has been registered.');
    }
  },

  cached(/* registration */) {
    if (process.env.DEV) {
      console.log('Content has been cached for offline use.');
    }
  },

  updatefound(/* registration */) {
    if (process.env.DEV) {
      console.log('New content is downloading.');
    }
  },

  updated(registration) {
    console.log('New content is available; please refresh.');

    Notify.create({
      message: 'There is an update available for this app',
      timeout: 10000, // You can adjust this, use 0 for infinite
      closeBtn: 'Close',
      actions: [
        {
          label: 'Update',
          icon: 'fas fa-download',
          color: 'white',
          handler() {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              window.location.reload();
            });

            // This process if rather fast generally, but for better experience show "Loading"
            Loading.show({
              delay: 0,
              message: 'Updating the app...',
            });

            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          },
        },
      ],
    });
  },

  offline() {
    if (process.env.DEV) {
      console.log(
        'No internet connection found. App is running in offline mode.',
      );
    }
  },

  error(err) {
    if (process.env.DEV) {
      console.error('Error during service worker registration:', err);
    }
  },
});
