class CardController {
    set items(items) {
      localStorage.setItem("orders", JSON.stringify(items));
      this.orders = items;
    }
  
    get items() {
      return this.orders;
    }
  
    constructor() {
      this.orders = JSON.parse(localStorage.getItem("orders")) ?? [];
    }
  
    addItem(item) {
      this.items = [...this.orders, item];
    }
  
    setItems(items) {
      this.items = items;
    }
  
    clearItems() {
      this.items = [];
    }
  }
  
  export default new CardController();
  