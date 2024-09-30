import { db, storage } from "@/firebase";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("Content-Type");
    let body;

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const title = formData.get("title");
      const content = formData.get("content");
      const image = formData.get("image") as File;

      if (!title || !content || !image) {
        return new Response("Missing fields in the request", { status: 400 });
      }

      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl,
        createdAt: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
    } else {
      body = await request.json();
      const { title, content, image } = body;

      if (!title || !content || !image) {
        return new Response("Missing fields in the request", { status: 400 });
      }

      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl: image,
        createdAt: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
    }
  } catch (error: any) {
    console.error("Error adding document:", error);
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
