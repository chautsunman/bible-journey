class Subscriber<T> {
  onData: (data: T) => void;
}

class Publisher<T> {
  subscribe: (subscriber: Subscriber<T>) => void;
  unsubscribe: (subscriber: Subscriber<T>) => void;
}

export {
  Subscriber,
  Publisher
};
