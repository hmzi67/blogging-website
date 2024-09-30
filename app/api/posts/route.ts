import { db, storage } from "@/firebase";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function fetchBlogById(id: string) {
  const blogRef = doc(db, "posts", id);
  const blogSnap = await getDoc(blogRef);

  if (blogSnap.exists()) {
    return { id: blogSnap.id, ...blogSnap.data() }; // Return the blog data with ID
  } else {
    return null; // Return null if the blog does not exist
  }
}

export async function POST(request: Request) {
  try {
    // Check if the request is a form data request
    const contentType = request.headers.get("Content-Type");
    let body;

    if (contentType && contentType.includes("multipart/form-data")) {
      // Handle FormData
      const formData = await request.formData();
      const title = formData.get("title");
      const content = formData.get("content");
      const image = formData.get("image") as File; // Type assertion for File

      if (!title || !content || !image) {
        return new Response("Missing fields in the request", { status: 400 });
      }

      // Handle Image Upload
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image); // Upload image to Storage
      const imageUrl = await getDownloadURL(imageRef); // Get image URL

      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl, // Save the image URL
        createdAt: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
    } else {
      // Handle JSON requests (if you still want to support it)
      body = await request.json();
      const { title, content, image } = body; // Include image URL

      if (!title || !content || !image) {
        return new Response("Missing fields in the request", { status: 400 });
      }

      // Assuming image is a URL string in JSON, you may need to adapt this part accordingly
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl: image, // Directly use the image URL
        createdAt: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
    }
  } catch (error: any) {
    console.error("Error adding document:", error); // Log the error for debugging
    return new Response("Error adding document: " + error.message, {
      status: 500,
    });
  }
}

// Add the GET method to fetch all posts
export async function GET() {
  try {
    const postsSnapshot = await getDocs(collection(db, "posts"));
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return new Response("Error fetching posts: " + error.message, {
      status: 500,
    });
  }
}
