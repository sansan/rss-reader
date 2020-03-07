const freeze = obj => Object.freeze(obj);

export default (...members) => {
  const memberValues = {};

  for (const member of members) {
    // we're only supporting string or object arguments
    if (typeof member === "string") {
      memberValues[member] = freeze({ value: member });
    } else if (typeof member === "object") {
      // use the first provided key to support { key: value } usage
      const key = Object.keys(member)[0];
      memberValues[key] = freeze({ value: member[key] });
    }
  }

  return freeze(memberValues);
};
 