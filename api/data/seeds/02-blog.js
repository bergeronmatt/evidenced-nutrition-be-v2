exports.seed = function (knex) {
  return knex("blog").insert([
    {
      id: 1,
      authorId: 000000,
      postId: 1,
      title: "Test Blog Title",
      metaTitle: "Test Title",
      slug: "/test_title",
      summary: "This is the first blog post via a test",
      published: true,
      createdAt: 2022 - 03 - 07,
      updatedAt: 2022 - 03 - 07,
      publishedAt: 2022 - 03 - 07,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);
};
