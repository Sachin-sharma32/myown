import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const imageBuilder = (img) => builder.image(img).url();
