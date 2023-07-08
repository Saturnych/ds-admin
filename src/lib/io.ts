import ioClient from 'socket.io-client';
import { userId, accessToken } from '$lib/stores';
import PUBLIC_ENV from '$lib/public';

export const io = !!PUBLIC_ENV.PUBLIC_IO_BASEURI && ioClient(PUBLIC_ENV.PUBLIC_IO_BASEURI, {
  reconnectionDelay: 300,
  reconnectionDelayMax: 300,
  extraHeaders: {
    Authorization: `Bearer ${accessToken.get()}`,
    UserId: userId.get(),
  },
});

if (io) {
  io.on('connect_error', (err) => {
    if (PUBLIC_ENV.DEV) console.info(`connect_error due to ${err.message}`);
  });
  io.on('connect', () => {
    if (PUBLIC_ENV.DEV) console.info('Connection with the Gateway established! | accessToken.length:', accessToken.get().length);
    io.emit('call', 'v1.io.ping', (error, res) => {
      if (PUBLIC_ENV.DEV) console.info(`socketio.call('v1.io.ping') error:`, error, 'res:', res);
    });
  });
}
