import { LocalStorage } from 'quasar';

/**
 * @notice Helper function used to determine if a component was selected
 */
function isSelected(name, selectedComponents) {
  if (!selectedComponents) return true;
  for (let i = 0; i < selectedComponents.length; i += 1) {
    if (selectedComponents[i].name === name) {
      return selectedComponents[i].isShown;
    }
  }
  return true;
}

/**
 * @notice This action is only used the first time a user visits the site.
 * It takes in an object, where each field is a component name. We remove
 * all fields except the ones we need (isShow, data, and name) and convert
 * it to an array. That array is then saved as state.prefs.allComponents
 */
export function setComponentDefaults({ commit }, components) {
  const { allComponents, selectedComponents } = components;
  // This will hold an array of objects containing component name, data, and isShown
  const dshComponents = [];

  // Get all field names (field names of this object are the component names)
  const names = Object.keys(allComponents);

  // Filter down to only dashboard components and remove unused fields
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    if (name.startsWith('Dsh')) {
      // Assume component should be visible, delete fields to save local storage space
      const dshComponent = {};
      Object.assign(dshComponent, allComponents[name]);
      dshComponent.isShown = true;
      // Set data field to object instead of function
      dshComponent.data = dshComponent.data();
      // Remove unneeded fields
      delete dshComponent.mixins;
      delete dshComponent.computed;
      delete dshComponent.render;
      delete dshComponent.staticRenderFns;
      delete dshComponent.components;
      delete dshComponent.beforeCreate;
      delete dshComponent.beforeDestroy;
      // eslint-disable-next-line no-underscore-dangle
      delete dshComponent._compiled;
      // eslint-disable-next-line no-underscore-dangle
      delete dshComponent.__file;

      // If this was not a selected component, set isShown to false
      if (!isSelected(name, selectedComponents)) {
        dshComponent.isShown = false;
      }

      dshComponents.push(dshComponent);
    }
  }
  // Set our array of components
  commit('setComponentSelections', dshComponents);
}

/**
 * @notice This updates a user's components selections and saves the array
 * in LocalStorage
 */
export function setComponentSelections({ commit }, components) {
  LocalStorage.set('selectedComponents', components);
  commit('setComponentSelections', components);
}

/**
 * @notice Sets dark mode status in store
 */
export function setDarkModeStatus({ commit }, isDark) {
  commit('setDarkModeStatus', isDark);
}
