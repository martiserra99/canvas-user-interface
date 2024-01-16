import ElementType, { ElementLifecycle } from '../../type/generic/element';

class CompositeType extends ElementType {
  protected getLifecycle() {
    return new CompositeLifecycle();
  }
}

class CompositeLifecycle extends ElementLifecycle {
  setFunctions() {
    super.setFunctions();

    const getElement = () => {};
    this.lifecycle.set('getElement', getElement);

    const updateElement = () => {};
    this.lifecycle.set('updateElement', updateElement);
  }
}

export default CompositeType;
