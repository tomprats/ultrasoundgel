export function valueFrom({defaultValue, name, objects}) {
  const source = objects.find((object) => object[name] != null);

  if(source) { return source[name]; }
  if(defaultValue != null) { return defaultValue; }

  return "";
}

export function valueFromTarget({checked, files, name, type, value}) {
  if(type === "checkbox") { return checked; }
  if(type === "file") {
    const file = files[0];
    return file && URL.createObjectURL(file);
  }
  if(name.endsWith("_ids")) { return (value || []).map(Number); }

  return value;
}
