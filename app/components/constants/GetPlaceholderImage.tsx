// 'use server'
// import sharp from 'sharp'
// import { promises as fs } from 'fs'
// import path from 'path'

// // Converts buffer to base 64 encoded string i.e it takes in a buffer arg which is a type of Buffer and returns a base 64 string
// function bufferToBase64(buffer: Buffer): string {
//     return `data:image/png;base64,${buffer.toString('base64')}`
// }

// // Local image. It accepts a filepath arg which is a type of string
// async function getFileBufferLocal(filepath: string) {
//     const _filePath = filepath.replace(/_next/g, '.next');
//     // console.log('filep_filePathath', _filePath)
//     // console.log('filepath', filepath)
//     // filepath is file addess exactly how is used in Image component (/ = public/)
//     // This constructs the file to the path by joining the current working directory, public folder and the file path
//     const realFilepath = path.join(process.cwd(), _filePath)
//     console.log('realFilepath', realFilepath)
//     console.log('cwd', process.cwd())
//     // This reads the file and returns its content as a buffer
//     return fs.readFile(realFilepath)
// }

// // This function is designed to handle remote images by fetching the image from a given URL
// // It accepts a single argument `url` which is a type of string
// async function getFileBufferRemote(url: string) {
//     // Use the fetch API to make an HTTP request to the given URL
//     const response = await fetch(url);

//     // Convert the response to an ArrayBuffer which represents the raw binary data
//     const arrayBuffer = await response.arrayBuffer();

//     // Convert the ArrayBuffer into a Node.js Buffer which is optimized for handling binary data
//     // The Buffer is then returned, containing the binary data of the fetched image
//     return Buffer.from(arrayBuffer);
// }

// // Determines if the source is a remote URL or a local file path and fetches the corresponding file buffer.
// function getFileBuffer(src: string) {
//     // Check if the source string starts with 'http' to determine if it's a remote URL
//     const isRemote = src.startsWith('http');

//     // Return the appropriate function to fetch the file buffer based on whether the source is remote or local
//     return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src);
// }

// // Generates a placeholder image for a given file path.
// export async function getPlaceholderImage(filepath: string) {
//     try {
//         // Fetch the original image buffer from the specified file path
//         const originalBuffer = await getFileBuffer(filepath);

//         // Resize the image to a small placeholder (20 pixels wide) and convert it to a buffer
//         const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();

//         // Return an object containing the original file path and the base64-encoded resized image
//         return {
//             src: filepath,
//             placeholder: bufferToBase64(resizedBuffer),
//         };
//     } catch {
//         // In case of an error, return a default placeholder image
//         return {
//             src: filepath,
//             placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==',
//             // placeholder: '',
//         };
//     }
// }

