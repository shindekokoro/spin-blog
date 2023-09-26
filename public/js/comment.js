const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment-content').value.trim();

  if (content) {
    let post_id = document.getElementById('comment-submit').value;
    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to add new comment to post.');
    }
  }
};

document
  .querySelector('.post-comment')
  .addEventListener('submit', commentFormHandler);
