import slugify from 'slugify';

export function generateBookSlug(title: string) {
  const cleanTitle = slugify(title, { lower: true, strict: true }); // removes special chars, lowercases
  return `${cleanTitle}`;
}
