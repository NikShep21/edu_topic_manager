module.exports = function (plop) {
  plop.setGenerator("shared-ui", {
    description: "Create shared ui component",
    prompts: [
      {
        type: "input",
        name: "slice",
        message: "Component folder name",
      },
      {
        type: "input",
        name: "component",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/shared/ui/{{kebabCase slice}}/{{pascalCase component}}.tsx",
        templateFile: "plop-templates/shared-component.hbs",
      },
      {
        type: "add",
        path: "src/shared/ui/{{kebabCase slice}}/{{pascalCase component}}.module.scss",
        templateFile: "plop-templates/style.hbs",
      },
      {
        type: "add",
        path: "src/shared/ui/{{kebabCase slice}}/index.ts",
        templateFile: "plop-templates/shared-index.hbs",
      },
    ],
  });

  plop.setGenerator("slice", {
    description: "Create FSD slice",
    prompts: [
      {
        type: "list",
        name: "layer",
        message: "Choose layer",
        choices: ["entities", "features", "widgets"],
      },
      {
        type: "input",
        name: "slice",
        message: "Slice name",
      },
      {
        type: "input",
        name: "component",
        message: "Main component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{layer}}/{{kebabCase slice}}/ui/{{pascalCase component}}.tsx",
        templateFile: "plop-templates/slice-component.hbs",
      },
      {
        type: "add",
        path: "src/{{layer}}/{{kebabCase slice}}/ui/{{pascalCase component}}.module.scss",
        templateFile: "plop-templates/style.hbs",
      },
      {
        type: "add",
        path: "src/{{layer}}/{{kebabCase slice}}/model/types.ts",
        templateFile: "plop-templates/types.hbs",
      },
      {
        type: "add",
        path: "src/{{layer}}/{{kebabCase slice}}/index.ts",
        templateFile: "plop-templates/slice-index.hbs",
      },
    ],
  });
};
