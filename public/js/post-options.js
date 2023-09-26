const postDeleteHandler = async (event) => {
  event.preventDefault();

  if (event.target.value) {
    const response = await fetch('/blog/' + event.target.value, {
      method: 'DELETE',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  }
};

const postUpdateHandler = async (event) => {
  event.preventDefault();

  if (event.target.value) {
    const response = await fetch('/api/blog/' + event.target.value, {
      method: 'GET',
      body: null,
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/api/blog/' + event.target.value);
    } else {
      alert('Failed to fetch post for update.');
    }
  }
};

let deleteButtons = document.querySelectorAll('.post-delete');
if (deleteButtons) {
  deleteButtons.forEach((button) => {
    button.addEventListener('click', postDeleteHandler);
  });
}

let updateButtons = document.querySelectorAll('.post-update');
if (updateButtons) {
  updateButtons.forEach((button) => {
    button.addEventListener('click', postUpdateHandler);
  });
}
