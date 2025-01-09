// src/utils/logRender.ts
export const logRender = (componentName: string) => {
  console.log(
    `${componentName} rendered at ${new Date().toLocaleTimeString()}`
  );
};
