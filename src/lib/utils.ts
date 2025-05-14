import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getPlaiceholder } from "plaiceholder";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export async function getStaticProps() {
//   // For LOCAL IMAGES in `/public` folder:
//   const { base64 } = await getPlaiceholder('/your-image.jpg');
  
//   // For REMOTE IMAGES (like from another website):
//   // const { base64 } = await getPlaiceholder('https://example.com/image.jpg');
  
//   return { 
//     props: { 
//       blurDataURL: base64 
//     } 
//   };
// }