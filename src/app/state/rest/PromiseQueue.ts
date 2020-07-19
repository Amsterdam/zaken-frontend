type QueueItem = {
  promise: () => Promise<any>
  resolve: (value: any) => void
  reject: (error: any) => void
}

// Heavily inspired by:
// https://medium.com/@karenmarkosyan/how-to-manage-promises-into-dynamic-queue-with-vanilla-javascript-9d0d1f8d4df5
export default class PromiseQueue {
  private queue: QueueItem[] = [];
  private pending = false;

  public push(promise: () => Promise<any>) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject
      })
      this.next()
    })
  }

  private next() {
    if (this.pending) {
      return false
    }
    const item = this.queue.shift()
    if (!item) {
      return false
    }
    try {
      this.pending = true
      item.promise()
        .then((value) => {
          this.pending = false
          item.resolve(value)
          this.next()
        })
        .catch(err => {
          this.pending = false
          item.reject(err)
          this.next()
        })
    } catch (err) {
      this.pending = false
      item.reject(err)
      this.next()
    }
    return true
  }
}
