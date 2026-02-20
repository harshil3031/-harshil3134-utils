export function batch<T>(
  fn: (items: T[]) => void
) {
  let queue: T[] = [];
  let scheduled = false;

  return (item: T) => {
    queue.push(item);

    if (!scheduled) {
      scheduled = true;

      Promise.resolve().then(() => {
        fn(queue);
        queue = [];
        scheduled = false;
      });
    }
  };
}
