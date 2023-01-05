export async function getCategoryById(id) {
  if (!id) return;
  const url = `/api/categories/${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchedCategory = await res.json();

  if (res.ok) {
    return fetchedCategory;
  }

  return {
    status: res.status,
    error: new Error("Couldn't fetch category by id"),
  };
}

export async function getPostById(id) {
  if (!id) return;

  const url = `/api/posts/${id}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fetchedPost = await res.json();

  if (res.ok) {
    return fetchedPost;
  }

  return {
    status: res.status,
    error: new Error("Couldn't fetch post by id"),
  };
}

export const POST = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
};

export const GET = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT = (url, data) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
};

export const FILEPOST = (url, file) => {
  return fetch(url, {
    method: "POST",
    body: file,
  });
};
export const DELETE = (url) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
