class CategoryDto {
  constructor(id, name, icon) {
    this._id = id;
    this._name = name;
    this._icon = icon;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get icon() {
    return this._icon;
  }

  set icon(icon) {
    this._icon = icon;
  }

  toObject() {
    return {
      id: this._id,
      name: this._name,
      icon: this._icon,
    };
  }
}

class ItemDto {
  constructor(id, name, price, quantity, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
  }
}
