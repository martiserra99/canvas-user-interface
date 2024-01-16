import ElementType, { ElementLifecycle } from '../../type/generic/element';

class ViewType extends ElementType {
  protected getLifecycle() {
    return new ViewLifecycle();
  }
}

class ViewLifecycle extends ElementLifecycle {
  protected setFunctions() {
    super.setFunctions();

    const getSize = () => ({ width: 0, height: 0 });
    this.lifecycle.set('getSize', getSize);

    const drawItself = () => {};
    this.lifecycle.set('drawItself', drawItself);
  }
}

export default ViewType;
