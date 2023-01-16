import Presenter from './presenter';

/**
 * @extends {Presenter<NewPointEditorView>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);
  }

  /**
   * @override
   */
  handleNavigation() {
    if(this.location.pathname === '/new') {
      console.log('открыть')
    } else {
      console.log('pfrhsnm')
    }
  }
}
