import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** Attributes for links that leave the site in a new tab. */
export const externalProps = { target: "_blank", rel: "noopener noreferrer" } as const;
