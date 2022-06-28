var MyLinkedList = function () {
  this.head = null;
};

MyLinkedList.prototype.getNode = function (idx) {
  let node = this.head;
  for (let i = 0; i < idx; i++) {
    if (!node.next) {
      return null;
    }
    node = node.next;
  }

  return node;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  let node = this.getNode(index);
  return node?.val ?? -1;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  //     3, 5
  let tmpHead = this.head;
  if (tmpHead === null) {
    this.head = { val, next: null };
  } else {
    this.head = {
      val,
      next: tmpHead,
    };
  }
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  let node = this.head;
  if (node === null) {
    this.head = { val, next: null };
    return;
  }
  while (node.next !== null) {
    node = node.next;
  }
  node.next = { val, next: null };
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (this.head === null) {
    this.head = { val, next: null };
    return;
  }
  if (index === 0) {
    let tmpNode2 = this.getNode(index);
    tmpNode2.next = { val, next: tmpNode2 };
    return;
  }
  //   let tmpNode = this.getNode(index + 1);

  let tmpNode2 = this.getNode(index); // 1

  tmpNode2.next = { val: tmpNode2.val, next: tmpNode2.next };

  tmpNode2.val = val;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (this.head === null) {
    return;
  }

  // index = 1

  // 1 , 3
  let beforeNode = this.getNode(index - 1); //0
  let tmpNode = this.getNode(index); // 1
  let tmpNode2 = this.getNode(index + 1); //2

  if (tmpNode2 === null) {
    return;
  }
  beforeNode.next = tmpNode2;
  // tmpNode.val = tmpNode2.val;
  // tmpNode.next = tmpNode2.next;
};

const tmp = new MyLinkedList();
tmp.addAtHead(1);
tmp.addAtTail(3);
tmp.addAtIndex(1, 2);
tmp.deleteAtIndex(1);
tmp.get(1);

// console.log(tmp);

console.log(tmp.get(1));

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
