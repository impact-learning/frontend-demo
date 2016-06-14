import EventEmitter from 'eventemitter3';

const EE = new EventEmitter();

function mapUpdated(state) {
  EE.emit('map/updated', state);
}

export {
  EE,
  mapUpdated,
};
