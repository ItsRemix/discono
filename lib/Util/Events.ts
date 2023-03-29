// deno-lint-ignore-file

export default {
  snakeToCamelCase(object: Record<string, unknown>) {
    const toCamel = (str: any) => {
      return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
      });
    };

    const isObject = function (obj: Record<string, unknown>) {
      return (
        obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function"
      );
    };

    const keysToCamel: Record<string, unknown> = function (obj: Record<string, unknown>) {
      if (isObject(obj)) {
        const n = {};

        Object.keys(obj).forEach((k) => {
          n[toCamel(k)] = keysToCamel(obj[k]);
        });

        return n;
      } else if (Array.isArray(obj)) {
        return obj.map((i) => {
          return keysToCamel(i);
        });
      }

      return obj;
    };

    return keysToCamel(object)
  },
};
