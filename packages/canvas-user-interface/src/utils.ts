function clone(data: unknown): unknown {
  return JSON.parse(JSON.stringify(data));
}

function removeFromArray(array: unknown[], element: unknown): boolean {
  const i = array.findIndex(elem => elem === element);
  if (i === -1) return false;
  array.splice(i, 1);
  return true;
}

export { clone, removeFromArray };
