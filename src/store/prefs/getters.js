export function componentArray(state) {
  const { components } = state;
  const names = Object.keys(components);
  const componentsArray = [];
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    if (name.startsWith('Dsh') && components[name].isShown) {
      componentsArray.push(components[name]);
    }
  }
  return componentsArray;
}

export function allComponentsArray(state) {
  const { allComponents } = state;
  const names = Object.keys(allComponents);
  const componentsArray = [];
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    if (name.startsWith('Dsh') && allComponents[name].isShown) {
      componentsArray.push(allComponents[name]);
    }
  }
  return componentsArray;
}
