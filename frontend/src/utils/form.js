export function parseErrorMessages(fieldsErrorsMessages) {
    return Object.entries(fieldsErrorsMessages).reduce(
      (acc, [fieldName, errors]) => {
        acc[fieldName] = {
          validateStatus: "error",
          help: errors.join(" "),
        };
        return acc;
      },
      {}
    );
  }
  

  