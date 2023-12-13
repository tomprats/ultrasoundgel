export function dig(object, ...keys) {
  const reducer = (result, key) => (result && result[key] != null ? result[key] : null);

  return keys.reduce(reducer, object);
}

export function mutable(object) {
  if(object === null || typeof object !== "object") { return object; }
  if(Array.isArray(object)) { return object.map((item) => mutable(item)); }

  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, mutable(value)])
  );
}

export function valueFrom({defaultValue, name, objects}) {
  const source = objects.find((object) => object[name] != null);

  if(source) { return source[name]; }
  if(defaultValue != null) { return defaultValue; }

  return "";
}

export function withoutBlankValues(_object) {
  const object = {..._object};

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if(value === null || value === "") { return delete object[key]; }
    if(typeof value === "object" && value.length === 0) { delete object[key]; }
  });

  return object;
}

export function queryString(object) {
  return new URLSearchParams(Object.entries(withoutBlankValues(object))).toString();
}
