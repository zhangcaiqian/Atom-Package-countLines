'use babel';

import ZhangjunPackageView from './zhangjun-package-view';
import {
    CompositeDisposable
} from 'atom';

export default {

    zhangjunPackageView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
      //create a instance of view class we have
      // adds the element that it creates to a hidden modal panel in the Atom workspace
        this.zhangjunPackageView = new ZhangjunPackageView(state.zhangjunPackageViewState);
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.zhangjunPackageView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'zhangjun-package:toggle': () => this.toggle()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.zhangjunPackageView.destroy();
    },

    serialize() {
        return {
            zhangjunPackageViewState: this.zhangjunPackageView.serialize()
        };
    },

    toggle() {
        console.log('ZhangjunPackage was toggled!');
        let result = this.logic( () => {
          let editor = atom.workspace.getActiveTextEditor();
          let words = editor.getText().split(/\n+/).length;
          this.zhangjunPackageView.renderContent(words);
          this.modalPanel.show();
        });
        console.log(result);
    },

    logic() {
      return (this.modalPanel.isVisible() ? this.modalPanel.hide() : arguments[0].apply(null));
    }

};
