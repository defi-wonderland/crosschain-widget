export function withComponents<A, B>(component: A, properties: B): A & B {
  Object.keys(properties as any).forEach((key) => {
    (component as any)[key] = (properties as any)[key];
  });
  return component as A & B;
}
