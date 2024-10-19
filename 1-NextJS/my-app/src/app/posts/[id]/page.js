export default function PostPage({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>Post ID: {id}</h1>
      <p>This is a dynamic page for the post with ID: {id}</p>
    </div>
  );
}
