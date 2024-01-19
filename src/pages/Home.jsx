import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components/Index';
import { useSelector } from 'react-redux';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await appwriteService.getPosts();
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents);
        }
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching posts:', error);
      } finally {
        // Set loading to false when done fetching, regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Display a loading indicator or any other UI while posts are being fetched
    return (
      <div className="w-full py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (userData) {
    if (posts.length === 0) {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">No Posts Uploaded</h1>
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
    }
  }

  return (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">Login to read posts</h1>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
