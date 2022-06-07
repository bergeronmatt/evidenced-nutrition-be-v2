exports.seed = function (knex) {
  return knex("categories").insert([
    {
      id: 1,
      parentId: "1",
      title: "nutrition",
      metaTitle: "nutrition",
      slug: "/nutrition",
    },
    {
      id: 2,
      parentId: "2",
      title: "biology",
      metaTitle: "biology",
      slug: "/biology",
    },
    {
      id: 3,
      parentId: "3",
      title: "streaming",
      metaTitle: "streaming",
      slug: "/streaming",
    },
  ]);
};
