import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'xz046p2y',
  dataset: 'production',
  apiVersion: '2022-06-05',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
