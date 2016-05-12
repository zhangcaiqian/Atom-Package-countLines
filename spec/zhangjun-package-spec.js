'use babel';

import ZhangjunPackage from '../lib/zhangjun-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('ZhangjunPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('zhangjun-package');
  });

  describe('when the zhangjun-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.zhangjun-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'zhangjun-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.zhangjun-package')).toExist();

        let zhangjunPackageElement = workspaceElement.querySelector('.zhangjun-package');
        expect(zhangjunPackageElement).toExist();

        let zhangjunPackagePanel = atom.workspace.panelForItem(zhangjunPackageElement);
        expect(zhangjunPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'zhangjun-package:toggle');
        expect(zhangjunPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.zhangjun-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'zhangjun-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let zhangjunPackageElement = workspaceElement.querySelector('.zhangjun-package');
        expect(zhangjunPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'zhangjun-package:toggle');
        expect(zhangjunPackageElement).not.toBeVisible();
      });
    });
  });
});
