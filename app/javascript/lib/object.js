/* eslint-disable import/prefer-default-export */
export function withoutBlankValues(_object) {
  const object = {..._object};

  Object.keys(object).forEach((key) => {
    const value = object[key];

    if(value === null || value === "") { delete object[key]; }
    if(typeof value === "object" && value.length === 0) { delete object[key]; }
  });

  return object;
}
