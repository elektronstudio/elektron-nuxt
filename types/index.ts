export * from "./media";
export * from "./event";
export * from "./project";
export * from "./messages";

export type Urgency = "past" | "now" | "soon" | "future" | "permanent";

export type Breadcrumb = {
  title: string;
  link?: string;
};
