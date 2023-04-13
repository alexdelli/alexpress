import type { TinaField } from "tinacms";
export function articoloFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "string",
      name: "url",
      label: "url",
    },
    {
      type: "string",
      name: "author",
      label: "author",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "string",
      name: "categories",
      label: "categories",
      list: true,
    },
    {
      type: "string",
      name: "tags",
      label: "tags",
      list: true,
    },
    {
      type: "image",
      name: "cover",
      label: "cover",
    },
    {
      type: "boolean",
      name: "useRelativeCover",
      label: "useRelativeCover",
    },
  ] as TinaField[];
}
