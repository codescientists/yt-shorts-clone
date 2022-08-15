import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ldmrmkr8',
  dataset: 'production',
  apiVersion: '2022-07-30',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});