const postUpdateHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const post_id = document.getElementById('post-update').value;

  if (title && content) {
    const response = await fetch('/api/blog/' + post_id, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/blog/' + post_id);
    } else {
      alert('Failed to update post.');
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', postUpdateHandler);
